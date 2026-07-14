"use client";

import { motion } from "framer-motion";
import { LuArrowRight, LuShieldCheck } from "react-icons/lu";

interface WelcomeCardProps {
  name: string;
  subtitle: string;
}

export default function WelcomeCard({ name, subtitle }: WelcomeCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative overflow-hidden rounded-3xl border border-default-100 bg-gradient-to-br from-rose-500/10 via-background to-primary/10 p-6 sm:p-8"
    >
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-rose-500/10 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
            <LuShieldCheck size={14} />
            Administrator Console
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Welcome back, {name}
          </h1>
          <p className="mt-2 text-sm leading-6 text-foreground-500">{subtitle}</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-2xl border border-default-100 bg-background/80 px-4 py-3 text-sm font-semibold text-foreground shadow-sm">
          Review platform health
          <LuArrowRight size={16} className="text-primary" />
        </div>
      </div>
    </motion.section>
  );
}
