import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("py-12 text-center", className)}>
      {icon && <div className="mb-3 text-4xl">{icon}</div>}
      <h3 className="mb-1 text-lg font-semibold text-[var(--foreground)]">{title}</h3>
      {description && (
        <p className="mx-auto max-w-sm text-sm text-[var(--muted)]">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
