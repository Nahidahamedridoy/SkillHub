"use client";

import React from "react";
import {
  Card,
  CardContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Chip,
  Button,
} from "@heroui/react";
import { motion, Variants } from "framer-motion";
import {
  LuStar,
  LuUsers,
  LuBookOpen,
  LuAward,
  LuLinkedin,
  LuGithub,
  LuGlobe,
} from "react-icons/lu";
import { Course } from "@/types/course";

// ─── Component Props ────────────────────────────────────────────────────────────

export interface InstructorCardProps {
  course: Course;
}

// ─── Stat Item ──────────────────────────────────────────────────────────────────

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  colorClass: string;
}

function StatItem({ icon, label, value, colorClass }: StatItemProps) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex items-center justify-center rounded-xl w-9 h-9 shrink-0 ${colorClass}`}
      >
        {icon}
      </span>
      <div>
        <div className="text-[10px] text-foreground-400 uppercase tracking-wider font-extrabold">
          {label}
        </div>
        <div className="text-sm font-bold text-foreground">{value}</div>
      </div>
    </div>
  );
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

// ─── Component ───────────────────────────────────────────────────────────────────

export default function InstructorCard({ course }: InstructorCardProps) {
  // Prefer rich instructorDetails; fall back to course.instructor string
  const instructor = course.instructorDetails ?? { name: course.instructor };

  const initials = instructor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

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
        Meet Your Instructor
      </motion.h2>

      <motion.div variants={childVariants}>
        <Card className="border border-default-100/60 bg-background/50 backdrop-blur-md shadow-xl rounded-3xl p-6 sm:p-8">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* ── Left: Avatar & Social Links ── */}
              <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
                <Avatar className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-2 border-default-200/50 shadow-md overflow-hidden">
                  <AvatarImage
                    src={instructor.avatar}
                    alt={instructor.name}
                    className="object-cover w-full h-full"
                  />
                  <AvatarFallback className="text-xl font-bold text-primary bg-primary/10">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-foreground">{instructor.name}</h3>
                  {instructor.title && (
                    <p className="text-xs font-semibold text-foreground-500 max-w-[240px]">
                      {instructor.title}
                    </p>
                  )}
                </div>

                {/* Social links */}
                {instructor.socials && (
                  <div className="flex gap-2">
                    {instructor.socials.linkedin && (
                      <a href={instructor.socials.linkedin} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          isIconOnly
                          aria-label="LinkedIn"
                          className="w-10 h-10 rounded-xl border-default-200 text-foreground-400 hover:text-primary hover:border-primary transition-all duration-200"
                        >
                          <LuLinkedin className="w-4 h-4" />
                        </Button>
                      </a>
                    )}
                    {instructor.socials.github && (
                      <a href={instructor.socials.github} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          isIconOnly
                          aria-label="GitHub"
                          className="w-10 h-10 rounded-xl border-default-200 text-foreground-400 hover:text-foreground hover:border-default-400 transition-all duration-200"
                        >
                          <LuGithub className="w-4 h-4" />
                        </Button>
                      </a>
                    )}
                    {instructor.socials.website && (
                      <a href={instructor.socials.website} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          isIconOnly
                          aria-label="Website"
                          className="w-10 h-10 rounded-xl border-default-200 text-foreground-400 hover:text-secondary hover:border-secondary transition-all duration-200"
                        >
                          <LuGlobe className="w-4 h-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* ── Right: Stats & Bio ── */}
              <div className="lg:col-span-8 space-y-6">
                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-default-100/20 p-4 rounded-2xl border border-default-100/40">
                  {instructor.avgRating !== undefined && (
                    <StatItem
                      icon={<LuStar className="w-5 h-5" />}
                      label="Rating"
                      value={`${instructor.avgRating} ★`}
                      colorClass="bg-amber-500/10 text-amber-500"
                    />
                  )}
                  {instructor.totalStudents !== undefined && (
                    <StatItem
                      icon={<LuUsers className="w-5 h-5" />}
                      label="Students"
                      value={`${(instructor.totalStudents / 1000).toFixed(0)}K+`}
                      colorClass="bg-primary/10 text-primary"
                    />
                  )}
                  {instructor.coursesCount !== undefined && (
                    <StatItem
                      icon={<LuBookOpen className="w-5 h-5" />}
                      label="Courses"
                      value={String(instructor.coursesCount)}
                      colorClass="bg-emerald-500/10 text-emerald-500"
                    />
                  )}
                  {instructor.experienceYears !== undefined && (
                    <StatItem
                      icon={<LuAward className="w-5 h-5" />}
                      label="Experience"
                      value={`${instructor.experienceYears}+ Yrs`}
                      colorClass="bg-secondary/10 text-secondary"
                    />
                  )}
                </div>

                {/* Bio section */}
                {instructor.bio && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Chip
                        size="sm"
                        className="bg-primary/10 text-primary border-none font-bold"
                      >
                        About
                      </Chip>
                      {instructor.experienceYears !== undefined && (
                        <Chip
                          size="sm"
                          className="bg-default-100 text-foreground-500 border-none font-bold"
                        >
                          {instructor.experienceYears} Years Experience
                        </Chip>
                      )}
                    </div>
                    <p className="text-sm text-foreground-600 dark:text-foreground-300 leading-relaxed font-medium">
                      {instructor.bio}
                    </p>
                  </div>
                )}
              </div>

            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}