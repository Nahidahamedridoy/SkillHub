"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionHeading,
  AccordionTrigger,
  AccordionPanel,
  AccordionIndicator,
  AccordionBody,
  Button,
} from "@heroui/react";
import { motion, Variants } from "framer-motion";
import { LuPlay, LuLock, LuBookOpen, LuChevronDown } from "react-icons/lu";
import { Course } from "@/types/course";

// ─── Component Props ────────────────────────────────────────────────────────────

export interface CourseCurriculumProps {
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
      staggerChildren: 0.1,
    },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────────

export default function CourseCurriculum({ course }: CourseCurriculumProps) {
  const modules = course.curriculum ?? [];
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const totalLessons = modules.reduce((acc, curr) => acc + curr.lessons.length, 0);

  const handleExpandAll = () => setExpandedKeys(modules.map((m) => m.id));
  const handleCollapseAll = () => setExpandedKeys([]);

  if (modules.length === 0) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full py-8 text-foreground space-y-6"
    >
      {/* Header */}
      <motion.div
        variants={childVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-default-100 pb-4"
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Course Curriculum
          </h2>
          <p className="text-sm font-semibold text-foreground-500">
            {modules.length} modules • {totalLessons} lectures • {course.duration} total
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <Button
            size="sm"
            variant="outline"
            className="text-xs font-bold border-default-200 hover:border-primary px-3 rounded-lg"
            onPress={handleExpandAll}
          >
            Expand All
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs font-bold border-default-200 hover:border-primary px-3 rounded-lg"
            onPress={handleCollapseAll}
          >
            Collapse All
          </Button>
        </div>
      </motion.div>

      {/* Accordion */}
      <motion.div variants={childVariants} className="w-full">
        <Accordion
          className="w-full flex flex-col gap-3"
          expandedKeys={expandedKeys}
          onExpandedChange={(keys) => setExpandedKeys(Array.from(keys) as string[])}
        >
          {modules.map((item) => (
            <AccordionItem
              key={item.id}
              id={item.id}
              className="border border-default-100/60 bg-background/50 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm hover:border-default-250 transition-colors"
            >
              <AccordionHeading>
                <AccordionTrigger className="w-full flex items-center justify-between p-4 text-left font-bold text-foreground focus:outline-none transition-all outline-none">
                  <div className="flex flex-col gap-1 pr-4">
                    <span className="text-base font-extrabold tracking-tight">
                      {item.title}
                    </span>
                    <span className="text-xs text-foreground-500 font-bold flex items-center gap-1.5">
                      <LuBookOpen className="w-3.5 h-3.5 text-primary" />
                      {item.lessons.length} lectures • {item.duration}
                    </span>
                  </div>
                  <AccordionIndicator className="w-5 h-5 text-default-400 shrink-0 transition-transform duration-300">
                    <LuChevronDown className="w-5 h-5" />
                  </AccordionIndicator>
                </AccordionTrigger>
              </AccordionHeading>
              <AccordionPanel>
                <AccordionBody className="px-4 pb-4 pt-1 divide-y divide-default-100/40">
                  {item.lessons.map((lesson, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-3.5 text-sm font-semibold text-foreground-700 dark:text-foreground-200 group/item first:pt-1 last:pb-1"
                    >
                      <div className="flex items-center gap-3 pr-4">
                        <span className="flex items-center justify-center bg-default-100 text-default-500 group-hover/item:bg-primary/10 group-hover/item:text-primary rounded-lg w-7 h-7 shrink-0 transition-colors">
                          <LuPlay className="w-3.5 h-3.5" />
                        </span>
                        <span className="leading-snug transition-colors group-hover/item:text-foreground">
                          {lesson.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        {lesson.isPreviewable ? (
                          <span className="text-xs font-extrabold text-primary hover:underline cursor-pointer">
                            Preview
                          </span>
                        ) : (
                          <LuLock className="w-3.5 h-3.5 text-default-400" />
                        )}
                        <span className="text-xs font-bold text-foreground-400 min-w-[40px] text-right">
                          {lesson.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </AccordionBody>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </motion.div>
  );
}