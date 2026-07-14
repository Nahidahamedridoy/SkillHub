import { Course } from "@/types/course";
import { COURSES_DATA } from "@/data/courses";

// ─── Storage Keys ─────────────────────────────────────────────────────────────

const COURSES_STORAGE_KEY = "skillhub_courses";
const ADMIN_META_KEY = "skillhub_admin_meta";

// ─── Admin metadata stored separately so we don't mutate CourseService data ──

interface AdminMeta {
  [courseId: string]: {
    status: "pending" | "approved" | "rejected";
  };
}

function getAdminMeta(): AdminMeta {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(ADMIN_META_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setAdminMeta(meta: AdminMeta): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(ADMIN_META_KEY, JSON.stringify(meta));
  }
}

// ─── Raw course storage (shared with CourseService) ───────────────────────────

function getStoredCourses(): Course[] {
  if (typeof window === "undefined") return COURSES_DATA;
  try {
    const stored = localStorage.getItem(COURSES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : COURSES_DATA;
  } catch {
    return COURSES_DATA;
  }
}

function setStoredCourses(courses: Course[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses));
  }
}

// ─── Merge meta into courses ──────────────────────────────────────────────────

function mergeMeta(courses: Course[]): Course[] {
  const meta = getAdminMeta();
  return courses.map((c) => ({
    ...c,
    status: meta[c.id]?.status ?? (c.status ?? "approved"),
  }));
}

// ─── AdminService ─────────────────────────────────────────────────────────────

export const AdminService = {
  /**
   * Get all courses with admin metadata (status) merged.
   */
  async getAllCourses(): Promise<Course[]> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const courses = getStoredCourses();
    return mergeMeta(courses);
  },

  /**
   * Approve a course — set its status to 'approved'.
   */
  async approveCourse(id: string): Promise<Course> {
    await new Promise((resolve) => setTimeout(resolve, 700));
    const courses = getStoredCourses();
    const course = courses.find((c) => c.id === id);
    if (!course) throw new Error("Course not found");

    const meta = getAdminMeta();
    meta[id] = { status: "approved" };
    setAdminMeta(meta);

    return { ...course, status: "approved" };
  },

  /**
   * Reject a course — set its status to 'rejected'.
   */
  async rejectCourse(id: string): Promise<Course> {
    await new Promise((resolve) => setTimeout(resolve, 700));
    const courses = getStoredCourses();
    const course = courses.find((c) => c.id === id);
    if (!course) throw new Error("Course not found");

    const meta = getAdminMeta();
    meta[id] = { status: "rejected" };
    setAdminMeta(meta);

    return { ...course, status: "rejected" };
  },

  /**
   * Hard-delete a course from storage (removes from CourseService store too).
   */
  async deleteCourse(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 900));
    const courses = getStoredCourses();
    const filtered = courses.filter((c) => c.id !== id);
    if (filtered.length === courses.length) return false;

    setStoredCourses(filtered);

    // Also clean up admin meta for this course
    const meta = getAdminMeta();
    delete meta[id];
    setAdminMeta(meta);

    return true;
  },

  /**
   * Get aggregate platform statistics.
   */
  async getStats(): Promise<{
    totalCourses: number;
    approvedCourses: number;
    pendingCourses: number;
    rejectedCourses: number;
    totalStudents: number;
  }> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const courses = mergeMeta(getStoredCourses());
    const approved = courses.filter((c) => (c.status ?? "approved") === "approved");
    const pending = courses.filter((c) => c.status === "pending");
    const rejected = courses.filter((c) => c.status === "rejected");
    const totalStudents = courses.reduce((acc, c) => acc + (c.studentsCount ?? 0), 0);
    return {
      totalCourses: courses.length,
      approvedCourses: approved.length,
      pendingCourses: pending.length,
      rejectedCourses: rejected.length,
      totalStudents,
    };
  },
};
