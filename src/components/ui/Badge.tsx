import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeVariant = "green" | "yellow" | "red" | "blue" | "gray";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  green: "bg-[var(--color-success-light)] text-[#22543d]",
  yellow: "bg-[var(--color-warning-light)] text-[#744210]",
  red: "bg-[var(--color-danger-light)] text-[#742a2a]",
  blue: "bg-[var(--color-info-light)] text-[#2a4365]",
  gray: "bg-[var(--border)] text-[#4a5568]",
};

export function Badge({ variant = "gray", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
