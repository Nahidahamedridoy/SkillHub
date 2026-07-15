"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import RecommendedCourses from "@/components/dashboard/student/RecommendedCourses";
import { recommendedCourses } from "@/data/dashboard/student";

export default function StudentWishlistPage() {
  return (
    <RoleGuard allowedRoles={["student"]}>
      <RecommendedCourses courses={recommendedCourses} />
    </RoleGuard>
  );
}
