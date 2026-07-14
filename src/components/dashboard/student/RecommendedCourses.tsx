"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, Typography as Text, Badge } from "@heroui/react";
import { LuStar } from "react-icons/lu";

export type RecommendedCourse = {
  title: string;
  instructor: string;
  rating: number;
  students: number;
};

type RecommendedCoursesProps = {
  courses: RecommendedCourse[];
};

export default function RecommendedCourses({ courses }: RecommendedCoursesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2 }}
    >
      <Card className="overflow-hidden rounded-[28px] bg-white shadow-sm">
        <CardHeader className="p-6">
          <div className="flex items-center justify-between gap-4">
            <Text className="text-xl font-semibold text-slate-950">Recommended courses</Text>
            <Badge className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">For you</Badge>
          </div>
          <Text className="mt-2 text-sm text-slate-600">Courses selected to help you grow in your current path.</Text>
        </CardHeader>
        <CardContent className="grid gap-4 p-6 md:grid-cols-2">
          {courses.map((course) => (
            <div key={course.title} className="rounded-[24px] border border-default-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-3">
                <Text className="text-base font-semibold text-slate-950">{course.title}</Text>
                <Badge className="rounded-full bg-white px-3 py-1 text-sm text-slate-700">
                  {course.rating.toFixed(1)} <LuStar className="inline-block align-text-bottom" />
                </Badge>
              </div>
              <Text className="mt-3 text-sm text-slate-600">{course.instructor}</Text>
              <Text className="mt-4 text-sm text-slate-500">{course.students.toLocaleString()} students enrolled</Text>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
