"use client";

import React, { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  LuUsers,
  LuGraduationCap,
  LuBookOpen,
  LuStar,
  LuTrendingUp,
  LuAward,
} from "react-icons/lu";

// ── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (v) =>
    prefix + v.toFixed(decimals) + suffix
  );

  React.useEffect(() => {
    if (inView) motionValue.set(target);
  }, [inView, motionValue, target]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const stats = [
  {
    id: 1,
    icon: LuUsers,
    value: 250,
    suffix: "K+",
    label: "Active Learners",
    description: "Students from 120+ countries",
    gradient: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/30",
    bg: "bg-violet-500/10",
    iconColor: "text-violet-500",
  },
  {
    id: 2,
    icon: LuBookOpen,
    value: 1800,
    suffix: "+",
    label: "Expert Courses",
    description: "Across 30+ skill categories",
    gradient: "from-sky-500 to-blue-600",
    glow: "shadow-sky-500/30",
    bg: "bg-sky-500/10",
    iconColor: "text-sky-500",
  },
  {
    id: 3,
    icon: LuGraduationCap,
    value: 98,
    suffix: "%",
    label: "Completion Rate",
    description: "Industry-leading success rate",
    gradient: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/30",
    bg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
  },
  {
    id: 4,
    icon: LuStar,
    value: 4.9,
    suffix: "/5",
    decimals: 1,
    label: "Average Rating",
    description: "Based on 85K+ reviews",
    gradient: "from-amber-500 to-orange-500",
    glow: "shadow-amber-500/30",
    bg: "bg-amber-500/10",
    iconColor: "text-amber-500",
  },
  {
    id: 5,
    icon: LuAward,
    value: 500,
    suffix: "+",
    label: "Expert Instructors",
    description: "Industry veterans & academics",
    gradient: "from-rose-500 to-pink-600",
    glow: "shadow-rose-500/30",
    bg: "bg-rose-500/10",
    iconColor: "text-rose-500",
  },
  {
    id: 6,
    icon: LuTrendingUp,
    value: 92,
    suffix: "%",
    label: "Career Growth",
    description: "Graduates report salary bumps",
    gradient: "from-indigo-500 to-violet-600",
    glow: "shadow-indigo-500/30",
    bg: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
  },
];

// ── Animation Variants ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 80, damping: 18 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 18 },
  },
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-20 md:py-28 bg-background"
    >
      {/* Background decorations */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {/* Soft top gradient band */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        {/* Radial glow blobs */}
        <div className="absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute -right-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-sky-500/5 blur-3xl" />
        <div className="absolute left-1/2 top-0 h-64 w-2/3 -translate-x-1/2 rounded-full bg-primary/4 blur-3xl" />

        {/* Subtle dot-grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mb-14 text-center"
        >
          <motion.div variants={headerVariants} className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-primary" />
            By the numbers
          </motion.div>

          <motion.h2
            variants={headerVariants}
            className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Trusted by{" "}
            <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
              Learners Worldwide
            </span>
          </motion.h2>

          <motion.p
            variants={headerVariants}
            className="mx-auto mt-4 max-w-2xl text-sm text-foreground-500 sm:text-base"
          >
            From first-time students to seasoned professionals — SkillHub has powered real
            career transformations across the globe.
          </motion.p>
        </motion.div>

        {/* ── Stats Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`group relative overflow-hidden rounded-2xl border border-default-100 bg-background p-6 shadow-sm hover:shadow-lg hover:${stat.glow} transition-shadow duration-300`}
              >
                {/* Card inner glow on hover */}
                <div className={`pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${stat.gradient} opacity-[0.04]`} />

                {/* Top accent bar */}
                <div className={`absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="flex items-start gap-4">
                  {/* Icon badge */}
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.bg}`}>
                    <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Counter */}
                    <p className={`text-3xl font-black tracking-tight bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                        decimals={stat.decimals ?? 0}
                        duration={1.8}
                      />
                    </p>

                    {/* Label */}
                    <p className="mt-0.5 text-sm font-bold text-foreground">
                      {stat.label}
                    </p>

                    {/* Description */}
                    <p className="mt-1 text-xs text-foreground-400 font-medium leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Bottom trust strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-14 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <div className="flex -space-x-2">
            {[
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&h=60&q=80",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&h=60&q=80",
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=60&h=60&q=80",
              "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=60&h=60&q=80",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Learner ${i + 1}`}
                className="h-9 w-9 rounded-full border-2 border-background object-cover"
              />
            ))}
          </div>
          <p className="text-sm font-semibold text-foreground-500">
            Join{" "}
            <span className="font-extrabold text-foreground">250,000+</span>{" "}
            learners already transforming their careers
          </p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <LuStar
                key={i}
                className="h-4 w-4 fill-amber-400 text-amber-400"
              />
            ))}
            <span className="ml-1 text-sm font-bold text-foreground">4.9</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}