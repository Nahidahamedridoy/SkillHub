"use client";

import clsx from "clsx";
import React from "react";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface SectionTitleProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  as?: HeadingTag;
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  as: Component = "h2",
  className,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
}: SectionTitleProps) {
  return (
    <div className={clsx("text-center", className)}>
      {eyebrow ? (
        <div
          className={clsx(
            "mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary",
            eyebrowClassName
          )}
        >
          {eyebrow}
        </div>
      ) : null}

      <Component
        className={clsx(
          "text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl",
          titleClassName
        )}
      >
        {title}
      </Component>

      {description ? (
        <p
          className={clsx(
            "mx-auto mt-3 max-w-xl text-sm text-foreground-500 sm:text-base",
            descriptionClassName
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
