"use client";

import React from "react";
import { Card, CardContent, CardFooter, Skeleton } from "@heroui/react";

// ─── Constants ──────────────────────────────────────────────────────────────────

/** Must match CoursesGrid: grid-cols-1 sm:2 lg:3 xl:4 */
const SKELETON_COUNT = 8;

// ─── Sub-component: Single card skeleton ────────────────────────────────────────

function CourseCardSkeleton() {
  return (
    <Card className="h-full border border-default-100 bg-background flex flex-col justify-between overflow-hidden">
      {/* ── Thumbnail (aspect-[16/10], mirrors CourseCard image container) ── */}
      <CardContent className="p-0">
        <Skeleton className="w-full aspect-[16/10] rounded-none" />

        {/* ── Body ── */}
        <div className="p-4 space-y-3">
          {/* Category + Rating row */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-3.5 w-20 rounded-md" />
            <Skeleton className="h-3.5 w-14 rounded-md" />
          </div>

          {/* Title — two lines, fixed height to match line-clamp-2 h-[44px] */}
          <div className="space-y-1.5 h-[44px]">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-4/5 rounded-md" />
          </div>

          {/* Instructor */}
          <Skeleton className="h-3.5 w-36 rounded-md" />

          {/* Stats row (border-t pt-3 mt-1) */}
          <div className="flex items-center gap-4 border-t border-default-50 pt-3 mt-1">
            <Skeleton className="h-3.5 w-20 rounded-md" />
            <Skeleton className="h-3.5 w-16 rounded-md" />
          </div>
        </div>
      </CardContent>

      {/* ── Footer ── */}
      <CardFooter className="p-4 border-t border-default-50/80 flex items-center justify-between bg-default-50/50">
        {/* Price block */}
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-12 rounded-md" />
          <Skeleton className="h-5 w-16 rounded-md" />
        </div>

        {/* CTA button */}
        <Skeleton className="h-8 w-24 rounded-lg" />
      </CardFooter>
    </Card>
  );
}

// ─── Main export ────────────────────────────────────────────────────────────────

/**
 * LoadingSkeleton
 *
 * Renders 8 shimmer placeholders in the same responsive grid used by
 * CoursesGrid (1 → 2 → 3 → 4 columns). Each placeholder mirrors the
 * exact anatomy of CourseCard so layout shift on load is zero.
 */
export default function LoadingSkeleton() {
  return (
    <section
      className="w-full py-6"
      aria-busy="true"
      aria-label="Loading courses"
    >
      {/* ── Heading row skeleton ── */}
      <div className="flex items-center gap-3 mb-6">
        <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
        <div className="flex items-baseline gap-2">
          <Skeleton className="h-5 w-28 rounded-md" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>
        <div className="flex-1 h-px bg-default-100" />
      </div>

      {/* ── Card grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}