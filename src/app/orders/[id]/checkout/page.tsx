"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar, BottomNav, PageContainer } from "@/components/layout";
import { BackButton } from "@/components/shared";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Input,
  Textarea,
  Badge,
} from "@/components/ui";
import { useToast } from "@/components/ui/Toast";
import { CheckoutDelivery } from "@/components/orders";

type DeliveryOption = "self-pickup" | "platform-logistics";
type PaymentMethod = "wallet" | "bank";

const mockOrder = {
  id: "po-2",
  productName: "มังคุด",
  productSlug: "mangosteen",
  quantity: 50,
  selectedOffer: {
    sellerName: "วิภา สวนผลไม้",
    pricePerUnit: 78,
    totalPrice: 3900,
  },
  shippingFee: 500,
};

function calcDeposit(productTotal: number) {
  return Math.min(productTotal * 0.05, 1000);
}

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("wallet");
  const [delivery, setDelivery] = useState<DeliveryOption>("self-pickup");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("สมชาย ใจดี");
  const [phone, setPhone] = useState("0812345678");

  const productTotal = mockOrder.selectedOffer.totalPrice;
  const deposit = calcDeposit(productTotal);
  const remaining = productTotal - deposit;
  const shippingFee =
    delivery === "platform-logistics" ? mockOrder.shippingFee : 0;

  const handleConfirm = () => {
    toast("ชำระเงินสำเร็จ", "success");
    setTimeout(() => router.push("/orders"), 1200);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageContainer className="flex-1">
        <BackButton href={"/orders/" + mockOrder.id} />
        <h1 className="mb-4 text-xl sm:text-2xl font-bold text-[var(--foreground)]">
          จ่ายเงิน
        </h1>

        {/* Payment Method Selector */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>วิธีชำระเงิน</CardTitle>
          </CardHeader>
          <CardBody className="space-y-3">
            <label className="flex items-center gap-3 rounded-lg border border-[var(--border)] p-3 cursor-pointer has-[:checked]:border-[var(--color-primary)] has-[:checked]:bg-[var(--color-primary)]/5">
              <input
                type="radio"
                name="payment"
                value="wallet"
                checked={paymentMethod === "wallet"}
                onChange={() => setPaymentMethod("wallet")}
                className="accent-[var(--color-primary)]"
              />
              <span className="text-sm font-medium text-[var(--foreground)]">
                กระเป๋าเงิน AgriForward
              </span>
              <Badge variant="green" className="ml-auto">
                แนะนำ
              </Badge>
            </label>

            <label className="flex items-center gap-3 rounded-lg border border-[var(--border)] p-3 cursor-pointer has-[:checked]:border-[var(--color-primary)] has-[:checked]:bg-[var(--color-primary)]/5">
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={() => setPaymentMethod("bank")}
                className="accent-[var(--color-primary)]"
              />
              <span className="text-sm font-medium text-[var(--foreground)]">
                โอนผ่านธนาคาร
              </span>
            </label>

            {paymentMethod === "bank" && (
              <div className="mt-3 rounded-lg border border-[var(--border)] bg-[var(--muted)]/10 p-4 space-y-2 text-xs sm:text-sm">
                <p className="font-semibold text-[var(--foreground)]">
                  ข้อมูลบัญชีธนาคาร
                </p>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">ธนาคาร</span>
                  <span className="text-[var(--foreground)]">
                    ธนาคารกรุงเทพ
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">เลขที่บัญชี</span>
                  <span className="font-mono text-[var(--foreground)]">
                    123-4-56789-0
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">ชื่อบัญชี</span>
                  <span className="text-[var(--foreground)]">
                    บริษัท อะกริฟอร์เวิร์ด จำกัด
                  </span>
                </div>
                <p className="text-[var(--muted)] italic">
                  กรุณาโอนเงินภายใน 24 ชั่วโมง และอัปโหลดหลักฐานการโอนเงิน
                </p>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Deposit Info — clear, visible */}
        <Card className="mb-6 border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              เงินมัดจำ
              <Badge variant="green">
                ชำระ {paymentMethod === "wallet" ? "ผ่านวอลเล็ต" : "ผ่านธนาคาร"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardBody className="space-y-2 text-xs sm:text-sm">
            <p className="text-[var(--muted)]">
              เงินมัดจำคิดเป็น <strong>5%</strong> ของราคาสินค้า สูงสุดไม่เกิน{" "}
              <strong>1,000 บาท</strong>
            </p>
            <div className="flex justify-between font-semibold text-base">
              <span className="text-[var(--foreground)]">
                ยอดที่ต้องชำระตอนนี้
              </span>
              <span className="text-[var(--color-primary)]">
                {deposit.toLocaleString()} บาท
              </span>
            </div>
          </CardBody>
        </Card>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>สรุปรายการ</CardTitle>
          </CardHeader>
          <CardBody className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">สินค้า</span>
              <span className="font-medium text-[var(--foreground)]">
                {mockOrder.productName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">จำนวน</span>
              <span className="font-medium text-[var(--foreground)]">
                {mockOrder.quantity} กก.
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">คนขาย</span>
              <span className="font-medium text-[var(--foreground)]">
                {mockOrder.selectedOffer.sellerName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">ราคาต่อกก.</span>
              <span className="font-medium text-[var(--foreground)]">
                {mockOrder.selectedOffer.pricePerUnit.toLocaleString()} บาท
              </span>
            </div>

            <div className="border-t border-[var(--border)] pt-2 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">ราคาสินค้า</span>
                <span className="font-medium text-[var(--foreground)]">
                  {productTotal.toLocaleString()} บาท
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">เงินมัดจำ (5%)</span>
                <span className="font-medium text-[var(--color-primary)]">
                  -{deposit.toLocaleString()} บาท
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">คงเหลือหลังมัดจำ</span>
                <span className="font-medium text-[var(--foreground)]">
                  {remaining.toLocaleString()} บาท
                </span>
              </div>
              {delivery === "platform-logistics" && (
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">ค่าจัดส่ง</span>
                  <span className="font-medium text-[var(--foreground)]">
                    {shippingFee.toLocaleString()} บาท
                  </span>
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Delivery Address (conditionally shown) */}
        {delivery === "platform-logistics" && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>ที่อยู่ส่งสินค้า</CardTitle>
            </CardHeader>
            <CardBody className="space-y-3">
              <Input
                label="ชื่อผู้รับ"
                placeholder="ชื่อ-นามสกุล"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="เบอร์โทร"
                placeholder="08XXXXXXXX"
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              />
              <Textarea
                label="ที่อยู่"
                placeholder="บ้านเลขที่, ตำบล, อำเภอ, จังหวัด, รหัสไปรษณีย์"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </CardBody>
          </Card>
        )}

        <CheckoutDelivery
          deliveryOption={delivery}
          shippingFee={mockOrder.shippingFee}
          productTotal={productTotal}
          onSelectDelivery={setDelivery}
          onConfirm={handleConfirm}
        />

        <button
          type="button"
          onClick={() => router.push("/orders/" + mockOrder.id)}
          className="mt-4 block w-full text-center text-sm text-[var(--muted)] underline hover:text-[var(--foreground)]"
        >
          กลับไปตรวจสอบ
        </button>
      </PageContainer>
      <BottomNav />
    </div>
  );
}
