"use client";

import { useEffect, useState } from "react";
import RoleGuard from "@/components/auth/RoleGuard";
import MyCourses from "@/components/dashboard/instructor/MyCourses";
import { CourseService } from "@/services/CourseService";
import { Course } from "@/types/course";
import { Spinner } from "@heroui/react";

export default function InstructorCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    const data = await CourseService.getCoursesByInstructor();
    setCourses(data);
    setLoading(false);
  };

  const handleDeleteCourse = async (id: string) => {
    const success = await CourseService.deleteCourse(id);
    if (success) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  return (
    <RoleGuard allowedRoles={["instructor", "admin"]}>
      {loading ? (
        <div className="flex h-[400px] items-center justify-center">
          <Spinner size="lg" color="primary" />
        </div>
      ) : (
        <MyCourses courses={courses} onDeleteCourse={handleDeleteCourse} />
      )}
    </RoleGuard>
  );
}
