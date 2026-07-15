"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import WelcomeCard from "@/components/dashboard/instructor/WelcomeCard";
import { instructorWelcome } from "@/data/dashboard/instructor";

export default function InstructorProfilePage() {
  return (
    <RoleGuard allowedRoles={["instructor", "admin"]}>
      <WelcomeCard
        name={instructorWelcome.name}
        message={instructorWelcome.message}
        badge={instructorWelcome.badge}
        courses={instructorWelcome.courses}
        students={instructorWelcome.students}
        revenue={instructorWelcome.revenue}
        rating={instructorWelcome.rating}
      />
    </RoleGuard>
  );
}
