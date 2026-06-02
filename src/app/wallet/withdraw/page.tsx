"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar, BottomNav, PageContainer } from "@/components/layout";
import { BackButton } from "@/components/shared";
import {
  useToast,
  Button,
  Input,
  Select,
  Card,
  CardBody,
} from "@/components/ui";

const MOCK_BALANCE = 5000;

const BANK_OPTIONS = [
  { value: "bbl", label: "ธนาคารกรุงเทพ (123-4-56789-0)" },
  { value: "kbank", label: "ธนาคารกสิกรไทย (987-6-54321-0)" },
];

export default function WithdrawPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [amount, setAmount] = useState<string>("");
  const [bank, setBank] = useState<string>("");
  const [error, setError] = useState<string>("");

  const parsedAmount = Number(amount);

  const handleSubmit = () => {
    setError("");

    if (!amount || parsedAmount <= 0) {
      setError("กรุณาระบุจำนวนเงินที่ถูกต้อง");
      return;
    }

    if (parsedAmount > MOCK_BALANCE) {
      setError("ยอดเงินคงเหลือไม่เพียงพอ");
      return;
    }

    if (!bank) {
      setError("กรุณาเลือกบัญชีธนาคาร");
      return;
    }

    toast("ถอนเงินสำเร็จ", "success");
    router.push("/wallet");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageContainer className="flex-1">
        <BackButton href="/wallet" />

        <h1 className="mb-4 text-xl sm:text-2xl font-bold text-[var(--foreground)]">
          ถอนเงิน
        </h1>

        <Card>
          <CardBody>
            <div className="mb-4 text-center">
              <p className="text-sm text-[var(--muted)]">ยอดเงินคงเหลือ</p>
              <p className="text-2xl font-extrabold text-[var(--foreground)]">
                {MOCK_BALANCE.toLocaleString()} บาท
              </p>
            </div>

            <Input
              type="number"
              label="จำนวนเงินที่ต้องการถอน"
              placeholder="ระบุจำนวนเงิน"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError("");
              }}
            />

            <Select
              label="บัญชีธนาคาร"
              placeholder="เลือกบัญชีธนาคาร"
              options={BANK_OPTIONS}
              value={bank}
              onChange={(e) => {
                setBank(e.target.value);
                setError("");
              }}
            />

            {error && (
              <p className="mb-4 text-sm text-[var(--color-danger)]">{error}</p>
            )}

            <Button
              variant="primary"
              size="xl"
              fullWidth
              className="h-14"
              onClick={handleSubmit}
            >
              ถอนเงิน
            </Button>
          </CardBody>
        </Card>
      </PageContainer>
      <BottomNav />
    </div>
  );
}
