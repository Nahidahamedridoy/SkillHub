import { notFound } from "next/navigation";

import { COURSES_DATA } from "@/data/courses";

import CourseBanner from "@/modules/course-details/CourseBanner";
import CourseOverview from "@/modules/course-details/CourseOverview";
import WhatYouWillLearn from "@/modules/course-details/WhatYouWillLearn";
import CourseCurriculum from "@/modules/course-details/CourseCurriculum";
import InstructorCard from "@/modules/course-details/InstructorCard";
import CourseReviews from "@/modules/course-details/CourseReviews";
import RelatedCourses from "@/modules/course-details/RelatedCourses";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CourseDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const course = COURSES_DATA.find((item) => item.id === id);

  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <CourseBanner course={course} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CourseOverview course={course} />
        <WhatYouWillLearn course={course} />
        <CourseCurriculum course={course} />
        <InstructorCard course={course} />
        <CourseReviews course={course} />
        <RelatedCourses currentCourse={course} />
      </div>
    </main>
  );
}