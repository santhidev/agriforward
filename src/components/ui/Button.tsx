import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "buyer"
  | "danger"
  | "ghost"
  | "outline-light";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

type ButtonAsLink = BaseButtonProps & {
  href: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] active:bg-[var(--color-primary-dark)]",
  secondary:
    "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--surface-muted)] active:bg-[var(--border)]",
  success:
    "bg-[var(--color-seller)] text-white hover:bg-[var(--color-success)] active:bg-[var(--color-success)]",
  buyer:
    "bg-[var(--color-buyer)] text-white hover:bg-blue-700 active:bg-blue-800",
  danger:
    "bg-[var(--surface)] text-[var(--color-danger)] border border-[var(--color-danger)] hover:bg-[var(--color-danger-light)] active:bg-[var(--danger-light)]",
  ghost:
    "bg-transparent text-[var(--foreground)] hover:bg-black/5 active:bg-black/10",
  "outline-light":
    "bg-transparent text-white border-2 border-white/70 backdrop-blur hover:bg-white/10 active:bg-white/20",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2.5 text-base gap-2",
  lg: "px-5 py-3 text-lg gap-2",
  xl: "px-6 py-3.5 text-xl gap-2.5",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    icon,
    children,
    className,
    ...rest
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center rounded-[var(--radius-xl)] font-semibold transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/40 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props && props.href !== undefined) {
    return (
      <Link
        href={props.href}
        className={classes}
        {...(rest as Record<string, unknown>)}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
