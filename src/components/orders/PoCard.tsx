"use client";

import { Card, CardBody, Badge, Button } from "@/components/ui";
import { StatusBadge } from "@/components/products/StatusBadge";
import { cn } from "@/lib/utils";

interface PoCardProps {
  order: {
    id: string;
    productName: string;
    productSlug: string;
    quantity: number;
    targetPrice?: number | null;
    status: string;
    createdAt: string;
    offerCount: number;
  };
  onView?: () => void;
}

function formatThaiDate(dateStr: string) {
  const d = new Date(dateStr);
  const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
}

export function PoCard({ order, onView }: PoCardProps) {
  return (
    <Card className="mb-3">
      <CardBody className="flex gap-3">
        <div
          className="h-12 w-12 sm:h-16 sm:w-16 shrink-0 rounded-[var(--radius)] bg-[var(--color-primary-light)] bg-cover bg-center"
          style={{ backgroundImage: `url(/images/products/${order.productSlug}.jpg)` }}
        />
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="truncate text-sm sm:text-base font-semibold text-[var(--foreground)]">
              {order.productName}
            </h3>
            <StatusBadge status={order.status} />
          </div>
          <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs sm:text-sm text-[var(--muted)]">
            <span>{order.quantity} กก.</span>
            {order.targetPrice != null && (
              <span>{order.targetPrice.toLocaleString()} บาท/กก.</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="blue">{order.offerCount} คนขาย</Badge>
              <span className="text-xs text-[var(--muted)]">{formatThaiDate(order.createdAt)}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
                            href={`/orders/${order.id}`}
            >
              ดูรายละเอียด
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}