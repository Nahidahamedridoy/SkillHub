import { Course } from "@/types/course";
import { api } from "./api";

export interface CoursePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CoursesResponse {
  data: Course[];
  pagination: CoursePagination;
}

export const CourseService = {
  // Get courses with pagination
  async getCourses(
    page: number = 1,
    limit: number = 8,
    search?: string,
    category?: string,
    level?: string
  ): Promise<CoursesResponse> {
    try {
      const params = new URLSearchParams();

      params.append("page", page.toString());
      params.append("limit", limit.toString());

      if (search) params.append("search", search);
      if (category && category !== "all")
        params.append("category", category);
      if (level && level !== "all")
        params.append("level", level);

      const response = await api.get(`/courses?${params.toString()}`);

      return {
        data: response.data.data,
        pagination: response.data.pagination,
      };
    } catch (error) {
      console.error("Failed to fetch courses", error);

      return {
        data: [],
        pagination: {
          page: 1,
          limit,
          total: 0,
          totalPages: 1,
        },
      };
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

  async getCoursesByInstructor(): Promise<Course[]> {
    try {
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

  async updateCourse(
    id: string,
    courseData: Partial<Course>
  ): Promise<Course> {
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