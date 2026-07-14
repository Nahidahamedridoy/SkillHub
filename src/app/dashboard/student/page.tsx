"use client";

import WelcomeCard from "@/components/dashboard/student/WelcomeCard";
import StatsGrid from "@/components/dashboard/student/StatsGrid";
import ContinueLearning from "@/components/dashboard/student/ContinueLearning";
import RecentCourses from "@/components/dashboard/student/RecentCourses";
import RecommendedCourses from "@/components/dashboard/student/RecommendedCourses";
import LearningProgress from "@/components/dashboard/student/LearningProgress";
import RecentActivity from "@/components/dashboard/student/RecentActivity";
import {
  statsData,
  welcomeData,
  continueLearning,
  recentCourses,
  recommendedCourses,
  learningProgress,
  recentActivity,
} from "@/data/dashboard/student";

export default function StudentDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
        <WelcomeCard
          name={welcomeData.name}
          message={welcomeData.message}
          badge={welcomeData.badge}
          points={welcomeData.points}
          streak={welcomeData.streak}
        />

        <StatsGrid stats={statsData} />

        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <ContinueLearning items={continueLearning} />
          <RecommendedCourses courses={recommendedCourses} />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <RecentCourses courses={recentCourses} />
          <div className="grid gap-6">
            <LearningProgress items={learningProgress} />
            <RecentActivity activities={recentActivity} />
          </div>
        </div>
      </div>
    </main>
  );
}
