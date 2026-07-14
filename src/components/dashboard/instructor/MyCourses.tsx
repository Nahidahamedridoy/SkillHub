"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, Typography as Text, ProgressBar, Badge } from "@heroui/react";
type CourseItem = {
  title: string;
  category: string;
  students: number;
  rating: number;
  earnings: string;
  status: string;
};

type MyCoursesProps = {
  courses: CourseItem[];
};

export default function MyCourses({ courses }: MyCoursesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
    >
      <Card className="overflow-hidden rounded-[28px] bg-white shadow-sm">
        <CardHeader className="p-6">
          <Text className="text-xl font-semibold text-slate-950">My Courses</Text>
          <Text className="mt-2 text-sm text-slate-600">Track your course performance and student reach at a glance.</Text>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          {courses.map((course) => {
            const completion = Math.round((course.rating / 5) * 100);
            return (
              <div key={course.title} className="rounded-[24px] border border-default-200 bg-slate-50 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <Text className="text-base font-semibold text-slate-950">{course.title}</Text>
                    <Text className="mt-1 text-sm text-slate-600">{course.category}</Text>
                  </div>
                  <Badge className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                    {course.status}
                  </Badge>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div>
                    <Text className="text-xs uppercase tracking-[0.2em] text-slate-500">Students</Text>
                    <Text className="mt-2 text-base font-semibold text-slate-950">{course.students.toLocaleString()}</Text>
                  </div>
                  <div>
                    <Text className="text-xs uppercase tracking-[0.2em] text-slate-500">Earnings</Text>
                    <Text className="mt-2 text-base font-semibold text-slate-950">{course.earnings}</Text>
                  </div>
                  <div>
                    <Text className="text-xs uppercase tracking-[0.2em] text-slate-500">Rating</Text>
                    <Text className="mt-2 text-base font-semibold text-slate-950">{course.rating.toFixed(1)}</Text>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Student satisfaction</span>
                    <span>{completion}%</span>
                  </div>
                  <ProgressBar value={completion} className="mt-2 h-2 rounded-full bg-slate-200" />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}
