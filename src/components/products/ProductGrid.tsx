"use client";

import { SkeletonCard, EmptyState } from "@/components/ui";
import { ProductCard } from "./ProductCard";

interface ProductGridProduct {
  id: string;
  name: string;
  slug: string;
  unit: string;
  latestPriceMin: number;
  latestPriceMax: number;
  openOrderCount: number;
  isWatched: boolean;
}

interface ProductGridProps {
  products: ProductGridProduct[];
  loading?: boolean;
  onToggleWatch: (productId: string) => void;
}

export function ProductGrid({ products, loading, onToggleWatch }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <EmptyState icon="🌿" title="ยังไม่มีสินค้า" />;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onToggleWatch={onToggleWatch} />
      ))}
    </div>
  );
}