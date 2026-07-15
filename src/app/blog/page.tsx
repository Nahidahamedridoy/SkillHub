"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { LuBookOpen, LuArrowRight, LuMail, LuSparkles } from "react-icons/lu";

import Breadcrumb from "@/components/common/Breadcrumb";
import BackButton from "@/components/common/BackButton";

const posts = [
  {
    id: 1,
    title: "How to choose the perfect course for your career",
    category: "Career",
    excerpt: "Learn which learning path matches your goals and how to pick courses that actually move your career forward.",
  },
  {
    id: 2,
    title: "5 habits of successful online learners",
    category: "Productivity",
    excerpt: "Discover the routines that high-performing students use to stay motivated, focused, and consistent.",
  },
  {
    id: 3,
    title: "What employers look for in a modern portfolio",
    category: "Portfolio",
    excerpt: "Build portfolio projects that recruiters notice, with concrete tips from hiring managers and instructors.",
  },
];

export default function BlogPage() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <div className="absolute inset-x-0 top-0 h-64 bg-linear-to-b from-primary/10 to-transparent" />

      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
        <BackButton href="/" label="Back to Home" />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              From the Blog
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Insights and stories to help you learn more effectively.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-foreground-500 sm:text-lg">
              Explore practical guides, career advice, and behind-the-scenes course highlights from instructors and learners.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/blog" className="w-full sm:w-auto">
                <Button className="w-full bg-linear-to-r from-primary to-secondary text-white font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 px-8 py-5">
                  Read all posts
                </Button>
              </Link>
              <Link href="/courses" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full border-default-200 text-foreground hover:border-secondary px-8 py-5">
                  Browse courses
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-[2rem] border border-default-100 bg-background/90 p-8 shadow-2xl"
          >
            <div className="relative overflow-hidden rounded-[1.75rem] bg-linear-to-br from-primary/5 to-secondary/5 p-8 sm:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.12),transparent_22%)]" />
              <div className="relative space-y-6 text-left">
                <div className="space-y-3">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    <LuSparkles className="mr-2 h-4 w-4" />
                    Featured insights
                  </span>
                  <h2 className="text-3xl font-bold text-foreground">Learn faster with proven study habits.</h2>
                </div>
                <p className="text-sm leading-7 text-foreground-500">
                  SkillHub blog content is written for learners who want actionable advice, clearer outcomes, and faster progress.
                </p>
                <div className="rounded-[1.5rem] border border-default-200 bg-background p-6 shadow-sm">
                  <div className="flex items-center gap-3 text-sm text-foreground-500">
                    <LuMail className="h-4 w-4" />
                    <span>Subscribe for weekly learning tips</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="group rounded-[2rem] border border-default-100 bg-background p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                <LuBookOpen className="h-3.5 w-3.5" />
                {post.category}
              </div>
              <h2 className="mt-5 text-xl font-semibold text-foreground">{post.title}</h2>
              <p className="mt-4 text-sm leading-7 text-foreground-500">{post.excerpt}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Read article
                <LuArrowRight className="h-4 w-4" />
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
