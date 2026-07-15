"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import CoursesHero from "@/modules/courses/CoursesHero";
import CourseFilters, { DEFAULT_FILTERS, FilterState } from "@/modules/courses/CourseFilters";
import CoursesGrid from "@/modules/courses/CoursesGrid";
import CoursesPagination from "@/modules/courses/CoursesPagination";
import LoadingSkeleton from "@/modules/courses/LoadingSkeleton";
import EmptyState from "@/modules/courses/EmptyState";
import { CourseService } from "@/services/CourseService";
import { Course } from "@/types/course";

const PAGE_SIZE = 8;

export default function CoursesPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let isMounted = true;

    CourseService.getCourses().then((result) => {
      if (!isMounted) return;
      setCourses(result);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCourses = useMemo(() => {
    const query = filters.searchQuery.trim().toLowerCase();

    return courses
      .filter((course) => {
        const matchesSearch =
          query === "" ||
          course.title.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query);

        const matchesCategory =
          filters.category === "all" ||
          course.category.toLowerCase() === filters.category.toLowerCase();

        const matchesLevel =
          filters.level === "all" ||
          (course.level ?? "").toLowerCase() === filters.level.toLowerCase();

        const matchesPrice =
          filters.price === "all" ||
          (filters.price === "free" && course.price.toLowerCase().includes("free")) ||
          (filters.price === "paid" && !course.price.toLowerCase().includes("free"));

        return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
      })
      .sort((a, b) => {
        if (filters.sortBy === "rating") {
          return b.rating - a.rating;
        }
        if (filters.sortBy === "popular") {
          return b.reviewsCount - a.reviewsCount;
        }
        return 0;
      });
  }, [courses, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / PAGE_SIZE));
  const currentPageSafe = Math.min(currentPage, totalPages);

  const pagedCourses = useMemo(() => {
    const startIndex = (currentPageSafe - 1) * PAGE_SIZE;
    return filteredCourses.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredCourses, currentPageSafe]);

  const handleFiltersChange = useCallback(
    (nextFilters: FilterState) => {
      setFilters(nextFilters);
      setCurrentPage(1);
      setIsLoading(true);
    },
    []
  );

  const handleSearch = useCallback(() => {
    setIsLoading(true);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    const timer = window.setTimeout(() => setIsLoading(false), 200);
    return () => window.clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className="w-full bg-background">
      <CoursesHero />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CourseFilters filters={filters} onChange={handleFiltersChange} onSearch={handleSearch} />

        {isLoading ? (
          <LoadingSkeleton />
        ) : filteredCourses.length === 0 ? (
          <EmptyState onReset={() => handleFiltersChange(DEFAULT_FILTERS)} />
        ) : (
          <>
            <CoursesGrid courses={pagedCourses} />
            <CoursesPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        )}
      </div>
    </div>
  );
}
