"use client";

import React, { useRef } from "react";
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
  LuCamera,
  LuFlame,
} from "react-icons/lu";

const categories = [
  {
    id: 1,
    icon: LuCode,
    label: "Development",
    count: 420,
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-500/10",
    iconColor: "text-violet-500",
    borderHover: "hover:border-violet-400/40",
  },
  {
    id: 2,
    icon: LuPenTool,
    label: "Design",
    count: 280,
    gradient: "from-pink-500 to-rose-500",
    bg: "bg-pink-500/10",
    iconColor: "text-pink-500",
    borderHover: "hover:border-pink-400/40",
  },
  {
    id: 3,
    icon: LuChartBar,
    label: "Data Science",
    count: 310,
    gradient: "from-sky-500 to-blue-600",
    bg: "bg-sky-500/10",
    iconColor: "text-sky-500",
    borderHover: "hover:border-sky-400/40",
  },
  {
    id: 4,
    icon: LuBriefcase,
    label: "Business",
    count: 195,
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    borderHover: "hover:border-amber-400/40",
  },
  {
    id: 5,
    icon: LuMegaphone,
    label: "Marketing",
    count: 160,
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    borderHover: "hover:border-emerald-400/40",
  },
  {
    id: 6,
    icon: LuBrain,
    label: "AI & ML",
    count: 215,
    gradient: "from-indigo-500 to-violet-600",
    bg: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
    borderHover: "hover:border-indigo-400/40",
  },
  {
    id: 7,
    icon: LuCloud,
    label: "Cloud & DevOps",
    count: 140,
    gradient: "from-cyan-500 to-sky-600",
    bg: "bg-cyan-500/10",
    iconColor: "text-cyan-500",
    borderHover: "hover:border-cyan-400/40",
  },
  {
    id: 8,
    icon: LuMusic2,
    label: "Music",
    count: 88,
    gradient: "from-fuchsia-500 to-purple-600",
    bg: "bg-fuchsia-500/10",
    iconColor: "text-fuchsia-500",
    borderHover: "hover:border-fuchsia-400/40",
  },
  {
    id: 9,
    icon: LuCamera,
    label: "Photography",
    count: 112,
    gradient: "from-orange-500 to-red-500",
    bg: "bg-orange-500/10",
    iconColor: "text-orange-500",
    borderHover: "hover:border-orange-400/40",
  },
  {
    id: 10,
    icon: LuFlame,
    label: "Personal Growth",
    count: 175,
    gradient: "from-rose-500 to-pink-600",
    bg: "bg-rose-500/10",
    iconColor: "text-rose-500",
    borderHover: "hover:border-rose-400/40",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 90, damping: 18 } },
};

export default function Categories() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative w-full bg-default-50/50 py-20 md:py-28 overflow-hidden">
      {/* bg decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-sky-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            From coding to creativity — find your path across 30+ expertly curated categories.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className={`group relative flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-default-100 bg-background px-4 py-6 text-center transition-all duration-300 hover:shadow-lg ${cat.borderHover}`}
              >
                {/* Top accent line on hover */}
                <div className={`absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${cat.bg} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-7 w-7 ${cat.iconColor}`} />
                </div>

                <div>
                  <p className="text-sm font-bold text-foreground">{cat.label}</p>
                  <p className="mt-0.5 text-xs font-medium text-foreground-400">{cat.count} courses</p>
                </div>

                {/* Hover arrow */}
                <span className={`text-[10px] font-semibold bg-gradient-to-r ${cat.gradient} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  Explore →
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}