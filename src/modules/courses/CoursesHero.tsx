"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { LuHouse, LuChevronRight, LuBookOpen, LuSparkles } from "react-icons/lu";
import GradientText from "@/components/ui/GradientText";

// Animation variants for smooth entrance
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
    },
  },
};

const floatBlob1: Variants = {
  animate: {
    x: [0, 15, -10, 0],
    y: [0, -20, 10, 0],
    scale: [1, 1.05, 0.95, 1],
    opacity: [0.4, 0.55, 0.45, 0.4],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const floatBlob2: Variants = {
  animate: {
    x: [0, -15, 12, 0],
    y: [0, 20, -15, 0],
    scale: [1, 0.95, 1.05, 1],
    opacity: [0.35, 0.5, 0.4, 0.35],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function CoursesHero() {
  return (
    <section className="relative w-full overflow-hidden border-b border-default-100/60 bg-background py-16 md:py-20 flex items-center justify-center min-h-[280px] md:min-h-[320px]">
      {/* Decorative Interactive Background Glow Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Glow blob 1 - Primary (Blue/Violet theme accent) */}
        <motion.div
          variants={floatBlob1}
          animate="animate"
          className="absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-primary/15 blur-[90px]"
        />
        {/* Glow blob 2 - Secondary (Pink/Amber theme accent) */}
        <motion.div
          variants={floatBlob2}
          animate="animate"
          className="absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-secondary/15 blur-[90px]"
        />
        
        {/* Subtle radial overlay for smooth blending */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,var(--color-background)] opacity-80" />
        
        {/* Modern Dot Pattern Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(128,128,128,0.06)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-4 md:space-y-6"
        >
          {/* Glassmorphic Breadcrumb Navigation */}
          <motion.nav 
            variants={itemVariants} 
            aria-label="Breadcrumb"
            className="inline-flex items-center gap-2 rounded-full bg-default-100/50 hover:bg-default-100/80 px-4 py-1.5 text-xs font-semibold text-foreground-600 backdrop-blur-md border border-default-200/30 hover:border-default-200/50 shadow-sm transition-all duration-300"
          >
            <Link 
              href="/" 
              className="flex items-center gap-1.5 hover:text-primary transition-colors duration-200 group"
            >
              <LuHouse className="h-3.5 w-3.5 group-hover:scale-110 transition-transform duration-200" />
              <span>Home</span>
            </Link>
            
            <LuChevronRight className="h-3 w-3 text-default-400 font-bold" />
            
            <span className="flex items-center gap-1.5 text-foreground-900 font-bold">
              <LuBookOpen className="h-3.5 w-3.5 text-primary animate-pulse" />
              <span>Courses</span>
            </span>
          </motion.nav>

          {/* Title and Subtitle Block */}
          <div className="space-y-3 max-w-3xl">
            <motion.h1 
              variants={itemVariants}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground"
            >
              Explore <GradientText as="span" className="relative inline-block pb-1">
                Courses
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary/50 to-secondary/50 rounded-full" />
              </GradientText>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="mx-auto max-w-xl text-sm sm:text-base md:text-lg text-foreground-500 font-medium leading-relaxed"
            >
              Discover professional courses taught by industry experts.
            </motion.p>
          </div>

          {/* Interactive Floating Sparkle Tag */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-4 py-1.5 text-xs font-bold text-secondary transition-all duration-300 hover:bg-secondary/10 hover:border-secondary/30 hover:scale-102 shadow-sm cursor-default"
          >
            <LuSparkles className="h-3.5 w-3.5 animate-bounce text-secondary" />
            <span>Elevate your career today</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}