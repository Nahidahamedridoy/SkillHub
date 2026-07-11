"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@heroui/react";
import { motion, Variants } from "framer-motion";
import { LuCheck } from "react-icons/lu";
import { Course } from "@/types/course";

// ─── Component Props ────────────────────────────────────────────────────────────

export interface WhatYouWillLearnProps {
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
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
    },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────────

export default function WhatYouWillLearn({ course }: WhatYouWillLearnProps) {
  const outcomes = course.highlights ?? [];

  if (outcomes.length === 0) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full py-6 text-foreground"
    >
      <Card className="border border-default-100/60 bg-background/50 backdrop-blur-md shadow-xl rounded-3xl p-6 sm:p-8">
        <CardHeader className="p-0 pb-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            What You'll Learn
          </h2>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            {outcomes.map((outcome, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start gap-3.5 group"
              >
                {/* Modern circular check indicator */}
                <span className="flex items-center justify-center bg-primary/10 text-primary rounded-full w-6 h-6 shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm shadow-primary/5">
                  <LuCheck className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span className="text-sm font-semibold text-foreground-700 dark:text-foreground-200 leading-relaxed">
                  {outcome}
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}