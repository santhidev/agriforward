"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

type DeliveryOption = "self-pickup" | "platform-logistics";

interface CheckoutDeliveryProps {
  deliveryOption: DeliveryOption;
  shippingFee: number;
  productTotal: number;
  onSelectDelivery: (option: DeliveryOption) => void;
  onConfirm: () => void;
}

export function CheckoutDelivery({
  deliveryOption,
  shippingFee,
  productTotal,
  onSelectDelivery,
  onConfirm,
}: CheckoutDeliveryProps) {
  const total = productTotal + (deliveryOption === "platform-logistics" ? shippingFee : 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onSelectDelivery("self-pickup")}
          className={cn(
            "flex flex-col items-center gap-2 rounded-[var(--radius-xl)] border-2 p-4 text-center transition-colors",
            deliveryOption === "self-pickup"
              ? "border-[var(--color-success)] bg-[var(--color-success-light)]"
              : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--color-success)]/30"
          )}
        >
          <span className="text-3xl">🏢</span>
          <span className="text-base font-bold text-[var(--foreground)]">รับเอง</span>
          <span className="text-sm font-semibold text-[var(--color-success)]">(ฟรี)</span>
          <span className="text-xs text-[var(--muted)]">รับสินค้าที่จุดส่งด้วยตัวเอง</span>
        </button>
        <button
          type="button"
          onClick={() => onSelectDelivery("platform-logistics")}
          className={cn(
            "flex flex-col items-center gap-2 rounded-[var(--radius-xl)] border-2 p-4 text-center transition-colors",
            deliveryOption === "platform-logistics"
              ? "border-[var(--color-buyer)] bg-[var(--color-info-light)]"
              : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--color-buyer)]/30"
          )}
        >
          <span className="text-3xl">🚚</span>
          <span className="text-base font-bold text-[var(--foreground)]">ส่งถึงที่</span>
          <span className="text-sm font-semibold text-[var(--color-buyer)]">
            (+{shippingFee.toLocaleString()} บาท)
          </span>
          <span className="text-xs text-[var(--muted)]">รถขนส่งมาส่งถึงที่อยู่ของคุณ</span>
        </button>
      </div>

      <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4 space-y-2">
        <div className="flex justify-between text-sm text-[var(--foreground)]">
          <span>ราคาสินค้า</span>
          <span>{productTotal.toLocaleString()} บาท</span>
        </div>
        <div className="flex justify-between text-sm text-[var(--foreground)]">
          <span>ค่าขนส่ง</span>
          <span>
            {deliveryOption === "platform-logistics"
              ? `${shippingFee.toLocaleString()} บาท`
              : "ฟรี"}
          </span>
        </div>
        <div className="border-t border-[var(--border)] pt-2 flex justify-between text-base font-bold text-[var(--foreground)]">
          <span>รวม</span>
          <span>{total.toLocaleString()} บาท</span>
        </div>
      </div>

      <Button
        variant="primary"
        size="xl"
        fullWidth
        onClick={onConfirm}
        className="h-14"
      >
        ยืนยันจ่ายเงิน
      </Button>
    </div>
  );
}