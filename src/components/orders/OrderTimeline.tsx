"use client";

import { cn } from "@/lib/utils";

interface OrderTimelineProps {
  currentStatus: string;
  createdAt: string;
  publishedAt?: string | null;
  selectedAt?: string | null;
  paidAt?: string | null;
  qcAt?: string | null;
  fulfilledAt?: string | null;
}

const steps = [
  { key: "Draft", label: "สร้าง" },
  { key: "Open", label: "เปิดรับ" },
  { key: "AwaitingSellerConfirm", label: "เลือกคนขาย" },
  { key: "PaymentPending", label: "จ่ายเงิน" },
  { key: "QualityPending", label: "ตรวจ QC" },
  { key: "Fulfilled", label: "ส่งมอบสำเร็จ" },
  { key: "Disputed", label: "โต้แย้ง" },
] as const;

const statusOrder = [
  "Draft",
  "Open",
  "AwaitingSellerConfirm",
  "PaymentPending",
  "Contract",
  "QualityPending",
  "ReadyForPickup",
  "InTransit",
  "Fulfilled",
  "Expired",
  "Cancelled",
  "Frozen",
];

const dateMap: Record<string, string | null | undefined> = {};
function buildDateMap(props: OrderTimelineProps) {
  dateMap.Draft = props.createdAt;
  dateMap.Open = props.publishedAt;
  dateMap.AwaitingSellerConfirm = props.selectedAt;
  dateMap.PaymentPending = props.paidAt;
  dateMap.QualityPending = props.qcAt;
  dateMap.Fulfilled = props.fulfilledAt;
}

function formatThaiDate(dateStr: string | null | undefined) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const months = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
}

function getStatusIndex(status: string) {
  const idx = statusOrder.indexOf(status);
  if (idx < 0) return 0;
  if (status === "Expired" || status === "Cancelled" || status === "Frozen")
    return statusOrder.indexOf("Draft");
  const stepIndices = steps.map((s) => statusOrder.indexOf(s.key));
  let result = 0;
  for (const si of stepIndices) {
    if (idx >= si)
      result = steps.findIndex((s) => statusOrder.indexOf(s.key) === si);
  }
  return result;
}

export function OrderTimeline(props: OrderTimelineProps) {
  buildDateMap(props);
  const currentIdx = getStatusIndex(props.currentStatus);

  return (
    <div className="flex flex-col">
      {steps.map((step, i) => {
        const isCompleted = i < currentIdx;
        const isCurrent = i === currentIdx;
        const isFuture = i > currentIdx;
        const dateVal = formatThaiDate(dateMap[step.key]);

        return (
          <div key={step.key} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "h-3 w-3 rounded-full border-2",
                  isCompleted &&
                    "border-[var(--color-success)] bg-[var(--color-success)]",
                  isCurrent &&
                    "border-[var(--color-success)] bg-[var(--color-success)] animate-pulse",
                  isFuture && "border-[var(--border)] bg-[var(--surface)]",
                )}
              />
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "w-0.5 flex-1 min-h-6",
                    i < currentIdx
                      ? "bg-[var(--color-success)]"
                      : "bg-[var(--border)]",
                  )}
                />
              )}
            </div>
            <div className="pb-4">
              <span
                className={cn(
                  "text-sm font-medium",
                  isCompleted && "text-[var(--color-success)]",
                  isCurrent && "text-[var(--color-success)]",
                  isFuture && "text-[var(--muted)]",
                )}
              >
                {step.label}
              </span>
              {dateVal && (
                <span className="ml-2 text-xs text-[var(--muted)]">
                  {dateVal}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
