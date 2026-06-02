import { z } from "zod";
import { Decimal } from "@prisma/client/runtime/library";
import { router, publicProcedure, protectedProcedure } from "@/server/trpc";

export const purchaseOrderRouter = router({
  listMine: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;

    const buyerOrders = await ctx.prisma.purchaseOrder.findMany({
      where: { buyerId: userId },
      include: {
        product: { include: { category: true } },
        offers: { select: { id: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const sellerOffers = await ctx.prisma.offer.findMany({
      where: { sellerId: userId },
      include: {
        order: {
          include: {
            product: { include: { category: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return {
      buyerOrders: buyerOrders.map((po) => ({
        id: po.id,
        productName: po.product.name,
        productSlug: po.product.category.name.toLowerCase().replace(/\s+/g, "-"),
        quantity: Number(po.quantity),
        targetPrice: po.targetPrice ? Number(po.targetPrice) : null,
        status: po.status,
        createdAt: po.createdAt.toISOString(),
        offerCount: po.offers.length,
      })),
      sellerOffers: sellerOffers.map((o) => ({
        id: o.id,
        poId: o.order.id,
        productName: o.order.product.name,
        productSlug: o.order.product.category.name.toLowerCase().replace(/\s+/g, "-"),
        pricePerUnit: Number(o.pricePerUnit),
        totalPrice: Number(o.totalPrice),
        depositAmount: Number(o.depositAmount),
        notes: o.notes,
        status: o.status,
        poStatus: o.order.status,
      })),
    };
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const po = await ctx.prisma.purchaseOrder.findUnique({
        where: { id: input.id },
        include: {
          product: { include: { category: true } },
          buyer: { select: { id: true, displayName: true } },
          offers: {
            include: {
              seller: { select: { id: true, displayName: true } },
            },
            orderBy: { createdAt: "desc" },
          },
          comments: {
            include: {
              user: { select: { id: true, displayName: true } },
            },
            orderBy: { createdAt: "asc" },
          },
        },
      });
      if (!po) return null;

      return {
        id: po.id,
        productName: po.product.name,
        productSlug: po.product.category.name.toLowerCase().replace(/\s+/g, "-"),
        quantity: Number(po.quantity),
        targetPrice: po.targetPrice ? Number(po.targetPrice) : null,
        deliveryOption: po.deliveryOption,
        pickupAddress: po.pickupAddress,
        deliveryAddress: po.deliveryAddress,
        shippingFee: po.shippingFee ? Number(po.shippingFee) : null,
        status: po.status,
        createdAt: po.createdAt.toISOString(),
        publishedAt: po.publishedAt?.toISOString() ?? null,
        selectedAt: null,
        paidAt: null,
        qcAt: null,
        fulfilledAt: null,
        buyerId: po.buyerId,
        offers: po.offers.map((o) => ({
          id: o.id,
          sellerName: o.seller.displayName,
          sellerId: o.seller.id,
          pricePerUnit: Number(o.pricePerUnit),
          totalPrice: Number(o.totalPrice),
          depositAmount: Number(o.depositAmount),
          notes: o.notes,
          status: o.status,
        })),
        comments: po.comments.map((c) => ({
          id: c.id,
          userId: c.userId,
          userName: c.user.displayName,
          content: c.content,
          createdAt: c.createdAt.toISOString(),
        })),
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        quantity: z.number().min(0.5),
        targetPrice: z.number().min(0).optional(),
        deliveryOption: z.enum(["SELF_PICKUP", "PLATFORM_LOGISTICS"]).default("SELF_PICKUP"),
        pickupAddress: z.string().optional(),
        deliveryAddress: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const po = await ctx.prisma.purchaseOrder.create({
        data: {
          buyerId: ctx.user.id,
          productId: input.productId,
          quantity: new Decimal(input.quantity),
          targetPrice: input.targetPrice ? new Decimal(input.targetPrice) : null,
          deliveryOption: input.deliveryOption,
          pickupAddress: input.pickupAddress,
          deliveryAddress: input.deliveryAddress,
          status: "Draft",
        },
      });
      return { id: po.id };
    }),

  publish: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const po = await ctx.prisma.purchaseOrder.update({
        where: { id: input.id, buyerId: ctx.user.id },
        data: {
          status: "Open",
          publishedAt: new Date(),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });
      return { id: po.id, status: po.status };
    }),

  byProduct: publicProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ ctx, input }) => {
      const orders = await ctx.prisma.purchaseOrder.findMany({
        where: { productId: input.productId, status: { in: ["Open", "AwaitingSellerConfirm", "PaymentPending", "Contract"] } },
        include: { product: true },
        orderBy: { createdAt: "desc" },
      });
      return orders.map((o) => ({
        id: o.id,
        title: `รับซื้อ${o.product.name} ${Number(o.quantity)} กก.`,
        quantity: Number(o.quantity),
        priceMin: o.targetPrice ? Number(o.targetPrice) * 0.8 : 0,
        priceMax: o.targetPrice ? Number(o.targetPrice) * 1.1 : 0,
        status: o.status,
      }));
    }),

  addComment: protectedProcedure
    .input(z.object({ orderId: z.string(), content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.prisma.comment.create({
        data: {
          orderId: input.orderId,
          userId: ctx.user.id,
          content: input.content,
        },
        include: {
          user: { select: { displayName: true } },
        },
      });
      return {
        id: comment.id,
        userName: comment.user.displayName,
        content: comment.content,
        createdAt: comment.createdAt.toISOString(),
      };
    }),

  selectOffer: protectedProcedure
    .input(z.object({ orderId: z.string(), offerId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.prisma.purchaseOrder.findUnique({
        where: { id: input.orderId },
      });
      if (!order || order.buyerId !== ctx.user.id) {
        throw new Error("ไม่พบงานซื้อหรือไม่ใช่เจ้าของ");
      }
      if (order.status !== "Open") {
        throw new Error("งานซื้อไม่อยู่ในสถานะที่สามารถเลือกคนขายได้");
      }

      await ctx.prisma.purchaseOrder.update({
        where: { id: input.orderId },
        data: { status: "AwaitingSellerConfirm" },
      });

      await ctx.prisma.offer.update({
        where: { id: input.offerId },
        data: { status: "Selected" },
      });

      return { success: true };
    }),
});