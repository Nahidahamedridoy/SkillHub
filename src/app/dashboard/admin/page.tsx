"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import StatsGrid from "@/components/dashboard/admin/StatsGrid";
import WelcomeCard from "@/components/dashboard/admin/WelcomeCard";
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="space-y-6">
        <WelcomeCard
          name={user?.name ?? "Admin"}
          subtitle="Monitor growth, review pending courses, and keep the platform running smoothly."
        />

        <StatsGrid />
      </div>
    </RoleGuard>
  );
}
