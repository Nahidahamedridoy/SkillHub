"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  LuLayoutDashboard,
  LuBookOpen,
  LuAward,
  LuTrendingUp,
  LuUsers,
  LuShieldCheck,
  LuArrowRight,
  LuLogOut,
} from "react-icons/lu";

// ─── Role Badge ───────────────────────────────────────────────────────────────

const roleBadgeConfig = {
  student: {
    label: "Student",
    className:
      "bg-blue-500/10 text-blue-500 border border-blue-500/20",
  },
  instructor: {
    label: "Instructor",
    className:
      "bg-violet-500/10 text-violet-500 border border-violet-500/20",
  },
  admin: {
    label: "Admin",
    className:
      "bg-rose-500/10 text-rose-500 border border-rose-500/20",
  },
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta?: string;
  iconBg: string;
}

function StatCard({ icon, label, value, delta, iconBg }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-default-100 bg-background p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div
        className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-foreground-400 font-semibold uppercase tracking-wider">
          {label}
        </p>
        <p className="text-2xl font-extrabold text-foreground mt-0.5">
          {value}
        </p>
        {delta && (
          <p className="text-xs text-emerald-500 font-semibold mt-0.5">
            {delta}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Quick Link Card ──────────────────────────────────────────────────────────

interface QuickLinkProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

function QuickLinkCard({
  href,
  icon,
  title,
  description,
  gradient,
}: QuickLinkProps) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-default-100 bg-background p-5 flex flex-col gap-3 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-200"
    >
      <div
        className={`h-10 w-10 rounded-xl flex items-center justify-center ${gradient}`}
      >
        {icon}
      </div>
      <div>
        <p className="font-bold text-foreground group-hover:text-primary transition-colors">
          {title}
        </p>
        <p className="text-xs text-foreground-400 mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>
      <LuArrowRight
        size={16}
        className="text-foreground-300 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200"
      />
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const roleConfig = roleBadgeConfig[user?.role ?? "student"];

  return (
    <div className="min-h-screen bg-default-50/30">
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-40 border-b border-default-100 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
              </svg>
            </div>
            <span className="font-bold text-foreground text-lg">
              Skill<span className="text-primary">Hub</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${roleConfig.className}`}
            >
              {roleConfig.label}
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-xs font-semibold text-foreground-500 hover:text-foreground hover:bg-default-100 px-3 py-2 rounded-xl transition-all duration-200"
              aria-label="Logout"
            >
              <LuLogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Welcome */}
        <section>
          <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-background to-secondary/10 border border-default-100 p-8 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <p className="text-sm font-semibold text-foreground-400 mb-1">
                Welcome back 👋
              </p>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                {user?.name}
              </h1>
              <p className="text-foreground-500 mt-2 text-sm max-w-lg">
                Here&apos;s an overview of your learning progress and activity.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<LuBookOpen size={22} className="text-blue-500" />}
              iconBg="bg-blue-500/10"
              label="Enrolled Courses"
              value="12"
              delta="↑ 2 this month"
            />
            <StatCard
              icon={<LuAward size={22} className="text-amber-500" />}
              iconBg="bg-amber-500/10"
              label="Certificates"
              value="4"
              delta="↑ 1 new"
            />
            <StatCard
              icon={<LuTrendingUp size={22} className="text-emerald-500" />}
              iconBg="bg-emerald-500/10"
              label="Hours Learned"
              value="87h"
              delta="↑ 5h this week"
            />
            <StatCard
              icon={<LuLayoutDashboard size={22} className="text-violet-500" />}
              iconBg="bg-violet-500/10"
              label="Completion Rate"
              value="68%"
            />
          </div>
        </section>

        {/* Role-specific quick links */}
        {user?.role !== "student" && (
          <section>
            <h2 className="text-lg font-bold text-foreground mb-4">
              Quick Access
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {user?.role === "instructor" || user?.role === "admin" ? (
                <QuickLinkCard
                  href="/dashboard/instructor"
                  icon={<LuUsers size={20} className="text-violet-500" />}
                  title="Instructor Panel"
                  description="Manage your courses, students, and analytics."
                  gradient="bg-violet-500/10"
                />
              ) : null}
              {user?.role === "admin" ? (
                <QuickLinkCard
                  href="/dashboard/admin"
                  icon={<LuShieldCheck size={20} className="text-rose-500" />}
                  title="Admin Panel"
                  description="Platform settings, user management, and reports."
                  gradient="bg-rose-500/10"
                />
              ) : null}
            </div>
          </section>
        )}

        {/* Back to site */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-foreground-400 hover:text-foreground font-medium transition-colors"
          >
            ← Back to SkillHub
          </Link>
        </div>
      </main>
    </div>
  );
}
