"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import RecentStudents from "@/components/dashboard/instructor/RecentStudents";
import { recentStudents } from "@/data/dashboard/instructor";

export default function InstructorStudentsPage() {
  return (
    <RoleGuard allowedRoles={["instructor", "admin"]}>
      <RecentStudents students={recentStudents} />
    </RoleGuard>
  );
}
