"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LuBookOpen,
  LuCalendar,
  LuClock,
  LuGraduationCap,
  LuLoader,
  LuPlay,
  LuTrendingUp,
} from "react-icons/lu";
import RoleGuard from "@/components/auth/RoleGuard";
import { EnrollmentService } from "@/services/EnrollmentService";
import { Enrollment } from "@/types/enrollment";

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-1.5 rounded-full bg-default-100 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
      />
    </div>
  );
}

// ─── Enrollment Card ──────────────────────────────────────────────────────────

function EnrollmentCard({
  enrollment,
  index,
}: {
  enrollment: Enrollment;
  index: number;
}) {
  const router = useRouter();
  const { course, progress, enrolledAt } = enrollment;

  if (!course) return null;

  const formattedDate = new Date(enrolledAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="group relative flex flex-col bg-background rounded-3xl border border-default-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 overflow-hidden"
    >
      {/* Course Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-default-100">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Progress chip overlay */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
              progress === 100
                ? "bg-emerald-500/90 text-white"
                : progress > 0
                ? "bg-primary/90 text-white"
                : "bg-black/60 text-white"
            }`}
          >
            <LuTrendingUp className="w-3 h-3" />
            {progress === 100 ? "Completed" : progress > 0 ? `${progress}%` : "Not started"}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        {/* Category badge */}
        <span className="text-xs font-bold text-primary uppercase tracking-wider">
          {course.category}
        </span>

        {/* Title */}
        <h3 className="text-base font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>

        {/* Meta */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-foreground-500 font-medium">
          <span className="flex items-center gap-1.5">
            <LuGraduationCap className="w-3.5 h-3.5 text-primary shrink-0" />
            {course.instructor}
          </span>
          <span className="flex items-center gap-1.5">
            <LuClock className="w-3.5 h-3.5 text-secondary shrink-0" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <LuCalendar className="w-3.5 h-3.5 text-foreground-400 shrink-0" />
            Enrolled {formattedDate}
          </span>
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-foreground-500">Progress</span>
            <span className={progress === 100 ? "text-emerald-500" : "text-primary"}>
              {progress}%
            </span>
          </div>
          <ProgressBar value={progress} />
        </div>

        {/* CTA */}
        <button
          id={`continue-btn-${enrollment.id}`}
          onClick={() => router.push(`/courses/${course.id}`)}
          className="mt-auto flex items-center justify-center gap-2 w-full h-10 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary hover:to-secondary text-primary hover:text-white text-sm font-bold transition-all duration-200 border border-primary/20 hover:border-transparent"
        >
          <LuPlay className="w-3.5 h-3.5" />
          {progress === 0 ? "Start Learning" : progress === 100 ? "Review Course" : "Continue Learning"}
        </button>
      </div>
    </motion.div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="col-span-full flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6">
        <LuBookOpen className="w-9 h-9 text-primary" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">No courses yet</h3>
      <p className="text-sm text-foreground-500 max-w-xs mb-8">
        You haven&apos;t enrolled in any courses. Start your learning journey today!
      </p>
      <button
        id="browse-courses-btn"
        onClick={() => router.push("/courses")}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
      >
        <LuBookOpen className="w-4 h-4" />
        Browse Courses
      </button>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function MyLearningContent() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    EnrollmentService.getMyEnrollments()
      .then(setEnrollments)
      .catch((err) =>
        setError(err?.message ?? "Failed to load your courses.")
      )
      .finally(() => setLoading(false));
  }, []);

  const validEnrollments = enrollments.filter((e) => e.course !== null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">My Learning</h1>
          <p className="mt-1 text-sm text-foreground-500">
            {loading
              ? "Loading your courses…"
              : `${validEnrollments.length} course${validEnrollments.length !== 1 ? "s" : ""} enrolled`}
          </p>
        </div>
        {!loading && validEnrollments.length > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
            <LuGraduationCap className="w-3.5 h-3.5" />
            {validEnrollments.length} Active
          </span>
        )}
      </motion.div>

      {/* States */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <LuLoader className="w-8 h-8 text-primary animate-spin" />
        </div>
      )}

      {error && !loading && (
        <div className="flex flex-col items-center py-20 text-center">
          <p className="text-sm text-rose-500 font-semibold">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {validEnrollments.length === 0 ? (
            <EmptyState />
          ) : (
            validEnrollments.map((enrollment, i) => (
              <EnrollmentCard
                key={enrollment.id}
                enrollment={enrollment}
                index={i}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ─── Default export wrapped in role guard ─────────────────────────────────────

export default function StudentMyCoursesPage() {
  return (
    <RoleGuard allowedRoles={["student", "instructor"]}>
      <MyLearningContent />
    </RoleGuard>
  );
}
