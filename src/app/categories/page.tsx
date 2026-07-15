"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { LuGrip, LuLayers, LuArrowRight } from "react-icons/lu";

import Breadcrumb from "@/components/common/Breadcrumb";
import BackButton from "@/components/common/BackButton";

const categories = [
  { name: "Development", description: "Modern web, mobile, and backend programming courses.", count: 420 },
  { name: "Design", description: "UI/UX, product, and motion design training.", count: 280 },
  { name: "Data Science", description: "ML, analytics, and AI courses for data-driven roles.", count: 310 },
  { name: "Business", description: "Leadership, strategy, and startup growth programs.", count: 195 },
  { name: "Marketing", description: "Digital advertising, SEO, and growth frameworks.", count: 160 },
  { name: "Cloud & DevOps", description: "Infrastructure, deployment, and automation training.", count: 140 },
];

export default function CategoriesPage() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <div className="absolute inset-x-0 top-0 h-64 bg-linear-to-b from-primary/10 to-transparent" />

      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Categories" }]} />
        <BackButton href="/" label="Back to Home" />

        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              Browse categories
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Discover learning paths that match your ambition.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-foreground-500 sm:text-lg">
              From developer bootcamps to creative workshops, explore the categories that help you build confidence and career momentum.
            </p>
            <Link href="/courses" className="w-full sm:w-auto">
              <Button className="bg-linear-to-r from-primary to-secondary text-white font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 px-8 py-5">
                Explore all courses
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="overflow-hidden rounded-[2rem] border border-default-100 bg-background/90 p-8 shadow-2xl"
          >
            <div className="relative grid gap-6">
              <div className="absolute -right-6 top-8 h-24 w-24 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative space-y-6">
                <div className="rounded-[1.75rem] border border-default-100 bg-linear-to-br from-primary/5 to-secondary/5 p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Browse Topics</p>
                  <p className="mt-4 text-xl font-bold text-foreground">Find the category that fits your next career move.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {categories.slice(0, 2).map((category) => (
                    <div key={category.name} className="rounded-[1.5rem] border border-default-100 bg-background p-6 shadow-sm">
                      <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                        <LuLayers className="h-4 w-4 text-primary" />
                        {category.name}
                      </div>
                      <p className="text-sm leading-7 text-foreground-500">{category.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {categories.slice(2).map((category) => (
                  <div key={category.name} className="rounded-[1.5rem] border border-default-100 bg-background p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-base font-semibold text-foreground">{category.name}</p>
                        <p className="mt-2 text-sm text-foreground-500">{category.description}</p>
                      </div>
                      <div className="rounded-2xl bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                        {category.count} courses
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <motion.article
              key={category.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="group overflow-hidden rounded-[2rem] border border-default-100 bg-background p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                <LuGrip className="h-4 w-4" />
                {category.count} courses
              </div>
              <h2 className="text-xl font-semibold text-foreground">{category.name}</h2>
              <p className="mt-4 text-sm leading-7 text-foreground-500">{category.description}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                Explore category
                <LuArrowRight className="h-4 w-4" />
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
