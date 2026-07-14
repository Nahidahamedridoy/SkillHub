"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, Typography as Text, Badge } from "@heroui/react";
export type ActivityItem = {
  title: string;
  type: string;
  timestamp: string;
  details: string;
};

type RecentActivityProps = {
  activities: ActivityItem[];
};

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.3 }}
    >
      <Card className="overflow-hidden rounded-[28px] bg-white shadow-sm">
        <CardHeader className="p-6">
          <div className="flex items-center justify-between gap-4">
            <Text className="text-xl font-semibold text-slate-950">Recent activity</Text>
            <Badge className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">Latest</Badge>
          </div>
          <Text className="mt-2 text-sm text-slate-600">A quick view of your recent milestones and study activity.</Text>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          {activities.map((activity) => (
            <div key={activity.title} className="rounded-[24px] border border-default-200 bg-slate-50 p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Text className="text-base font-semibold text-slate-950">{activity.title}</Text>
                  <Text className="text-sm text-slate-600">{activity.type}</Text>
                </div>
                <Text className="text-sm font-medium text-slate-700">{activity.timestamp}</Text>
              </div>
              <Text className="mt-3 text-sm leading-6 text-slate-600">{activity.details}</Text>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
