"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { LuShieldCheck, LuUsers, LuSparkles } from "react-icons/lu";

const stats = [
  { label: "Expert-led courses", value: "5,200+" },
  { label: "Global learners", value: "250K+" },
  { label: "Industry partners", value: "120+" },
];

const values = [
  {
    title: "Learning built for outcomes",
    description:
      "Every course is designed with a clear job-ready outcome in mind — from project portfolios to career transition support.",
    icon: LuShieldCheck,
    accent: "from-primary to-secondary",
  },
  {
    title: "Authentic expert instructors",
    description:
      "Our instructors are practitioners from leading companies who bring real-world experience into every lesson.",
    icon: LuUsers,
    accent: "from-violet-500 to-purple-600",
  },
  {
    title: "Community-first learning",
    description:
      "Join live sessions, study groups, and mentorship circles so you never learn alone.",
    icon: LuSparkles,
    accent: "from-emerald-500 to-teal-500",
  },
];

import Breadcrumb from "@/components/common/Breadcrumb";
import BackButton from "@/components/common/BackButton";
import GradientText from "@/components/ui/GradientText";

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <div className="absolute inset-x-0 top-0 h-64 bg-linear-to-b from-primary/10 to-transparent" />

      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
        <BackButton href="/" label="Back to Home" />
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              About SkillHub
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Learn with confidence,
              <GradientText as="span" className="block">
                powered by expert-led courses.
              </GradientText>
            </h1>
            <p className="max-w-2xl text-base leading-8 text-foreground-500 sm:text-lg">
              SkillHub brings together top instructors, modern curriculum, and a community of learners to help you grow your career with real skills.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/courses" className="w-full sm:w-auto">
                <Button className="w-full bg-linear-to-r from-primary to-secondary text-white font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 px-8 py-5">
                  Browse Courses
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full border-default-200 text-foreground hover:border-primary px-8 py-5">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative overflow-hidden rounded-[2rem] border border-default-100 bg-background/80 p-8 shadow-2xl shadow-primary/5"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_45%)]" />
            <div className="relative grid gap-6 text-left">
              <div className="rounded-[1.5rem] border border-default-100 bg-linear-to-br from-primary/5 to-secondary/5 p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Our story</p>
                <h2 className="mt-4 text-2xl font-bold text-foreground">
                  Built to make modern learning feel inspiring and achievable.
                </h2>
                <p className="mt-4 text-sm leading-7 text-foreground-500">
                  Over the past five years, SkillHub has helped learners from startups and enterprises turn knowledge into real results through hands-on learning.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-default-100 bg-background/80 p-6 shadow-sm">
                    <p className="text-3xl font-extrabold text-foreground">{item.value}</p>
                    <p className="mt-2 text-sm text-foreground-500">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="grid gap-8 lg:grid-cols-3">
          {values.map((value) => (
            <motion.article
              key={value.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="group overflow-hidden rounded-[2rem] border border-default-100 bg-background p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${value.accent} text-white`}>
                <value.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
              <p className="mt-3 text-sm leading-7 text-foreground-500">{value.description}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
