"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { api } from "@/services/api";

export type UserRole = "student" | "instructor" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

interface AuthContextType {
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

const AuthContext = createContext<AuthContextType | null>(null);

type RawUser = {
  _id?: string | number;
  id?: string | number;
  name?: string;
  email?: string;
  role?: UserRole;
  avatarUrl?: string;
};

function mapUser(raw: RawUser): AuthUser {
  return {
    id: String(raw._id || raw.id || ""),
    name: raw.name || "",
    email: raw.email || "",
    role: raw.role || "student",
    avatarUrl: raw.avatarUrl,
  };
}

const AUTH_TOKEN_KEY = "skillhub_auth_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Always hydrate the current session on mount.
  // This supports both cookie-based sessions and token-based auth.
  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await api.get("/auth/me");

        if (data.success) {
          setUser(mapUser(data.data));
        } else {
          setUser(null);
        }
      } catch {
        if (typeof window !== "undefined") {
          localStorage.removeItem(AUTH_TOKEN_KEY);
        }
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Register
  const register = async (
    name: string,
    email: string,
    password: string,
    role: "student" | "instructor" = "student"
  ) => {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
      role,
    });

    if (data.success) {
      const token =
        data.data?.token || data.data?.accessToken || data.token || data.accessToken;
      if (typeof window !== "undefined" && token) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
      }

      setUser(mapUser(data.data));
    }
  };

  // Login
  const login = async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", {
      email,
      password,
    });

    if (data.success) {
      const token =
        data.data?.token || data.data?.accessToken || data.token || data.accessToken;
      if (typeof window !== "undefined" && token) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
      }

      setUser(mapUser(data.data));
    }
  };

  // Logout
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch { }

    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}