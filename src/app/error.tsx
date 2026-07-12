"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { LuHouse, LuRotateCcw, LuTriangleAlert } from "react-icons/lu";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background text-foreground px-4">
      {/* Background ambient glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-danger/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[350px] w-[350px] translate-x-1/2 translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="flex flex-col items-center text-center max-w-lg w-full gap-6">
        {/* Error icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-danger/10 border border-danger/20 shadow-lg shadow-danger/10"
        >
          <LuTriangleAlert
            size={48}
            className="text-danger drop-shadow-[0_0_8px_rgba(255,80,80,0.5)]"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="text-2xl sm:text-3xl font-bold tracking-tight"
        >
          Something went wrong!
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          className="text-foreground-500 text-sm sm:text-base leading-relaxed max-w-sm"
        >
          An unexpected error occurred. You can try again or return to the home
          page.
        </motion.p>

        {/* Error digest (dev hint) */}
        {error?.digest && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-foreground-400 text-xs font-mono bg-default-100 border border-default-200 rounded-lg px-3 py-1.5"
          >
            Error ID: {error.digest}
          </motion.p>
        )}

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          <Button
            size="lg"
            onPress={reset}
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl px-8 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
            startContent={<LuRotateCcw size={18} />}
          >
            Try Again
          </Button>

          <Link href="/" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-default-300 text-foreground font-semibold rounded-xl px-8 hover:bg-default-100 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
              startContent={<LuHouse size={18} />}
            >
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
