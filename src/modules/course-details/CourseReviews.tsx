"use client";

import React from "react";
import { Card, CardContent } from "@heroui/react";
import { motion, Variants } from "framer-motion";
import { LuStar } from "react-icons/lu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@heroui/react";
import { Course } from "@/types/course";

// ─── Component Props ────────────────────────────────────────────────────────────

export interface CourseReviewsProps {
  course: Course;
}

// ─── Animation Variants ────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1,
    },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// ─── Star renderer ────────────────────────────────────────────────────────────

function StarRow({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <LuStar
          key={i}
          className={`${cls} ${i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-default-200"}`}
        />
      ))}
    </div>
  );
}

// ─── Rating breakdown bar ─────────────────────────────────────────────────────

function RatingBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="flex items-center gap-3 text-xs font-semibold text-foreground-500">
      <span className="w-10 text-right shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-default-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="h-full bg-amber-400 rounded-full"
        />
      </div>
      <span className="w-8 shrink-0">{pct}%</span>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────────

export default function CourseReviews({ course }: CourseReviewsProps) {
  const reviews = course.reviews ?? [];

  if (reviews.length === 0) return null;

  // Compute rating breakdown from reviews
  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full py-8 text-foreground space-y-6"
    >
      {/* Section title */}
      <motion.h2
        variants={childVariants}
        className="text-2xl font-bold tracking-tight text-foreground"
      >
        Student Reviews
      </motion.h2>

      {/* Rating summary card */}
      <motion.div variants={childVariants}>
        <Card className="border border-default-100/60 bg-background/50 backdrop-blur-md shadow-xl rounded-3xl p-6 sm:p-8">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">

              {/* Overall score */}
              <div className="flex flex-col items-center justify-center bg-primary/5 border border-primary/10 rounded-2xl p-6 min-w-[140px] space-y-2">
                <span className="text-5xl font-extrabold text-foreground">
                  {course.rating.toFixed(1)}
                </span>
                <StarRow rating={course.rating} size="lg" />
                <span className="text-xs font-semibold text-foreground-500">
                  Course Rating
                </span>
              </div>

              {/* Breakdown bars */}
              <div className="flex-1 w-full space-y-2.5">
                {ratingCounts.map(({ star, count }) => {
                  const pct =
                    reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
                  return (
                    <RatingBar key={star} label={`${star} ★`} pct={pct} />
                  );
                })}
                <p className="text-xs text-foreground-400 font-semibold pt-1">
                  Based on {course.reviewsCount.toLocaleString()} total reviews
                </p>
              </div>

            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Individual review cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review) => {
          const initials = review.author
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();

          return (
            <motion.div key={review.id} variants={childVariants}>
              <Card className="h-full border border-default-100/60 bg-background/50 backdrop-blur-md shadow-sm rounded-2xl p-5 hover:border-default-200 transition-colors">
                <CardContent className="p-0 flex flex-col gap-4">
                  {/* Reviewer info row */}
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 rounded-xl overflow-hidden border border-default-200/50 shrink-0">
                      <AvatarImage
                        src={review.avatar}
                        alt={review.author}
                        className="object-cover w-full h-full"
                      />
                      <AvatarFallback className="text-sm font-bold text-primary bg-primary/10">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">
                        {review.author}
                      </p>
                      <p className="text-xs font-semibold text-foreground-400">
                        {review.date}
                      </p>
                    </div>
                    <div className="ml-auto shrink-0">
                      <StarRow rating={review.rating} />
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-sm text-foreground-600 dark:text-foreground-300 leading-relaxed font-medium">
                    {review.comment}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}