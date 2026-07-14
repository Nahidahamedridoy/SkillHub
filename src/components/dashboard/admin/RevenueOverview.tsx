"use client";

import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import { LuTrendingUp } from "react-icons/lu";
import { revenueSeries } from "@/data/dashboard/admin";

export default function RevenueOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
    >
      <Card className="border border-default-100 bg-background/90 shadow-sm">
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-semibold text-foreground">Revenue Overview</p>
            <p className="text-xs text-foreground-400">Placeholder analytics for platform revenue</p>
          </div>
          <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-500">
            <LuTrendingUp size={18} />
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="rounded-2xl border border-dashed border-default-200 bg-gradient-to-br from-emerald-500/5 via-background to-primary/5 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-2xl font-extrabold text-foreground">$84.2K</p>
                <p className="text-xs text-foreground-400">Projected monthly revenue</p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500">
                +12.4%
              </span>
            </div>
            <div className="flex items-end gap-2">
              {revenueSeries.map((point) => (
                <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-t-full bg-gradient-to-t from-primary to-emerald-500" style={{ height: `${point.height}%` }} />
                  <span className="text-[11px] font-medium text-foreground-400">{point.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
