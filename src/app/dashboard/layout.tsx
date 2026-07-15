import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

/**
 * Dashboard segment layout.
 *
 * Wrap all dashboard routes with auth protection and the shared layout.
 */
export default function DashboardSegmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}
