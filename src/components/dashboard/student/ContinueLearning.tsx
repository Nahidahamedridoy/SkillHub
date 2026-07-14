"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, Typography as Text, ProgressBar } from "@heroui/react";
type ContinueLearningItem = {
  course: string;
  instructor: string;
  progress: number;
  lessonsLeft: number;
  duration: string;
};

type ContinueLearningProps = {
  items: ContinueLearningItem[];
};

export default function ContinueLearning({ items }: ContinueLearningProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
    >
      <Card className="overflow-hidden rounded-[28px] border border-default-200 bg-white shadow-sm">
        <CardHeader className="p-6">
          <Text className="text-xl font-semibold text-slate-950">Continue learning</Text>
          <Text className="mt-2 text-sm text-slate-600">Resume the courses you’ve started and keep the momentum.</Text>
        </CardHeader>
        <CardContent className="space-y-5 p-6">
          {items.map((item) => (
            <div key={item.course} className="space-y-3 rounded-3xl border border-default-200 bg-slate-50 p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Text className="text-base font-semibold text-slate-950">{item.course}</Text>
                  <Text className="text-sm text-slate-600">Instructor: {item.instructor}</Text>
                </div>
                <Text className="text-sm font-semibold text-slate-700">{item.duration}</Text>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>{item.lessonsLeft} lessons left</span>
                  <span>{item.progress}% complete</span>
                </div>
                <ProgressBar value={item.progress} className="h-2 rounded-full bg-slate-200" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
