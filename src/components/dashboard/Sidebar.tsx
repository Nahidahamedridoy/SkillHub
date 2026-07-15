"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LuChartBar,
  LuBookOpen,
  LuHeart,
  LuLayoutDashboard,
  LuLayers,
  LuPlus,
  LuSettings,
  LuShieldCheck,
  LuUser,
  LuUsers,
} from "react-icons/lu";

const roleNavItems = {
  student: [
    { href: "/dashboard/student", label: "Dashboard", icon: <LuLayoutDashboard size={18} /> },
    { href: "/dashboard/student/my-courses", label: "My Courses", icon: <LuBookOpen size={18} /> },
    { href: "/dashboard/student/wishlist", label: "Wishlist", icon: <LuHeart size={18} /> },
    { href: "/dashboard/student/profile", label: "Profile", icon: <LuUser size={18} /> },
    { href: "/dashboard/student/settings", label: "Settings", icon: <LuSettings size={18} /> },
  ],
  instructor: [
    { href: "/dashboard/instructor", label: "Dashboard", icon: <LuLayoutDashboard size={18} /> },
    { href: "/dashboard/instructor/courses", label: "Courses", icon: <LuBookOpen size={18} /> },
    { href: "/dashboard/instructor/create-course", label: "Create Course", icon: <LuPlus size={18} /> },
    { href: "/dashboard/instructor/students", label: "Students", icon: <LuUsers size={18} /> },
    { href: "/dashboard/instructor/profile", label: "Profile", icon: <LuUser size={18} /> },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Dashboard", icon: <LuLayoutDashboard size={18} /> },
    { href: "/dashboard/admin/users", label: "Users", icon: <LuUsers size={18} /> },
    { href: "/dashboard/admin/courses", label: "Courses", icon: <LuBookOpen size={18} /> },
    { href: "/dashboard/admin/categories", label: "Categories", icon: <LuLayers size={18} /> },
    { href: "/dashboard/admin/analytics", label: "Analytics", icon: <LuChartBar size={18} /> },
  ],
} as const;

export default function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const currentRole = user?.role ?? "student";
  const items = roleNavItems[currentRole] ?? roleNavItems.student;

  return (
    <div className="rounded-3xl border border-default-100 bg-background/90 p-4 shadow-sm">
      <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground-400">
        Navigation
      </p>
      <div className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-gradient-to-r from-rose-500/10 to-primary/10 text-foreground"
                  : "text-foreground-500 hover:bg-default-100 hover:text-foreground"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
