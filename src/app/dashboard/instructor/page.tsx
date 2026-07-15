"use client";

import WelcomeCard from "@/components/dashboard/instructor/WelcomeCard";
import StatsGrid from "@/components/dashboard/instructor/StatsGrid";
import RevenueCard from "@/components/dashboard/instructor/RevenueCard";
import RecentActivity from "@/components/dashboard/instructor/RecentActivity";
import RoleGuard from "@/components/auth/RoleGuard";
import { instructorWelcome, instructorStats, revenueOverview, instructorActivity } from "@/data/dashboard/instructor";

export default function InstructorDashboardPage() {
  return (
    <RoleGuard allowedRoles={["instructor", "admin"]}>
      <div className="space-y-6">
        <WelcomeCard
          name={instructorWelcome.name}
          message={instructorWelcome.message}
          badge={instructorWelcome.badge}
          courses={instructorWelcome.courses}
          students={instructorWelcome.students}
          revenue={instructorWelcome.revenue}
          rating={instructorWelcome.rating}
        />

        <StatsGrid stats={instructorStats} />

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <RevenueCard
            total={revenueOverview.total}
            monthlyChange={revenueOverview.monthlyChange}
            activeSubscriptions={revenueOverview.activeSubscriptions}
            projected={revenueOverview.projected}
          />
          <RecentActivity activities={instructorActivity} />
        </div>
      </div>
    </RoleGuard>
  );
}
