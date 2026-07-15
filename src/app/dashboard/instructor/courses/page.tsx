"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import MyCourses from "@/components/dashboard/instructor/MyCourses";
import { myCourses } from "@/data/dashboard/instructor";

export default function InstructorCoursesPage() {
  return (
    <RoleGuard allowedRoles={["instructor", "admin"]}>
      <MyCourses courses={myCourses} />
    </RoleGuard>
  );
}
