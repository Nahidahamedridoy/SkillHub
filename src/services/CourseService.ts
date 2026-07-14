import { Course } from "@/types/course";
import { COURSES_DATA } from "@/data/courses";

const STORAGE_KEY = "skillhub_courses";

const INITIAL_INSTRUCTOR_COURSES: Course[] = [
  {
    id: "inst_crs_001",
    title: "Advanced TypeScript Patterns",
    instructor: "Instructor User",
    category: "Development",
    rating: 4.9,
    reviewsCount: 120,
    price: "$99.99",
    originalPrice: "$199.99",
    imageUrl: "https://images.unsplash.com/photo-1516116211223-5c359a36298a?auto=format&fit=crop&w=800&h=500&q=80",
    lessonsCount: 25,
    duration: "14h 30m",
    description: "Deep dive into advanced TypeScript type system features, patterns, and compiler secrets.",
    studentsCount: 1240,
    level: "Advanced",
    language: "English",
  },
  {
    id: "inst_crs_002",
    title: "Next.js App Router Mastery",
    instructor: "Instructor User",
    category: "Development",
    rating: 4.8,
    reviewsCount: 85,
    price: "$79.99",
    originalPrice: "$149.99",
    imageUrl: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&h=500&q=80",
    lessonsCount: 18,
    duration: "10h 15m",
    description: "Build robust, SEO-friendly, and lightning-fast applications using Next.js App Router.",
    studentsCount: 870,
    level: "Intermediate",
    language: "English",
  },
  {
    id: "inst_crs_003",
    title: "React Performance Deep Dive",
    instructor: "Instructor User",
    category: "Development",
    rating: 4.7,
    reviewsCount: 42,
    price: "$59.99",
    originalPrice: "$119.99",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&h=500&q=80",
    lessonsCount: 12,
    duration: "8h 00m",
    description: "Master React profiling, state optimization, concurrent features, and the React Compiler.",
    studentsCount: 530,
    level: "Advanced",
    language: "English",
  }
];

function getStoredCourses(): Course[] {
  if (typeof window === "undefined") return COURSES_DATA;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Combine standard courses + seeded instructor courses
    const allCourses = [...INITIAL_INSTRUCTOR_COURSES, ...COURSES_DATA];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allCourses));
    return allCourses;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return COURSES_DATA;
  }
}

function setStoredCourses(courses: Course[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
  }
}

export const CourseService = {
  async getCourses(): Promise<Course[]> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return getStoredCourses();
  },

  async getCourseById(id: string): Promise<Course | null> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const courses = getStoredCourses();
    return courses.find((c) => c.id === id) || null;
  },

  async getCoursesByInstructor(instructorName: string): Promise<Course[]> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const courses = getStoredCourses();
    return courses.filter((c) => c.instructor.toLowerCase() === instructorName.toLowerCase());
  },

  async createCourse(courseData: Omit<Course, "id" | "rating" | "reviewsCount" | "studentsCount">): Promise<Course> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const courses = getStoredCourses();
    const newCourse: Course = {
      ...courseData,
      id: `crs_${Date.now()}`,
      rating: 0,
      reviewsCount: 0,
      studentsCount: 0,
      lessonsCount: Number(courseData.lessonsCount) || 0,
      duration: courseData.duration || "0h",
    };
    courses.unshift(newCourse);
    setStoredCourses(courses);
    return newCourse;
  },

  async updateCourse(id: string, courseData: Partial<Course>): Promise<Course> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const courses = getStoredCourses();
    const index = courses.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error("Course not found");
    }
    const updatedCourse = {
      ...courses[index],
      ...courseData,
      lessonsCount: Number(courseData.lessonsCount) ?? courses[index].lessonsCount,
    };
    courses[index] = updatedCourse;
    setStoredCourses(courses);
    return updatedCourse;
  },

  async deleteCourse(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const courses = getStoredCourses();
    const filtered = courses.filter((c) => c.id !== id);
    if (filtered.length === courses.length) {
      return false;
    }
    setStoredCourses(filtered);
    return true;
  },
};
