"use client";

import React from "react";
import { Button } from "@heroui/react";
import { motion, Variants } from "framer-motion";
import { LuRotateCcw } from "react-icons/lu";

// ─── Props ──────────────────────────────────────────────────────────────────────

interface EmptyStateProps {
  /** Called when the user clicks "Reset Filters". */
  onReset?: () => void;
}

// ─── Animation variants ─────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
  },
};

// ─── Illustration ────────────────────────────────────────────────────────────────

function EmptyIllustration() {
  return (
    <svg
      width="160"
      height="160"
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer ring */}
      <circle cx="80" cy="80" r="72" fill="currentColor" className="text-default-100" />
      {/* Mid ring */}
      <circle cx="80" cy="80" r="54" fill="currentColor" className="text-default-200/60" />
      {/* Inner ring */}
      <circle cx="80" cy="80" r="36" fill="currentColor" className="text-default-200" />

      {/* Magnifier circle */}
      <circle cx="74" cy="72" r="20" stroke="currentColor" strokeWidth="5" className="text-primary/40" fill="none" />
      {/* Magnifier handle */}
      <line x1="88" y1="86" x2="104" y2="102" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-primary/40" />

      {/* X mark inside magnifier */}
      <line x1="67" y1="65" x2="81" y2="79" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-primary" />
      <line x1="81" y1="65" x2="67" y2="79" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-primary" />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────────

/**
 * EmptyState
 *
 * Shown inside CoursesGrid when the active filters return zero results.
 * Accepts an optional `onReset` callback wired to "Reset Filters".
 */
export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full py-20 px-4 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Illustration ── */}
      <motion.div variants={iconVariants} className="mb-6">
        <EmptyIllustration />
      </motion.div>

      {/* ── Heading ── */}
      <motion.h2
        variants={itemVariants}
        className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-2"
      >
        No Courses Found
      </motion.h2>

      {/* ── Subtitle ── */}
      <motion.p
        variants={itemVariants}
        className="text-sm sm:text-base text-foreground-500 max-w-xs sm:max-w-sm leading-relaxed mb-8"
      >
        Try adjusting your search or filters.
      </motion.p>

      {/* ── Reset button ── */}
      {onReset && (
        <motion.div variants={itemVariants}>
          <Button
            onPress={onReset}
            size="md"
            className="font-bold px-6 gap-2 bg-primary text-white shadow-md shadow-primary/25 hover:opacity-90 transition-opacity duration-200"
          >
            <LuRotateCcw className="w-4 h-4" />
            Reset Filters
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}