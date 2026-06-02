"use client";

import Image from "next/image";
import { Badge, EmptyState } from "@/components/ui";

interface WatchlistProduct {
  id: string;
  name: string;
  slug: string;
  unit: string;
  latestPriceMin: number;
  latestPriceMax: number;
  openOrderCount: number;
  isWatched: boolean;
}

interface WatchlistSectionProps {
  products: WatchlistProduct[];
  loading?: boolean;
  onToggleWatch: (productId: string) => void;
}

export function WatchlistSection({ products, loading, onToggleWatch }: WatchlistSectionProps) {
  if (loading) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-28 w-36 shrink-0 animate-pulse rounded-[var(--radius-lg)] bg-[var(--surface-muted)]" />
        ))}
      </div>
    );
  }

  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-[var(--foreground)]">👀 สินค้าที่ติดตาม</h2>
      {products.length === 0 ? (
        <EmptyState
          icon="❤️"
          title="ยังไม่ได้ติดตามสินค้า"
          description="กด ❤️ ที่สินค้าที่สนใจ"
        />
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {products.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onToggleWatch(p.id)}
              className="flex shrink-0 flex-col items-center gap-1.5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow)] w-28"
            >
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[var(--surface-muted)]">
                <Image
                  src={`/images/products/${p.slug}.jpg`}
                  alt={p.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                  unoptimized
                />
              </div>
              <span className="text-sm font-medium text-[var(--foreground)] truncate w-full text-center">{p.name}</span>
              <span className="text-xs font-semibold text-[var(--color-success)]">
                {p.latestPriceMin}–{p.latestPriceMax}
              </span>
              {p.openOrderCount > 0 && (
                <Badge variant="blue">มี {p.openOrderCount} งานซื้อ</Badge>
              )}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}