"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import RoleGuard from "@/components/auth/RoleGuard";
import { useAuth } from "@/context/AuthContext";
import { CourseService } from "@/services/CourseService";
import { Course } from "@/types/course";
import toast from "react-hot-toast";
import {
  LuUsers,
  LuBookOpen,
  LuTrendingUp,
  LuStar,
  LuArrowLeft,
  LuLogOut,
  LuPlus,
  LuTrash2,
  LuPencil,
  LuX,
  LuLoader,
  LuTriangleAlert,
} from "react-icons/lu";

// ─── Stat Card Component ──────────────────────────────────────────────────────

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

// ─── Skeleton Loading Component ───────────────────────────────────────────────

function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-10">
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-default-100 rounded-2xl border border-default-100" />
        ))}
      </div>

      {/* Main Table Skeleton */}
      <div className="space-y-4">
        <div className="h-6 w-32 bg-default-100 rounded" />
        <div className="rounded-2xl border border-default-100 bg-background overflow-hidden">
          <div className="h-12 bg-default-50 border-b border-default-100" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-background border-b border-default-100 last:border-b-0" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Empty State Component ────────────────────────────────────────────────────

interface EmptyStateProps {
  onAddClick: () => void;
}

function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-4 border border-dashed border-default-200 rounded-3xl bg-default-50/10 flex flex-col items-center justify-center">
      <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
        <LuBookOpen size={32} />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-1">No Courses Yet</h3>
      <p className="text-sm text-foreground-400 max-w-sm mb-6 leading-relaxed">
        You haven&apos;t created any courses yet. Start sharing your knowledge with students worldwide today.
      </p>
      <button
        onClick={onAddClick}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-primary text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
      >
        <LuPlus size={16} />
        Create Your First Course
      </button>
    </div>
  );
}

// ─── Inner page content ───────────────────────────────────────────────────────

function InstructorDashboardContent() {
  const { user, logout } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Selected items state
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deletingCourse, setDeletingCourse] = useState<Course | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Development");
  const [formPrice, setFormPrice] = useState("");
  const [formDuration, setFormDuration] = useState("");
  const [formLessonsCount, setFormLessonsCount] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formLevel, setFormLevel] = useState("Beginner");

  // Load instructor's courses
  const loadCourses = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const data = await CourseService.getCoursesByInstructor(user.name);
      setCourses(data);
    } catch {
      toast.error("Failed to load courses. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  // Open modal for Adding Course
  const handleOpenAddModal = () => {
    setEditingCourse(null);
    setFormTitle("");
    setFormCategory("Development");
    setFormPrice("$49.99");
    setFormDuration("10h 30m");
    setFormLessonsCount("15");
    setFormDescription("");
    setFormImageUrl("");
    setFormLevel("Beginner");
    setIsFormModalOpen(true);
  };

  // Open modal for Editing Course
  const handleOpenEditModal = (course: Course) => {
    setEditingCourse(course);
    setFormTitle(course.title);
    setFormCategory(course.category);
    setFormPrice(course.price);
    setFormDuration(course.duration);
    setFormLessonsCount(String(course.lessonsCount));
    setFormDescription(course.description || "");
    setFormImageUrl(course.imageUrl);
    setFormLevel(course.level || "Beginner");
    setIsFormModalOpen(true);
  };

  // Handle Form Submission (Add/Edit)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!formTitle.trim()) {
      toast.error("Course title is required.");
      return;
    }

    setIsSubmitting(true);
    const finalImageUrl =
      formImageUrl.trim() ||
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&h=500&q=80";
    
    // Normalize price formatting
    let formattedPrice = formPrice.trim();
    if (formattedPrice && !formattedPrice.startsWith("$")) {
      formattedPrice = `$${formattedPrice}`;
    }
    if (!formattedPrice) {
      formattedPrice = "Free";
    }

    try {
      if (editingCourse) {
        // Edit flow
        const updated = await CourseService.updateCourse(editingCourse.id, {
          title: formTitle,
          category: formCategory,
          price: formattedPrice,
          duration: formDuration,
          lessonsCount: Number(formLessonsCount) || 0,
          description: formDescription,
          imageUrl: finalImageUrl,
          level: formLevel,
        });
        setCourses(courses.map((c) => (c.id === updated.id ? updated : c)));
        toast.success("Course updated successfully!");
      } else {
        // Add flow
        const created = await CourseService.createCourse({
          title: formTitle,
          instructor: user.name,
          category: formCategory,
          price: formattedPrice,
          duration: formDuration,
          lessonsCount: Number(formLessonsCount) || 0,
          description: formDescription,
          imageUrl: finalImageUrl,
          level: formLevel,
        });
        setCourses([created, ...courses]);
        toast.success("New course created successfully!");
      }
      setIsFormModalOpen(false);
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open modal for Deleting Course
  const handleOpenDeleteModal = (course: Course) => {
    setDeletingCourse(course);
    setIsDeleteModalOpen(true);
  };

  // Handle Delete Confirmation
  const handleDeleteConfirm = async () => {
    if (!deletingCourse) return;
    setIsSubmitting(true);
    try {
      const success = await CourseService.deleteCourse(deletingCourse.id);
      if (success) {
        setCourses(courses.filter((c) => c.id !== deletingCourse.id));
        toast.success("Course deleted successfully.");
      } else {
        toast.error("Failed to delete the course.");
      }
      setIsDeleteModalOpen(false);
    } catch {
      toast.error("An error occurred during deletion.");
    } finally {
      setIsSubmitting(false);
      setDeletingCourse(null);
    }
  };

  // ─── Dynamic Metrics calculations ───
  const activeCourses = courses.length;
  const totalStudents = courses.reduce((acc, c) => acc + (c.studentsCount || 0), 0);
  const avgRating =
    courses.length > 0
      ? (courses.reduce((acc, c) => acc + (c.rating || 0), 0) / courses.length).toFixed(1)
      : "0.0";
  
  const totalRevenueNum = courses.reduce((acc, c) => {
    const priceVal = parseFloat(c.price.replace(/[^0-9.]/g, "")) || 0;
    const students = c.studentsCount || 0;
    return acc + priceVal * students;
  }, 0);

  const formattedRevenue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(totalRevenueNum);

  return (
    <div className="min-h-screen bg-default-50/30">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-default-100 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-600 to-primary flex items-center justify-center shadow-lg shadow-violet-500/20">
              <LuUsers size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-foreground-400 font-medium leading-none mb-0.5">
                Instructor Panel
              </p>
              <p className="text-sm font-bold text-foreground leading-none">
                {user?.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-violet-500/10 text-violet-500 border border-violet-500/20">
              Instructor
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
        {/* Hero Section */}
        <section className="rounded-3xl bg-gradient-to-br from-violet-500/10 via-background to-primary/10 border border-default-100 p-8 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground-400 mb-1">
                Instructor Dashboard
              </p>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                Your Courses
              </h1>
              <p className="text-foreground-500 mt-2 text-sm">
                Manage, track, and grow your courses and student base.
              </p>
            </div>
            {!isLoading && (
              <button
                onClick={handleOpenAddModal}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-primary text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 self-start sm:self-auto cursor-pointer"
              >
                <LuPlus size={16} />
                New Course
              </button>
            )}
          </div>
        </section>

        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <>
            {/* Stats Overview */}
            <section>
              <h2 className="text-lg font-bold text-foreground mb-4">Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  icon={<LuBookOpen size={22} className="text-violet-500" />}
                  iconBg="bg-violet-500/10"
                  label="Active Courses"
                  value={String(activeCourses)}
                  delta={activeCourses > 0 ? `↑ ${activeCourses} published` : "None"}
                />
                <StatCard
                  icon={<LuUsers size={22} className="text-blue-500" />}
                  iconBg="bg-blue-500/10"
                  label="Total Students"
                  value={totalStudents.toLocaleString()}
                  delta={totalStudents > 0 ? "↑ Active learnings" : "No students"}
                />
                <StatCard
                  icon={<LuStar size={22} className="text-amber-500" />}
                  iconBg="bg-amber-500/10"
                  label="Avg. Rating"
                  value={avgRating}
                  delta={Number(avgRating) >= 4.5 ? "Top 5%" : "Rating stats"}
                />
                <StatCard
                  icon={<LuTrendingUp size={22} className="text-emerald-500" />}
                  iconBg="bg-emerald-500/10"
                  label="Total Revenue"
                  value={formattedRevenue}
                  delta={totalRevenueNum > 0 ? "↑ Product sales" : "$0.00"}
                />
              </div>
            </section>

            {/* Courses list */}
            <section>
              <h2 className="text-lg font-bold text-foreground mb-4">
                My Courses
              </h2>
              {courses.length === 0 ? (
                <EmptyState onAddClick={handleOpenAddModal} />
              ) : (
                <div className="rounded-2xl border border-default-100 bg-background overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-default-100 bg-default-50/50">
                          <th className="text-left text-xs font-bold text-foreground-400 uppercase tracking-wider px-6 py-4">
                            Course details
                          </th>
                          <th className="text-left text-xs font-bold text-foreground-400 uppercase tracking-wider px-6 py-4">
                            Category
                          </th>
                          <th className="text-left text-xs font-bold text-foreground-400 uppercase tracking-wider px-6 py-4">
                            Students
                          </th>
                          <th className="text-left text-xs font-bold text-foreground-400 uppercase tracking-wider px-6 py-4">
                            Rating
                          </th>
                          <th className="text-left text-xs font-bold text-foreground-400 uppercase tracking-wider px-6 py-4">
                            Price
                          </th>
                          <th className="text-right text-xs font-bold text-foreground-400 uppercase tracking-wider px-6 py-4">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.map((course, i) => (
                          <tr
                            key={course.id}
                            className={`hover:bg-default-50/50 transition-colors ${
                              i < courses.length - 1
                                ? "border-b border-default-100"
                                : ""
                            }`}
                          >
                            <td className="px-6 py-4 font-semibold text-foreground flex items-center gap-3">
                              {/* Thumbnail preview */}
                              <div className="h-10 w-16 bg-default-100 rounded-lg overflow-hidden shrink-0 border border-default-100">
                                <img
                                  src={course.imageUrl}
                                  alt={course.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                                <p className="font-semibold text-foreground truncate">
                                  {course.title}
                                </p>
                                <span className="text-[10px] font-bold text-foreground-400 uppercase">
                                  {course.lessonsCount} lessons • {course.duration}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-foreground-500">
                              {course.category}
                            </td>
                            <td className="px-6 py-4 text-foreground-500">
                              {(course.studentsCount || 0).toLocaleString()}
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1 font-semibold text-amber-500">
                                <LuStar size={13} className="fill-amber-500" />
                                {course.rating.toFixed(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-semibold text-emerald-500">
                              {course.price}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleOpenEditModal(course)}
                                  className="h-8 w-8 rounded-lg flex items-center justify-center text-foreground-500 hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                                  title="Edit course"
                                >
                                  <LuPencil size={15} />
                                </button>
                                <button
                                  onClick={() => handleOpenDeleteModal(course)}
                                  className="h-8 w-8 rounded-lg flex items-center justify-center text-foreground-500 hover:text-danger hover:bg-danger/10 transition-colors cursor-pointer"
                                  title="Delete course"
                                >
                                  <LuTrash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>
          </>
        )}

        {/* Navigation */}
        <div className="flex items-center gap-4 pt-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-foreground-400 hover:text-foreground font-medium transition-colors"
          >
            <LuArrowLeft size={14} /> Back to Dashboard
          </Link>
        </div>
      </main>

      {/* ─── ADD / EDIT DIALOG MODAL ───────────────────────────────────────────── */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-background border border-default-100 rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden animate-slideUp">
            {/* Header */}
            <div className="p-6 border-b border-default-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">
                {editingCourse ? "Edit Course" : "Create New Course"}
              </h2>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="h-8 w-8 rounded-lg flex items-center justify-center text-foreground-400 hover:text-foreground hover:bg-default-100 transition-colors cursor-pointer"
              >
                <LuX size={18} />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4">
              {/* Title */}
              <div>
                <label className="text-xs font-semibold text-foreground-700 tracking-wide block mb-1.5">
                  Course Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master React 19 & Next.js 16"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-default-200 bg-default-50/50 hover:bg-default-50/80 focus:bg-background text-sm text-foreground placeholder:text-foreground-400 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="text-xs font-semibold text-foreground-700 tracking-wide block mb-1.5">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-default-200 bg-default-50/50 hover:bg-default-50/80 focus:bg-background text-sm text-foreground outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                  >
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                {/* Level */}
                <div>
                  <label className="text-xs font-semibold text-foreground-700 tracking-wide block mb-1.5">
                    Difficulty Level
                  </label>
                  <select
                    value={formLevel}
                    onChange={(e) => setFormLevel(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-default-200 bg-default-50/50 hover:bg-default-50/80 focus:bg-background text-sm text-foreground outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Price */}
                <div>
                  <label className="text-xs font-semibold text-foreground-700 tracking-wide block mb-1.5">
                    Price
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. $49.99"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-default-200 bg-default-50/50 hover:bg-default-50/80 focus:bg-background text-sm text-foreground placeholder:text-foreground-400 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Lessons Count */}
                <div>
                  <label className="text-xs font-semibold text-foreground-700 tracking-wide block mb-1.5">
                    Lessons
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 15"
                    value={formLessonsCount}
                    onChange={(e) => setFormLessonsCount(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-default-200 bg-default-50/50 hover:bg-default-50/80 focus:bg-background text-sm text-foreground placeholder:text-foreground-400 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="text-xs font-semibold text-foreground-700 tracking-wide block mb-1.5">
                    Duration
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10h 30m"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-default-200 bg-default-50/50 hover:bg-default-50/80 focus:bg-background text-sm text-foreground placeholder:text-foreground-400 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="text-xs font-semibold text-foreground-700 tracking-wide block mb-1.5">
                  Banner Image URL (Unsplash/Link)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-default-200 bg-default-50/50 hover:bg-default-50/80 focus:bg-background text-sm text-foreground placeholder:text-foreground-400 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-foreground-700 tracking-wide block mb-1.5">
                  Course Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide a brief summary of the course outcomes and topics covered."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-default-200 bg-default-50/50 hover:bg-default-50/80 focus:bg-background text-sm text-foreground placeholder:text-foreground-400 outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-default-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-foreground-500 hover:text-foreground hover:bg-default-100 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-primary text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <LuLoader className="animate-spin" size={14} />
                  ) : editingCourse ? (
                    "Save Changes"
                  ) : (
                    "Create Course"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── DELETE CONFIRMATION DIALOG MODAL ──────────────────────────────────── */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-background border border-default-100 rounded-3xl w-full max-w-md p-6 md:p-8 shadow-2xl relative animate-slideUp">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-10 w-10 rounded-xl bg-danger/10 text-danger flex items-center justify-center shrink-0">
                <LuTriangleAlert size={20} className="stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Delete Course</h3>
                <p className="text-xs text-foreground-400 mt-1 leading-relaxed">
                  Are you sure you want to delete <span className="font-semibold text-foreground">&quot;{deletingCourse?.title}&quot;</span>? This action is permanent and cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-default-100">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-foreground-500 hover:text-foreground hover:bg-default-100 rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-danger text-white font-bold text-xs px-5 py-2 rounded-xl shadow-md shadow-danger/20 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <LuLoader className="animate-spin" size={14} />
                ) : (
                  "Delete Course"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Guarded Page Export ──────────────────────────────────────────────────────

export default function InstructorDashboardPage() {
  return (
    <RoleGuard allowedRoles={["instructor", "admin"]}>
      <InstructorDashboardContent />
    </RoleGuard>
  );
}
