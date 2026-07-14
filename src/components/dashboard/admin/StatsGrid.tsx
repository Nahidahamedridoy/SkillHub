"use client";

import { motion } from "framer-motion";
import StatsCard from "@/components/dashboard/StatsCard";
import { adminStats } from "@/data/dashboard/admin";

export default function StatsGrid() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {adminStats.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: index * 0.05 }}
        >
          <StatsCard
            icon={item.icon}
            label={item.label}
            value={item.value}
            delta={item.delta}
            iconBg={item.iconBg}
          />
        </motion.div>
      ))}
    </section>
  );
}
