"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  label?: string;
  className?: string;
  href?: string;
}

export function BackButton({ label = "กลับ", className, href }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "mb-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]",
        className
      )}
      type="button"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </button>
  );
}
