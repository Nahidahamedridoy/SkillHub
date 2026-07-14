"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LuTwitter,
  LuLinkedin,
  LuGithub,
  LuYoutube,
  LuInstagram,
  LuMail,
  LuMapPin,
  LuPhone,
  LuArrowUpRight,
} from "react-icons/lu";

// ── Brand Logo (mirrors Navbar) ───────────────────────────────────────────────
const FooterLogo = () => (
  <div className="flex items-center gap-2.5 group">
    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary shadow-lg shadow-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-primary/30">
      <svg
        className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
      </svg>
    </div>
    <span className="text-xl font-bold tracking-tight text-foreground">
      Skill<span className="text-primary group-hover:text-secondary transition-colors duration-300">Hub</span>
    </span>
  </div>
);

// ── Link Groups ───────────────────────────────────────────────────────────────
const linkGroups = [
  {
    title: "Platform",
    links: [
      { label: "Browse Courses", href: "/courses" },
      { label: "Top Categories", href: "/categories" },
      { label: "Top Instructors", href: "/instructors" },
      { label: "Become an Instructor", href: "/teach" },
      { label: "Enterprise", href: "/enterprise" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Press Kit", href: "/press" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Centre", href: "/help" },
      { label: "Community Forum", href: "/community" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Cookie Settings", href: "/cookies" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Refund Policy", href: "/refunds" },
      { label: "GDPR", href: "/gdpr" },
      { label: "Cookie Policy", href: "/cookies-policy" },
    ],
  },
];

// ── Socials ───────────────────────────────────────────────────────────────────
const socials = [
  { icon: LuTwitter,   label: "Twitter",   href: "https://twitter.com",   gradient: "from-sky-400 to-blue-500" },
  { icon: LuLinkedin,  label: "LinkedIn",  href: "https://linkedin.com",  gradient: "from-blue-500 to-indigo-600" },
  { icon: LuYoutube,   label: "YouTube",   href: "https://youtube.com",   gradient: "from-rose-500 to-red-600" },
  { icon: LuInstagram, label: "Instagram", href: "https://instagram.com", gradient: "from-fuchsia-500 to-pink-600" },
  { icon: LuGithub,    label: "GitHub",    href: "https://github.com",    gradient: "from-default-600 to-default-800" },
];

// ── Contact details ───────────────────────────────────────────────────────────
const contactItems = [
  { icon: LuMail,   text: "support@skillhub.io" },
  { icon: LuPhone,  text: "+1 (800) 123-4567" },
  { icon: LuMapPin, text: "San Francisco, CA, USA" },
];

// ── Animations ────────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-default-50/60 overflow-hidden border-t border-default-100">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/4 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-violet-500/4 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Top strip — newsletter teaser ── */}
        <div className="flex flex-col items-center justify-between gap-4 border-b border-default-100 py-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-sm font-semibold text-foreground-600">
              <span className="text-foreground">85,000+ learners</span> already subscribed to our newsletter
            </p>
          </div>
          <Link
            href="#newsletter"
            className="group inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-primary/25 hover:opacity-90 transition-opacity duration-200"
          >
            Get weekly picks
            <LuArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* ── Main grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-6"
        >
          {/* Brand column (spans 2 cols on large) */}
          <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col gap-5">
            <Link href="/" aria-label="SkillHub home">
              <FooterLogo />
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-foreground-500">
              SkillHub is the world&apos;s leading online learning platform — powering career transformations with expert-led courses across technology, design, business, and more.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-2.5">
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-foreground-500">
                    <Icon className="h-4 w-4 text-primary shrink-0" />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group flex h-9 w-9 items-center justify-center rounded-xl border border-default-200 bg-background text-foreground-500 hover:border-transparent hover:text-white transition-all duration-200"
                  >
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />
                    <Icon className="relative h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Link columns */}
          {linkGroups.map((group) => (
            <motion.div key={group.title} variants={itemVariants} className="flex flex-col gap-4">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-foreground">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground-500 hover:text-primary transition-colors duration-200 hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-default-100 py-6 text-xs text-foreground-400 sm:flex-row">
          <p>
            © {currentYear}{" "}
            <span className="font-semibold text-foreground-600">SkillHub, Inc.</span> All rights reserved.
          </p>

          {/* Trust badges */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {["SSL Secured", "GDPR Compliant", "SOC 2 Certified"].map((badge, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-full border border-default-200 bg-background px-3 py-1 text-[11px] font-semibold text-foreground-500"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {badge}
              </span>
            ))}
          </div>

          <p>
            Made with <span className="text-rose-500">♥</span> for learners worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}