import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercent?: boolean;
  className?: string;
}

export function ProgressBar({ value, max = 100, label, showPercent = false, className }: ProgressBarProps) {
  const percent = Math.round((value / max) * 100);
  return (
    <div className={cn("w-full", className)}>
      {(label || showPercent) && (
        <div className="mb-1 flex items-center justify-between text-sm">
          {label && <span className="font-medium text-[var(--foreground)]">{label}</span>}
          {showPercent && <span className="text-[var(--muted)]">{percent}%</span>}
        </div>
      )}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-[var(--border)]"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className="h-full rounded-full bg-[var(--color-primary)] transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
