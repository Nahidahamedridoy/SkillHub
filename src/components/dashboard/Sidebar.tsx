"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuBookOpen, LuLayoutDashboard, LuShieldCheck, LuUsers } from "react-icons/lu";

const items = [
  { href: "/dashboard", label: "Overview", icon: <LuLayoutDashboard size={18} /> },
  { href: "/dashboard/admin", label: "Admin Hub", icon: <LuShieldCheck size={18} /> },
  { href: "/dashboard/instructor", label: "Instructor", icon: <LuBookOpen size={18} /> },
  { href: "/dashboard/student", label: "Student", icon: <LuUsers size={18} /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="rounded-3xl border border-default-100 bg-background/90 p-4 shadow-sm">
      <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground-400">
        Navigation
      </p>
      <div className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));

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
