"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BackButton } from "@/components/shared";
import { useToast, Card, CardBody, CardHeader, CardTitle } from "@/components/ui";
import { RatingForm } from "@/components/profile/RatingForm";

export function NewRatingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { toast } = useToast();

  const handleSubmit = (_data: { rating: number; comment: string }) => {
    toast("ให้คะแนนสำเร็จ", "success");
    router.push("/ratings");
  };

  return (
    <>
      <BackButton href="/orders" />

      <h1 className="mb-4 text-xl sm:text-2xl font-bold text-[var(--foreground)]">
        ให้คะแนน
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>งาน #{orderId ?? "—"}</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="mb-4 space-y-1 text-sm text-[var(--muted)]">
            <p>
              สินค้า: <span className="font-medium text-[var(--foreground)]">ทุเรียน</span>
            </p>
            <p>
              ให้คะแนน: <span className="font-medium text-[var(--foreground)]">สมชาย เกษตรกร</span>
            </p>
          </div>
          <RatingForm
            targetName="สมชาย เกษตรกร"
            targetRole="เกษตรกร"
            onSubmit={handleSubmit}
          />
        </CardBody>
      </Card>
    </>
  );
}
