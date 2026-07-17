"use client";

import { useEffect, useState, use } from "react";
import RoleGuard from "@/components/auth/RoleGuard";
import CourseForm from "@/components/dashboard/instructor/CourseForm";
import { CourseService } from "@/services/CourseService";
import { Course } from "@/types/course";
import { Spinner } from "@heroui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function InstructorEditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchCourse();
  }, [resolvedParams.id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const data = await CourseService.getCourseById(resolvedParams.id);
      if (data) {
        setCourse(data);
      } else {
        toast.error("Course not found");
        router.push("/dashboard/instructor/courses");
      }
    } catch (error) {
      toast.error("Error loading course");
      router.push("/dashboard/instructor/courses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoleGuard allowedRoles={["instructor", "admin"]}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        {loading ? (
          <div className="flex h-[400px] items-center justify-center">
            <Spinner size="lg" color="success" />
          </div>
        ) : course ? (
          <CourseForm initialData={course} isEdit />
        ) : null}
      </motion.div>
    </RoleGuard>
  );
}
