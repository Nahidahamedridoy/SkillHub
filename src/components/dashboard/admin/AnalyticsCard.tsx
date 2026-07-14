"use client";

import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import { LuChartBar } from "react-icons/lu";
import { analyticsHighlights } from "@/data/dashboard/admin";

export default function AnalyticsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card className="border border-default-100 bg-background/90 shadow-sm">
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-semibold text-foreground">Analytics Placeholder</p>
            <p className="text-xs text-foreground-400">Performance snapshot for the platform</p>
          </div>
          <div className="rounded-xl bg-violet-500/10 p-2 text-violet-500">
            <LuChartBar size={18} />
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {analyticsHighlights.map((item) => (
              <div key={item.label} className="rounded-2xl border border-default-100 bg-default-50/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-400">{item.label}</p>
                <p className="mt-2 text-xl font-extrabold text-foreground">{item.value}</p>
                <p className="mt-1 text-xs text-foreground-400">{item.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
