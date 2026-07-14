"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { api } from "@/services/api";

// ─── Types ────────────────────────────────────────────────────────────────────

export type UserRole = "student" | "instructor" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  register: (
    name: string,
    email: string,
    password: string,
    role?: "student" | "instructor"
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Map raw API user object → AuthUser
  const toAuthUser = (raw: any): AuthUser => ({
    id: String(raw._id || raw.id || ""),
    name: raw.name || "",
    email: raw.email || "",
    role: (raw.role as UserRole) || "student",
    avatarUrl: raw.avatarUrl,
  });

  // ── Hydrate session on mount via GET /auth/me ──────────────────────────────
  const hydrateSession = useCallback(async () => {
    try {
      const { data } = await api.get("/auth/me");
      if (data.success && data.data) {
        setUser(toAuthUser(data.data));
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    hydrateSession();
  }, [hydrateSession]);

  // ── Register → then auto-login ─────────────────────────────────────────────
  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      role: "student" | "instructor" = "student"
    ) => {
      // 1. Create account
      await api.post("/auth/register", { name, email, password, role });

      // 2. Immediately login to set the session cookie
      const { data } = await api.post("/auth/login", { email, password });
      if (data.success && data.data) {
        setUser(toAuthUser(data.data));
      }
    },
    []
  );

  // ── Login ──────────────────────────────────────────────────────────────────
  const login = useCallback(async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    if (data.success && data.data) {
      setUser(toAuthUser(data.data));
    }
  }, []);

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // Best-effort; always clear local state
    } finally {
      setUser(null);
    }
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an <AuthProvider>.");
  }
  return ctx;
}
