"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { LuArrowLeft } from "react-icons/lu";

interface BackButtonProps {
  href: string;
  label: string;
}

export default function BackButton({ href, label }: BackButtonProps) {
  const router = useRouter();

  return (
    <div className="mt-8 flex w-full justify-start">
      <Button
        variant="outline"
        className="inline-flex items-center gap-2 rounded-full border-default-200 px-5 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-all duration-200"
        onClick={() => router.push(href)}
      >
        <LuArrowLeft className="h-4 w-4" />
        {label}
      </Button>
    </div>
  );
}
