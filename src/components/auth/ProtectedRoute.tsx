"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// ─── Loading Screen ───────────────────────────────────────────────────────────

function AuthLoadingScreen() {
  return (
    <div
      aria-label="Checking authentication"
      role="status"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      {/* Animated logo mark */}
      <div className="relative mb-6">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary shadow-2xl shadow-primary/30 flex items-center justify-center">
          <svg
            className="w-9 h-9 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
          </svg>
        </div>

        {/* Rotating ring */}
        <div className="absolute -inset-2">
          <svg
            className="h-full w-full animate-spin"
            style={{ animationDuration: "1.4s" }}
            viewBox="0 0 56 56"
            fill="none"
          >
            <circle
              cx="28"
              cy="28"
              r="25"
              stroke="url(#spin-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="100 57"
            />
            <defs>
              <linearGradient
                id="spin-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="var(--color-primary)" />
                <stop
                  offset="100%"
                  stopColor="var(--color-secondary, #7c3aed)"
                />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <p className="text-sm font-semibold text-foreground-500 tracking-wide animate-pulse">
        Verifying your session…
      </p>
    </div>
  );
}

// ─── ProtectedRoute ───────────────────────────────────────────────────────────

interface ProtectedRouteProps {
  children: React.ReactNode;
  /**
   * Custom redirect target when not authenticated.
   * Defaults to `/login`.
   */
  redirectTo?: string;
}

/**
 * Wrap any page or layout with this component to require authentication.
 *
 * Behaviour:
 *  - While auth is hydrating → full-screen loading spinner (zero flicker).
 *  - Not authenticated        → redirect to `redirectTo` (default: /login).
 *  - Authenticated            → render children.
 */
export default function ProtectedRoute({
  children,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isLoading, isAuthenticated, router, redirectTo]);

  // Still hydrating — show loader instead of a blank or wrong page
  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  // Unauthenticated — render nothing; redirect fires in useEffect
  if (!isAuthenticated) {
    return <AuthLoadingScreen />;
  }

  return <>{children}</>;
}
