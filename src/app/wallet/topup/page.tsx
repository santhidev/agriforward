"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar, BottomNav, PageContainer } from "@/components/layout";
import { BackButton } from "@/components/shared";
import { useToast, Button, Input, Card, CardBody } from "@/components/ui";
import { cn } from "@/lib/utils";

const QUICK_AMOUNTS = [100, 500, 1000, 2000];
const MOCK_BALANCE = 5000;

export default function TopUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [amount, setAmount] = useState<string>("");
  const [selectedQuick, setSelectedQuick] = useState<number | null>(null);

  const handleQuickAmount = (value: number) => {
    setSelectedQuick(value);
    setAmount(String(value));
  };

  const handleSubmit = () => {
    toast("เติมเงินสำเร็จ", "success");
    router.push("/wallet");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageContainer className="flex-1">
        <BackButton href="/wallet" />

        <h1 className="mb-4 text-xl sm:text-2xl font-bold text-[var(--foreground)]">
          เติมเงิน
        </h1>

        <Card className="mb-4">
          <CardBody>
            <div className="mb-4 text-center">
              <p className="text-sm text-[var(--muted)]">ยอดเงินคงเหลือ</p>
              <p className="text-2xl font-extrabold text-[var(--foreground)]">
                {MOCK_BALANCE.toLocaleString()} บาท
              </p>
            </div>

            <div className="mb-4 grid grid-cols-4 gap-2">
              {QUICK_AMOUNTS.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleQuickAmount(val)}
                  className={cn(
                    "rounded-[var(--radius-xl)] border px-3 py-2.5 text-sm font-medium transition-colors",
                    selectedQuick === val
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                      : "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--color-primary)]"
                  )}
                >
                  {val.toLocaleString()}
                </button>
              ))}
            </div>

            <Input
              type="number"
              label="จำนวนเงินที่ต้องการเติม"
              placeholder="ระบุจำนวนเงิน"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setSelectedQuick(null);
              }}
            />

            <div className="my-4 flex justify-center">
              <div className="flex h-40 w-40 items-center justify-center rounded-[var(--radius-xl)] border border-dashed border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--muted)]">
                QR Code
              </div>
            </div>

            <Button
              variant="primary"
              size="xl"
              fullWidth
              className="h-14"
              onClick={handleSubmit}
            >
              เติมเงิน
            </Button>
          </CardBody>
        </Card>
      </PageContainer>
      <BottomNav />
    </div>
  );
}
