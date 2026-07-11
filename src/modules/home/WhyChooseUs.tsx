"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  LuShieldCheck,
  LuTrendingUp,
  LuUsers,
  LuZap,
  LuBadgeCheck,
  LuHeadphones,
} from "react-icons/lu";

const features = [
  {
    id: 1,
    icon: LuShieldCheck,
    title: "Expert-Vetted Content",
    description:
      "Every course is reviewed by industry professionals and academics before it goes live — so you only learn what actually works in the real world.",
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-500/10",
    iconColor: "text-violet-500",
  },
  {
    id: 2,
    icon: LuTrendingUp,
    title: "Career-Driven Outcomes",
    description:
      "Our curriculum is built around in-demand job skills. 92% of SkillHub graduates report a promotion or salary increase within 6 months.",
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
  },
  {
    id: 3,
    icon: LuZap,
    title: "Learn at Your Own Pace",
    description:
      "Lifetime access, offline downloads, and bite-sized lessons mean you fit learning around your life — not the other way around.",
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-500/10",
    iconColor: "text-amber-500",
  },
  {
    id: 4,
    icon: LuUsers,
    title: "Thriving Community",
    description:
      "Join live Q&As, peer study groups, and Discord channels with 250K+ learners. Learn better together with real accountability.",
    gradient: "from-sky-500 to-blue-600",
    bg: "bg-sky-500/10",
    iconColor: "text-sky-500",
  },
  {
    id: 5,
    icon: LuBadgeCheck,
    title: "Industry Certificates",
    description:
      "Earn shareable certificates recognised by top employers. Add them to LinkedIn or your portfolio to stand out instantly.",
    gradient: "from-rose-500 to-pink-600",
    bg: "bg-rose-500/10",
    iconColor: "text-rose-500",
  },
  {
    id: 6,
    icon: LuHeadphones,
    title: "24/7 Mentor Support",
    description:
      "Stuck on a concept? Our expert mentors and AI-powered assistant are always on hand to answer questions — day or night.",
    gradient: "from-indigo-500 to-violet-600",
    bg: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 80, damping: 18 } },
};

export default function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative w-full bg-background py-20 md:py-28 overflow-hidden">
      {/* Decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute -left-48 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute -right-48 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-sky-500/5 blur-3xl" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-primary" />
            Why SkillHub
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
              level up fast
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-foreground-500 sm:text-base">
            We built SkillHub around one question: what makes people actually succeed at learning online? Here's our answer.
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.id}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative overflow-hidden rounded-2xl border border-default-100 bg-background p-7 shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                {/* Top accent */}
                <div className={`absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r ${feat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${feat.bg}`}>
                  <Icon className={`h-6 w-6 ${feat.iconColor}`} />
                </div>

                <h3 className="mb-2 text-base font-bold text-foreground">{feat.title}</h3>
                <p className="text-sm leading-relaxed text-foreground-500">{feat.description}</p>

                {/* Learn more link */}
                <div className={`mt-5 inline-flex items-center gap-1 text-xs font-semibold bg-gradient-to-r ${feat.gradient} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  Learn more →
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}