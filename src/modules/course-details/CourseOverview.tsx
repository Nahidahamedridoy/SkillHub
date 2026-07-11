"use client";

import React from "react";
import { Card, CardContent, CardHeader, Chip, Separator } from "@heroui/react";
import { motion, Variants } from "framer-motion";
import {
  LuLayers,
  LuGlobe,
  LuClock,
  LuAward,
  LuCalendar,
  LuBookOpen,
  LuCheck,
} from "react-icons/lu";
import { Course } from "@/types/course";

// ─── Component Props ────────────────────────────────────────────────────────────

export interface CourseOverviewProps {
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
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────────

export default function CourseOverview({ course }: CourseOverviewProps) {
  const level = course.level ?? "All Levels";
  const language = course.language ?? "English";
  const lastUpdated = course.lastUpdated ?? "Recently Updated";
  const highlights = course.highlights ?? [];

  // Support both multi-paragraph and single description
  const paragraphs =
    course.descriptionParagraphs ??
    (course.description ? [course.description] : ["No description available."]);

  const getLevelColor = (lvl: string) => {
    switch (lvl.toLowerCase()) {
      case "beginner":
        return "bg-emerald-500/10 text-emerald-500";
      case "intermediate":
        return "bg-blue-500/10 text-blue-500";
      case "advanced":
        return "bg-purple-500/10 text-purple-500";
      default:
        return "bg-default-100 text-default-500";
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full py-8 text-foreground"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ── Left Column: Description & Highlights ── */}
        <div className="lg:col-span-8 space-y-8">
          <motion.div variants={childVariants} className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              About this Course
            </h2>
            <div className="space-y-4 text-foreground-600 dark:text-foreground-300 leading-relaxed font-medium">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          {highlights.length > 0 && (
            <>
              <Separator className="bg-default-100" />

              {/* Highlights Grid */}
              <motion.div variants={childVariants} className="space-y-4">
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  What you will learn
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <LuCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-foreground-700 dark:text-foreground-200">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </div>

        {/* ── Right Column: Quick Facts Card ── */}
        <div className="lg:col-span-4 w-full">
          <motion.div variants={childVariants}>
            <Card className="border border-default-100/60 bg-background/50 backdrop-blur-md shadow-xl rounded-2xl p-5">
              <CardHeader className="font-extrabold text-lg tracking-tight pb-2 border-b border-default-100/60">
                Course Quick Facts
              </CardHeader>
              <CardContent className="p-0 pt-4 space-y-4">
                {/* Level */}
                <div className="flex justify-between items-center text-sm font-semibold">
                  <div className="flex items-center gap-2.5 text-foreground-500">
                    <LuLayers className="w-4 h-4" />
                    <span>Skill Level</span>
                  </div>
                  <Chip
                    size="sm"
                    className={`${getLevelColor(level)} font-bold border-none`}
                  >
                    {level}
                  </Chip>
                </div>

                <Separator className="bg-default-100/60" />

                {/* Lessons */}
                <div className="flex justify-between items-center text-sm font-semibold">
                  <div className="flex items-center gap-2.5 text-foreground-500">
                    <LuBookOpen className="w-4 h-4" />
                    <span>Lectures</span>
                  </div>
                  <span className="text-foreground font-bold">
                    {course.lessonsCount} lectures
                  </span>
                </div>

                <Separator className="bg-default-100/60" />

                {/* Duration */}
                <div className="flex justify-between items-center text-sm font-semibold">
                  <div className="flex items-center gap-2.5 text-foreground-500">
                    <LuClock className="w-4 h-4" />
                    <span>Total Duration</span>
                  </div>
                  <span className="text-foreground font-bold">{course.duration}</span>
                </div>

                <Separator className="bg-default-100/60" />

                {/* Language */}
                <div className="flex justify-between items-center text-sm font-semibold">
                  <div className="flex items-center gap-2.5 text-foreground-500">
                    <LuGlobe className="w-4 h-4" />
                    <span>Language</span>
                  </div>
                  <span className="text-foreground font-bold">{language}</span>
                </div>

                <Separator className="bg-default-100/60" />

                {/* Certificate */}
                <div className="flex justify-between items-center text-sm font-semibold">
                  <div className="flex items-center gap-2.5 text-foreground-500">
                    <LuAward className="w-4 h-4" />
                    <span>Certificate</span>
                  </div>
                  <span className="text-foreground font-bold">
                    {course.certificate ? "Available" : "Not Available"}
                  </span>
                </div>

                <Separator className="bg-default-100/60" />

                {/* Last Updated */}
                <div className="flex justify-between items-center text-sm font-semibold">
                  <div className="flex items-center gap-2.5 text-foreground-500">
                    <LuCalendar className="w-4 h-4" />
                    <span>Last Updated</span>
                  </div>
                  <span className="text-foreground font-bold">{lastUpdated}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}