"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, Chip, Typography as Text } from "@heroui/react";
import { LuSparkles, LuChevronRight } from "react-icons/lu";

type WelcomeCardProps = {
  name: string;
  message: string;
  badge: string;
  points: number;
  streak: number;
};

export default function WelcomeCard({
  name,
  message,
  badge,
  points,
  streak,
}: WelcomeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <Card className="overflow-hidden rounded-[28px] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 text-white shadow-xl">
        <CardHeader className="flex flex-col gap-6 p-8 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Hello, {name}</h1>
              <Text className="mt-2 max-w-xl text-sm text-slate-300">
                {message}
              </Text>
            </div>
            <Chip className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
              {badge}
            </Chip>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Skill points
              </p>
              <p className="mt-4 text-3xl font-semibold">{points}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Learning streak
              </p>
              <p className="mt-4 text-3xl font-semibold">{streak} days</p>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-[24px] bg-white/10 p-4">
            <div>
              <p className="text-sm text-slate-300">Next milestone</p>
              <p className="mt-1 text-base font-medium">Complete 2 more lessons</p>
            </div>
            <LuSparkles className="h-7 w-7 text-amber-300" />
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
}
