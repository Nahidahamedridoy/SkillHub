"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const dashboardRedirect = {
  student: "/dashboard/student",
  instructor: "/dashboard/instructor",
  admin: "/dashboard/admin",
} as const;

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    const redirectPath = dashboardRedirect[user.role] ?? "/dashboard";
    router.replace(redirectPath);
  }, [user, router]);

  return null;
}
