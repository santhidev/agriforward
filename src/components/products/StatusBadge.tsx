import { Badge } from "@/components/ui";

const statusMap: Record<
  string,
  { label: string; variant: "green" | "yellow" | "red" | "blue" | "gray" }
> = {
  Draft: { label: "ร่าง", variant: "gray" },
  Open: { label: "เปิดรับ", variant: "green" },
  Selected: { label: "ถูกเลือก", variant: "yellow" },
  Accepted: { label: "ตอบรับแล้ว", variant: "green" },
  Withdrawn: { label: "ถอนแล้ว", variant: "gray" },
  Rejected: { label: "ปฏิเสธ", variant: "red" },
  AwaitingSellerConfirm: { label: "รอผู้ขายตอบรับ", variant: "yellow" },
  PaymentPending: { label: "รอชำระเงิน", variant: "blue" },
  Contract: { label: "สัญญาแล้ว", variant: "blue" },
  QualityPending: { label: "รอตรวจ QC", variant: "yellow" },
  ReadyForPickup: { label: "รอรับสินค้า", variant: "blue" },
  InTransit: { label: "กำลังขนส่ง", variant: "blue" },
  Fulfilled: { label: "สำเร็จ", variant: "green" },
  Expired: { label: "หมดอายุ", variant: "gray" },
  Cancelled: { label: "ยกเลิก", variant: "red" },
  Frozen: { label: "ระงับ", variant: "red" },
  Disputed: { label: "โต้แย้ง", variant: "red" },
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const mapped = statusMap[status];
  if (!mapped)
    return (
      <Badge variant="gray" className={className}>
        {status}
      </Badge>
    );
  return (
    <Badge variant={mapped.variant} className={className}>
      {mapped.label}
    </Badge>
  );
}
