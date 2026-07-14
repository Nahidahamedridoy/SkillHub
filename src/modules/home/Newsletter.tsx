"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { LuMail, LuSend, LuCheck, LuStar, LuZap, LuShieldCheck } from "react-icons/lu";

const perks = [
  { icon: LuZap, text: "Weekly curated course picks" },
  { icon: LuStar, text: "Exclusive subscriber discounts" },
  { icon: LuShieldCheck, text: "No spam, ever. Unsubscribe anytime." },
];

export default function Newsletter() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  return (
    <section ref={ref} className="relative w-full bg-background py-20 md:py-28 overflow-hidden">
      {/* Decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/4 blur-3xl" />
        <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-sky-500/5 blur-3xl" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, type: "spring", stiffness: 80, damping: 18 }}
          className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.07] via-background to-violet-500/[0.07] p-10 shadow-2xl shadow-primary/5 sm:p-14"
        >
          {/* Decorative circles inside card */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-violet-500/10 blur-2xl" />

          <div className="relative flex flex-col items-center text-center gap-6">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={inView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 18 }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-violet-500 shadow-lg shadow-primary/30"
            >
              <LuMail className="h-8 w-8 text-white" />
            </motion.div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-primary" />
              Join 85,000+ subscribers
            </div>

            {/* Heading */}
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Stay ahead of the{" "}
                <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                  curve
                </span>
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-foreground-500 sm:text-base">
                Get the best new courses, industry trends, and exclusive discounts delivered straight to your inbox — every week.
              </p>
            </div>

            {/* Perks */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {perks.map((perk, i) => {
                const Icon = perk.icon;
                return (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground-500">
                    <Icon className="h-4 w-4 text-primary shrink-0" />
                    <span>{perk.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Form */}
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-8 py-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500">
                  <LuCheck className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-foreground">You&apos;re in! 🎉</p>
                  <p className="text-xs text-foreground-500">Check your inbox for a welcome gift.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <LuMail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-400" />
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                    placeholder="you@email.com"
                    className={`w-full rounded-xl border pl-11 pr-4 py-3 text-sm bg-background text-foreground placeholder:text-foreground-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/40 ${
                      status === "error" ? "border-rose-400 focus:ring-rose-400/40" : "border-default-200 focus:border-primary"
                    }`}
                  />
                  {status === "error" && (
                    <p className="absolute -bottom-5 left-0 text-[11px] text-rose-500 font-medium">
                      Please enter a valid email.
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-violet-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 hover:opacity-90 hover:shadow-xl hover:shadow-primary/30 active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  ) : (
                    <>
                      <LuSend className="h-4 w-4" />
                      Subscribe
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Trust note */}
            <p className="text-[11px] text-foreground-400">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}