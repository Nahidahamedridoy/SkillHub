"use client";

import { useState } from "react";
import CoursesHero from "@/modules/courses/CoursesHero";
import CourseFilters, { DEFAULT_FILTERS, FilterState } from "@/modules/courses/CourseFilters";
import CoursesGrid from "@/modules/courses/CoursesGrid";
import CoursesPagination from "@/modules/courses/CoursesPagination";

export default function CoursesPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  return (
    <>
      <CoursesHero />
      <CourseFilters filters={filters} onChange={setFilters} />
      <CoursesGrid />
      <CoursesPagination
        currentPage={1}
        totalPages={5}
        onPageChange={() => {}}
      />
    </>
  );
}