"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Navbar, BottomNav, PageContainer } from "@/components/layout";
import { BackButton } from "@/components/shared";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  useToast,
} from "@/components/ui";
import { DisputeForm } from "@/components/orders";

export default function NewDisputePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { toast } = useToast();

  const handleSubmit = (_data: { reason: string; detail: string }) => {
    toast("เปิดข้อโต้แย้งสำเร็จ", "success");
    router.push("/orders/" + orderId);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageContainer className="flex-1">
        <BackButton href={orderId ? "/orders/" + orderId : "/orders"} />

        <h1 className="mb-4 text-xl sm:text-2xl font-bold text-[var(--foreground)]">
          เปิดข้อโต้แย้ง
        </h1>

        {!orderId ? (
          <p className="text-sm text-[var(--muted)]">ไม่พบข้อมูลงาน</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>งาน #{orderId}</CardTitle>
            </CardHeader>
            <CardBody>
              <DisputeForm onSubmit={handleSubmit} />
            </CardBody>
          </Card>
        )}
      </PageContainer>
      <BottomNav />
    </div>
  );
}
