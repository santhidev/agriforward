"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge, Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface ProductCardProduct {
  id: string;
  name: string;
  slug: string;
  unit: string;
  latestPriceMin: number;
  latestPriceMax: number;
  openOrderCount: number;
  isWatched: boolean;
}

interface ProductCardProps {
  product: ProductCardProduct;
  onToggleWatch: (productId: string) => void;
}

export function ProductCard({ product, onToggleWatch }: ProductCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-[var(--radius-2xl)] border border-[var(--border)] bg-[var(--surface)] p-3 sm:p-4 shadow-[var(--shadow-sm)]"
      )}
    >
      <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--surface-muted)]">
        <Image
          src={`/images/products/${product.slug}.jpg`}
          alt={product.name}
          width={64}
          height={64}
          className="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover"
          unoptimized
        />
      </div>

      <div className="flex-1 min-w-0 w-full text-center">
        <div className="flex items-start justify-between gap-1">
          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[var(--foreground)] truncate">{product.name}</h3>
          <button
            type="button"
            onClick={() => onToggleWatch(product.id)}
            aria-label={product.isWatched ? "เลิกติดตาม" : "ติดตาม"}
            className="shrink-0 p-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {product.isWatched ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="var(--color-danger)">
                <path d="M10 17.25l-1.45-1.32C3.4 11.36 1 9.28 1 6.5 1 4.42 2.42 3 4.5 3c1.17 0 2.28.54 3 1.38A4.08 4.08 0 0110.5 4.38C11.22 3.54 12.33 3 13.5 3 15.58 3 17 4.42 17 6.5c0 2.78-2.4 4.86-8.55 9.43L10 17.25z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--muted)" strokeWidth="1.5">
                <path d="M10 17.25l-1.45-1.32C3.4 11.36 1 9.28 1 6.5 1 4.42 2.42 3 4.5 3c1.17 0 2.28.54 3 1.38A4.08 4.08 0 0110.5 4.38C11.22 3.54 12.33 3 13.5 3 15.58 3 17 4.42 17 6.5c0 2.78-2.4 4.86-8.55 9.43L10 17.25z" />
              </svg>
            )}
          </button>
        </div>

        <p className="text-xs sm:text-sm lg:text-base font-semibold text-[var(--color-success)]">
          {product.latestPriceMin}–{product.latestPriceMax} บาท/กก.
        </p>

        {product.openOrderCount > 0 && (
          <Badge variant="blue" className="mt-1 text-[10px] sm:text-xs">มี {product.openOrderCount} งานซื้อ</Badge>
        )}

        <div className="mt-2 flex gap-1.5 sm:gap-2">
          <Button variant="buyer" size="sm" href={`/orders/new?productId=${product.id}`} className="h-9 sm:h-10 text-xs sm:text-sm flex-1">
            ซื้อ
          </Button>
          <Button variant="secondary" size="sm" href={`/products/${product.id}`} className="h-9 sm:h-10 text-xs sm:text-sm flex-1">
            ดู
          </Button>
        </div>
      </div>
    </div>
  );
}