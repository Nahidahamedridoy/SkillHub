"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import AnalyticsCard from "@/components/dashboard/admin/AnalyticsCard";

export default function AdminAnalyticsPage() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <AnalyticsCard />
    </RoleGuard>
  );
}
