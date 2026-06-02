"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar, BottomNav, PageContainer } from "@/components/layout";
import { BackButton } from "@/components/shared";
import {
  Input,
  Button,
  Card,
  CardBody,
  Select,
  Textarea,
  Badge,
  useToast,
} from "@/components/ui";

const MOCK_PRODUCTS = [
  { id: "1", name: "ทุเรียน", slug: "durian", marketPrice: 160 },
  { id: "2", name: "ละมุด", slug: "langsat", marketPrice: 55 },
  { id: "3", name: "มังคุด", slug: "mangosteen", marketPrice: 100 },
  { id: "4", name: "ลำไย", slug: "longan", marketPrice: 65 },
  { id: "5", name: "มะม่วง", slug: "mango", marketPrice: 85 },
  { id: "6", name: "มะนาว", slug: "lime", marketPrice: 40 },
];

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function getDefaultExpiry() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().split("T")[0];
}

const productOptions = MOCK_PRODUCTS.map((p) => ({
  value: p.id,
  label: p.name,
}));

export default function NewOrderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const paramProductId = searchParams?.get("productId") ?? null;

  const [selectedProductId, setSelectedProductId] = useState(
    paramProductId || "",
  );
  const [quantity, setQuantity] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [delivery, setDelivery] = useState<"pickup" | "delivery">("pickup");
  const [address, setAddress] = useState("");
  const [expiryDate, setExpiryDate] = useState(getDefaultExpiry);

  const product = MOCK_PRODUCTS.find((p) => p.id === selectedProductId);

  const qtyNum = parseFloat(quantity) || 0;
  const priceNum = parseFloat(targetPrice) || 0;
  const estimated =
    qtyNum > 0 && priceNum > 0
      ? qtyNum * priceNum
      : qtyNum > 0 && product
        ? qtyNum * product.marketPrice
        : 0;

  const handleSubmit = () => {
    toast("สร้างงานซื้อสำเร็จ", "success");
    router.push("/orders");
  };

  const canSubmit = qtyNum > 0 && !!product;
  const showProductSelect = !paramProductId && !product;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageContainer className="flex-1">
        <BackButton href="/products" />
        <h1 className="mb-4 text-xl sm:text-2xl font-bold text-[var(--foreground)]">
          ตั้งราคาซื้อ
        </h1>

        {showProductSelect && (
          <Select
            label="เลือกสินค้า"
            placeholder="-- เลือกสินค้า --"
            options={productOptions}
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
          />
        )}

        {product && (
          <>
            <Card className="mb-6">
              <CardBody className="flex gap-3">
                <div
                  className="h-12 w-12 sm:h-16 sm:w-16 shrink-0 rounded-[var(--radius)] bg-[var(--color-primary-light)] bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url(/images/products/" + product.slug + ".jpg)",
                  }}
                />
                <div>
                  <h2 className="text-sm sm:text-base font-semibold text-[var(--foreground)]">
                    {product.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--muted)]">
                    ราคาตลาด ~{product.marketPrice.toLocaleString()} บาท/กก.
                  </p>
                </div>
              </CardBody>
            </Card>

            <div className="space-y-1">
              <Input
                label="ต้องการกี่กิโลกรัม?"
                type="number"
                step="0.5"
                min="0.5"
                placeholder="เช่น 100"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <div>
                <Input
                  label="อยากได้ราคาเท่าไรต่อกก.?"
                  type="number"
                  step="1"
                  min="0"
                  placeholder="ใส่หรือไม่ใส่ก็ได้"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                />
                {!targetPrice && (
                  <Badge variant="blue" className="mt-1">
                    เปิดขายฟรี (ให้เกษตรกรเสนอราคา)
                  </Badge>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
                วันที่หมดอายุรับซื้อ
              </label>
              <input
                type="date"
                min={getToday()}
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-base text-[var(--foreground)] transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
              />
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
                ช่องทางการรับสินค้า
              </label>
              <div className="flex gap-6">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={delivery === "pickup"}
                    onChange={() => setDelivery("pickup")}
                    className="accent-[var(--color-primary)]"
                  />
                  <span className="text-sm text-[var(--foreground)]">
                    รับเอง
                  </span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="delivery"
                    value="delivery"
                    checked={delivery === "delivery"}
                    onChange={() => setDelivery("delivery")}
                    className="accent-[var(--color-primary)]"
                  />
                  <span className="text-sm text-[var(--foreground)]">
                    ส่งถึงที่
                  </span>
                </label>
              </div>
              {delivery === "delivery" && (
                <Textarea
                  label="ที่อยู่จัดส่ง"
                  placeholder="กรอกที่อยู่สำหรับจัดส่ง"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              )}
            </div>

            {estimated > 0 && (
              <div className="mt-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="flex justify-between text-base font-semibold text-[var(--foreground)]">
                  <span>รวมประมาณ</span>
                  <span>{estimated.toLocaleString()} บาท</span>
                </div>
              </div>
            )}

            <div className="mt-6 space-y-3">
              <Button
                variant="primary"
                size="xl"
                fullWidth
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="h-14"
              >
                เปิดรับขาย
              </Button>
              <Button
                variant="secondary"
                size="lg"
                fullWidth
                onClick={() => router.back()}
              >
                ยกเลิก
              </Button>
            </div>
          </>
        )}
      </PageContainer>
      <BottomNav />
    </div>
  );
}
