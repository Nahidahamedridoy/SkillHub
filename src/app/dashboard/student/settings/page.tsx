"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import StatsGrid from "@/components/dashboard/student/StatsGrid";
import { statsData } from "@/data/dashboard/student";

export default function StudentSettingsPage() {
  return (
    <RoleGuard allowedRoles={["student"]}>
      <StatsGrid stats={statsData} />
    </RoleGuard>
  );
}
