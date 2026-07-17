"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";
import Link from "next/link";

import CourseCard from "@/components/course/CourseCard";
import EmptyState from "@/modules/courses/EmptyState";
import LoadingSkeleton from "@/modules/courses/LoadingSkeleton";
import { CourseService } from "@/services/CourseService";
import type { Course } from "@/types/course";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 90,
      damping: 18,
    },
  },
};

export default function FeaturedCourses() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    "All",
    "Development",
    "Design",
    "Data Science",
    "Business",
    "Marketing",
  ];

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await CourseService.getCourses(1, 20);

        if (!isMounted) return;

        const approvedCourses = result.data.filter(
          (course) => course.status === "approved"
        );

        setCourses(approvedCourses);
      } catch (err) {
        if (!isMounted) return;

        setError("Unable to load courses. Please try again.");
      } finally {
        if (!isMounted) return;

        setIsLoading(false);
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCourses = useMemo(() => {
    if (activeFilter === "All") {
      return courses;
    }

    return courses.filter((course) => {
      const category = course.category.toLowerCase();

      switch (activeFilter) {
        case "Development":
          return (
            category.includes("development") ||
            category.includes("web")
          );

        case "Design":
          return category.includes("design");

        case "Data Science":
          return category.includes("data");

        case "Business":
          return (
            category.includes("business") ||
            category.includes("finance")
          );

        case "Marketing":
          return category.includes("marketing");

        default:
          return true;
      }
    });
  }, [activeFilter, courses]);

  const hasResults = filteredCourses.length > 0;

  return (
    <section className="w-full bg-default-50/50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
              <span>Explore Top Courses</span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Featured Courses
            </h2>

            <p className="max-w-xl text-sm text-foreground-500">
              Discover programs designed by industry experts. Gain practical
              knowledge, work on live projects, and earn certifications.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-600 transition-colors"
          >
            <span>View All Courses</span>
            <LuArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeFilter === category
                  ? "bg-primary text-sky-500"
                  : "bg-background border border-default-200 hover:border-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Content */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="rounded-2xl bg-danger/10 p-8 text-center text-danger font-semibold">
            {error}
          </div>
        ) : hasResults ? (
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredCourses.slice(0, 8).map((course) => (
              <motion.div key={course.id} variants={cardVariants}>
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <EmptyState onReset={() => setActiveFilter("All")} />
        )}
      </div>
    </section>
  );
}