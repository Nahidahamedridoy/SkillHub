"use client";

import React from "react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import {
  LuArrowRight,
  LuStar,
  LuSparkles,
  LuGraduationCap,
  LuCheck,
  LuPlay,
  LuUsers,
} from "react-icons/lu";
import Link from "next/link";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
    },
  },
};

const floatAnimation = (duration: number = 6, delay: number = 0) => ({
  y: [0, -12, 0],
  transition: {
    duration,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut" as const,
    delay,
  },
});

export default function Hero() {
  // Avatar URLs for social proof
  const studentAvatars = [
    {
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
      alt: "Student 1",
    },
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
      alt: "Student 2",
    },
    {
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
      alt: "Student 3",
    },
    {
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
      alt: "Student 4",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-background py-12 md:py-20 lg:py-28">
      {/* Background Glowing Gradients */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/3 right-1/10 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left space-y-6 md:space-y-8"
          >
            {/* Animated Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary transition-all duration-300 hover:bg-primary/10"
            >
              <LuSparkles className="h-3.5 w-3.5 animate-pulse text-secondary" />
              <span>Discover the Smarter Way to Learn</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl leading-[1.1] sm:leading-[1.15]"
            >
              Master New Skills, <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Elevate Your Career
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="max-w-2xl text-base text-foreground-500 sm:text-lg md:text-xl leading-relaxed"
            >
              Access over 5,000+ industry-recognized courses taught by top experts.
              Learn at your own pace with hands-on projects, interactive labs, and join a global community of learners.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-350 px-8 py-6 rounded-xl flex items-center justify-center gap-2"
              >
                <Link href='/courses'><span>Explore Courses</span></Link>
                <LuArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-default-250 hover:border-primary text-foreground font-semibold hover:bg-default-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 px-8 py-6 rounded-xl"
              >
                Become an Instructor
              </Button>
            </motion.div>

            {/* Social Proof & Stats */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 border-t border-default-100 pt-6 w-full"
            >
              {/* Stacked Avatars */}
              <div className="flex -space-x-3 overflow-hidden">
                {studentAvatars.map((avatar, idx) => (
                  <img
                    key={idx}
                    className="inline-block h-10 w-10 rounded-full border-2 border-background object-cover"
                    src={avatar.src}
                    alt={avatar.alt}
                  />
                ))}
              </div>

              {/* Stats Labels */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <LuStar key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1 text-sm font-bold text-foreground">4.9/5</span>
                </div>
                <p className="text-xs text-foreground-500">
                  Trusted by <span className="font-semibold text-foreground">10,000+ learners</span> worldwide
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Visual Component / Interactive Mockup */}
          <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
            
            {/* Glowing blur behind the mockup */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[80%] h-[80%] bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-full blur-3xl opacity-75" />

            {/* Interactive Mockup Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-[480px] aspect-[4/3] rounded-2xl border border-default-100 bg-background/50 backdrop-blur-xl p-4 md:p-6 shadow-2xl"
            >
              {/* Main Course Card */}
              <div className="h-full flex flex-col justify-between">
                {/* Course Header Banner */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-secondary h-[45%] flex items-center justify-center p-6 text-white group">
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-md transition-transform duration-700 group-hover:scale-125" />
                  <div className="absolute -left-4 -top-4 w-20 h-20 rounded-full bg-white/10 blur-sm" />
                  
                  <div className="flex flex-col items-center text-center space-y-2 z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                      <LuGraduationCap className="h-7 w-7 text-white" />
                    </div>
                    <span className="text-sm font-medium tracking-wide uppercase opacity-90">LIVE BOOTCAMP</span>
                  </div>
                </div>

                {/* Course Info & Progress */}
                <div className="space-y-4 pt-4 flex-1 flex flex-col justify-end">
                  <div>
                    <h3 className="font-bold text-foreground text-lg leading-snug">
                      Full-Stack Web Development Masterclass
                    </h3>
                    <p className="text-xs text-foreground-500 mt-1 flex items-center gap-1.5">
                      <LuUsers className="h-3.5 w-3.5 text-primary" />
                      with Dr. Angela Yu & team
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-foreground-600">Course Progress</span>
                      <span className="text-primary">78%</span>
                    </div>
                    <div className="h-2 w-full bg-default-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "78%" }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Item 1: Instructor Card */}
              <motion.div
                animate={floatAnimation(5.5, 0)}
                className="absolute -top-6 -left-6 md:-left-10 bg-background/90 backdrop-blur-md border border-default-100 rounded-xl p-3.5 shadow-xl flex items-center gap-3 max-w-[210px] hover:scale-105 transition-transform duration-300"
              >
                <div className="relative">
                  <img
                    className="h-10 w-10 rounded-full object-cover border border-default-100"
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Instructor"
                  />
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground">Sarah Jenkins</span>
                  <span className="text-[10px] text-foreground-500">React Specialist</span>
                </div>
              </motion.div>

              {/* Floating Item 2: Achievements Badge */}
              <motion.div
                animate={floatAnimation(6, 1.2)}
                className="absolute -bottom-6 -right-6 md:-right-10 bg-background/90 backdrop-blur-md border border-default-100 rounded-xl p-3 shadow-xl flex items-center gap-3 hover:scale-105 transition-transform duration-300"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                  <LuPlay className="h-5 w-5 fill-emerald-500/20" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground">24/40 Lessons</span>
                  <span className="text-[10px] text-foreground-500">Next up: Tailwind CSS</span>
                </div>
              </motion.div>

              {/* Floating Item 3: Stat Badge */}
              <motion.div
                animate={floatAnimation(7, 0.6)}
                className="absolute top-1/2 -right-8 md:-right-12 -translate-y-1/2 bg-background/90 backdrop-blur-md border border-default-100 rounded-xl p-3 shadow-xl flex flex-col items-center gap-1 hover:scale-105 transition-transform duration-300"
              >
                <span className="text-lg font-extrabold text-secondary tracking-tight">32h</span>
                <span className="text-[10px] font-medium text-foreground-500 uppercase tracking-wider">Learned this week</span>
              </motion.div>

              {/* Floating Item 4: Course Stats */}
              <motion.div
                animate={floatAnimation(6.5, 1.8)}
                className="absolute -bottom-10 left-6 bg-background/90 backdrop-blur-md border border-default-100 rounded-xl px-4 py-2.5 shadow-xl flex items-center gap-2 hover:scale-105 transition-transform duration-300"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <LuCheck className="h-3 w-3 stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-foreground">Verified Certificates</span>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}