"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, Typography as Text, Badge } from "@heroui/react";
import { LuChartBar } from "react-icons/lu";

type RevenueCardProps = {
  total: string;
  monthlyChange: string;
  activeSubscriptions: number;
  projected: string;
};

export default function RevenueCard({
  total,
  monthlyChange,
  activeSubscriptions,
  projected,
}: RevenueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2 }}
    >
      <Card className="overflow-hidden rounded-[28px] bg-white shadow-sm">
        <CardHeader className="p-6 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Text className="text-xl font-semibold text-slate-950">Revenue overview</Text>
              <Text className="mt-1 text-sm text-slate-600">A high-level summary of your instructor earnings.</Text>
            </div>
            <Badge className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">Placeholder</Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 p-6">
          <div className="rounded-[24px] border border-default-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <Text className="text-sm text-slate-500">Total earnings</Text>
                <Text className="mt-2 text-3xl font-semibold text-slate-950">{total}</Text>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <LuChartBar size={22} />
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[24px] border border-default-200 bg-slate-50 p-4">
              <Text className="text-xs uppercase tracking-[0.2em] text-slate-500">Monthly change</Text>
              <Text className="mt-2 font-semibold text-slate-950">{monthlyChange}</Text>
            </div>
            <div className="rounded-[24px] border border-default-200 bg-slate-50 p-4">
              <Text className="text-xs uppercase tracking-[0.2em] text-slate-500">Subscribers</Text>
              <Text className="mt-2 font-semibold text-slate-950">{activeSubscriptions}</Text>
            </div>
            <div className="rounded-[24px] border border-default-200 bg-slate-50 p-4">
              <Text className="text-xs uppercase tracking-[0.2em] text-slate-500">Projected</Text>
              <Text className="mt-2 font-semibold text-slate-950">{projected}</Text>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
