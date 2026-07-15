"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, type UserRole } from "@/context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RoleGuardProps {
  children: React.ReactNode;
  /** Roles that are allowed to access the wrapped content. */
  allowedRoles: UserRole[];
  /**
   * Where to redirect when the user is authenticated but lacks the required
   * role. Defaults to `/` (home).
   */
  unauthorizedRedirectTo?: string;
}

// ─── Inner guard (only rendered after ProtectedRoute confirms auth) ────────────

function RoleCheck({
  children,
  allowedRoles,
  unauthorizedRedirectTo,
}: RoleGuardProps) {
  const { user } = useAuth();
  const router = useRouter();

  const roleRedirect = user
    ? {
        student: "/dashboard/student",
        instructor: "/dashboard/instructor",
        admin: "/dashboard/admin",
      }[user.role]
    : "/";

  const redirectTarget = unauthorizedRedirectTo ?? roleRedirect;
  const hasRole = user ? allowedRoles.includes(user.role) : false;

  useEffect(() => {
    if (!hasRole) {
      router.replace(redirectTarget);
    }
  }, [hasRole, router, redirectTarget]);

  if (!hasRole) {
    // Render nothing while redirect fires
    return null;
  }

  return <>{children}</>;
}

// ─── RoleGuard ────────────────────────────────────────────────────────────────

/**
 * Composes ProtectedRoute + role check.
 *
 * Behaviour (in order):
 *  1. Not authenticated              → redirect to /login (via ProtectedRoute)
 *  2. Authenticated, wrong role      → redirect to `unauthorizedRedirectTo` (/)
 *  3. Authenticated, correct role    → render children
 *
 * Usage:
 * ```tsx
 * <RoleGuard allowedRoles={['admin']}>
 *   <AdminDashboard />
 * </RoleGuard>
 * ```
 */
export default function RoleGuard({
  children,
  allowedRoles,
  unauthorizedRedirectTo = "/",
}: RoleGuardProps) {
  return (
    <ProtectedRoute>
      <RoleCheck
        allowedRoles={allowedRoles}
        unauthorizedRedirectTo={unauthorizedRedirectTo}
      >
        {children}
      </RoleCheck>
    </ProtectedRoute>
  );
}
