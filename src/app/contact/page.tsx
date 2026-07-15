"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { LuMail, LuMapPin, LuPhone, LuArrowRight } from "react-icons/lu";

const contactMethods = [
  { label: "General inquiries", value: "support@skillhub.io" },
  { label: "Call us", value: "+1 (800) 123-4567" },
  { label: "Visit us", value: "San Francisco, CA" },
];

import Breadcrumb from "@/components/common/Breadcrumb";
import BackButton from "@/components/common/BackButton";

export default function ContactPage() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <div className="absolute inset-x-0 top-0 h-72 bg-linear-to-b from-secondary/10 to-transparent" />

      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        <BackButton href="/" label="Back to Home" />
        <div className="grid gap-12 lg:grid-cols-[0.95fr_0.85fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-semibold text-secondary">
              Get in Touch
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Ready to accelerate your learning?
            </h1>
            <p className="max-w-2xl text-base leading-8 text-foreground-500 sm:text-lg">
              Contact SkillHub and we&apos;ll connect you with the right courses, instructors, and support to help you reach your goals.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {contactMethods.map((method) => (
                <div key={method.label} className="rounded-[1.75rem] border border-default-100 bg-background/90 p-6 shadow-sm">
                  <p className="text-sm font-semibold text-foreground">{method.label}</p>
                  <p className="mt-3 text-base text-foreground-600">{method.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-[2rem] border border-default-100 bg-background/90 p-8 shadow-2xl"
          >
            <div className="relative overflow-hidden rounded-[1.75rem] bg-linear-to-br from-secondary/10 to-primary/5 p-8 sm:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.12),transparent_22%)]" />
              <div className="relative grid gap-8">
                <div>
                  <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-sm font-semibold text-secondary">
                    <LuMail className="mr-2 h-4 w-4" />
                    Contact Support
                  </span>
                  <h2 className="mt-6 text-3xl font-bold text-foreground sm:text-4xl">
                    Let&apos;s build the next chapter of your career.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-foreground-500">
                    Tell us what you need and our team will reach out with the best plan for your learning path.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-default-100 bg-background p-6 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.2em] text-foreground-400">Email</p>
                    <p className="mt-3 text-base font-semibold text-foreground">support@skillhub.io</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-default-100 bg-background p-6 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.2em] text-foreground-400">Phone</p>
                    <p className="mt-3 text-base font-semibold text-foreground">+1 (800) 123-4567</p>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-default-100 bg-background p-6 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-foreground-400">Office</p>
                  <p className="mt-3 text-base font-semibold text-foreground">175 Market St, San Francisco, CA</p>
                </div>

                <div className="rounded-[1.5rem] border border-default-100 bg-background p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <LuArrowRight className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Send us a message</p>
                      <p className="text-sm text-foreground-500">We&apos;ll get back within 24 hours.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="grid gap-8 lg:grid-cols-3">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] border border-default-100 bg-background p-8 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-foreground">Need help choosing a course?</h2>
            <p className="mt-4 text-sm leading-7 text-foreground-500">
              Our team can recommend the right course track based on your background, goals, and industry.
            </p>
            <Link href="/courses" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              View course collections
            </Link>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="rounded-[2rem] border border-default-100 bg-background p-8 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-foreground">Partner with us</h2>
            <p className="mt-4 text-sm leading-7 text-foreground-500">
              Looking for a custom training solution for teams and organizations? We have a flexible program built for scale.
            </p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Talk to our partnerships team
            </Link>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="rounded-[2rem] border border-default-100 bg-background p-8 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-foreground">Join our community</h2>
            <p className="mt-4 text-sm leading-7 text-foreground-500">
              Get updates on new course launches, live labs, and community events.
            </p>
            <Link href="/register" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Create your free account
            </Link>
          </motion.article>
        </div>
      </section>
    </main>
  );
}
