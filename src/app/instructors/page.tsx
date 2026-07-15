"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { LuUsers, LuAward, LuArrowRight } from "react-icons/lu";

import Breadcrumb from "@/components/common/Breadcrumb";
import BackButton from "@/components/common/BackButton";

const instructors = [
  {
    name: "Dr. Angela Yu",
    specialty: "Full-Stack Development",
    highlight: "Lead instructor of the top-rated bootcamp.",
  },
  {
    name: "Sarah Jenkins",
    specialty: "UI/UX & Product Design",
    highlight: "Award-winning design mentor.",
  },
  {
    name: "Marcus Vance",
    specialty: "Cloud Architecture",
    highlight: "Expert in AWS and modern infrastructure.",
  },
  {
    name: "Emma Thompson",
    specialty: "Digital Marketing",
    highlight: "Growth strategist who scaled global brands.",
  },
];

export default function InstructorsPage() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <div className="absolute inset-x-0 top-0 h-72 bg-linear-to-b from-primary/10 to-transparent" />

      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Instructors" }]} />
        <BackButton href="/" label="Back to Home" />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              Meet our instructors
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Learn from seasoned professionals who ship real products.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-foreground-500 sm:text-lg">
              Each instructor brings deep industry experience, practical projects, and mentorship to every course.
            </p>
            <Button className="bg-linear-to-r from-primary to-secondary text-white font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 px-8 py-5">
              View instructor profiles
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-[2rem] border border-default-100 bg-background/90 p-8 shadow-2xl"
          >
            <div className="relative overflow-hidden rounded-[1.75rem] bg-linear-to-br from-primary/5 to-secondary/5 p-8 sm:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.12),transparent_22%)]" />
              <div className="relative space-y-6">
                <div className="rounded-[1.5rem] border border-default-100 bg-background p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Expert coaching</p>
                  <h2 className="mt-4 text-2xl font-bold text-foreground">From bootcamps to advanced certificate tracks.</h2>
                  <p className="mt-4 text-sm leading-7 text-foreground-500">
                    Our instructors are selected for experience, teaching ability, and the real outcomes they produce for students.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-default-100 bg-background p-6 shadow-sm">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                      <LuUsers className="h-4 w-4" />
                      250K learners
                    </div>
                    <p className="mt-3 text-sm leading-7 text-foreground-500">Join a thriving community of learners and instructors worldwide.</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-default-100 bg-background p-6 shadow-sm">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                      <LuAward className="h-4 w-4" />
                      4.9 average rating
                    </div>
                    <p className="mt-3 text-sm leading-7 text-foreground-500">Courses are rated by learners for clarity, relevance, and impact.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map((instructor) => (
            <motion.article
              key={instructor.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="group overflow-hidden rounded-[2rem] border border-default-100 bg-background p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                {instructor.specialty}
              </div>
              <h2 className="text-xl font-semibold text-foreground">{instructor.name}</h2>
              <p className="mt-4 text-sm leading-7 text-foreground-500">{instructor.highlight}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                Learn more
                <LuArrowRight className="h-4 w-4" />
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
