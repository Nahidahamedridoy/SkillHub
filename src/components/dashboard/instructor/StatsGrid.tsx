"use client";

import { motion } from "framer-motion";
import { Card, CardContent, Typography as Text, Badge } from "@heroui/react";
type StatItem = {
  title: string;
  value: string;
  subtitle: string;
  highlight: string;
};

type StatsGridProps = {
  stats: StatItem[];
};

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05 }}
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((item) => (
        <Card
          key={item.title}
          className="overflow-hidden rounded-[24px] border border-default-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between gap-3">
              <Text className="text-sm font-semibold text-slate-500">{item.title}</Text>
              <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                {item.highlight}
              </Badge>
            </div>
            <div className="mt-5">
              <Text className="text-3xl font-semibold text-slate-950">{item.value}</Text>
              <Text className="mt-2 text-sm text-slate-600">{item.subtitle}</Text>
            </div>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
}
