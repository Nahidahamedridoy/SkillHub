"use client";

import React, { useState } from "react";
import { Card, CardBody, CardFooter, Button, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import { LuStar, LuBookOpen, LuClock, LuArrowRight } from "react-icons/lu";

interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  rating: number;
  reviewsCount: number;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  badge?: string;
  lessonsCount: number;
  duration: string;
}

const COURSES_DATA: Course[] = [
  {
    id: "1",
    title: "Next.js 16 Developer Course: App Router & React Server Components",
    instructor: "Dr. Angela Yu",
    category: "Development",
    rating: 4.9,
    reviewsCount: 1240,
    price: "$94.99",
    originalPrice: "$189.99",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&h=260&q=80",
    badge: "Bestseller",
    lessonsCount: 48,
    duration: "24h 15m",
  },
  {
    id: "2",
    title: "Figma UI/UX Design Essentials: From Beginner to Pro",
    instructor: "Sarah Jenkins",
    category: "Design",
    rating: 4.8,
    reviewsCount: 850,
    price: "$84.99",
    imageUrl: "https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=400&h=260&q=80",
    badge: "Hot",
    lessonsCount: 36,
    duration: "18h 45m",
  },
  {
    id: "3",
    title: "Python for Data Science & Machine Learning Bootcamp",
    instructor: "David Miller",
    category: "Data Science",
    rating: 4.9,
    reviewsCount: 2105,
    price: "$109.99",
    originalPrice: "$199.99",
    imageUrl: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=400&h=260&q=80",
    badge: "Top Rated",
    lessonsCount: 64,
    duration: "42h 0m",
  },
  {
    id: "4",
    title: "Digital Marketing Masterclass: 23 Courses in 1",
    instructor: "Emma Thompson",
    category: "Marketing",
    rating: 4.7,
    reviewsCount: 912,
    price: "$79.99",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&h=260&q=80",
    lessonsCount: 52,
    duration: "30h 10m",
  },
  {
    id: "5",
    title: "Generative AI & LLM Prompt Engineering Essentials",
    instructor: "Prof. Michael Stark",
    category: "Artificial Intelligence",
    rating: 4.9,
    reviewsCount: 432,
    price: "$59.99",
    originalPrice: "$99.99",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=400&h=260&q=80",
    badge: "New",
    lessonsCount: 24,
    duration: "10h 30m",
  },
  {
    id: "6",
    title: "Algorithmic Trading & Finance with Python",
    instructor: "Robert Chen",
    category: "Finance",
    rating: 4.6,
    reviewsCount: 318,
    price: "$99.99",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=400&h=260&q=80",
    lessonsCount: 40,
    duration: "22h 20m",
  },
  {
    id: "7",
    title: "Product Management 101: Launch Your Tech Career",
    instructor: "Jessica Taylor",
    category: "Business",
    rating: 4.8,
    reviewsCount: 750,
    price: "$89.99",
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&h=260&q=80",
    lessonsCount: 30,
    duration: "15h 45m",
  },
  {
    id: "8",
    title: "AWS Certified Solutions Architect Associate Bootcamp",
    instructor: "Marcus Vance",
    category: "Cloud Computing",
    rating: 4.9,
    reviewsCount: 1840,
    price: "$119.99",
    originalPrice: "$219.99",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&h=260&q=80",
    badge: "Bestseller",
    lessonsCount: 55,
    duration: "36h 15m",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 18,
    },
  },
};

export default function FeaturedCourses() {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Development", "Design", "Data Science", "Business", "Marketing"];

  const filteredCourses = activeFilter === "All"
    ? COURSES_DATA
    : COURSES_DATA.filter(course => course.category === activeFilter || (activeFilter === "Business" && course.category === "Finance"));

  return (
    <section className="w-full bg-default-50/50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
              <span>Explore Top Courses</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Featured Courses
            </h2>
            <p className="max-w-xl text-sm text-foreground-500">
              Discover programs designed by industry experts. Gain practical knowledge, work on live projects, and earn certifications.
            </p>
          </div>
          <Button
            variant="ghost"
            className="group font-semibold text-primary hover:text-primary-600 self-start md:self-auto flex items-center gap-2 border-none"
          >
            <span>View All Courses</span>
            <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeFilter === category
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-background border border-default-100 hover:border-default-250 text-foreground-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredCourses.map((course) => (
            <motion.div key={course.id} variants={cardVariants}>
              <Card className="h-full border border-default-100 hover:border-default-200/80 bg-background flex flex-col justify-between hover:shadow-xl transition-all duration-350 overflow-hidden group">
                <CardBody className="p-0 overflow-hidden relative">
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
                </CardBody>

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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}