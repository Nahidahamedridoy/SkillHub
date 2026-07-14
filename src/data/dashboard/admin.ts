import { createElement, type ReactNode } from "react";
import {
  LuBookOpen,
  LuCircleDollarSign,
  LuGraduationCap,
  LuUsers,
} from "react-icons/lu";

export interface AdminStatItem {
  label: string;
  value: string;
  delta: string;
  icon: ReactNode;
  iconBg: string;
}

export interface RecentUserItem {
  name: string;
  email: string;
  role: string;
  joinedAt: string;
}

export interface RecentCourseItem {
  title: string;
  instructor: string;
  category: string;
  status: string;
  students: number;
  updatedAt: string;
}

export interface PendingApprovalItem {
  title: string;
  instructor: string;
  category: string;
}

export interface AnalyticsHighlightItem {
  label: string;
  value: string;
  caption: string;
}

export interface RecentActivityItem {
  title: string;
  description: string;
}

export interface RevenuePoint {
  label: string;
  height: number;
}

export const adminStats: AdminStatItem[] = [
  {
    label: "Total Users",
    value: "12.4K",
    delta: "+8.2% this month",
    icon: createElement(LuUsers, { size: 20, className: "text-primary" }),
    iconBg: "bg-primary/10",
  },
  {
    label: "Total Courses",
    value: "328",
    delta: "+24 new this week",
    icon: createElement(LuBookOpen, { size: 20, className: "text-secondary" }),
    iconBg: "bg-secondary/10",
  },
  {
    label: "Total Instructors",
    value: "86",
    delta: "+5 active recently",
    icon: createElement(LuGraduationCap, { size: 20, className: "text-violet-500" }),
    iconBg: "bg-violet-500/10",
  },
  {
    label: "Total Revenue",
    value: "$84.2K",
    delta: "+12.4% vs last month",
    icon: createElement(LuCircleDollarSign, { size: 20, className: "text-emerald-500" }),
    iconBg: "bg-emerald-500/10",
  },
];

export const recentUsers: RecentUserItem[] = [
  { name: "Ava Patel", email: "ava.patel@example.com", role: "Student", joinedAt: "2h ago" },
  { name: "Marcus Lee", email: "marcus.lee@example.com", role: "Instructor", joinedAt: "4h ago" },
  { name: "Nora Gomez", email: "nora.gomez@example.com", role: "Admin", joinedAt: "Today" },
];

export const recentCourses: RecentCourseItem[] = [
  { title: "Advanced UI Design", instructor: "Dina Brooks", category: "Design", status: "Published", students: 184, updatedAt: "1h ago" },
  { title: "Full-Stack Foundations", instructor: "Jordan Kim", category: "Development", status: "Published", students: 291, updatedAt: "3h ago" },
  { title: "Product Strategy Lab", instructor: "Liam Chen", category: "Business", status: "Review", students: 54, updatedAt: "5h ago" },
];

export const pendingApprovals: PendingApprovalItem[] = [
  { title: "Motion Masterclass", instructor: "Sofia Reed", category: "Animation" },
  { title: "Data Storytelling", instructor: "Noah Carter", category: "Analytics" },
  { title: "AI for Creators", instructor: "Ella Davis", category: "Productivity" },
];

export const analyticsHighlights: AnalyticsHighlightItem[] = [
  { label: "Engagement", value: "87%", caption: "Average completion rate" },
  { label: "Retention", value: "74%", caption: "Returning learners" },
  { label: "Watch Time", value: "142h", caption: "Daily learning minutes" },
  { label: "NPS", value: "+62", caption: "Learner satisfaction" },
];

export const recentActivity: RecentActivityItem[] = [
  { title: "New instructor approved", description: "Marcus Lee was verified and granted instructor access." },
  { title: "Course published", description: "Advanced UI Design is now visible to learners across the platform." },
  { title: "Pending review cleared", description: "Two courses moved from review to published status." },
];

export const revenueSeries: RevenuePoint[] = [
  { label: "Jan", height: 42 },
  { label: "Feb", height: 58 },
  { label: "Mar", height: 64 },
  { label: "Apr", height: 72 },
  { label: "May", height: 88 },
  { label: "Jun", height: 95 },
];
