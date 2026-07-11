"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { LuStar, LuQuote, LuChevronLeft, LuChevronRight } from "react-icons/lu";

const testimonials = [
  {
    id: 1,
    name: "Lena Fischer",
    role: "Frontend Developer @ Stripe",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5,
    text: "SkillHub completely transformed my career. I went from a marketing assistant to a frontend developer in 9 months. The Next.js course was so well-structured — I shipped my first production app before even finishing it.",
    course: "Next.js 16 Developer Course",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: 2,
    name: "James Okonkwo",
    role: "Data Scientist @ Google",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5,
    text: "The Python & ML Bootcamp is genuinely the best online course I've ever taken. David Miller explains everything with practical context — no fluff, just real skills that got me an interview at Google.",
    course: "Python for Data Science & ML",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Product Designer @ Figma",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5,
    text: "Sarah's Figma course is unmatched. I'd been trying to break into UX for two years — after SkillHub, I built a portfolio that got me hired at my dream company. The community support was incredible.",
    course: "Figma UI/UX Design Essentials",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: 4,
    name: "Carlos Rivera",
    role: "Cloud Architect @ AWS",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5,
    text: "I passed the AWS SAA exam on my first attempt after the SkillHub bootcamp. The hands-on labs and real-world architecture scenarios are worth 10x the price. Highly, highly recommended.",
    course: "AWS Solutions Architect Bootcamp",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    id: 5,
    name: "Aisha Mohammed",
    role: "Growth Marketer @ HubSpot",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5,
    text: "Emma's Digital Marketing Masterclass covers everything — SEO, paid ads, email funnels, analytics — and ties it all together with real campaign examples. I doubled my company's organic traffic in 3 months.",
    course: "Digital Marketing Masterclass",
    gradient: "from-amber-500 to-orange-500",
  },
];

const cardVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80, scale: 0.95 }),
  center: { opacity: 1, x: 0, scale: 1, transition: { type: "spring" as const, stiffness: 120, damping: 22 } },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -80 : 80, scale: 0.95, transition: { duration: 0.2 } }),
};

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = () => {
    setDirection(-1);
    setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  };
  const next = () => {
    setDirection(1);
    setActive((a) => (a + 1) % testimonials.length);
  };

  const t = testimonials[active];

  return (
    <section ref={ref} className="relative w-full bg-background py-20 md:py-28 overflow-hidden">
      {/* Decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-primary" />
            Student Success Stories
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Real people,{" "}
            <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
              real results
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-foreground-500">
            Over 250,000 learners have already taken the leap. Here's what a few of them have to say.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Card */}
          <div className="relative overflow-hidden rounded-3xl border border-default-100 bg-background shadow-xl min-h-[320px] flex items-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={t.id}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full p-8 sm:p-12"
              >
                {/* Quote icon */}
                <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${t.gradient}`}>
                  <LuQuote className="h-6 w-6 text-white" />
                </div>

                {/* Review text */}
                <p className="mb-8 text-lg font-medium leading-relaxed text-foreground sm:text-xl">
                  "{t.text}"
                </p>

                {/* Author row */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-12 w-12 rounded-full object-cover border-2 border-default-100"
                    />
                    <div>
                      <p className="text-sm font-bold text-foreground">{t.name}</p>
                      <p className="text-xs text-foreground-500">{t.role}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-1">
                    <div className="flex items-center gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <LuStar key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className={`text-xs font-semibold bg-gradient-to-r ${t.gradient} bg-clip-text text-transparent`}>
                      {t.course}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-default-200 bg-background text-foreground-600 hover:border-primary hover:text-primary transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <LuChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === active ? "h-2.5 w-8 bg-primary" : "h-2.5 w-2.5 bg-default-200 hover:bg-default-400"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-default-200 bg-background text-foreground-600 hover:border-primary hover:text-primary transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <LuChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Bottom strip — aggregate rating */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-foreground-500"
        >
          {[
            { label: "250K+ Happy learners" },
            { label: "4.9★ Average rating" },
            { label: "85K+ Reviews" },
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              {i !== 0 && <span className="h-1 w-1 rounded-full bg-default-300" />}
              <span className="font-semibold text-foreground">{item.label}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}