import { Course } from "@/types/course";
import { api } from "./api";

// ─── AdminService ─────────────────────────────────────────────────────────────

export const AdminService = {
  /**
   * Get all courses.
   */
  async getAllCourses(): Promise<Course[]> {
    try {
      const response = await api.get("/admin/courses?limit=1000");
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch admin courses", error);
      return [];
    }
  },

  /**
   * Approve a course — set its status to 'approved'.
   */
  async approveCourse(id: string): Promise<Course> {
    const response = await api.patch(`/admin/courses/${id}/approve`);
    return response.data.data;
  },

  /**
   * Reject a course — set its status to 'rejected'.
   */
  async rejectCourse(id: string, feedback?: string): Promise<Course> {
    const response = await api.patch(`/admin/courses/${id}/reject`, { feedback });
    return response.data.data;
  },

  /**
   * Hard-delete a course from storage.
   */
  async deleteCourse(id: string): Promise<boolean> {
    try {
      await api.delete(`/admin/courses/${id}`);
      return true;
    } catch (error) {
      console.error("Failed to delete course", error);
      return false;
    }
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
    try {
      const response = await api.get("/admin/stats");
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch admin stats", error);
      return {
        totalCourses: 0,
        approvedCourses: 0,
        pendingCourses: 0,
        rejectedCourses: 0,
        totalStudents: 0,
      };
    }
  },
};
