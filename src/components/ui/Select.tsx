import { cn } from "@/lib/utils";
import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({ label, error, options, placeholder, className, id, ...props }: SelectProps) {
  const selectId = id || label?.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          "w-full rounded-[var(--radius-xl)] border bg-[var(--surface)] px-3 py-2.5 text-base text-[var(--foreground)] transition-colors appearance-none",
          "focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20",
          error
            ? "border-[var(--color-danger)]"
            : "border-[var(--border)]",
          className
        )}
        aria-invalid={error ? true : undefined}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-[var(--color-danger)]">{error}</p>
      )}
    </div>
  );
}
