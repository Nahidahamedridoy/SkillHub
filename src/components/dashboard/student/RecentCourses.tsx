"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, Typography as Text, Badge } from "@heroui/react";
export type RecentCourse = {
  title: string;
  instructor: string;
  category: string;
  progress: number;
  updatedAt: string;
};

type RecentCoursesProps = {
  courses: RecentCourse[];
};

export default function RecentCourses({ courses }: RecentCoursesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
    >
      <Card className="overflow-hidden rounded-[28px] bg-white shadow-sm">
        <CardHeader className="p-6">
          <div className="flex items-center justify-between gap-4">
            <Text className="text-xl font-semibold text-slate-950">Recent courses</Text>
            <Badge className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">Top picks</Badge>
          </div>
          <Text className="mt-2 text-sm text-slate-600">Your most recent classes and latest progress snapshot.</Text>
        </CardHeader>
        <CardContent className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-1">
          {courses.map((course) => (
            <div key={course.title} className="rounded-[24px] border border-default-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <Text className="text-base font-semibold text-slate-950">{course.title}</Text>
                  <Text className="mt-1 text-sm text-slate-600">{course.category}</Text>
                </div>
                <Text className="text-sm font-semibold text-slate-700">{course.progress}%</Text>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                <span>{course.instructor}</span>
                <span>{course.updatedAt}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
