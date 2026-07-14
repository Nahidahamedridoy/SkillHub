"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LuStar, LuUsers, LuBookOpen, LuExternalLink } from "react-icons/lu";

const instructors = [
  {
    id: 1,
    name: "Dr. Angela Yu",
    specialty: "Full-Stack Development",
    rating: 4.9,
    students: 62000,
    courses: 8,
    badge: "Top Rated",
    badgeColor: "bg-amber-500",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80",
    gradient: "from-violet-500 to-purple-600",
    bio: "Former doctor turned developer & educator. Creator of the #1 rated bootcamp on SkillHub.",
  },
  {
    id: 2,
    name: "Marcus Vance",
    specialty: "Cloud & AWS Architecture",
    rating: 4.9,
    students: 48000,
    courses: 5,
    badge: "Expert",
    badgeColor: "bg-sky-500",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
    gradient: "from-sky-500 to-blue-600",
    bio: "AWS Solutions Architect with 15 years at Fortune 500 companies. Simplifies cloud for everyone.",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    specialty: "UI/UX & Product Design",
    rating: 4.8,
    students: 34000,
    courses: 6,
    badge: "Rising Star",
    badgeColor: "bg-pink-500",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80",
    gradient: "from-pink-500 to-rose-500",
    bio: "Principal designer at a leading SaaS startup. Obsessed with design systems and user delight.",
  },
  {
    id: 4,
    name: "David Miller",
    specialty: "Data Science & ML",
    rating: 4.9,
    students: 55000,
    courses: 7,
    badge: "Top Rated",
    badgeColor: "bg-amber-500",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&h=200&q=80",
    gradient: "from-emerald-500 to-teal-600",
    bio: "PhD in Machine Learning from MIT. Makes complex models feel intuitive and accessible.",
  },
  {
    id: 5,
    name: "Emma Thompson",
    specialty: "Digital Marketing",
    rating: 4.7,
    students: 29000,
    courses: 4,
    badge: "Expert",
    badgeColor: "bg-sky-500",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
    gradient: "from-amber-500 to-orange-500",
    bio: "CMO turned educator. Has grown 3 brands from zero to multi-million dollar revenue.",
  },
  {
    id: 6,
    name: "Prof. Michael Stark",
    specialty: "AI & Generative Models",
    rating: 4.9,
    students: 22000,
    courses: 3,
    badge: "New",
    badgeColor: "bg-indigo-500",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200&q=80",
    gradient: "from-indigo-500 to-violet-600",
    bio: "AI Research Lead at a top-10 tech lab. Bringing frontier research into practical courses.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 80, damping: 18 } },
};

export default function TopInstructors() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative w-full bg-default-50/50 py-20 md:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-sky-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-primary" />
              Meet the Experts
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Learn from{" "}
              <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                World-Class Instructors
              </span>
            </h2>
            <p className="mt-3 max-w-xl text-sm text-foreground-500">
              Our instructors aren&apos;t just teachers — they&apos;re practitioners who&apos;ve built real things and are obsessed with helping you do the same.
            </p>
          </div>
          <button className="group self-start md:self-auto inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-600 transition-colors shrink-0">
            View all instructors
            <LuExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>

        {/* Instructor Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {instructors.map((inst) => (
            <motion.div
              key={inst.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group relative overflow-hidden rounded-2xl border border-default-100 bg-background p-6 shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              {/* Top gradient accent */}
              <div className={`absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r ${inst.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Subtle gradient wash */}
              <div className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${inst.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

              {/* Avatar row */}
              <div className="relative flex items-start gap-4 mb-4">
                <div className="relative shrink-0">
                  <img
                    src={inst.avatar}
                    alt={inst.name}
                    className="h-16 w-16 rounded-2xl object-cover border-2 border-default-100"
                  />
                  {/* Badge */}
                  <span className={`absolute -bottom-2 -right-2 rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${inst.badgeColor}`}>
                    {inst.badge}
                  </span>
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <h3 className="text-base font-bold text-foreground truncate">{inst.name}</h3>
                  <p className={`text-xs font-semibold bg-gradient-to-r ${inst.gradient} bg-clip-text text-transparent`}>
                    {inst.specialty}
                  </p>
                  {/* Rating */}
                  <div className="mt-1.5 flex items-center gap-1">
                    <LuStar className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-foreground">{inst.rating}</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs leading-relaxed text-foreground-500 mb-4 line-clamp-2">
                {inst.bio}
              </p>

              {/* Stats row */}
              <div className="flex items-center gap-4 border-t border-default-50 pt-4">
                <div className="flex items-center gap-1.5 text-foreground-400">
                  <LuUsers className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold text-foreground-600">
                    {(inst.students / 1000).toFixed(0)}K students
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-foreground-400">
                  <LuBookOpen className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold text-foreground-600">
                    {inst.courses} courses
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}