"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar, BottomNav, PageContainer } from "@/components/layout";
import { BackButton } from "@/components/shared";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  useToast,
} from "@/components/ui";
import { OfferForm } from "@/components/offers/OfferForm";

const MOCK_ORDERS: Record<
  string,
  {
    id: string;
    productName: string;
    quantity: number;
    targetPrice: number | null;
  }
> = {
  "po-1": {
    id: "po-1",
    productName: "ทุเรียน",
    quantity: 100,
    targetPrice: 150,
  },
  "po-2": { id: "po-2", productName: "มังคุด", quantity: 50, targetPrice: 80 },
  "po-3": {
    id: "po-3",
    productName: "ทุเรียน",
    quantity: 300,
    targetPrice: 180,
  },
  "po-4": { id: "po-4", productName: "ละมุด", quantity: 400, targetPrice: 55 },
  "po-5": {
    id: "po-5",
    productName: "มังคุด",
    quantity: 600,
    targetPrice: 110,
  },
};

export default function NewOfferPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const poId = searchParams.get("poId");
  const order = poId ? MOCK_ORDERS[poId] : null;

  const handleSubmit = (data: { pricePerUnit: number; notes: string }) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast("เสนอขาย " + data.pricePerUnit + " บาท/กก. สำเร็จ", "success");
      router.push("/orders");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageContainer className="flex-1">
        <BackButton href="/orders" />

        <h1 className="mb-4 text-xl sm:text-2xl font-bold text-[var(--foreground)]">
          มาขาย
        </h1>

        {!order ? (
          <Card>
            <CardBody>
              <p className="text-center text-sm text-[var(--muted)]">
                กรุณาเลือกงานซื้อก่อน
              </p>
            </CardBody>
          </Card>
        ) : (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>ข้อมูลงานซื้อ</CardTitle>
              </CardHeader>
              <CardBody className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">สินค้า</span>
                  <span className="font-medium text-[var(--foreground)]">
                    {order.productName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">จำนวน</span>
                  <span className="font-medium text-[var(--foreground)]">
                    {order.quantity} กก.
                  </span>
                </div>
                {order.targetPrice && (
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">ราคาตั้ง</span>
                    <span className="font-medium text-[var(--foreground)]">
                      {order.targetPrice.toLocaleString()} บาท/กก.
                    </span>
                  </div>
                )}
              </CardBody>
            </Card>

            <OfferForm
              poProduct={order.productName}
              poQuantity={order.quantity}
              poTargetPrice={order.targetPrice}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </>
        )}
      </PageContainer>
      <BottomNav />
    </div>
  );
}
