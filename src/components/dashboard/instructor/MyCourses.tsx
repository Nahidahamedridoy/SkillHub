"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, ProgressBar, Badge, Button } from "@heroui/react";
import { Course } from "@/types/course";
import { LuPencil, LuTrash2, LuPlus } from "react-icons/lu";
import Link from "next/link";
import { toast } from "react-hot-toast";

type MyCoursesProps = {
  courses: Course[];
  onDeleteCourse: (id: string) => void;
};

export default function MyCourses({ courses, onDeleteCourse }: MyCoursesProps) {
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      onDeleteCourse(id);
      toast.success("Course deleted successfully");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
    >
      <Card className="overflow-hidden rounded-[28px] bg-white shadow-sm">
        <CardHeader className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">My Courses</h2>
            <p className="mt-2 text-sm text-slate-600">Track your course performance and student reach at a glance.</p>
          </div>
          <Link href="/dashboard/instructor/create-course">
            <Button color="primary" startContent={<LuPlus />} className="mt-4 sm:mt-0 font-medium">
              Create Course
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          {courses.length === 0 ? (
            <div className="text-center text-slate-500 py-10">
              You haven't created any courses yet.
            </div>
          ) : (
            courses.map((course) => {
              const completion = Math.round((course.rating / 5) * 100) || 0;
              return (
                <div key={course.id} className="rounded-[24px] border border-default-200 bg-slate-50 p-5 group">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-slate-950">{course.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{course.category}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 capitalize">
                        {course.status}
                      </Badge>
                      <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <Link href={`/dashboard/instructor/courses/${course.id}/edit`}>
                          <Button isIconOnly size="sm" variant="flat" color="primary" aria-label="Edit course">
                            <LuPencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          color="danger"
                          aria-label="Delete course"
                          onPress={() => handleDelete(course.id)}
                        >
                          <LuTrash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Students</p>
                      <p className="mt-2 text-base font-semibold text-slate-950">{(course.studentsCount || 0).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Price</p>
                      <p className="mt-2 text-base font-semibold text-slate-950">{course.price}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Rating</p>
                      <p className="mt-2 text-base font-semibold text-slate-950">{course.rating.toFixed(1)}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Student satisfaction</span>
                      <span>{completion}%</span>
                    </div>
                    <ProgressBar value={completion} className="mt-2 h-2 rounded-full bg-slate-200" />
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
