import { api } from "./api";
import { Enrollment } from "@/types/enrollment";

export const EnrollmentService = {
  /**
   * Enroll the current user in a course.
   * Throws with the server error message on failure.
   */
  async enroll(courseId: string): Promise<Enrollment> {
    const response = await api.post("/enrollments", { courseId });
    return response.data.data;
  },

  /**
   * Fetch all enrollments for the currently logged-in user.
   */
  async getMyEnrollments(): Promise<Enrollment[]> {
    const response = await api.get("/enrollments/my");
    return response.data.data;
  },

  /**
   * Check whether the current user is already enrolled in a course.
   * Returns false on any error (safe default).
   */
  async isEnrolled(courseId: string): Promise<boolean> {
    try {
      const enrollments = await EnrollmentService.getMyEnrollments();
      return enrollments.some((e) => e.course?.id === courseId);
    } catch {
      return false;
    }
  },

  /**
   * Remove an enrollment by its ID.
   */
  async unenroll(enrollmentId: string): Promise<void> {
    await api.delete(`/enrollments/${enrollmentId}`);
  },
};
