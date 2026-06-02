"use client";

import { useState } from "react";
import { Button, Textarea } from "@/components/ui";

const REASONS = ["สินค้าไม่ตรงสเปค", "สินค้าเสียหาย", "จัดส่งล่าช้า", "อื่นๆ"] as const;

interface DisputeFormProps {
  onSubmit: (data: { reason: string; detail: string }) => void;
  loading?: boolean;
}

export function DisputeForm({ onSubmit, loading = false }: DisputeFormProps) {
  const [reason, setReason] = useState("");
  const [detail, setDetail] = useState("");
  const [customReason, setCustomReason] = useState("");

  const finalReason = reason === "อื่นๆ" ? customReason : reason;

  const handleSubmit = () => {
    if (!finalReason.trim() || !detail.trim()) return;
    onSubmit({ reason: finalReason, detail });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">เหตุผลการโต้แย้ง</label>
        <div className="flex flex-wrap gap-2">
          {REASONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setReason(r === reason ? "" : r)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors min-h-[44px] ${
                reason === r
                  ? "bg-[var(--color-danger)] text-white"
                  : "bg-[var(--surface-muted)] text-[var(--muted)] hover:bg-[var(--border)]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        {reason === "อื่นๆ" && (
          <input
            type="text"
            placeholder="ระบุเหตุผล..."
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            className="mt-2 w-full rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--color-danger)] focus:ring-2 focus:ring-[var(--color-danger)]/20"
          />
        )}
      </div>

      <Textarea
        label="รายละเอียดเพิ่มเติม"
        placeholder="อธิบายปัญหาที่พบ..."
        rows={4}
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
      />

      <Button
        variant="danger"
        size="xl"
        fullWidth
        disabled={!finalReason.trim() || !detail.trim() || loading}
        onClick={handleSubmit}
        className="h-14"
      >
        เปิดข้อโต้แย้ง
      </Button>
    </div>
  );
}
