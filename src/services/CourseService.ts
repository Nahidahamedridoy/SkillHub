import { Course } from "@/types/course";
import { api } from "./api";

export const CourseService = {
  async getCourses(): Promise<Course[]> {
    try {
      const response = await api.get("/courses");
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch courses", error);
      return [];
    }
  },

  async getCourseById(id: string): Promise<Course | null> {
    try {
      const response = await api.get(`/courses/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Failed to fetch course ${id}`, error);
      return null;
    }
  },

  async getCoursesByInstructor(instructorName?: string): Promise<Course[]> {
    try {
      // If we need specifically logged in instructor courses:
      const response = await api.get("/courses/my");
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch instructor courses", error);
      return [];
    }
  },

  async createCourse(courseData: Partial<Course>): Promise<Course> {
    const response = await api.post("/courses", courseData);
    return response.data.data;
  },

  async updateCourse(id: string, courseData: Partial<Course>): Promise<Course> {
    const response = await api.patch(`/courses/${id}`, courseData);
    return response.data.data;
  },

  async deleteCourse(id: string): Promise<boolean> {
    try {
      await api.delete(`/courses/${id}`);
      return true;
    } catch (error) {
      console.error("Failed to delete course", error);
      return false;
    }
  },
};
