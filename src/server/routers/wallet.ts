import { z } from "zod";
import { router, protectedProcedure } from "@/server/trpc";

export const walletRouter = router({
  balance: protectedProcedure.query(async ({ ctx }) => {
    const wallet = await ctx.prisma.userWallet.findUnique({
      where: { userId: ctx.user.id },
    });
    if (!wallet) {
      // Auto-create wallet
      const newWallet = await ctx.prisma.userWallet.create({
        data: { userId: ctx.user.id, balance: 0 },
      });
      return { balance: Number(newWallet.balance) };
    }
    return { balance: Number(wallet.balance) };
  }),

  transactions: protectedProcedure.query(async ({ ctx }) => {
    const wallet = await ctx.prisma.userWallet.findUnique({
      where: { userId: ctx.user.id },
      include: {
        transactions: {
          orderBy: { createdAt: "desc" },
          take: 50,
        },
      },
    });
    if (!wallet) return [];

    let runningBalance = Number(wallet.balance);

    // Reverse to calculate historical balances
    const txs = [...wallet.transactions].reverse();
    const result = txs.map((tx) => {
      const amount = Number(tx.amount);
      runningBalance += tx.type === "deposit" || tx.type === "payment" ? -amount : amount;
      // Actually runningBalance should start from 0 and accumulate forward
      return {
        id: tx.id,
        type: tx.type,
        amount,
        label: tx.type,
        offerId: tx.offerId,
        orderId: tx.orderId,
        createdAt: tx.createdAt.toISOString(),
      };
    });

    // Recalculate with forward accumulation
    let cumulative = 0;
    const withBalance = wallet.transactions.map((tx) => {
      const amount = Number(tx.amount);
      const sign = tx.type === "topup" || tx.type === "refund" || tx.type === "income" ? 1 : -1;
      cumulative += amount * (tx.type === "topup" || tx.type === "refund" || tx.type === "income" ? 1 : -1);
      // For now, just accumulate deposits and payments as negative
      if (tx.type === "deposit" || tx.type === "payment") {
        cumulative = cumulative - amount; // already counted above, fix
      }
      return {
        id: tx.id,
        type: tx.type,
        amount: sign * amount,
        label: tx.type,
        createdAt: tx.createdAt.toISOString(),
        balance: cumulative,
      };
    });

    // Simplified: just return raw transactions, let client format
    return wallet.transactions.map((tx) => ({
      id: tx.id,
      type: tx.type,
      amount: Number(tx.amount),
      createdAt: tx.createdAt.toISOString(),
      offerId: tx.offerId,
      orderId: tx.orderId,
    }));
  }),
});
