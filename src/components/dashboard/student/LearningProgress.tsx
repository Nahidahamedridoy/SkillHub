"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, Typography as Text, ProgressBar } from "@heroui/react";
export type ProgressItem = {
  skill: string;
  completed: number;
  total: number;
};

type LearningProgressProps = {
  items: ProgressItem[];
};

export default function LearningProgress({ items }: LearningProgressProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.25 }}
    >
      <Card className="overflow-hidden rounded-[28px] bg-white shadow-sm">
        <CardHeader className="p-6">
          <Text className="text-xl font-semibold text-slate-950">Learning progress</Text>
          <Text className="mt-2 text-sm text-slate-600">Track your skills and keep your learning goals on target.</Text>
        </CardHeader>
        <CardContent className="space-y-5 p-6">
          {items.map((item) => {
            const percent = Math.round((item.completed / item.total) * 100);
            return (
              <div key={item.skill} className="space-y-3 rounded-[24px] border border-default-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <Text className="font-semibold text-slate-950">{item.skill}</Text>
                  <Text className="text-sm text-slate-700">{percent}%</Text>
                </div>
                <ProgressBar value={percent} className="h-2 rounded-full bg-slate-200" />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}
