"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import CoursesOverview from "@/components/dashboard/admin/CoursesOverview";

export default function AdminCategoriesPage() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <CoursesOverview />
    </RoleGuard>
  );
}
