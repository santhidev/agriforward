"use client";

interface WalletBalanceProps {
  balance: number;
}

export function WalletBalance({ balance }: WalletBalanceProps) {
  return (
    <div className="text-center py-6">
      <p className="text-sm font-medium text-[var(--muted)]">ยอดเงินคงเหลือ</p>
      <p className="mt-1 text-5xl font-extrabold text-[var(--foreground)]">
        ฿{balance.toLocaleString()}
      </p>
    </div>
  );
}
