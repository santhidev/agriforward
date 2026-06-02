import { z } from "zod";
import { Decimal } from "@prisma/client/runtime/library";
import { router, protectedProcedure } from "@/server/trpc";

export const offerRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        orderId: z.string(),
        pricePerUnit: z.number().min(0.01),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.prisma.purchaseOrder.findUnique({
        where: { id: input.orderId },
        include: { product: true },
      });
      if (!order) throw new Error("ไม่พบงานซื้อ");
      if (order.status !== "Open") throw new Error("งานซื้อไม่ได้เปิดรับอยู่");

      const totalPrice = new Decimal(input.pricePerUnit).mul(order.quantity);
      const depositAmount = Decimal.min(totalPrice.mul(0.05), new Decimal(1000));

      const offer = await ctx.prisma.offer.create({
        data: {
          orderId: input.orderId,
          sellerId: ctx.user.id,
          pricePerUnit: new Decimal(input.pricePerUnit),
          totalPrice,
          depositAmount,
          notes: input.notes ?? null,
          status: "Open",
          depositPaid: false,
        },
      });

      return { id: offer.id, depositAmount: Number(depositAmount) };
    }),

  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const offer = await ctx.prisma.offer.findUnique({
        where: { id: input.id },
        include: {
          order: {
            include: {
              product: { include: { category: true } },
            },
          },
          seller: { select: { id: true, displayName: true } },
        },
      });
      if (!offer) return null;

      return {
        id: offer.id,
        orderId: offer.orderId,
        productName: offer.order.product.name,
        productSlug: offer.order.product.category.name.toLowerCase().replace(/\s+/g, "-"),
        quantity: Number(offer.order.quantity),
        pricePerUnit: Number(offer.pricePerUnit),
        totalPrice: Number(offer.totalPrice),
        depositAmount: Number(offer.depositAmount),
        depositPaid: offer.depositPaid,
        notes: offer.notes,
        status: offer.status,
        orderStatus: offer.order.status,
        sellerName: offer.seller.displayName,
        createdAt: offer.createdAt.toISOString(),
      };
    }),

  withdraw: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const offer = await ctx.prisma.offer.findUnique({
        where: { id: input.id },
      });
      if (!offer || offer.sellerId !== ctx.user.id) {
        throw new Error("ไม่พบข้อเสนอหรือไม่ใช่เจ้าของ");
      }
      if (offer.status !== "Open") {
        throw new Error("ไม่สามารถถอนขายได้ในสถานะนี้");
      }

      await ctx.prisma.offer.update({
        where: { id: input.id },
        data: { status: "Withdrawn" },
      });

      return { success: true };
    }),

  accept: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const offer = await ctx.prisma.offer.findUnique({
        where: { id: input.id },
        include: { order: true },
      });
      if (!offer || offer.sellerId !== ctx.user.id) {
        throw new Error("ไม่พบข้อเสนอหรือไม่ใช่เจ้าของ");
      }
      if (offer.status !== "Selected") {
        throw new Error("ข้อเสนอไม่ได้ถูกเลือก");
      }

      await ctx.prisma.offer.update({
        where: { id: input.id },
        data: { status: "Accepted", depositPaid: true },
      });

      await ctx.prisma.purchaseOrder.update({
        where: { id: offer.orderId },
        data: { status: "PaymentPending" },
      });

      return { success: true };
    }),

  reject: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const offer = await ctx.prisma.offer.findUnique({
        where: { id: input.id },
      });
      if (!offer || offer.sellerId !== ctx.user.id) {
        throw new Error("ไม่พบข้อเสนอหรือไม่ใช่เจ้าของ");
      }

      await ctx.prisma.offer.update({
        where: { id: input.id },
        data: { status: "Rejected" },
      });

      // Reopen the PO for other offers
      await ctx.prisma.purchaseOrder.update({
        where: { id: offer.orderId },
        data: { status: "Open" },
      });

      return { success: true };
    }),
});
