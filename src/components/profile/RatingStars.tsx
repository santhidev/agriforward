"use client";

import { cn } from "@/lib/utils";

interface RatingStarsProps {
  score: number;
  max?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-2xl",
};

export function RatingStars({ score, max = 5, className, size = "md" }: RatingStarsProps) {
  const stars = [];
  for (let i = 1; i <= max; i++) {
    if (score >= i) {
      stars.push("full");
    } else if (score >= i - 0.5) {
      stars.push("half");
    } else {
      stars.push("empty");
    }
  }

  return (
    <span
      className={cn("inline-flex items-center gap-0.5", sizeClasses[size], className)}
      aria-label={`คะแนน ${score} จาก ${max}`}
      role="img"
    >
      {stars.map((type, i) => (
        <span key={i} className={type === "full" ? "text-[var(--color-star)]" : type === "half" ? "text-[var(--color-star)]" : "text-[var(--color-star-empty)]"}>
          {type === "full" ? "★" : type === "half" ? "★" : "☆"}
        </span>
      ))}
    </span>
  );
}
