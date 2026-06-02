import Link from "next/link";
import type { ReactNode } from "react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-6 text-center text-xs text-[var(--muted)]">
      <div className="mx-auto max-w-5xl px-4">
        <p>
          © 2026 AgriForward — แลกเปลี่ยนสินค้าเกษตรโดยตรง
        </p>
        <p className="mt-2 flex items-center justify-center gap-3">
          <Link href="/help" className="hover:text-[var(--foreground)] transition-colors">
            ช่วยเหลือ
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/terms" className="hover:text-[var(--foreground)] transition-colors">
            เงื่อนไข
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/privacy" className="hover:text-[var(--foreground)] transition-colors">
            ความเป็นสี่วตัว
          </Link>
        </p>
      </div>
    </footer>
  );
}
