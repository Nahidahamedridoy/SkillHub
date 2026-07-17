"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StatsCard from "@/components/dashboard/StatsCard";
import { adminStats } from "@/data/dashboard/admin";
import { AdminService } from "@/services/AdminService";

export default function StatsGrid() {
  const [stats, setStats] = useState(adminStats);

  useEffect(() => {
    async function fetchStats() {
      const data = await AdminService.getStats();
      setStats([
        { ...adminStats[0], value: data.totalStudents.toString() },
        { ...adminStats[1], value: data.totalCourses.toString() },
        { ...adminStats[2], label: "Pending Courses", value: data.pendingCourses.toString(), delta: "needs review" },
        { ...adminStats[3], label: "Approved Courses", value: data.approvedCourses.toString(), delta: "published" },
      ]);
    }
    fetchStats();
  }, []);

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => (
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
