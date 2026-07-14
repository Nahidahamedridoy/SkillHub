import ProtectedRoute from "@/components/auth/ProtectedRoute";

/**
 * Dashboard segment layout.
 *
 * All routes under /dashboard/* are wrapped with ProtectedRoute here at the
 * segment level. Individual sub-routes (instructor, admin) apply additional
 * RoleGuard checks inside their own page files.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
