"use client";

import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import { LuActivity } from "react-icons/lu";
import { recentActivity } from "@/data/dashboard/admin";

export default function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.25 }}
    >
      <Card className="border border-default-100 bg-background/90 shadow-sm">
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-semibold text-foreground">Recent Activity</p>
            <p className="text-xs text-foreground-400">Latest platform events and updates</p>
          </div>
          <div className="rounded-xl bg-cyan-500/10 p-2 text-cyan-500">
            <LuActivity size={18} />
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="space-y-3">
            {recentActivity.map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-2xl border border-default-100 bg-default-50/50 px-4 py-3">
                <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 text-xs text-foreground-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
