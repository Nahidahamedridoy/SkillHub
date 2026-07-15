"use client";

import React from "react";
import clsx from "clsx";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  as?: React.ElementType;
}

export default function GradientText({
  children,
  className,
  gradient = "bg-gradient-to-r from-primary to-secondary",
  as: Component = "span",
}: GradientTextProps) {
  return (
    <Component
      className={clsx(
        "bg-clip-text text-transparent",
        gradient,
        className
      )}
    >
      {children}
    </Component>
  );
}