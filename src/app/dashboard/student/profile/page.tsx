"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import WelcomeCard from "@/components/dashboard/student/WelcomeCard";
import { welcomeData } from "@/data/dashboard/student";

export default function StudentProfilePage() {
  return (
    <RoleGuard allowedRoles={["student"]}>
      <WelcomeCard
        name={welcomeData.name}
        message={welcomeData.message}
        badge={welcomeData.badge}
        points={welcomeData.points}
        streak={welcomeData.streak}
      />
    </RoleGuard>
  );
}
