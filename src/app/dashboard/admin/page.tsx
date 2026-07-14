"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import RoleGuard from "@/components/auth/RoleGuard";
import { useAuth } from "@/context/AuthContext";
import { AdminService } from "@/services/AdminService";
import { Course } from "@/types/course";
import toast from "react-hot-toast";
import {
  LuUsers,
  LuShieldCheck,
  LuActivity,
  LuBookOpen,
  LuArrowLeft,
  LuLogOut,
  LuSearch,
  LuFilter,
  LuCheck,
  LuX,
  LuTrash2,
  LuChevronLeft,
  LuChevronRight,
  LuLoader,
  LuTriangleAlert,
  LuRefreshCw,
  LuLayoutGrid,
  LuClock,
} from "react-icons/lu";

// ─── Types ────────────────────────────────────────────────────────────────────

type CourseStatus = "all" | "approved" | "pending" | "rejected";

interface PlatformStats {
  totalCourses: number;
  approvedCourses: number;
  pendingCourses: number;
  rejectedCourses: number;
  totalStudents: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 8;

// ─── Stat Card Component ──────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  delta?: string;
  iconBg: string;
  loading?: boolean;
}

function StatCard({ icon, label, value, delta, iconBg, loading }: StatCardProps) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-default-100 bg-background p-5 flex items-center gap-4 shadow-sm">
        <div className="h-12 w-12 rounded-xl bg-default-100 animate-pulse shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-24 bg-default-100 rounded animate-pulse" />
          <div className="h-6 w-16 bg-default-100 rounded animate-pulse" />
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-default-100 bg-background p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-foreground-400 font-semibold uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-extrabold text-foreground mt-0.5">{value}</p>
        {delta && <p className="text-xs text-emerald-500 font-semibold mt-0.5">{delta}</p>}
      </div>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status?: string }) {
  const config: Record<string, string> = {
    approved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    rejected: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  };
  const label = status ?? "approved";
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${config[label] ?? config.approved}`}>
      {label === "approved" && <LuCheck size={9} />}
      {label === "pending" && <LuClock size={9} />}
      {label === "rejected" && <LuX size={9} />}
      {label.charAt(0).toUpperCase() + label.slice(1)}
    </span>
  );
}

// ─── Skeleton Row ─────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <tr className="border-b border-default-100">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-16 rounded-lg bg-default-100 animate-pulse shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3 w-40 bg-default-100 rounded animate-pulse" />
            <div className="h-2.5 w-24 bg-default-100 rounded animate-pulse" />
          </div>
        </div>
      </td>
      <td className="px-4 py-3"><div className="h-3 w-20 bg-default-100 rounded animate-pulse" /></td>
      <td className="px-4 py-3"><div className="h-3 w-20 bg-default-100 rounded animate-pulse" /></td>
      <td className="px-4 py-3"><div className="h-6 w-20 bg-default-100 rounded-full animate-pulse" /></td>
      <td className="px-4 py-3"><div className="h-3 w-16 bg-default-100 rounded animate-pulse" /></td>
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-2">
          <div className="h-7 w-7 rounded-lg bg-default-100 animate-pulse" />
          <div className="h-7 w-7 rounded-lg bg-default-100 animate-pulse" />
          <div className="h-7 w-7 rounded-lg bg-default-100 animate-pulse" />
        </div>
      </td>
    </tr>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────

function EmptyState({ query, filter }: { query: string; filter: CourseStatus }) {
  return (
    <tr>
      <td colSpan={6} className="py-20 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-default-100 flex items-center justify-center text-foreground-300">
            <LuBookOpen size={32} />
          </div>
          <div>
            <p className="font-bold text-foreground text-lg">No courses found</p>
            <p className="text-foreground-400 text-sm mt-1">
              {query
                ? `No results match "${query}"`
                : filter !== "all"
                ? `No courses with status "${filter}"`
                : "No courses have been added to the platform yet."}
            </p>
          </div>
        </div>
      </td>
    </tr>
  );
}

// ─── Delete Confirmation Modal ────────────────────────────────────────────────

interface DeleteModalProps {
  course: Course | null;
  isSubmitting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

function DeleteModal({ course, isSubmitting, onCancel, onConfirm }: DeleteModalProps) {
  if (!course) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-background border border-default-100 rounded-3xl w-full max-w-md p-6 md:p-8 shadow-2xl relative animate-slideUp">
        <div className="flex items-start gap-4 mb-4">
          <div className="h-10 w-10 rounded-xl bg-danger/10 text-danger flex items-center justify-center shrink-0">
            <LuTriangleAlert size={20} className="stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Delete Course</h3>
            <p className="text-xs text-foreground-400 mt-1 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold text-foreground">&quot;{course.title}&quot;</span>? This
              cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-default-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-bold text-foreground-500 hover:text-foreground hover:bg-default-100 rounded-xl transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-danger text-white font-bold text-xs px-5 py-2 rounded-xl shadow-md shadow-danger/20 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? <LuLoader className="animate-spin" size={14} /> : "Delete Course"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Dashboard Content ─────────────────────────────────────────────

function AdminDashboardContent() {
  const { user, logout } = useAuth();

  // ── Data state
  const [courses, setCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const [actioningId, setActioningId] = useState<string | null>(null);

  // ── Filter / search / pagination state
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CourseStatus>("all");
  const [page, setPage] = useState(1);

  // ── Delete modal state
  const [deletingCourse, setDeletingCourse] = useState<Course | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ── Fetch all courses
  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await AdminService.getAllCourses();
      setCourses(data);
    } catch {
      toast.error("Failed to load courses.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Fetch platform stats
  const fetchStats = useCallback(async () => {
    setIsStatsLoading(true);
    try {
      const s = await AdminService.getStats();
      setStats(s);
    } catch {
      toast.error("Failed to load stats.");
    } finally {
      setIsStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
    fetchStats();
  }, [fetchCourses, fetchStats]);

  // ── Derived: filtered + paginated
  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesQuery =
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.instructor.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase());
      const effectiveStatus = c.status ?? "approved";
      const matchesStatus = statusFilter === "all" || effectiveStatus === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [courses, query, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [query, statusFilter]);

  // ── Approve
  const handleApprove = useCallback(
    async (id: string) => {
      setActioningId(id);
      try {
        await AdminService.approveCourse(id);
        setCourses((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: "approved" as const } : c))
        );
        toast.success("Course approved successfully.");
        fetchStats();
      } catch {
        toast.error("Failed to approve course.");
      } finally {
        setActioningId(null);
      }
    },
    [fetchStats]
  );

  // ── Reject
  const handleReject = useCallback(
    async (id: string) => {
      setActioningId(id);
      try {
        await AdminService.rejectCourse(id);
        setCourses((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: "rejected" as const } : c))
        );
        toast.success("Course rejected.");
        fetchStats();
      } catch {
        toast.error("Failed to reject course.");
      } finally {
        setActioningId(null);
      }
    },
    [fetchStats]
  );

  // ── Delete
  const handleDeleteConfirm = useCallback(async () => {
    if (!deletingCourse) return;
    setIsDeleting(true);
    try {
      await AdminService.deleteCourse(deletingCourse.id);
      setCourses((prev) => prev.filter((c) => c.id !== deletingCourse.id));
      toast.success(`"${deletingCourse.title}" deleted.`);
      setDeletingCourse(null);
      fetchStats();
    } catch {
      toast.error("Failed to delete course.");
    } finally {
      setIsDeleting(false);
    }
  }, [deletingCourse, fetchStats]);

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-default-50/30">
      {/* ─── Top Bar ─── */}
      <header className="sticky top-0 z-40 border-b border-default-100 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-rose-600 to-primary flex items-center justify-center shadow-lg shadow-rose-500/20">
              <LuShieldCheck size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-foreground-400 font-medium">Admin Console</p>
              <p className="text-sm font-bold text-foreground leading-none">{user?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
              Administrator
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-xs font-semibold text-foreground-500 hover:text-foreground hover:bg-default-100 px-3 py-2 rounded-xl transition-all cursor-pointer"
              aria-label="Logout"
            >
              <LuLogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* ─── Hero Banner ─── */}
        <section className="rounded-3xl bg-gradient-to-br from-rose-500/10 via-background to-primary/10 border border-default-100 p-8 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-rose-500/5 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground-400 mb-1">System Overview</p>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                Platform Control Panel
              </h1>
              <p className="text-foreground-500 mt-2 text-sm">
                Manage all platform courses — approve, reject, and moderate content.
              </p>
            </div>
            <button
              onClick={() => { fetchCourses(); fetchStats(); }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-600 to-primary text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 self-start sm:self-auto cursor-pointer"
            >
              <LuRefreshCw size={16} />
              Refresh Data
            </button>
          </div>
        </section>

        {/* ─── Stats Grid ─── */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">Platform Stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<LuLayoutGrid size={22} className="text-rose-500" />}
              iconBg="bg-rose-500/10"
              label="Total Courses"
              value={stats?.totalCourses ?? "—"}
              loading={isStatsLoading}
            />
            <StatCard
              icon={<LuCheck size={22} className="text-emerald-500" />}
              iconBg="bg-emerald-500/10"
              label="Approved"
              value={stats?.approvedCourses ?? "—"}
              delta={stats ? `${stats.pendingCourses} pending review` : undefined}
              loading={isStatsLoading}
            />
            <StatCard
              icon={<LuClock size={22} className="text-amber-500" />}
              iconBg="bg-amber-500/10"
              label="Pending Review"
              value={stats?.pendingCourses ?? "—"}
              loading={isStatsLoading}
            />
            <StatCard
              icon={<LuUsers size={22} className="text-blue-500" />}
              iconBg="bg-blue-500/10"
              label="Total Students"
              value={stats ? stats.totalStudents.toLocaleString() : "—"}
              loading={isStatsLoading}
            />
          </div>
        </section>

        {/* ─── Courses Management Section ─── */}
        <section>
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <LuBookOpen size={20} className="text-rose-500" />
              All Courses
              {!isLoading && (
                <span className="text-xs font-bold text-foreground-400 bg-default-100 px-2 py-0.5 rounded-full">
                  {filtered.length}
                </span>
              )}
            </h2>

            {/* Activity indicator when actioning */}
            {actioningId && (
              <div className="flex items-center gap-1.5 text-xs text-foreground-400 font-semibold">
                <LuActivity size={13} className="animate-pulse text-rose-400" />
                Saving changes…
              </div>
            )}
          </div>

          {/* Search + Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            {/* Search */}
            <div className="relative flex-1">
              <LuSearch
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 pointer-events-none"
              />
              <input
                type="text"
                id="admin-course-search"
                placeholder="Search by title, instructor, or category…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-default-200 bg-background text-sm text-foreground placeholder:text-foreground-400 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-400 hover:text-foreground transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <LuX size={13} />
                </button>
              )}
            </div>

            {/* Status filter */}
            <div className="flex items-center gap-2">
              <LuFilter size={14} className="text-foreground-400 shrink-0" />
              {(["all", "approved", "pending", "rejected"] as CourseStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`text-xs font-bold px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                    statusFilter === s
                      ? "bg-rose-500 text-white border-rose-500 shadow-sm shadow-rose-500/20"
                      : "border-default-200 text-foreground-500 hover:text-foreground hover:border-default-300"
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-default-100 bg-background overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-default-100 bg-default-50/50">
                    <th className="text-left text-xs font-bold text-foreground-400 uppercase tracking-wider px-4 py-4 min-w-[260px]">
                      Course
                    </th>
                    <th className="text-left text-xs font-bold text-foreground-400 uppercase tracking-wider px-4 py-4">
                      Instructor
                    </th>
                    <th className="text-left text-xs font-bold text-foreground-400 uppercase tracking-wider px-4 py-4">
                      Category
                    </th>
                    <th className="text-left text-xs font-bold text-foreground-400 uppercase tracking-wider px-4 py-4">
                      Status
                    </th>
                    <th className="text-left text-xs font-bold text-foreground-400 uppercase tracking-wider px-4 py-4">
                      Students
                    </th>
                    <th className="text-right text-xs font-bold text-foreground-400 uppercase tracking-wider px-4 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonRow key={i} />)
                  ) : paginated.length === 0 ? (
                    <EmptyState query={query} filter={statusFilter} />
                  ) : (
                    paginated.map((course, i) => {
                      const effectiveStatus = course.status ?? "approved";
                      const isActioning = actioningId === course.id;
                      return (
                        <tr
                          key={course.id}
                          className={`hover:bg-default-50/50 transition-colors ${
                            i < paginated.length - 1 ? "border-b border-default-100" : ""
                          } ${isActioning ? "opacity-60 pointer-events-none" : ""}`}
                        >
                          {/* Course */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-16 bg-default-100 rounded-lg overflow-hidden shrink-0 border border-default-100">
                                <img
                                  src={course.imageUrl}
                                  alt={course.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-foreground text-sm truncate max-w-[180px] sm:max-w-[220px]">
                                  {course.title}
                                </p>
                                <span className="text-[10px] font-bold text-foreground-400 uppercase">
                                  {course.lessonsCount} lessons · {course.duration}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Instructor */}
                          <td className="px-4 py-3 text-foreground-500 text-xs whitespace-nowrap">
                            {course.instructor}
                          </td>

                          {/* Category */}
                          <td className="px-4 py-3">
                            <span className="text-xs font-bold text-foreground-400 bg-default-100 px-2 py-0.5 rounded-full">
                              {course.category}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="px-4 py-3">
                            <StatusBadge status={effectiveStatus} />
                          </td>

                          {/* Students */}
                          <td className="px-4 py-3 text-foreground-500 text-xs">
                            {(course.studentsCount ?? 0).toLocaleString()}
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {isActioning ? (
                                <LuLoader size={16} className="animate-spin text-foreground-400 mr-2" />
                              ) : (
                                <>
                                  {/* Approve */}
                                  <button
                                    onClick={() => handleApprove(course.id)}
                                    disabled={effectiveStatus === "approved"}
                                    title="Approve course"
                                    className="h-8 w-8 rounded-lg flex items-center justify-center text-foreground-500 hover:text-emerald-500 hover:bg-emerald-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                  >
                                    <LuCheck size={15} />
                                  </button>

                                  {/* Reject */}
                                  <button
                                    onClick={() => handleReject(course.id)}
                                    disabled={effectiveStatus === "rejected"}
                                    title="Reject course"
                                    className="h-8 w-8 rounded-lg flex items-center justify-center text-foreground-500 hover:text-amber-500 hover:bg-amber-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                  >
                                    <LuX size={15} />
                                  </button>

                                  {/* Delete */}
                                  <button
                                    onClick={() => setDeletingCourse(course)}
                                    title="Delete course"
                                    className="h-8 w-8 rounded-lg flex items-center justify-center text-foreground-500 hover:text-danger hover:bg-danger/10 transition-colors cursor-pointer"
                                  >
                                    <LuTrash2 size={15} />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* ─── Pagination ─── */}
            {!isLoading && filtered.length > PAGE_SIZE && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-default-100 bg-default-50/30">
                <p className="text-xs text-foreground-400 font-semibold">
                  Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of{" "}
                  {filtered.length} courses
                </p>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="h-8 w-8 rounded-lg flex items-center justify-center text-foreground-500 hover:text-foreground hover:bg-default-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <LuChevronLeft size={16} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`h-8 w-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        p === page
                          ? "bg-rose-500 text-white shadow-sm shadow-rose-500/20"
                          : "text-foreground-500 hover:text-foreground hover:bg-default-100"
                      }`}
                    >
                      {p}
                    </button>
                  ))}

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="h-8 w-8 rounded-lg flex items-center justify-center text-foreground-500 hover:text-foreground hover:bg-default-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <LuChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── Back navigation ─── */}
        <div className="flex items-center gap-4 pt-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-foreground-400 hover:text-foreground font-medium transition-colors"
          >
            <LuArrowLeft size={14} /> Back to Dashboard
          </Link>
        </div>
      </main>

      {/* ─── Delete Confirmation Modal ─── */}
      <DeleteModal
        course={deletingCourse}
        isSubmitting={isDeleting}
        onCancel={() => setDeletingCourse(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

// ─── Guarded Export ───────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <AdminDashboardContent />
    </RoleGuard>
  );
}
