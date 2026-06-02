import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
}

export function Input({ label, error, hint, icon, className, id, ...props }: InputProps) {
  const inputId = id || label?.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            "w-full rounded-[var(--radius-xl)] border bg-[var(--surface)] px-3 py-2.5 text-base text-[var(--foreground)] transition-colors",
            "placeholder:text-[var(--muted)]",
            "focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20",
            error
              ? "border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-[var(--color-danger)]/20"
              : "border-[var(--border)]",
            icon && "pl-10",
            className
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
      </div>
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-[var(--color-danger)]">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${inputId}-hint`} className="mt-1 text-sm text-[var(--muted)]">
          {hint}
        </p>
      )}
    </div>
  );
}
