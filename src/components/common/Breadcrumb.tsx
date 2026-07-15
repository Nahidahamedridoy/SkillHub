"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      aria-label="Breadcrumb"
      className="mb-6 text-sm text-foreground-500"
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="font-medium text-foreground hover:text-primary transition-colors duration-200">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "font-semibold text-foreground" : "text-foreground-500"}>
                  {item.label}
                </span>
              )}
              {!isLast && <span className="text-foreground-400">/</span>}
            </li>
          );
        })}
      </ol>
    </motion.nav>
  );
}
