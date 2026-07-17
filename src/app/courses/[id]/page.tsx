import { notFound } from "next/navigation";

import { CourseService } from "@/services/CourseService";
import CourseBanner from "@/modules/course-details/CourseBanner";
import CourseOverview from "@/modules/course-details/CourseOverview";
import WhatYouWillLearn from "@/modules/course-details/WhatYouWillLearn";
import CourseCurriculum from "@/modules/course-details/CourseCurriculum";
import InstructorCard from "@/modules/course-details/InstructorCard";
import CourseReviews from "@/modules/course-details/CourseReviews";
import RelatedCourses from "@/modules/course-details/RelatedCourses";
import Breadcrumb from "@/components/common/Breadcrumb";
import BackButton from "@/components/common/BackButton";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CourseDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;
  const course = await CourseService.getCourseById(id);
  const courses = await CourseService.getCourses();

  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Courses", href: "/courses" }, { label: course.title }]} />
        <BackButton href="/courses" label="Back to Courses" />
      </div>

      <CourseBanner course={course} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        <CourseOverview course={course} />
        <WhatYouWillLearn course={course} />
        <CourseCurriculum course={course} />
        <InstructorCard course={course} />
        <CourseReviews course={course} />
        <RelatedCourses currentCourse={course} courses={courses} />
      </div>
    </main>
  );
}