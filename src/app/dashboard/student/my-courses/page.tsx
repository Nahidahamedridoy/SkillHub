"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import RecentCourses from "@/components/dashboard/student/RecentCourses";
import { recentCourses } from "@/data/dashboard/student";

export default function StudentMyCoursesPage() {
  return (
    <RoleGuard allowedRoles={["student"]}>
      <RecentCourses courses={recentCourses} />
    </RoleGuard>
  );
}
