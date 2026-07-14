"use client";

import { ReactNode } from "react";

interface StatsCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  delta?: string;
  iconBg: string;
}

export default function StatsCard({ icon, label, value, delta, iconBg }: StatsCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-default-100 bg-background p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground-400">{label}</p>
        <p className="mt-0.5 text-2xl font-extrabold text-foreground">{value}</p>
        {delta ? <p className="mt-0.5 text-xs font-semibold text-emerald-500">{delta}</p> : null}
      </div>
    </div>
  );
}
