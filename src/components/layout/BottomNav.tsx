"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/products", label: "สินค้า", icon: "🌿", badge: false },
  { href: "/orders", label: "งานของฉัน", icon: "📋", badge: false },
  { href: "/notifications", label: "ข่าวสาร", icon: "🔔", badge: true },
  { href: "/settings", label: "ฉัน", icon: "👤", badge: false },
] as const;

/**
 * BottomNav — Mobile bottom navigation bar
 * Fitts's Law: h-14 (56px) for thumb reachability
 * Miller's Law: 4 tabs only
 * Jakob's Law: Same pattern as Line/Shopee
 */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--surface)] md:hidden"
      aria-label="เมนูล่าง"
    >
      <ul className="flex h-14 items-center justify-around">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1 text-xs font-medium transition-colors",
                  active
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]",
                )}
                aria-current={active ? "page" : undefined}
              >
                <span className="text-xl leading-none relative">
                  {item.icon}
                  {item.badge && (
                    <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[var(--color-danger)]" />
                  )}
                </span>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
