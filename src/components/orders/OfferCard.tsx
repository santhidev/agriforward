"use client";

import { useState } from "react";
import { Card, CardBody, Button, ConfirmDialog } from "@/components/ui";
import { StatusBadge } from "@/components/products/StatusBadge";

interface OfferCardProps {
  offer: {
    id: string;
    sellerName: string;
    pricePerUnit: number;
    totalPrice: number;
    depositAmount: number;
    notes?: string | null;
    status: string;
  };
  isBuyerView: boolean;
  onSelect?: () => void;
  onWithdraw?: () => void;
}

export function OfferCard({ offer, isBuyerView, onSelect, onWithdraw }: OfferCardProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirm = () => {
    setConfirmOpen(false);
    if (isBuyerView) {
      onSelect?.();
    } else {
      onWithdraw?.();
    }
  };

  return (
    <>
      <Card className="mb-3">
        <CardBody>
          <div className="mb-2 flex items-start justify-between gap-2">
            <span className="text-sm sm:text-base font-semibold text-[var(--foreground)]">
              {offer.sellerName}
            </span>
            <StatusBadge status={offer.status} />
          </div>
          <div className="mb-1 text-xs sm:text-sm text-[var(--foreground)]">
            {offer.pricePerUnit.toLocaleString()} บาท/กก.
          </div>
          <div className="mb-2 text-sm sm:text-base font-medium text-[var(--foreground)]">
            รวม {offer.totalPrice.toLocaleString()} บาท
          </div>
          <div className="mb-2 text-xs text-[var(--muted)]">
            มัดจำ {offer.depositAmount.toLocaleString()} บาท (คืนเมื่อขายสำเร็จ)
          </div>
          {offer.notes && (
            <p className="mb-2 rounded-[var(--radius)] bg-[var(--color-warning-light)] p-2 text-xs text-[var(--foreground)]">
              {offer.notes}
            </p>
          )}
          {isBuyerView && onSelect && (
            <Button
              variant="buyer"
              size="md"
              fullWidth
              onClick={() => setConfirmOpen(true)}
            >
              เลือกคนขายนี้
            </Button>
          )}
          {!isBuyerView && onWithdraw && (
            <Button
              variant="danger"
              size="md"
              fullWidth
              onClick={() => setConfirmOpen(true)}
            >
              ถอนขาย
            </Button>
          )}
        </CardBody>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        title={isBuyerView ? "ยืนยันเลือกคนขาย" : "ยืนยันถอนขาย"}
        variant={isBuyerView ? "primary" : "danger"}
        confirmLabel={isBuyerView ? "เลือก" : "ถอน"}
      >
        {isBuyerView ? (
          <>คุณต้องการเลือก <strong>{offer.sellerName}</strong> ในราคา {offer.pricePerUnit.toLocaleString()} บาท/กก. หรือไม่? หลังจากเลือกแล้วจะต้องดำเนินการชำระเงิน</>
        ) : (
          <>คุณต้องการถอนขายหรือไม่? มัดจำจะคืนภายใน 3-5 วันทำการ</>
        )}
      </ConfirmDialog>
    </>
  );
}