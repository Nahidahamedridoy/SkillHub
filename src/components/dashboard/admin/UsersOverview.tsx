"use client";

import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import { LuUsers } from "react-icons/lu";
import { recentUsers } from "@/data/dashboard/admin";

export default function UsersOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border border-default-100 bg-background/90 shadow-sm">
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-semibold text-foreground">Recent Users</p>
            <p className="text-xs text-foreground-400">Latest registrations and account activity</p>
          </div>
          <div className="rounded-xl bg-primary/10 p-2 text-primary">
            <LuUsers size={18} />
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.email} className="flex items-center justify-between rounded-2xl border border-default-100 bg-default-50/50 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{user.name}</p>
                  <p className="text-xs text-foreground-400">{user.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-foreground">{user.role}</p>
                  <p className="text-[11px] text-foreground-400">{user.joinedAt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
