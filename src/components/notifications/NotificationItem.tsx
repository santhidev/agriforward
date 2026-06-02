"use client";

import { cn } from "@/lib/utils";

interface NotificationItemProps {
  icon: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

export function NotificationItem({ icon, title, description, time, isRead }: NotificationItemProps) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors",
        !isRead && "border-l-4 border-l-[var(--color-success)]"
      )}
    >
      <span className="mt-0.5 text-2xl leading-none shrink-0">{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className={cn("text-sm", !isRead ? "font-bold text-[var(--foreground)]" : "font-medium text-[var(--foreground)]")}>
            {title}
          </p>
          <span className="shrink-0 text-xs text-[var(--muted)]">{time}</span>
        </div>
        <p className="mt-0.5 text-sm text-[var(--muted)] line-clamp-2">{description}</p>
      </div>
    </div>
  );
}
