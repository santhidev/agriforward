import { cn } from "@/lib/utils";
import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({ label, error, hint, className, id, ...props }: TextareaProps) {
  const textareaId = id || label?.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={textareaId} className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          "w-full rounded-[var(--radius-xl)] border bg-[var(--surface)] px-3 py-2.5 text-base text-[var(--foreground)] transition-colors",
          "placeholder:text-[var(--muted)]",
          "focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20",
          error
            ? "border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-[var(--color-danger)]/20"
            : "border-[var(--border)]",
          className
        )}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-[var(--color-danger)]">{error}</p>
      )}
      {hint && !error && (
        <p className="mt-1 text-sm text-[var(--muted)]">{hint}</p>
      )}
    </div>
  );
}
