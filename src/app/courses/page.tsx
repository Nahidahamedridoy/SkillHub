"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import CoursesHero from "@/modules/courses/CoursesHero";
import CourseFilters, {
  DEFAULT_FILTERS,
  FilterState,
} from "@/modules/courses/CourseFilters";
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
  const [totalPages, setTotalPages] = useState(1);

  const loadCourses = useCallback(async () => {
    setIsLoading(true);

    const result = await CourseService.getCourses(
      currentPage,
      PAGE_SIZE,
      filters.searchQuery,
      filters.category,
      filters.level
    );

    setCourses(result.data);
    setTotalPages(result.pagination.totalPages);

    setIsLoading(false);
  }, [currentPage, filters]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const filteredCourses = useMemo(() => {
    return [...courses].sort((a, b) => {
      if (filters.sortBy === "rating") {
        return b.rating - a.rating;
      }

      if (filters.sortBy === "popular") {
        return b.reviewsCount - a.reviewsCount;
      }

      return 0;
    });
  }, [courses, filters.sortBy]);

  const handleFiltersChange = useCallback((nextFilters: FilterState) => {
    setFilters(nextFilters);
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return (
    <div className="w-full bg-background">
      <CoursesHero />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CourseFilters
          filters={filters}
          onChange={handleFiltersChange}
          onSearch={handleSearch}
        />

        {isLoading ? (
          <LoadingSkeleton />
        ) : filteredCourses.length === 0 ? (
          <EmptyState
            onReset={() => {
              setFilters(DEFAULT_FILTERS);
              setCurrentPage(1);
            }}
          />
        ) : (
          <>
            <CoursesGrid courses={filteredCourses} />

            <CoursesPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}