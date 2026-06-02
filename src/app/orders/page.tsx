"use client";

import { useState } from "react";
import { Navbar, BottomNav, PageContainer } from "@/components/layout";
import { EmptyState, Button } from "@/components/ui";
import { HelpFab, CategoryFilter } from "@/components/shared";
import { PoCard, OfferCard } from "@/components/orders";

const buyerStatusLabels = [
  "ทั้งหมด",
  "เปิดรับ",
  "รอชำระ",
  "สำเร็จ",
  "ยกเลิก",
] as const;
const sellerStatusLabels = ["ทั้งหมด", "เปิดรับ", "สำเร็จ", "ยกเลิก"] as const;

const labelToBuyerStatuses: Record<string, string[]> = {
  ทั้งหมด: [],
  เปิดรับ: ["Open"],
  รอชำระ: ["PaymentPending"],
  สำเร็จ: ["Fulfilled"],
  ยกเลิก: ["Cancelled", "Expired"],
};

const labelToSellerStatuses: Record<string, string[]> = {
  ทั้งหมด: [],
  เปิดรับ: ["Open", "Selected"],
  สำเร็จ: ["Accepted"],
  ยกเลิก: ["Withdrawn", "Rejected"],
};

const mockBuyerOrders = [
  {
    id: "po-1",
    productName: "ทุเรียน",
    productSlug: "durian",
    quantity: 100,
    targetPrice: 150,
    status: "Open",
    createdAt: "2026-06-01T10:00:00Z",
    offerCount: 3,
  },
  {
    id: "po-2",
    productName: "มังคุด",
    productSlug: "mangosteen",
    quantity: 50,
    targetPrice: 80,
    status: "PaymentPending",
    createdAt: "2026-05-28T08:00:00Z",
    offerCount: 5,
  },
  {
    id: "po-3",
    productName: "ลำใย",
    productSlug: "longan",
    quantity: 200,
    targetPrice: null,
    status: "Draft",
    createdAt: "2026-06-02T14:00:00Z",
    offerCount: 0,
  },
  {
    id: "po-4",
    productName: "มะม่วง",
    productSlug: "mango",
    quantity: 80,
    targetPrice: 60,
    status: "Open",
    createdAt: "2026-05-30T09:00:00Z",
    offerCount: 2,
  },
  {
    id: "po-5",
    productName: "เงาะ",
    productSlug: "rambutan",
    quantity: 120,
    targetPrice: 45,
    status: "AwaitingSellerConfirm",
    createdAt: "2026-05-27T11:00:00Z",
    offerCount: 4,
  },
  {
    id: "po-6",
    productName: "ส้มโอ",
    productSlug: "pomelo",
    quantity: 60,
    targetPrice: 120,
    status: "Contract",
    createdAt: "2026-05-25T07:00:00Z",
    offerCount: 1,
  },
  {
    id: "po-7",
    productName: "กล้วยหอม",
    productSlug: "banana",
    quantity: 300,
    targetPrice: 25,
    status: "Fulfilled",
    createdAt: "2026-05-20T08:00:00Z",
    offerCount: 6,
  },
  {
    id: "po-8",
    productName: "มะพร้าว",
    productSlug: "coconut",
    quantity: 150,
    targetPrice: 35,
    status: "Cancelled",
    createdAt: "2026-05-15T16:00:00Z",
    offerCount: 2,
  },
];

const mockSellerOffers = [
  {
    id: "offer-1",
    sellerName: "สมชาย เกษตรกร",
    pricePerUnit: 145,
    totalPrice: 14500,
    depositAmount: 725,
    notes: "ทุเรียนหมอน ระดับ A ส่งได้ทันที",
    status: "Open",
  },
  {
    id: "offer-2",
    sellerName: "วิภา สวนผลไม้",
    pricePerUnit: 78,
    totalPrice: 3900,
    depositAmount: 195,
    notes: null,
    status: "Open",
  },
  {
    id: "offer-3",
    sellerName: "ประเสริฐ ฟาร์มใหญ่",
    pricePerUnit: 55,
    totalPrice: 4400,
    depositAmount: 220,
    notes: "มะม่วงน้ำดอกไม้ เกรดพรีเมียม",
    status: "Selected",
  },
  {
    id: "offer-4",
    sellerName: "มาลี สวนสมุนไพร",
    pricePerUnit: 42,
    totalPrice: 5040,
    depositAmount: 252,
    notes: null,
    status: "Accepted",
  },
  {
    id: "offer-5",
    sellerName: "สมศักดิ์ ไร่พอเพียง",
    pricePerUnit: 28,
    totalPrice: 8400,
    depositAmount: 420,
    notes: "กล้วยหอมทอง ส่งอาทิตย์ละ 50 กก.",
    status: "Withdrawn",
  },
  {
    id: "offer-6",
    sellerName: "รัตนา สวนตะวันออก",
    pricePerUnit: 160,
    totalPrice: 16000,
    depositAmount: 800,
    notes: "ทุเรียนหลงลับแล จำนวนจำกัด",
    status: "Rejected",
  },
];

export default function OrdersPage() {
  const [tab, setTab] = useState<"buyer" | "seller">("buyer");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");
  const statusMap =
    tab === "buyer" ? labelToBuyerStatuses : labelToSellerStatuses;

  const filteredBuyerOrders =
    statusFilter === "ทั้งหมด"
      ? mockBuyerOrders
      : mockBuyerOrders.filter((o) =>
          labelToBuyerStatuses[statusFilter]?.includes(o.status),
        );

  const filteredSellerOffers =
    statusFilter === "ทั้งหมด"
      ? mockSellerOffers
      : mockSellerOffers.filter((o) =>
          labelToSellerStatuses[statusFilter]?.includes(o.status),
        );

  const activeLabels = tab === "buyer" ? buyerStatusLabels : sellerStatusLabels;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageContainer className="flex-1">
        <h1 className="mb-4 text-xl sm:text-2xl font-bold text-[var(--foreground)]">
          งานของฉัน
        </h1>

        <div className="mb-4">
          <CategoryFilter
            items={activeLabels}
            active={statusFilter}
            onChange={setStatusFilter}
          />
        </div>

        <div className="mb-4 flex rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-1">
          <button
            onClick={() => setTab("buyer")}
            className={
              "flex-1 rounded-[var(--radius)] py-2.5 text-sm font-semibold transition-colors " +
              (tab === "buyer"
                ? "bg-[var(--color-buyer)] text-white"
                : "text-[var(--muted)] hover:text-[var(--foreground)]")
            }
          >
            กำลังซื้อ
          </button>
          <button
            onClick={() => setTab("seller")}
            className={
              "flex-1 rounded-[var(--radius)] py-2.5 text-sm font-semibold transition-colors " +
              (tab === "seller"
                ? "bg-[var(--color-seller)] text-white"
                : "text-[var(--muted)] hover:text-[var(--foreground)]")
            }
          >
            กำลังขาย
          </button>
        </div>

        {tab === "buyer" &&
          (filteredBuyerOrders.length === 0 ? (
            <EmptyState
              icon="📋"
              title="ไม่มีงานในสถานะนี้"
              description="ลองเปลี่ยนตัวกรองสถานะ"
              action={
                <Button variant="primary" href="/products">
                  ดูสินค้า
                </Button>
              }
            />
          ) : (
            filteredBuyerOrders.map((o) => <PoCard key={o.id} order={o} />)
          ))}

        {tab === "seller" &&
          (filteredSellerOffers.length === 0 ? (
            <EmptyState
              icon="🌿"
              title="ไม่มีงานในสถานะนี้"
              description="ลองเปลี่ยนตัวกรองสถานะ"
              action={
                <Button variant="success" href="/products">
                  ดูสินค้า
                </Button>
              }
            />
          ) : (
            filteredSellerOffers.map((o) => (
              <OfferCard
                key={o.id}
                offer={o}
                isBuyerView={false}
                onWithdraw={() => {}}
              />
            ))
          ))}
      </PageContainer>
      <HelpFab />
      <BottomNav />
    </div>
  );
}
