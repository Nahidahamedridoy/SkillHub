"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Chip } from "@heroui/react";
import { motion, Variants } from "framer-motion";
import {
  LuStar,
  LuClock,
  LuUsers,
  LuBookOpen,
  LuGlobe,
  LuHeart,
  LuShare2,
  LuHouse,
  LuChevronRight,
  LuPlay,
  LuAward,
  LuSparkles,
  LuCircleCheck,
  LuLoader,
} from "react-icons/lu";
import { Course } from "@/types/course";
import { useAuth } from "@/context/AuthContext";
import { EnrollmentService } from "@/services/EnrollmentService";

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({
  message,
  type,
  onDone,
}: {
  message: string;
  type: "success" | "error";
  onDone: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDone, 3500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`fixed top-6 right-6 z-[9999] flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-2xl backdrop-blur-md border text-sm font-semibold ${type === "success"
        ? "bg-emerald-500/90 border-emerald-400/30 text-white"
        : "bg-rose-500/90 border-rose-400/30 text-white"
        }`}
    >
      {type === "success" ? (
        <LuCircleCheck className="w-4.5 h-4.5 shrink-0" />
      ) : (
        <span className="w-4.5 h-4.5 shrink-0 text-lg leading-none">✕</span>
      )}
      {message}
    </motion.div>
  );
}

// ─── Component Props ────────────────────────────────────────────────────────────

export interface CourseBannerProps {
  course: Course;
}

// ─── Animation Variants ────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
    },
  },
};

const floatBlob: Variants = {
  animate: {
    x: [0, 15, -10, 0],
    y: [0, -15, 15, 0],
    scale: [1, 1.05, 0.95, 1],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────────

export default function CourseBanner({ course }: CourseBannerProps) {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const isAdmin = user?.role === "admin";
  const isInstructor = user?.role === "instructor";

  const isOwnCourse =
    user && course.instructorId
      ? String(course.instructorId) === user.id
      : false;

  // ── Check existing enrollment on mount ──────────────────────────────────────
  useEffect(() => {
    if (!user || authLoading || isAdmin || isOwnCourse) return;

    setCheckingEnrollment(true);
    EnrollmentService.isEnrolled(course.id)
      .then((enrolled) => setIsEnrolled(enrolled))
      .finally(() => setCheckingEnrollment(false));
  }, [user, authLoading, course.id, isAdmin, isOwnCourse]);

  // ── Enroll handler ──────────────────────────────────────────────────────────
  const handleEnroll = useCallback(async () => {
    console.log("Enroll button clicked" , user);
    if (!user) {
      router.push("/login");
      return;
    }

    if (isInstructor) {
      setToast({
        message: "Only students can enroll in courses.",
        type: "error",
      });
      return;
    }

    if (isAdmin) {
      setToast({
        message: "Admins cannot enroll in courses.",
        type: "error",
      });
      return;
    }

    if (isOwnCourse) {
      setToast({ message: "You cannot enroll in your own course.", type: "error" });
      return;
    }
    if (isEnrolled) {
      router.push("/dashboard/student/my-courses");
      return;
    }

    setEnrolling(true);
    try {
      await EnrollmentService.enroll(course.id);
      setIsEnrolled(true);
      setToast({ message: "🎉 Enrolled successfully! Happy learning.", type: "success" });
    } catch (err: any) {
      setToast({
        message: err?.message ?? "Enrollment failed. Please try again.",
        type: "error",
      });
    } finally {
      setEnrolling(false);
    }
  }, [user, isAdmin, isOwnCourse, isEnrolled, course.id, router]);

  // ── Resolve instructor display ───────────────────────────────────────────────
  const instructorName = course.instructorDetails?.name ?? course.instructor;
  const instructorTitle = course.instructorDetails?.title;
  const instructorAvatar = course.instructorDetails?.avatar;

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const renderStars = (rating: number) => {
    const stars = [];
    const floor = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= floor) {
        stars.push(
          <LuStar key={i} className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
        );
      } else if (i - 0.5 <= rating) {
        stars.push(
          <div key={i} className="relative inline-block w-4 h-4 shrink-0">
            <LuStar className="w-4 h-4 text-default-300 absolute top-0 left-0" />
            <div className="absolute top-0 left-0 overflow-hidden w-[50%]">
              <LuStar className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <LuStar key={i} className="w-4 h-4 text-default-300 shrink-0" />
        );
      }
    }
    return stars;
  };

  const calculateDiscount = (priceStr: string, originalStr?: string) => {
    if (!originalStr) return null;
    const p = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
    const o = parseFloat(originalStr.replace(/[^0-9.]/g, ""));
    if (isNaN(p) || isNaN(o) || o <= p) return null;
    return Math.round(((o - p) / o) * 100);
  };

  const discountPercent = calculateDiscount(course.price, course.originalPrice);

  // ── Button state ─────────────────────────────────────────────────────────────
  const buttonDisabled =
    enrolling ||
    checkingEnrollment ||
    isAdmin ||
    isInstructor ||
    isOwnCourse;

  const buttonLabel = (() => {
    if (isInstructor) return "Instructors cannot enroll";
    if (isAdmin) return "Admins cannot enroll";
    if (isOwnCourse) return "Your own course";
    if (checkingEnrollment) return "Checking...";
    if (enrolling) return "Enrolling...";
    if (isEnrolled) return "Go to My Learning →";
    return "Enroll Now";
  })();

  const buttonClass = (() => {
    if (isAdmin || isOwnCourse)
      return "w-full font-bold h-12 rounded-xl bg-default-200/40 text-foreground-400 cursor-not-allowed";
    if (isEnrolled)
      return "w-full font-bold h-12 rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-colors";
    return "w-full font-bold h-12 rounded-xl bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/15 hover:shadow-primary/25 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200";
  })();

  return (
    <section className="relative w-full overflow-hidden bg-[#0A0E1A] text-white py-12 lg:py-16 border-b border-default-100/10">
      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDone={() => setToast(null)}
        />
      )}

      {/* ── Background Glow Effects ── */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          variants={floatBlob}
          animate="animate"
          className="absolute -top-40 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]"
        />
        <motion.div
          variants={floatBlob}
          animate="animate"
          className="absolute -bottom-40 right-1/4 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[120px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] opacity-80" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          {/* ── Left Column: Course Details ── */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Breadcrumbs */}
            <motion.nav
              variants={itemVariants}
              aria-label="Breadcrumb"
              className="inline-flex items-center gap-2 text-xs font-semibold text-foreground-400 flex-wrap"
            >
              <Link
                href="/"
                className="flex items-center gap-1 hover:text-white transition-colors group"
              >
                <LuHouse className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                <span>Home</span>
              </Link>
              <LuChevronRight className="h-3 w-3 text-default-600" />
              <Link href="/courses" className="hover:text-white transition-colors">
                Courses
              </Link>
              <LuChevronRight className="h-3 w-3 text-default-600" />
              <span className="text-foreground-300 font-bold">{course.category}</span>
            </motion.nav>

            {/* Title Block */}
            <div className="space-y-4">
              <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5 items-center">
                <Chip
                  size="sm"
                  className="bg-primary/10 text-primary border-none font-bold px-3"
                >
                  {course.category}
                </Chip>
                {course.badge && (
                  <Chip
                    size="sm"
                    className="bg-amber-500/10 text-amber-400 border-none font-bold px-3"
                  >
                    <span className="flex items-center gap-1">
                      <LuSparkles className="w-3.5 h-3.5 animate-pulse" />
                      {course.badge}
                    </span>
                  </Chip>
                )}
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
              >
                {course.title}
              </motion.h1>

              {course.description && (
                <motion.p
                  variants={itemVariants}
                  className="text-base text-foreground-300 font-medium leading-relaxed max-w-2xl"
                >
                  {course.description}
                </motion.p>
              )}
            </div>

            {/* Social Stats Row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-y-3 gap-x-6 items-center text-sm font-semibold text-foreground-300 border-y border-default-100/10 py-4"
            >
              {/* Rating */}
              <div className="flex items-center gap-1.5">
                <span className="text-amber-400 font-bold text-base">{course.rating}</span>
                <div className="flex items-center">{renderStars(course.rating)}</div>
                <span className="text-foreground-400 text-xs">
                  ({course.reviewsCount.toLocaleString()} reviews)
                </span>
              </div>

              <span className="hidden sm:inline text-default-800">|</span>

              {course.studentsCount && (
                <div className="flex items-center gap-2">
                  <LuUsers className="w-4 h-4 text-primary" />
                  <span>{course.studentsCount.toLocaleString()} enrolled students</span>
                </div>
              )}
            </motion.div>

            {/* Meta details list */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-foreground-400"
            >
              <div className="flex items-center gap-2 bg-default-100/5 p-3 rounded-xl border border-default-100/5">
                <LuClock className="w-4 h-4 text-secondary" />
                <div>
                  <div className="text-[10px] text-default-500 uppercase tracking-wider">Duration</div>
                  <div className="text-white font-bold">{course.duration}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-default-100/5 p-3 rounded-xl border border-default-100/5">
                <LuBookOpen className="w-4 h-4 text-primary" />
                <div>
                  <div className="text-[10px] text-default-500 uppercase tracking-wider">Lessons</div>
                  <div className="text-white font-bold">{course.lessonsCount} lectures</div>
                </div>
              </div>

              {course.language && (
                <div className="flex items-center gap-2 bg-default-100/5 p-3 rounded-xl border border-default-100/5">
                  <LuGlobe className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-[10px] text-default-500 uppercase tracking-wider">Language</div>
                    <div className="text-white font-bold">{course.language}</div>
                  </div>
                </div>
              )}

              {course.lastUpdated && (
                <div className="flex items-center gap-2 bg-default-100/5 p-3 rounded-xl border border-default-100/5">
                  <LuAward className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="text-[10px] text-default-500 uppercase tracking-wider">Updated</div>
                    <div className="text-white font-bold">{course.lastUpdated}</div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Instructor Quick Info */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 pt-2">
              {instructorAvatar && (
                <img
                  src={instructorAvatar}
                  alt={instructorName}
                  className="w-12 h-12 rounded-xl object-cover border border-default-100/10 shadow-sm"
                />
              )}
              <div>
                <div className="text-xs text-foreground-400 font-semibold">Taught by</div>
                <div className="text-sm font-bold text-white hover:text-primary transition-colors cursor-pointer">
                  {instructorName}
                </div>
                {instructorTitle && (
                  <div className="text-xs text-foreground-500 font-semibold leading-none mt-0.5">
                    {instructorTitle}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* ── Right Column: Interactive Purchase Card ── */}
          <div className="lg:col-span-5 w-full lg:sticky lg:top-24">
            <motion.div
              variants={itemVariants}
              className="bg-[#111625]/85 backdrop-blur-xl border border-default-100/10 rounded-3xl p-5 shadow-2xl shadow-black/40 overflow-hidden"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden group shadow-md border border-default-100/5">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-1.5 text-white"
                  >
                    <LuPlay className="w-12 h-12 text-white fill-white/10" />
                    <span className="text-xs font-bold uppercase tracking-wider">Preview Course</span>
                  </motion.div>
                </div>
              </div>

              {/* Price Block */}
              <div className="mt-5 space-y-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-white">{course.price}</span>
                  {course.originalPrice && (
                    <span className="text-lg text-foreground-500 line-through font-semibold">
                      {course.originalPrice}
                    </span>
                  )}
                  {discountPercent && (
                    <Chip
                      size="sm"
                      className="bg-emerald-500/10 text-emerald-400 font-bold border-none"
                    >
                      {discountPercent}% OFF
                    </Chip>
                  )}
                </div>

                {/* Admin notice */}
                {isAdmin && (
                  <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-3 text-sm font-semibold text-rose-400 text-center">
                    Admins cannot enroll in courses.
                  </div>
                )}

                {isInstructor && (
                  <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-3 text-sm font-semibold text-amber-400 text-center">
                    Instructors cannot enroll in courses.
                  </div>
                )}

                {/* Own course notice */}
                {!isAdmin && isOwnCourse && (
                  <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-3 text-sm font-semibold text-amber-400 text-center">
                    You cannot enroll in your own course.
                  </div>
                )}

                {/* Actions Button Group */}
                <div className="flex flex-col gap-3">
                  <Button
                    id="enroll-btn"
                    onPress={handleEnroll}
                    isDisabled={buttonDisabled && !isEnrolled}
                    className={buttonClass}
                  >
                    {enrolling || checkingEnrollment ? (
                      <span className="flex items-center gap-2">
                        <LuLoader className="w-4 h-4 animate-spin" />
                        {buttonLabel}
                      </span>
                    ) : (
                      buttonLabel
                    )}
                  </Button>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onPress={() => setIsWishlisted(!isWishlisted)}
                      className={`flex-1 font-bold h-12 rounded-xl border-default-200 hover:border-primary transition-all ${isWishlisted
                        ? "text-rose-500 border-rose-500/50 bg-rose-500/5 hover:bg-rose-500/10 hover:border-rose-500"
                        : "text-foreground-300 hover:text-white"
                        }`}
                    >
                      <LuHeart className={`w-4.5 h-4.5 transition-transform duration-200 ${isWishlisted ? "fill-rose-500 scale-110" : ""
                        }`} />
                      <span>{isWishlisted ? "Wishlisted" : "Add to Wishlist"}</span>
                    </Button>

                    <Button
                      variant="outline"
                      isIconOnly
                      aria-label="Share course"
                      className="w-12 h-12 rounded-xl border-default-200 text-foreground-300 hover:text-white hover:border-primary"
                    >
                      <LuShare2 className="w-4.5 h-4.5" />
                    </Button>
                  </div>
                </div>

                {/* Included features list */}
                <div className="border-t border-default-100/10 pt-4 space-y-2.5">
                  <div className="text-xs font-bold text-foreground-400 uppercase tracking-wider">
                    This course includes:
                  </div>
                  <ul className="space-y-2 text-xs font-semibold text-foreground-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Full lifetime access to course content
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      Access on mobile and TV devices
                    </li>
                    {course.certificate && (
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Certificate of completion upon graduation
                      </li>
                    )}
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      Direct Q&A support from instructor
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}