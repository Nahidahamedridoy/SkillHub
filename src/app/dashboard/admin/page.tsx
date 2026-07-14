"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AnalyticsCard from "@/components/dashboard/admin/AnalyticsCard";
import CoursesOverview from "@/components/dashboard/admin/CoursesOverview";
import PendingApprovals from "@/components/dashboard/admin/PendingApprovals";
import RecentActivity from "@/components/dashboard/admin/RecentActivity";
import RevenueOverview from "@/components/dashboard/admin/RevenueOverview";
import StatsGrid from "@/components/dashboard/admin/StatsGrid";
import UsersOverview from "@/components/dashboard/admin/UsersOverview";
import WelcomeCard from "@/components/dashboard/admin/WelcomeCard";
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <WelcomeCard
            name={user?.name ?? "Admin"}
            subtitle="Monitor growth, review pending courses, and keep the platform running smoothly."
          />

          <StatsGrid />

          <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
            <div className="space-y-6">
              <PendingApprovals />

              <div className="grid gap-6 lg:grid-cols-2">
                <UsersOverview />
                <CoursesOverview />
              </div>
            </div>

            <div className="space-y-6">
              <AnalyticsCard />
              <RevenueOverview />
              <RecentActivity />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </RoleGuard>
  );
}
