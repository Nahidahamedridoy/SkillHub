"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { LuLayoutGrid } from "react-icons/lu";
import { COURSES_DATA } from "@/data/courses";
import { Course } from "@/types/course";
import CourseCard from "@/components/course/CourseCard";

// ─── Animation Variants ────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// ─── Props ─────────────────────────────────────────────────────────────────────

interface CoursesGridProps {
  /** Optionally pass a filtered subset; falls back to all static data. */
  courses?: Course[];
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function CoursesGrid({ courses = COURSES_DATA }: CoursesGridProps) {
  const count = courses.length;

  return (
    <section className="w-full py-6">
      {/* ── Heading row ── */}
      <motion.div
        className="flex items-center gap-3 mb-6"
        variants={headingVariants}
        initial="hidden"
        animate="visible"
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0">
          <LuLayoutGrid className="w-4 h-4" />
        </span>

        <div className="flex items-baseline gap-2">
          <h2 className="text-xl font-extrabold text-foreground tracking-tight">
            All Courses
          </h2>
          <span className="text-sm font-semibold text-foreground-400">
            {count} {count === 1 ? "result" : "results"}
          </span>
        </div>

        {/* Divider line */}
        <div className="flex-1 h-px bg-default-100" />
      </motion.div>

      {/* ── Grid ── */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {courses.map((course) => (
          <motion.div
            key={course.id}
            variants={itemVariants}
            className="h-full"
            // Keep hover lift independent of stagger
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <CourseCard course={course} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}