"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface HelpFabProps {
  className?: string;
}

export function HelpFab({ className }: HelpFabProps) {
  return (
    <Link
      href="/help"
      className={cn(
        "fixed bottom-20 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-[var(--shadow-lg)] transition-transform hover:scale-110 md:bottom-6",
        className
      )}
      aria-label="ช่วยเหลือ"
    >
      <span className="text-xl font-bold">?</span>
    </Link>
  );
}
