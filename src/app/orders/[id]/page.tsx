"use client";

import { useState } from "react";
import { Navbar, BottomNav, PageContainer } from "@/components/layout";
import { BackButton } from "@/components/shared";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Badge,
  Button,
} from "@/components/ui";
import { StatusBadge } from "@/components/products/StatusBadge";
import {
  OfferCard,
  OrderTimeline,
  CommentThread,
  PublishAction,
} from "@/components/orders";

const ORDER_STATUSES = [
  "Draft",
  "Open",
  "AwaitingSellerConfirm",
  "PaymentPending",
  "Contract",
  "QualityPending",
  "Fulfilled",
  "Cancelled",
  "Expired",
  "Disputed",
] as const;

type OrderStatus = (typeof ORDER_STATUSES)[number];

const mockOrder = {
  id: "po-1",
  productName: "ทุเรียน",
  productSlug: "durian",
  quantity: 100,
  targetPrice: 150,
  status: "Open" as OrderStatus,
  deliveryOption: "self-pickup" as const,
  createdAt: "2026-06-01T10:00:00Z",
  publishedAt: "2026-06-01T10:05:00Z",
  selectedAt: null as string | null,
  paidAt: null as string | null,
  qcAt: null as string | null,
  fulfilledAt: null as string | null,
  cancelReason: "ผู้ขายไม่สามารถจัดส่งได้ทันเวลา",
};

const mockOffers = [
  {
    id: "offer-1",
    sellerName: "สมชาย เกษตรกร",
    pricePerUnit: 145,
    totalPrice: 14500,
    depositAmount: 725,
    notes: "ทุเรียนหมอน ระดับ A ส่งได้ทันที",
    status: "Open",
  },
  {
    id: "offer-2",
    sellerName: "วิภา สวนผลไม้",
    pricePerUnit: 148,
    totalPrice: 14800,
    depositAmount: 740,
    notes: null,
    status: "Open",
  },
  {
    id: "offer-3",
    sellerName: "ประสงค์ ฟาร์ม",
    pricePerUnit: 140,
    totalPrice: 14000,
    depositAmount: 700,
    notes: "สินค้าระดับ AAA ผลโต เนื้อหนา",
    status: "Open",
  },
];

const mockSelectedOffer = {
  id: "offer-1",
  sellerName: "สมชาย เกษตรกร",
  pricePerUnit: 145,
  totalPrice: 14500,
  depositAmount: 725,
  notes: "ทุเรียนหมอน ระดับ A ส่งได้ทันที",
  status: "Selected",
};

const mockQcResult = {
  passed: true,
  note: "สินค้าผ่านการตรวจสอบคุณภาพ ตรงตามข้อกำหนดทั้งหมด",
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
    content: "รับได้ 3 วันไหมครับ พอดีต้องการเร่ง",
    createdAt: "2026-06-01T12:05:00Z",
  },
  {
    id: "c3",
    userName: "วิภา",
    content: "ส่งได้ภายใน 2 วันค่ะ",
    createdAt: "2026-06-01T14:00:00Z",
  },
];

const deliveryLabels: Record<string, string> = {
  "self-pickup": "รับเอง (ฟรี)",
  "platform-logistics": "ส่งถึงที่",
};

export default function OrderDetailPage() {
  const [status, setStatus] = useState<OrderStatus>(mockOrder.status);
  const [comments, setComments] = useState(mockComments);
  const isBuyerView = true;

  const selectedOffer = mockSelectedOffer;
  const qcResult = mockQcResult;

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

  const handleSelectSeller = (offerId: string) => {
    setStatus("AwaitingSellerConfirm");
  };

  const bottomActions = () => {
    switch (status) {
      case "Draft":
        return (
          <PublishAction
            onPublish={() => setStatus("Open")}
            onDelete={() => setStatus("Cancelled")}
          />
        );

      case "PaymentPending":
        return (
          <div className="mx-auto max-w-5xl">
            <Button
              variant="buyer"
              size="xl"
              fullWidth
              href={"/orders/" + mockOrder.id + "/checkout"}
              className="h-14"
            >
              จ่ายเงิน
            </Button>
          </div>
        );

      case "Fulfilled":
        return (
          <div className="mx-auto max-w-5xl">
            <Button
              variant="buyer"
              size="xl"
              fullWidth
              href={"/ratings/new?orderId=" + mockOrder.id}
              className="h-14"
            >
              ให้คะแนน
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  const showBottomBar = ["Draft", "PaymentPending", "Fulfilled"].includes(
    status,
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageContainer className="flex-1">
        <BackButton href="/orders" />

        {/* Status Switcher (dev/demo) */}
        <div className="mb-4 flex items-center gap-2">
          <label
            htmlFor="status-switcher"
            className="text-xs font-medium text-[var(--muted)]"
          >
            Demo:
          </label>
          <select
            id="status-switcher"
            value={status}
            onChange={(e) => setStatus(e.target.value as OrderStatus)}
            className="rounded border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-xs text-[var(--foreground)]"
          >
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
            {mockOrder.productName}
          </h1>
          <StatusBadge status={status} />
        </div>

        <Card className="mb-4">
          <CardBody>
            <OrderTimeline
              currentStatus={status}
              createdAt={mockOrder.createdAt}
              publishedAt={mockOrder.publishedAt}
              selectedAt={mockOrder.selectedAt}
              paidAt={mockOrder.paidAt}
              qcAt={mockOrder.qcAt}
              fulfilledAt={mockOrder.fulfilledAt}
            />
          </CardBody>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>ข้อมูลงาน</CardTitle>
          </CardHeader>
          <CardBody className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">จำนวน</span>
              <span className="font-medium text-[var(--foreground)]">
                {mockOrder.quantity} กก.
              </span>
            </div>
            {mockOrder.targetPrice && (
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">ราคาตั้ง</span>
                <span className="font-medium text-[var(--foreground)]">
                  {mockOrder.targetPrice.toLocaleString()} บาท/กก.
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">วิธีรับสินค้า</span>
              <span className="font-medium text-[var(--foreground)]">
                {deliveryLabels[mockOrder.deliveryOption]}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">สร้างเมื่อ</span>
              <span className="font-medium text-[var(--foreground)]">
                1 มิ.ย. 2569
              </span>
            </div>
          </CardBody>
        </Card>

        {/* Cancelled / Expired / Disputed — reason badge */}
        {(["Cancelled", "Expired", "Disputed"] as OrderStatus[]).includes(
          status,
        ) && (
          <Card className="mb-4 border-[var(--danger)]">
            <CardBody>
              <div className="flex items-center gap-2">
                <Badge variant="red">
                  {status === "Disputed"
                    ? "โต้แย้ง"
                    : status === "Cancelled"
                      ? "ยกเลิกแล้ว"
                      : "หมดอายุ"}
                </Badge>
                <span className="text-xs sm:text-sm text-[var(--muted)]">
                  {mockOrder.cancelReason}
                </span>
              </div>
            </CardBody>
          </Card>
        )}

        {/* QC result card for Contract / QualityPending */}
        {(["Contract", "QualityPending"] as OrderStatus[]).includes(status) && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>ผลการตรวจสอบคุณภาพ</CardTitle>
            </CardHeader>
            <CardBody className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant={qcResult.passed ? "green" : "red"}>
                  {qcResult.passed ? "ผ่าน" : "ไม่ผ่าน"}
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-[var(--muted)]">
                {qcResult.note}
              </p>
              {!qcResult.passed && (
                <Button
                  variant="danger"
                  size="sm"
                  href={"/disputes/new?orderId=" + mockOrder.id}
                >
                  เปิดโต้แย้ง
                </Button>
              )}
            </CardBody>
          </Card>
        )}

        {/* Offers section — Open status */}
        {status === "Open" && (
          <>
            <h2 className="mb-3 text-base sm:text-lg font-bold text-[var(--foreground)]">
              คนที่มาขาย
            </h2>
            {mockOffers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                isBuyerView={isBuyerView}
                onSelect={() => handleSelectSeller(offer.id)}
              />
            ))}
          </>
        )}

        {/* AwaitingSellerConfirm — show selected offer */}
        {status === "AwaitingSellerConfirm" && (
          <>
            <h2 className="mb-3 text-base sm:text-lg font-bold text-[var(--foreground)]">
              ผู้ขายที่เลือก
            </h2>
            <Card className="mb-4">
              <CardBody className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">ชื่อผู้ขาย</span>
                  <span className="font-medium text-[var(--foreground)]">
                    {selectedOffer.sellerName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">ราคาต่อหน่วย</span>
                  <span className="font-medium text-[var(--foreground)]">
                    {selectedOffer.pricePerUnit.toLocaleString()} บาท/กก.
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">ราคารวม</span>
                  <span className="font-medium text-[var(--foreground)]">
                    {selectedOffer.totalPrice.toLocaleString()} บาท
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">เงินมัดจำ</span>
                  <span className="font-medium text-[var(--foreground)]">
                    {selectedOffer.depositAmount.toLocaleString()} บาท
                  </span>
                </div>
                {selectedOffer.notes && (
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">หมายเหตุ</span>
                    <span className="font-medium text-[var(--foreground)]">
                      {selectedOffer.notes}
                    </span>
                  </div>
                )}
              </CardBody>
            </Card>
            <p className="mb-4 text-center text-xs text-[var(--muted)]">
              ⏳ รอผู้ขายยืนยันคำเสนอ...
            </p>
          </>
        )}

        <h2 className="mb-3 mt-6 text-base sm:text-lg font-bold text-[var(--foreground)]">
          คุยกัน
        </h2>
        <Card>
          <CardBody>
            <CommentThread
              comments={comments}
              onAddComment={handleAddComment}
              loading={false}
            />
          </CardBody>
        </Card>

        {/* Spacer for sticky bottom bar */}
        {showBottomBar && <div className="h-20" />}
      </PageContainer>

      {/* Sticky bottom bar */}
      {showBottomBar && (
        <div className="fixed bottom-16 left-0 right-0 z-40 border-t border-[var(--border)] bg-[var(--surface)] px-4 py-3 md:bottom-0 md:relative md:border-0">
          {bottomActions()}
        </div>
      )}

      <BottomNav />
    </div>
  );
}
