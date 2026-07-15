"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import LatestReviews from "@/components/dashboard/instructor/LatestReviews";
import { latestReviews } from "@/data/dashboard/instructor";

export default function InstructorCreateCoursePage() {
  return (
    <RoleGuard allowedRoles={["instructor", "admin"]}>
      <LatestReviews reviews={latestReviews} />
    </RoleGuard>
  );
}
