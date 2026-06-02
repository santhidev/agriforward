"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar, BottomNav, PageContainer } from "@/components/layout";
import { BackButton } from "@/components/shared";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
  ConfirmDialog,
} from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { StatusBadge } from "@/components/products/StatusBadge";
import { OrderTimeline, CommentThread } from "@/components/orders";

const mockOffer = {
  id: "offer-1",
  poId: "po-1",
  poProduct: "ทุเรียน",
  poQuantity: 100,
  sellerName: "สมชาย เกษตรกร",
  pricePerUnit: 145,
  totalPrice: 14500,
  depositAmount: 725,
  notes: "ทุเรียนหมอน ระดับ A",
  status: "Accepted",
  createdAt: "2026-06-01T12:00:00Z",
};

const mockComments = [
  {
    id: "c1",
    userName: "สมชาย",
    content: "ส่งได้ภายใน 3 วันครับ",
    createdAt: "2026-06-01T12:00:00Z",
  },
  {
    id: "c2",
    userName: "ฉันเอง",
    content: "รับได้ 3 วันครับ แจ้งที่อยู่จัดส่งด้วย",
    createdAt: "2026-06-01T14:00:00Z",
  },
];

const mockDeliveryInfo = {
  address: "123 หมู่ 4 ต.สันทราย อ.เมือง จ.เชียงใหม่ 50200",
  deliveryDate: "2026-06-05",
  trackingNumber: "TH1234567890",
};

const timelineData = {
  currentStatus:
    mockOffer.status === "AwaitingSellerConfirm"
      ? "AwaitingSellerConfirm"
      : "Open",
  createdAt: mockOffer.createdAt,
  publishedAt:
    mockOffer.status === "AwaitingSellerConfirm" ? mockOffer.createdAt : null,
  selectedAt: null,
  paidAt: null,
  qcAt: null,
  fulfilledAt: null,
};

export default function OfferDetailPage() {
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [acceptOpen, setAcceptOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [comments, setComments] = useState(mockComments);
  const { toast } = useToast();

  const isWithdrawAvailable = mockOffer.status === "Open";
  const isConfirmAvailable = mockOffer.status === "AwaitingSellerConfirm";

  const handleAddComment = (content: string) => {
    setComments((prev) => [
      ...prev,
      {
        id: "c" + (prev.length + 1),
        userName: "ฉันเอง",
        content,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageContainer className="flex-1">
        <BackButton href="/orders" />

        <h1 className="mb-4 text-xl sm:text-2xl font-bold text-[var(--foreground)]">
          รายละเอียดขาย
        </h1>

        <Card className="mb-4">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <CardTitle>{mockOffer.poProduct}</CardTitle>
              <StatusBadge status={mockOffer.status} />
            </div>
          </CardHeader>
          <CardBody className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">ราคาต่อกก.</span>
              <span className="font-medium text-[var(--foreground)]">
                {mockOffer.pricePerUnit.toLocaleString()} บาท
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">จำนวน</span>
              <span className="font-medium text-[var(--foreground)]">
                {mockOffer.poQuantity} กก.
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">รวม</span>
              <span className="font-medium text-[var(--foreground)]">
                {mockOffer.totalPrice.toLocaleString()} บาท
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">มัดจำ</span>
              <span className="font-medium text-[var(--foreground)]">
                {mockOffer.depositAmount.toLocaleString()} บาท
              </span>
            </div>
            <p className="text-xs font-medium text-[var(--color-success)]">
              คืนเมื่อขายสำเร็จ
            </p>
            {mockOffer.notes && (
              <div className="mt-1 rounded-[var(--radius)] bg-[var(--color-warning-light)] p-2 text-xs text-[var(--foreground)]">
                {mockOffer.notes}
              </div>
            )}
          </CardBody>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>สถานะคำสั่งซื้อ</CardTitle>
          </CardHeader>
          <CardBody>
            <OrderTimeline
              currentStatus={timelineData.currentStatus}
              createdAt={timelineData.createdAt}
              publishedAt={timelineData.publishedAt}
              selectedAt={timelineData.selectedAt}
              paidAt={timelineData.paidAt}
              qcAt={timelineData.qcAt}
              fulfilledAt={timelineData.fulfilledAt}
            />
          </CardBody>
        </Card>

        {mockOffer.status === "Accepted" && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>ข้อมูลการจัดส่ง</CardTitle>
            </CardHeader>
            <CardBody className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">ที่อยู่จัดส่ง</span>
                <span className="font-medium text-[var(--foreground)]">
                  {mockDeliveryInfo.address}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">วันที่จัดส่ง</span>
                <span className="font-medium text-[var(--foreground)]">
                  {mockDeliveryInfo.deliveryDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">เลขติดตาม</span>
                <span className="font-medium text-[var(--foreground)]">
                  {mockDeliveryInfo.trackingNumber}
                </span>
              </div>
            </CardBody>
          </Card>
        )}

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>ความคิดเห็น</CardTitle>
          </CardHeader>
          <CardBody>
            <CommentThread
              comments={comments}
              onAddComment={handleAddComment}
              loading={false}
            />
          </CardBody>
        </Card>

        {mockOffer.status === "Fulfilled" && (
          <div className="mb-6">
            <Link href={"/ratings/new?orderId=" + mockOffer.poId}>
              <Button variant="primary" size="lg" fullWidth>
                ให้คะแนน
              </Button>
            </Link>
          </div>
        )}

        {isWithdrawAvailable && (
          <Button
            variant="danger"
            size="lg"
            fullWidth
            onClick={() => setWithdrawOpen(true)}
          >
            ถอนขาย
          </Button>
        )}

        {isConfirmAvailable && (
          <div className="space-y-3">
            <Button
              variant="success"
              size="lg"
              fullWidth
              onClick={() => setAcceptOpen(true)}
            >
              ตอบรับ
            </Button>
            <Button
              variant="danger"
              size="lg"
              fullWidth
              onClick={() => setRejectOpen(true)}
            >
              ปฏิเสธ
            </Button>
          </div>
        )}

        <ConfirmDialog
          open={withdrawOpen}
          onClose={() => setWithdrawOpen(false)}
          onConfirm={() => {
            setWithdrawOpen(false);
            toast("ถอนขายสำเร็จ", "success");
          }}
          title="ยืนยันถอนขาย"
          variant="danger"
          confirmLabel="ถอน"
        >
          คุณต้องการถอนขายหรือไม่? มัดจำจะคืนภายใน 3-5 วันทำการ
        </ConfirmDialog>

        <ConfirmDialog
          open={acceptOpen}
          onClose={() => setAcceptOpen(false)}
          onConfirm={() => {
            setAcceptOpen(false);
            toast("ตอบรับสำเร็จ", "success");
          }}
          title="ยืนยันตอบรับ"
          confirmLabel="ตอบรับ"
        >
          คุณต้องการตอบรับคำสั่งซื้อนี้หรือไม่?
          หลังจากตอบรับจะต้องจัดส่งสินค้าตามกำหนด
        </ConfirmDialog>

        <ConfirmDialog
          open={rejectOpen}
          onClose={() => setRejectOpen(false)}
          onConfirm={() => {
            setRejectOpen(false);
            toast("ปฏิเสธสำเร็จ", "success");
          }}
          title="ยืนยันปฏิเสธ"
          variant="danger"
          confirmLabel="ปฏิเสธ"
        >
          คุณต้องการปฏิเสธคำสั่งซื้อนี้หรือไม่? มัดจำจะคืนภายใน 3-5 วันทำการ
        </ConfirmDialog>
      </PageContainer>
      <BottomNav />
    </div>
  );
}
