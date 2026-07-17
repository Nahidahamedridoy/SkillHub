"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import CourseForm from "@/components/dashboard/instructor/CourseForm";
import { motion } from "framer-motion";

export default function InstructorCreateCoursePage() {
  return (
    <RoleGuard allowedRoles={["instructor", "admin"]}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        <CourseForm />
      </motion.div>
    </RoleGuard>
  );
}
