"use client";

import React from "react";
import { Card, CardContent, CardFooter, Button, Chip } from "@heroui/react";
import { LuStar, LuBookOpen, LuClock } from "react-icons/lu";
import { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="h-full border border-default-100 hover:border-default-200/80 bg-background flex flex-col justify-between hover:shadow-xl transition-all duration-350 overflow-hidden group">
      <CardContent className="p-0 overflow-hidden relative">
        {/* Badge */}
        {course.badge && (
          <Chip
            size="sm"
            className={`absolute top-3 left-3 z-10 font-bold border-none ${
              course.badge === "Bestseller"
                ? "bg-amber-500 text-white"
                : course.badge === "Hot"
                ? "bg-rose-500 text-white"
                : course.badge === "New"
                ? "bg-blue-500 text-white"
                : "bg-purple-500 text-white"
            }`}
          >
            {course.badge}
          </Chip>
        )}
        
        {/* Course Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden w-full bg-default-100">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Course Details */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-primary tracking-wide uppercase">
              {course.category}
            </span>
            <div className="flex items-center gap-1">
              <LuStar className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-foreground">{course.rating}</span>
              <span className="text-[10px] text-foreground-400 font-medium">
                ({course.reviewsCount})
              </span>
            </div>
          </div>

          <h3 className="font-bold text-foreground text-sm sm:text-base leading-snug line-clamp-2 h-[44px] group-hover:text-primary transition-colors duration-300">
            {course.title}
          </h3>

          <p className="text-xs text-foreground-500 font-medium">
            by <span className="text-foreground-700">{course.instructor}</span>
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-foreground-500 text-[11px] font-semibold border-t border-default-50 pt-3 mt-1">
            <div className="flex items-center gap-1.5">
              <LuBookOpen className="h-3.5 w-3.5 text-default-400" />
              <span>{course.lessonsCount} Lessons</span>
            </div>
            <div className="flex items-center gap-1.5">
              <LuClock className="h-3.5 w-3.5 text-default-400" />
              <span>{course.duration}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 border-t border-default-50/80 flex items-center justify-between bg-default-50/50">
        <div className="flex flex-col">
          {course.originalPrice && (
            <span className="text-xs text-foreground-400 line-through leading-none mb-0.5">
              {course.originalPrice}
            </span>
          )}
          <span className="text-base font-extrabold text-foreground leading-none">
            {course.price}
          </span>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="font-bold border-default-250 hover:border-primary hover:text-primary px-4 py-2 transition-all duration-300"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}