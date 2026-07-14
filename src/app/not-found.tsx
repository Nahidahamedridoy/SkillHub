"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { LuHouse } from "react-icons/lu";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background text-foreground px-4">
      {/* Background ambient glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[350px] w-[350px] translate-x-1/2 translate-y-1/2 rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <div className="flex flex-col items-center text-center max-w-lg w-full gap-6">
        {/* 404 heading */}
        <motion.h1
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-[8rem] sm:text-[10rem] font-extrabold leading-none tracking-tighter bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent select-none"
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="text-2xl sm:text-3xl font-bold tracking-tight"
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          className="text-foreground-500 text-sm sm:text-base leading-relaxed max-w-sm"
        >
          The page you are looking for doesn&apos;t exist or has been moved.
        </motion.p>

        {/* Back to Home button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
        >
          <Link href="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl px-8 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <LuHouse size={18} />
              <span>Back to Home</span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
