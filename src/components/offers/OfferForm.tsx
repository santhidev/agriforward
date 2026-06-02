"use client";

import { useState } from "react";
import { Input, Textarea, Button, ConfirmDialog, Spinner } from "@/components/ui";

interface OfferFormProps {
  poProduct: string;
  poQuantity: number;
  poTargetPrice?: number | null;
  onSubmit: (data: { pricePerUnit: number; notes: string }) => void;
  loading?: boolean;
}

export function OfferForm({ poProduct, poQuantity, poTargetPrice, onSubmit, loading }: OfferFormProps) {
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const priceNum = parseFloat(price) || 0;
  const total = priceNum * poQuantity;
  const deposit = Math.min(total * 0.05, 1000);
  const canSubmit = priceNum > 0;

  const handleSubmit = () => {
    setConfirmOpen(false);
    onSubmit({ pricePerUnit: priceNum, notes: notes.trim() });
  };

  return (
    <>
      <div className="space-y-4">
        <Input
          label="จะขายเท่าไร?"
          type="number"
          step="0.5"
          min="0"
          placeholder={poTargetPrice ? `ราคาตั้ง ${poTargetPrice.toLocaleString()} บาท/กก.` : "ราคาต่อกิโลกรัม"}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          hint="บาท/กก."
        />

        {priceNum > 0 && (
          <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--muted)]">รวม</span>
              <span className="font-semibold text-[var(--foreground)]">
                {total.toLocaleString()} บาท
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--muted)]">จ่ายมัดจำ</span>
              <span className="font-semibold text-[var(--foreground)]">
                {deposit.toLocaleString()} บาท (5%, สูงสุด 1,000 บาท)
              </span>
            </div>
            <p className="text-xs font-medium text-[var(--color-success)]">
              คืนเมื่อขายสำเร็จ
            </p>
          </div>
        )}

        <Textarea
          label="หมายเหตุ (ถ้ามี)"
          placeholder="เช่น สินค้าระดับพรีเมียม ส่งได้ทันที"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          hint="ใส่หรือไม่ใส่ก็ได้"
        />

        <Button
          variant="success"
          size="xl"
          fullWidth
          onClick={() => setConfirmOpen(true)}
          disabled={!canSubmit || loading}
          className="h-14"
        >
          {loading ? <Spinner size="sm" /> : "ยืนยันขาย"}
        </Button>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleSubmit}
        title="ยืนยันขาย"
        confirmLabel="ยืนยัน"
        loading={loading}
      >
        <div className="space-y-1">
          <p>สินค้า: <strong>{poProduct}</strong></p>
          <p>ราคา: <strong>{priceNum.toLocaleString()} บาท/กก.</strong></p>
          <p>จำนวน: <strong>{poQuantity} กก.</strong></p>
          <p>รวม: <strong>{total.toLocaleString()} บาท</strong></p>
          <p>มัดจำ: <strong>{deposit.toLocaleString()} บาท</strong> (คืนเมื่อขายสำเร็จ)</p>
        </div>
      </ConfirmDialog>
    </>
  );
}