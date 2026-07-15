"use client";

import Link from "next/link";
import { LuLogOut, LuShieldCheck } from "react-icons/lu";
import { useAuth } from "@/context/AuthContext";

const roleLabels: Record<string, { title: string; badge: string }> = {
  student: { title: "Student Dashboard", badge: "Student" },
  instructor: { title: "Instructor Dashboard", badge: "Instructor" },
  admin: { title: "Admin Panel", badge: "Administrator" },
};

export default function Topbar() {
  const { user, logout } = useAuth();
  const role = user?.role ?? "student";
  const { title, badge } = roleLabels[role] ?? roleLabels.student;

  return (
    <header className="sticky top-0 z-40 border-b border-default-100 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-600 to-primary shadow-lg shadow-rose-500/20">
            <LuShieldCheck size={18} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-medium text-foreground-400">SkillHub</p>
            <p className="text-sm font-bold text-foreground">{title}</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <span className="rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-bold text-rose-500">
            {badge}
          </span>
          <button
            onClick={() => logout()}
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-foreground-500 transition-all duration-200 hover:bg-default-100 hover:text-foreground"
            aria-label="Logout"
          >
            <LuLogOut size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
