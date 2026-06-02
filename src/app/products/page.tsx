"use client";

import { useState, useCallback, useEffect } from "react";
import { Navbar, BottomNav, Footer, PageContainer } from "@/components/layout";
import { HelpFab, CategoryFilter } from "@/components/shared";
import {
  ProductGrid,
  ProductSearch,
  WatchlistSection,
} from "@/components/products";
import { SkeletonCard } from "@/components/ui";

const CATEGORIES = ["ทั้งหมด", "ผลไม้", "ผัก", "ข้าว"] as const;

const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "ทุเรียน",
    slug: "durian",
    unit: "กก.",
    category: "ผลไม้",
    latestPriceMin: 120,
    latestPriceMax: 180,
    openOrderCount: 3,
    isWatched: false,
  },
  {
    id: "2",
    name: "ละมุด",
    slug: "langsat",
    unit: "กก.",
    category: "ผลไม้",
    latestPriceMin: 40,
    latestPriceMax: 60,
    openOrderCount: 1,
    isWatched: true,
  },
  {
    id: "3",
    name: "มังคุด",
    slug: "mangosteen",
    unit: "กก.",
    category: "ผลไม้",
    latestPriceMin: 80,
    latestPriceMax: 120,
    openOrderCount: 5,
    isWatched: false,
  },
  {
    id: "4",
    name: "ลำไย",
    slug: "longan",
    unit: "กก.",
    category: "ผลไม้",
    latestPriceMin: 50,
    latestPriceMax: 80,
    openOrderCount: 0,
    isWatched: true,
  },
  {
    id: "5",
    name: "มะม่วง",
    slug: "mango",
    unit: "กก.",
    category: "ผลไม้",
    latestPriceMin: 60,
    latestPriceMax: 100,
    openOrderCount: 2,
    isWatched: false,
  },
  {
    id: "6",
    name: "มะนาว",
    slug: "lime",
    unit: "กก.",
    category: "ผลไม้",
    latestPriceMin: 30,
    latestPriceMax: 50,
    openOrderCount: 0,
    isWatched: false,
  },
  {
    id: "7",
    name: "ผักคะน้า",
    slug: "kale",
    unit: "กก.",
    category: "ผัก",
    latestPriceMin: 25,
    latestPriceMax: 40,
    openOrderCount: 2,
    isWatched: false,
  },
  {
    id: "8",
    name: "ข้าวหอมมะลิ",
    slug: "jasmine-rice",
    unit: "กก.",
    category: "ข้าว",
    latestPriceMin: 30,
    latestPriceMax: 45,
    openOrderCount: 3,
    isWatched: false,
  },
];

type Tab = "ทั้งหมด" | "ติดตามแล้ว";

export default function ProductsPage() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [tab, setTab] = useState<Tab>("ทั้งหมด");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("ทั้งหมด");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const handleToggleWatch = useCallback((productId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, isWatched: !p.isWatched } : p,
      ),
    );
  }, []);

  const filtered = products.filter((p) => {
    if (!p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== "ทั้งหมด" && p.category !== category) return false;
    return true;
  });
  const watched = filtered.filter((p) => p.isWatched);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageContainer className="flex-1">
        <h1 className="mb-4 text-xl sm:text-2xl font-bold text-[var(--foreground)]">
          มีคนซื้ออะไรบ้าง
        </h1>

        <div className="mb-4 flex gap-1 rounded-[var(--radius)] bg-[var(--surface-muted)] p-1">
          {(["ทั้งหมด", "ติดตามแล้ว"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`flex-1 rounded-[var(--radius)] py-2 text-sm font-semibold transition-colors ${
                tab === t
                  ? "bg-[var(--surface)] text-[var(--foreground)] shadow-sm"
                  : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mb-3">
          <ProductSearch value={search} onChange={setSearch} />
        </div>

        {tab === "ทั้งหมด" && (
          <div className="mb-4">
            <CategoryFilter
              items={CATEGORIES}
              active={category}
              onChange={setCategory}
            />
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : tab === "ทั้งหมด" ? (
          <ProductGrid products={filtered} onToggleWatch={handleToggleWatch} />
        ) : (
          <WatchlistSection
            products={watched}
            onToggleWatch={handleToggleWatch}
          />
        )}
      </PageContainer>
      <Footer />
      <BottomNav />
      <HelpFab />
    </div>
  );
}
