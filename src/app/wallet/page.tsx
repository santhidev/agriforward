"use client";

import { Navbar, BottomNav, PageContainer } from "@/components/layout";
import { BackButton } from "@/components/shared";
import { Card, CardBody, Button } from "@/components/ui";
import { WalletBalance } from "@/components/profile";
import { cn } from "@/lib/utils";

type TxType = "deposit" | "refund" | "payment" | "income" | "topup";

const txConfig: Record<TxType, { icon: string; sign: string; amountColor: string }> = {
  deposit: { icon: "🟡", sign: "-", amountColor: "text-[var(--color-danger)]" },
  refund: { icon: "🟢", sign: "+", amountColor: "text-[var(--color-success)]" },
  payment: { icon: "🔴", sign: "-", amountColor: "text-[var(--color-danger)]" },
  income: { icon: "🟢", sign: "+", amountColor: "text-[var(--color-success)]" },
  topup: { icon: "🔵", sign: "+", amountColor: "text-[var(--color-info)]" },
};

const mockTransactions: { id: number; type: TxType; label: string; amount: number; date: string; balance: number }[] = [
  { id: 1, type: "topup", label: "เติมเงิน", amount: 5000, date: "30 พ.ค. 2569", balance: 17450 },
  { id: 2, type: "deposit", label: "วางมัดจำ — ทุเรียน #1024", amount: -500, date: "29 พ.ค. 2569", balance: 12450 },
  { id: 3, type: "income", label: "รับเงินค่าสินค้า — มะม่วง #1012", amount: 3200, date: "28 พ.ค. 2569", balance: 12950 },
  { id: 4, type: "payment", label: "จ่ายค่าสินค้า — ลำใย #1010", amount: -1800, date: "27 พ.ค. 2569", balance: 9750 },
  { id: 5, type: "refund", label: "คืนมัดจำ — มังคุด #1005", amount: 800, date: "25 พ.ค. 2569", balance: 11550 },
];

export default function WalletPage() {
  return (
    <>
      <Navbar />
      <PageContainer>
        <BackButton />
        <Card className="mb-4">
          <CardBody>
            <WalletBalance balance={12450} />
            <div className="flex gap-3">
              <Button variant="primary" fullWidth className="h-12 sm:h-14">เติมเงิน</Button>
              <Button variant="secondary" fullWidth className="h-12 sm:h-14">ถอนเงิน</Button>
            </div>
          </CardBody>
        </Card>
        <h2 className="mb-3 text-base sm:text-lg font-semibold text-[var(--foreground)]">ประวัติธุรกรรม</h2>
        <div className="space-y-2">
          {mockTransactions.map((tx) => {
            const config = txConfig[tx.type];
            return (
              <Card key={tx.id}>
                <CardBody className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-lg shrink-0">{config.icon}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[var(--foreground)] truncate">{tx.label}</p>
                      <p className="text-xs text-[var(--muted)]">{tx.date}</p>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className={cn("text-sm font-semibold", config.amountColor)}>{config.sign}{Math.abs(tx.amount).toLocaleString()} ฿</p>
                    <p className="text-xs text-[var(--muted)]">คงเหลือ {tx.balance.toLocaleString()} ฿</p>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </PageContainer>
      <BottomNav />
    </>
  );
}
