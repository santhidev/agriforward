"use client";

import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  items: readonly string[];
  active: string;
  onChange: (item: string) => void;
  className?: string;
}

export function CategoryFilter({ items, active, onChange, className }: CategoryFilterProps) {
  return (
    <div className={cn("flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide", className)}>
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={cn(
            "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors min-h-[44px] min-w-[44px]",
            active === item
              ? "bg-[var(--color-primary)] text-white"
              : "bg-[var(--surface-muted)] text-[var(--muted)] hover:bg-[var(--border)] hover:text-[var(--foreground)]"
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
