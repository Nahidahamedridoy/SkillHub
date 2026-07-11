"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { LuPlus, LuMinus } from "react-icons/lu";

const faqs = [
  {
    id: 1,
    question: "Do I get lifetime access to my courses?",
    answer:
      "Yes — once you enrol in a course, you have lifetime access to all its content and future updates. Watch at your own pace, on any device, whenever you like.",
  },
  {
    id: 2,
    question: "Can I get a refund if I'm not satisfied?",
    answer:
      "Absolutely. We offer a 30-day money-back guarantee, no questions asked. If you're not happy with a course, just reach out to our support team within 30 days of purchase.",
  },
  {
    id: 3,
    question: "Are the certificates recognised by employers?",
    answer:
      "Our certificates are accepted by thousands of companies globally, including many Fortune 500 firms. You can share them directly on LinkedIn, your résumé, or your portfolio.",
  },
  {
    id: 4,
    question: "Is there a free trial or free courses available?",
    answer:
      "Yes! We offer a selection of free courses across popular categories. Many paid courses also include free preview lessons so you can try before you buy.",
  },
  {
    id: 5,
    question: "How do I access courses on mobile?",
    answer:
      "SkillHub is fully responsive and works great on any browser. You can also download lessons for offline viewing through our iOS and Android apps.",
  },
  {
    id: 6,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit/debit cards (Visa, Mastercard, Amex), PayPal, and many local payment options. All transactions are secured with 256-bit SSL encryption.",
  },
  {
    id: 7,
    question: "Can I switch plans or cancel anytime?",
    answer:
      "Yes. If you're on a subscription plan, you can upgrade, downgrade, or cancel at any time from your account settings. There are no lock-in contracts.",
  },
  {
    id: 8,
    question: "Are courses updated regularly?",
    answer:
      "Our instructors actively maintain their courses to keep up with industry changes. You'll receive in-app notifications whenever a course you're enrolled in gets new content.",
  },
];

interface FaqItemProps {
  faq: typeof faqs[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FaqItem({ faq, isOpen, onToggle, index }: FaqItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, type: "spring", stiffness: 100, damping: 20 }}
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-primary/40 bg-primary/[0.03] shadow-sm shadow-primary/10"
          : "border-default-100 bg-background hover:border-default-200"
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className={`text-sm font-semibold sm:text-base transition-colors ${isOpen ? "text-primary" : "text-foreground"}`}>
          {faq.question}
        </span>
        <span className={`ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
          isOpen ? "bg-primary text-white rotate-0" : "bg-default-100 text-foreground-500"
        }`}>
          {isOpen ? <LuMinus className="h-3.5 w-3.5" /> : <LuPlus className="h-3.5 w-3.5" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-foreground-500">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section ref={ref} className="relative w-full bg-default-50/50 py-20 md:py-28 overflow-hidden">
      {/* Decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-primary/4 blur-3xl" />
        <div className="absolute -left-40 bottom-1/4 h-96 w-96 rounded-full bg-violet-500/4 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-primary" />
            Got questions?
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
              questions
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-foreground-500">
            Everything you need to know before you get started. Still have questions? Our support team is here 24/7.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-3"
        >
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              index={i}
            />
          ))}
        </motion.div>

        {/* CTA bottom */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center"
        >
          <p className="text-sm font-medium text-foreground-600">
            Still have questions?{" "}
            <button className="font-bold text-primary hover:underline">
              Chat with our support team
            </button>{" "}
            — we're available 24/7.
          </p>
        </motion.div>
      </div>
    </section>
  );
}