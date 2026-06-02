"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { Navbar, BottomNav, PageContainer } from "@/components/layout";
import { BackButton, HelpFab } from "@/components/shared";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  SkeletonCard,
} from "@/components/ui";
import { StatusBadge } from "@/components/products";

const PRODUCTS: Record<
  string,
  {
    id: string;
    name: string;
    slug: string;
    unit: string;
    category: string;
    latestPriceMin: number;
    latestPriceMax: number;
  }
> = {
  "1": {
    id: "1",
    name: "ทุเรียน",
    slug: "durian",
    unit: "กก.",
    category: "ผลไม้",
    latestPriceMin: 120,
    latestPriceMax: 180,
  },
  "2": {
    id: "2",
    name: "ละมุด",
    slug: "langsat",
    unit: "กก.",
    category: "ผลไม้",
    latestPriceMin: 40,
    latestPriceMax: 60,
  },
  "3": {
    id: "3",
    name: "มังคุด",
    slug: "mangosteen",
    unit: "กก.",
    category: "ผลไม้",
    latestPriceMin: 80,
    latestPriceMax: 120,
  },
  "4": {
    id: "4",
    name: "ลำไย",
    slug: "longan",
    unit: "กก.",
    category: "ผลไม้",
    latestPriceMin: 50,
    latestPriceMax: 80,
  },
  "5": {
    id: "5",
    name: "มะม่วง",
    slug: "mango",
    unit: "กก.",
    category: "ผลไม้",
    latestPriceMin: 60,
    latestPriceMax: 100,
  },
  "6": {
    id: "6",
    name: "มะนาว",
    slug: "lime",
    unit: "กก.",
    category: "ผลไม้",
    latestPriceMin: 30,
    latestPriceMax: 50,
  },
};

const MOCK_POS: Record<
  string,
  {
    id: string;
    title: string;
    quantity: number;
    priceMin: number;
    priceMax: number;
    status: string;
  }[]
> = {
  "1": [
    {
      id: "po-1",
      title: "รับซื้อทุเรียนหมอนทอง 500 กก.",
      quantity: 500,
      priceMin: 130,
      priceMax: 170,
      status: "Open",
    },
    {
      id: "po-2",
      title: "รับซื้อทุเรียนชะมด 200 กก.",
      quantity: 200,
      priceMin: 100,
      priceMax: 140,
      status: "Open",
    },
    {
      id: "po-3",
      title: "รับซื้อทุเรียนก้านยาว 300 กก.",
      quantity: 300,
      priceMin: 150,
      priceMax: 180,
      status: "AwaitingSellerConfirm",
    },
  ],
  "2": [
    {
      id: "po-4",
      title: "รับซื้อละมุด 400 กก.",
      quantity: 400,
      priceMin: 40,
      priceMax: 55,
      status: "Open",
    },
  ],
  "3": [
    {
      id: "po-5",
      title: "รับซื้อมังคุด 600 กก.",
      quantity: 600,
      priceMin: 85,
      priceMax: 110,
      status: "Open",
    },
    {
      id: "po-6",
      title: "รับซื้อมังคุดเกรดพรีเมียม 100 กก.",
      quantity: 100,
      priceMin: 100,
      priceMax: 120,
      status: "PaymentPending",
    },
    {
      id: "po-7",
      title: "รับซื้อมังคุด 300 กก.",
      quantity: 300,
      priceMin: 80,
      priceMax: 95,
      status: "Open",
    },
    {
      id: "po-8",
      title: "รับซื้อมังคุด 250 กก.",
      quantity: 250,
      priceMin: 90,
      priceMax: 115,
      status: "Open",
    },
    {
      id: "po-9",
      title: "รับซื้อมังคุด 150 กก.",
      quantity: 150,
      priceMin: 80,
      priceMax: 100,
      status: "Contract",
    },
  ],
  "4": [
    {
      id: "po-12",
      title: "รับซื้อลำไยเกรดพรีเมียม 300 กก.",
      quantity: 300,
      priceMin: 55,
      priceMax: 75,
      status: "Open",
    },
    {
      id: "po-13",
      title: "รับซื้อลำไยอบแห้ง 200 กก.",
      quantity: 200,
      priceMin: 45,
      priceMax: 60,
      status: "Draft",
    },
  ],
  "5": [
    {
      id: "po-10",
      title: "รับซื้อมะม่วงน้ำดอกไม้ 350 กก.",
      quantity: 350,
      priceMin: 60,
      priceMax: 90,
      status: "Open",
    },
    {
      id: "po-11",
      title: "รับซื้อมะม่วงเขียวเสวย 200 กก.",
      quantity: 200,
      priceMin: 70,
      priceMax: 100,
      status: "Open",
    },
  ],
  "6": [
    {
      id: "po-14",
      title: "รับซื้อมะนาวแป้น 100 กก.",
      quantity: 100,
      priceMin: 35,
      priceMax: 50,
      status: "Open",
    },
    {
      id: "po-15",
      title: "รับซื้อมะนาวไร้เมล็ด 50 กก.",
      quantity: 50,
      priceMin: 40,
      priceMax: 55,
      status: "Fulfilled",
    },
  ],
};

const MARKET_HISTORY: Record<string, number[]> = {
  "1": [150, 155, 148, 160, 158, 165, 170],
  "2": [45, 48, 42, 50, 52, 48, 55],
  "3": [95, 100, 90, 105, 110, 108, 115],
  "4": [60, 55, 58, 62, 65, 60, 68],
  "5": [75, 80, 72, 78, 85, 82, 88],
  "6": [35, 38, 32, 40, 42, 38, 45],
};

function MiniBarChart({ data, max }: { data: number[]; max: number }) {
  return (
    <div className="flex items-end gap-0.5 h-10">
      {data.map((val, i) => (
        <div
          key={i}
          className="w-3 rounded-t-sm bg-[var(--color-primary)]/30 transition-all"
          style={{ height: `${(val / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = PRODUCTS[productId];
  const openPOs = MOCK_POS[productId] || [];
  const history = MARKET_HISTORY[productId] || [];
  const [isWatched, setIsWatched] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, [productId]);

  const handleToggleWatch = useCallback(() => {
    setIsWatched((v) => !v);
  }, []);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <PageContainer className="flex-1">
          <BackButton />
          <p className="text-[var(--muted)]">ไม่พบสินค้า</p>
        </PageContainer>
        <BottomNav />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <PageContainer className="flex-1">
          <BackButton />
          <div className="space-y-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </PageContainer>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageContainer className="flex-1">
        <BackButton />

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 sm:h-28 sm:w-28 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--surface-muted)]">
            <Image
              src={"/images/products/" + product.slug + ".jpg"}
              alt={product.name}
              width={112}
              height={112}
              className="h-20 w-20 sm:h-28 sm:w-28 rounded-full object-cover"
              unoptimized
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--foreground)]">
              {product.name}
            </h1>
            <span className="mt-1 inline-block rounded-full bg-[var(--surface-muted)] px-2.5 py-0.5 text-xs font-medium text-[var(--muted)]">
              {product.category}
            </span>
            <p className="mt-1 text-lg sm:text-xl font-semibold text-[var(--color-success)]">
              {product.latestPriceMin}–{product.latestPriceMax} บาท/
              {product.unit}
            </p>
            <div className="mt-3 flex items-center justify-center gap-3 sm:justify-start">
              <Button
                variant="buyer"
                size="xl"
                href={"/orders/new?productId=" + product.id}
              >
                ฉันอยากซื้อ
              </Button>
              <Button
                variant={isWatched ? "ghost" : "secondary"}
                size="md"
                onClick={handleToggleWatch}
              >
                {isWatched ? "❤️ ติดตามแล้ว" : "🤍 ติดตาม"}
              </Button>
            </div>
          </div>
        </div>

        {history.length > 0 && (
          <section className="mt-6">
            <h2 className="mb-2 text-sm font-semibold text-[var(--muted)]">
              ราคาย้อนหลัง 7 วัน
            </h2>
            <Card>
              <CardBody>
                <MiniBarChart data={history} max={Math.max(...history)} />
                <p className="mt-1 text-xs text-[var(--muted)] text-right">
                  {history[history.length - 1]} บาท/{product.unit}
                </p>
              </CardBody>
            </Card>
          </section>
        )}

        <section className="mt-8">
          <h2 className="mb-4 text-lg sm:text-xl font-semibold text-[var(--foreground)]">
            มีคนซื้ออะไรบ้าง
          </h2>
          {openPOs.length === 0 ? (
            <p className="text-[var(--muted)]">
              ยังไม่มีงานซื้อสำหรับสินค้านี้
            </p>
          ) : (
            <div className="space-y-3">
              {openPOs.map((po) => (
                <Card key={po.id}>
                  <CardHeader>
                    <CardTitle>{po.title}</CardTitle>
                    <StatusBadge status={po.status} />
                  </CardHeader>
                  <CardBody>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs sm:text-sm text-[var(--muted)]">
                          {"จำนวน " +
                            po.quantity +
                            " กก. · " +
                            po.priceMin +
                            "–" +
                            po.priceMax +
                            " บาท/กก."}
                        </p>
                      </div>
                      <Button
                        variant="success"
                        size="md"
                        href={"/offers/new?poId=" + po.id}
                      >
                        ฉันจะขาย
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </section>
      </PageContainer>
      <BottomNav />
      <HelpFab />
    </div>
  );
}
