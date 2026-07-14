"use client";

import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import { LuClock3, LuCheck, LuX } from "react-icons/lu";
import { pendingApprovals } from "@/data/dashboard/admin";

export default function PendingApprovals() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card className="border border-default-100 bg-background/90 shadow-sm">
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-semibold text-foreground">Pending Approvals</p>
            <p className="text-xs text-foreground-400">Courses waiting for review</p>
          </div>
          <div className="rounded-xl bg-amber-500/10 p-2 text-amber-500">
            <LuClock3 size={18} />
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="space-y-3">
            {pendingApprovals.map((item) => (
              <div key={item.title} className="flex items-center justify-between rounded-2xl border border-default-100 bg-default-50/50 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-foreground-400">{item.instructor} • {item.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-500 transition-colors hover:bg-emerald-500/20" aria-label="Approve">
                    <LuCheck size={14} />
                  </button>
                  <button className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-2 text-rose-500 transition-colors hover:bg-rose-500/20" aria-label="Reject">
                    <LuX size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
