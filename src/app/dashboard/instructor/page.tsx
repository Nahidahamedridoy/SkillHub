"use client";

import WelcomeCard from "@/components/dashboard/instructor/WelcomeCard";
import StatsGrid from "@/components/dashboard/instructor/StatsGrid";
import MyCourses from "@/components/dashboard/instructor/MyCourses";
import RecentStudents from "@/components/dashboard/instructor/RecentStudents";
import RevenueCard from "@/components/dashboard/instructor/RevenueCard";
import LatestReviews from "@/components/dashboard/instructor/LatestReviews";
import RecentActivity from "@/components/dashboard/instructor/RecentActivity";
import RoleGuard from "@/components/auth/RoleGuard";
import {
  instructorWelcome,
  instructorStats,
  myCourses,
  recentStudents,
  revenueOverview,
  latestReviews,
  instructorActivity,
} from "@/data/dashboard/instructor";

export default function InstructorDashboardPage() {
  return (
    <RoleGuard allowedRoles={["instructor", "admin"]}>
      <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
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

          <MyCourses courses={myCourses} />

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <RecentStudents students={recentStudents} />
            <RevenueCard
              total={revenueOverview.total}
              monthlyChange={revenueOverview.monthlyChange}
              activeSubscriptions={revenueOverview.activeSubscriptions}
              projected={revenueOverview.projected}
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <LatestReviews reviews={latestReviews} />
            <RecentActivity activities={instructorActivity} />
          </div>
        </div>
      </main>
    </RoleGuard>
  );
}
