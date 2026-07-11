"use client";

import React, { useRef } from "react";
import { Card } from "@heroui/react";
import { motion, useInView } from "framer-motion";
import {
  LuCode,
  LuPenTool,
  LuChartBar,
  LuBriefcase,
  LuMegaphone,
  LuBrain,
  LuCloud,
  LuMusic2,
} from "react-icons/lu";
import type { IconType } from "react-icons";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface Category {
  id: number;
  icon: IconType;
  name: string;
  courseCount: number;
  gradient: string;
  iconBg: string;
  iconColor: string;
  hoverBorder: string;
}

// ─────────────────────────────────────────────
// Data – exactly 8 categories
// ─────────────────────────────────────────────

const CATEGORIES: Category[] = [
  {
    id: 1,
    icon: LuCode,
    name: "Development",
    courseCount: 420,
    gradient: "from-violet-500 to-purple-600",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-500",
    hoverBorder: "hover:border-violet-400/40",
  },
  {
    id: 2,
    icon: LuPenTool,
    name: "Design",
    courseCount: 280,
    gradient: "from-pink-500 to-rose-500",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-500",
    hoverBorder: "hover:border-pink-400/40",
  },
  {
    id: 3,
    icon: LuChartBar,
    name: "Data Science",
    courseCount: 310,
    gradient: "from-sky-500 to-blue-600",
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-500",
    hoverBorder: "hover:border-sky-400/40",
  },
  {
    id: 4,
    icon: LuBriefcase,
    name: "Business",
    courseCount: 195,
    gradient: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    hoverBorder: "hover:border-amber-400/40",
  },
  {
    id: 5,
    icon: LuMegaphone,
    name: "Marketing",
    courseCount: 160,
    gradient: "from-emerald-500 to-teal-500",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    hoverBorder: "hover:border-emerald-400/40",
  },
  {
    id: 6,
    icon: LuBrain,
    name: "AI & ML",
    courseCount: 215,
    gradient: "from-indigo-500 to-violet-600",
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
    hoverBorder: "hover:border-indigo-400/40",
  },
  {
    id: 7,
    icon: LuCloud,
    name: "Cloud & DevOps",
    courseCount: 140,
    gradient: "from-cyan-500 to-sky-600",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-500",
    hoverBorder: "hover:border-cyan-400/40",
  },
  {
    id: 8,
    icon: LuMusic2,
    name: "Music",
    courseCount: 88,
    gradient: "from-fuchsia-500 to-purple-600",
    iconBg: "bg-fuchsia-500/10",
    iconColor: "text-fuchsia-500",
    hoverBorder: "hover:border-fuchsia-400/40",
  },
];

// ─────────────────────────────────────────────
// Animation variants
// ─────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 90, damping: 18 },
  },
};

// ─────────────────────────────────────────────
// CategoryCard sub-component
// ─────────────────────────────────────────────

interface CategoryCardProps {
  category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
  const Icon = category.icon;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="h-full"
    >
      <Card
        className={`
          group relative h-full cursor-pointer overflow-hidden
          border border-default-100 bg-background shadow-sm
          transition-shadow duration-300 hover:shadow-xl
          ${category.hoverBorder}
        `}
      >
        {/* Top gradient accent – appears on hover */}
        <div
          className={`
            absolute inset-x-0 top-0 h-[3px] rounded-t-xl
            bg-gradient-to-r ${category.gradient}
            opacity-0 transition-opacity duration-300 group-hover:opacity-100
          `}
        />

        {/* Subtle inner glow wash on hover */}
        <div
          className={`
            pointer-events-none absolute inset-0
            bg-gradient-to-br ${category.gradient}
            opacity-0 transition-opacity duration-500 group-hover:opacity-[0.04]
          `}
        />

        <div className="relative flex flex-col items-center gap-4 px-5 py-7 text-center">
          {/* Icon container */}
          <div
            className={`
              flex h-16 w-16 items-center justify-center rounded-2xl
              ${category.iconBg}
              transition-transform duration-300 group-hover:scale-110
            `}
          >
            <Icon className={`h-8 w-8 ${category.iconColor}`} />
          </div>

          {/* Text */}
          <div className="space-y-1">
            <p className="text-sm font-bold text-foreground">{category.name}</p>
            <p className="text-xs font-medium text-foreground-400">
              {category.courseCount} courses
            </p>
          </div>

          {/* "Explore →" label – fades in on hover */}
          <span
            className={`
              text-[10px] font-semibold
              bg-gradient-to-r ${category.gradient}
              bg-clip-text text-transparent
              opacity-0 transition-opacity duration-300 group-hover:opacity-100
            `}
          >
            Explore →
          </span>
        </div>
      </Card>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────

export default function Categories() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-default-50/50 py-20 md:py-28"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-sky-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-primary" />
            Browse by Topic
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Explore{" "}
            <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
              Top Categories
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm text-foreground-500">
            From coding to creativity — find your path across 30+ expertly
            curated categories.
          </p>
        </motion.div>

        {/* Responsive 4-column grid (2 on mobile, 4 on md+) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-4"
        >
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}