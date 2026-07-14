"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// ─── Role & User Types ────────────────────────────────────────────────────────

export type UserRole = "student" | "instructor" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

// ─── Context Shape ────────────────────────────────────────────────────────────

interface AuthContextValue {
  /** Current authenticated user. null when not logged in. */
  user: AuthUser | null;
  /** True while the initial session is being read from storage. */
  isLoading: boolean;
  /** Convenience flag — false during isLoading to avoid race conditions. */
  isAuthenticated: boolean;
  /** Sign in and persist session. Throws on invalid credentials. */
  login: (email: string, password: string, override?: { name: string; role: UserRole }) => Promise<void>;
  /** Sign out and clear session. */
  logout: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Storage Key ──────────────────────────────────────────────────────────────

const STORAGE_KEY = "skillhub_auth_user";

// ─── Mock Resolver ───────────────────────────────────────────────────────────
// Maps email prefixes to roles — replace with a real API call when ready.

function resolveMockUser(email: string): AuthUser {
  const lower = email.toLowerCase().trim();

  if (lower.startsWith("admin")) {
    return {
      id: "usr_admin_001",
      name: "Admin User",
      email,
      role: "admin",
    };
  }

  if (lower.startsWith("instructor")) {
    return {
      id: "usr_inst_001",
      name: "Instructor User",
      email,
      role: "instructor",
    };
  }

  return {
    id: "usr_std_001",
    name: "Student User",
    email,
    role: "student",
  };
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate session from localStorage on first mount (client-only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: AuthUser = JSON.parse(raw);
        setUser(parsed);
      }
    } catch {
      // Corrupted storage — clear it silently
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, _password: string, override?: { name: string; role: UserRole }) => {
    // Simulate network latency — swap with real API call
    await new Promise<void>((resolve) => setTimeout(resolve, 1200));

    const resolved = resolveMockUser(email);
    const finalUser: AuthUser = override
      ? { ...resolved, name: override.name, role: override.role }
      : resolved;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(finalUser));
    setUser(finalUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: !isLoading && user !== null,
      login,
      logout,
    }),
    [user, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
