"use client";

import React from "react";
import { Button } from "@heroui/react";
import { motion, Variants } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";
import Link from "next/link";
import CourseCard from "@/components/course/CourseCard";
import { COURSES_DATA } from "@/data/courses";
import { Course } from "@/types/course";

// ─── Component Props ────────────────────────────────────────────────────────────

export interface RelatedCoursesProps {
  currentCourse: Course;
  maxItems?: number;
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

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 18,
    },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────────

export default function RelatedCourses({
  currentCourse,
  maxItems = 4,
}: RelatedCoursesProps) {
  // Filter out the current course and take up to maxItems
  const related = COURSES_DATA.filter(
    (c) => c.id !== currentCourse.id
  ).slice(0, maxItems);

  if (related.length === 0) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full py-10 text-foreground space-y-6"
    >
      {/* Section header */}
      <motion.div
        variants={headerVariants}
        className="flex items-center justify-between"
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Related Courses
          </h2>
          <p className="text-sm font-semibold text-foreground-500">
            Expand your skills with these handpicked courses
          </p>
        </div>

        <Link href="/courses">
          <Button
            variant="outline"
            className="hidden sm:flex font-bold border-default-200 hover:border-primary hover:text-primary px-4 rounded-xl transition-all duration-200"
          >
            View All Courses
            <LuArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </motion.div>

      {/* Course cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {related.map((course) => (
          <motion.div key={course.id} variants={cardVariants}>
            <CourseCard course={course} />
          </motion.div>
        ))}
      </div>

      {/* Mobile "View All" button */}
      <motion.div
        variants={headerVariants}
        className="flex sm:hidden justify-center pt-2"
      >
        <Link href="/courses" className="w-full">
          <Button
            variant="outline"
            className="w-full font-bold border-default-200 hover:border-primary hover:text-primary rounded-xl transition-all duration-200"
          >
            View All Courses
            <LuArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}