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

  const categories = ["All", "Development", "Design", "Data Science", "Business", "Marketing"];

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    CourseService.getCourses()
      .then((result) => {
        if (!isMounted) return;
        setCourses(result);
      })
      .catch(() => {
        if (!isMounted) return;
        setError("Unable to load courses. Please try again.");
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCourses = useMemo(() => {
    if (activeFilter === "All") {
      return courses;
    }

    return courses.filter((course) => {
      if (activeFilter === "Business") {
        return course.category === "Business" || course.category === "Finance";
      }
      return course.category === activeFilter;
    });
  }, [activeFilter, courses]);

  const hasResults = filteredCourses.length > 0;

  return (
    <section className="w-full bg-default-50/50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
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
              Discover programs designed by industry experts. Gain practical knowledge, work on live projects, and earn certifications.
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-600 self-start md:self-auto transition-colors duration-200"
          >
            <span>View All Courses</span>
            <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeFilter === category
                  ? "bg-primary text-sky-500 shadow-md shadow-primary/25"
                  : "bg-background border border-default-100 hover:border-default-250 text-foreground-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="rounded-3xl border border-danger/10 bg-danger/5 px-6 py-8 text-center text-sm font-semibold text-danger">
            {error}
          </div>
        ) : hasResults ? (
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredCourses.map((course) => (
              <motion.div key={course.id} variants={cardVariants}>
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
              <EmptyState onReset={() => setActiveFilter("All")} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}