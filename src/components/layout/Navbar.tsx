"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, type ReactNode } from "react";

const navItems = [
  { href: "/products", label: "สินค้า", icon: "🌿", badge: false },
  { href: "/orders", label: "งานของฉัน", icon: "📋", badge: false },
  { href: "/notifications", label: "ข่าวสาร", icon: "🔔", badge: true },
  { href: "/settings", label: "ฉัน", icon: "👤", badge: false },
] as const;

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-white/10 bg-[var(--color-primary)] text-white shadow-[var(--shadow)]",
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        {/* Brand */}
        <Link href="/" className="text-lg font-bold tracking-tight">
          AgriForward
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="เมนูหลัก"
        >
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-[var(--radius)] px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white",
                )}
                aria-current={active ? "page" : undefined}
              >
                <span className="mr-1.5 relative">
                  {item.icon}
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[var(--color-danger)]" />
                  )}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="rounded-[var(--radius)] p-2 text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "ปิดเมนู" : "เปิดเมนู"}
          aria-expanded={mobileOpen}
        >
          <svg
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <nav
          className="animate-slide-down border-t border-white/10 bg-[var(--color-primary)] px-4 pb-3 md:hidden"
          aria-label="เมนูหลัก"
        >
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-[var(--radius)] px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white",
                )}
                onClick={() => setMobileOpen(false)}
                aria-current={active ? "page" : undefined}
              >
                <span className="mr-2 relative">
                  {item.icon}
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[var(--color-danger)]" />
                  )}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
