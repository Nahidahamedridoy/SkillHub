"use client";

import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import { LuBookOpen } from "react-icons/lu";
import { recentCourses } from "@/data/dashboard/admin";

export default function CoursesOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05 }}
    >
      <Card className="border border-default-100 bg-background/90 shadow-sm">
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-semibold text-foreground">Recent Courses</p>
            <p className="text-xs text-foreground-400">Freshly published learning content</p>
          </div>
          <div className="rounded-xl bg-secondary/10 p-2 text-secondary">
            <LuBookOpen size={18} />
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="space-y-4">
            {recentCourses.map((course) => (
              <div key={course.title} className="rounded-2xl border border-default-100 bg-default-50/50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{course.title}</p>
                    <p className="mt-1 text-xs text-foreground-400">{course.instructor} • {course.category}</p>
                  </div>
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-500">
                    {course.status}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-foreground-400">
                  <span>{course.students} students</span>
                  <span>{course.updatedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
