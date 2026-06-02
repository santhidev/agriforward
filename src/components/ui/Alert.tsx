import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type AlertVariant = "info" | "success" | "warning" | "danger";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

const variantStyles: Record<AlertVariant, { bg: string; border: string; icon: string }> = {
  info: {
    bg: "bg-[var(--color-info-light)]",
    border: "border-[var(--color-info)]",
    icon: "ℹ️",
  },
  success: {
    bg: "bg-[var(--color-success-light)]",
    border: "border-[var(--color-success)]",
    icon: "✅",
  },
  warning: {
    bg: "bg-[var(--color-warning-light)]",
    border: "border-[var(--color-warning)]",
    icon: "⚠️",
  },
  danger: {
    bg: "bg-[var(--color-danger-light)]",
    border: "border-[var(--color-danger)]",
    icon: "❌",
  },
};

export function Alert({ variant = "info", title, children, action, className }: AlertProps) {
  const style = variantStyles[variant];
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border-l-4 p-4",
        style.bg,
        style.border,
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <span className="text-lg leading-none" aria-hidden="true">{style.icon}</span>
        <div className="flex-1 min-w-0">
          {title && <p className="mb-1 font-semibold text-[var(--foreground)]">{title}</p>}
          <div className="text-sm text-[var(--foreground)]">{children}</div>
          {action && <div className="mt-3">{action}</div>}
        </div>
      </div>
    </div>
  );
}
