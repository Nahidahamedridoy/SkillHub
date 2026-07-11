"use client";

import React from "react";
import { Button } from "@heroui/react";
import { LuChevronLeft, LuChevronRight, LuEllipsis } from "react-icons/lu";

// ─── Props ─────────────────────────────────────────────────────────────────────

interface CoursesPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Builds the visible page list with optional ellipsis tokens.
 * Always shows first, last, and a window of ±2 around the current page.
 */
function buildPageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "…")[] = [1];

  const windowStart = Math.max(2, current - 1);
  const windowEnd = Math.min(total - 1, current + 1);

  if (windowStart > 2) pages.push("…");

  for (let p = windowStart; p <= windowEnd; p++) {
    pages.push(p);
  }

  if (windowEnd < total - 1) pages.push("…");

  pages.push(total);
  return pages;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function CoursesPagination({
  currentPage,
  totalPages,
  onPageChange,
}: CoursesPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = buildPageList(currentPage, totalPages);
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1.5 py-6 flex-wrap"
    >
      {/* ── Previous ── */}
      <Button
        variant="outline"
        size="sm"
        aria-label="Previous page"
        isDisabled={isFirst}
        onPress={() => onPageChange(currentPage - 1)}
        className={[
          "h-9 w-9 p-0 rounded-lg border font-semibold transition-all duration-200",
          isFirst
            ? "border-default-100 text-foreground-300 cursor-not-allowed"
            : "border-default-200 text-foreground-600 hover:border-primary hover:text-primary",
        ].join(" ")}
      >
        <LuChevronLeft className="w-4 h-4" />
      </Button>

      {/* ── Page Numbers ── */}
      {pages.map((page, idx) =>
        page === "…" ? (
          <span
            key={`ellipsis-${idx}`}
            className="flex items-center justify-center h-9 w-9 text-foreground-400 select-none"
            aria-hidden="true"
          >
            <LuEllipsis className="w-4 h-4" />
          </span>
        ) : (
          <Button
            key={page}
            size="sm"
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
            onPress={() => onPageChange(page as number)}
            variant={currentPage === page ? "primary" : "outline"}
            className={[
              "h-9 w-9 p-0 rounded-lg font-bold text-sm transition-all duration-200",
              currentPage === page
                ? "shadow-sm shadow-primary/25"
                : "border border-default-200 text-foreground-600 hover:border-primary hover:text-primary",
            ].join(" ")}
          >
            {page}
          </Button>
        )
      )}

      {/* ── Next ── */}
      <Button
        variant="outline"
        size="sm"
        aria-label="Next page"
        isDisabled={isLast}
        onPress={() => onPageChange(currentPage + 1)}
        className={[
          "h-9 w-9 p-0 rounded-lg border font-semibold transition-all duration-200",
          isLast
            ? "border-default-100 text-foreground-300 cursor-not-allowed"
            : "border-default-200 text-foreground-600 hover:border-primary hover:text-primary",
        ].join(" ")}
      >
        <LuChevronRight className="w-4 h-4" />
      </Button>
    </nav>
  );
}