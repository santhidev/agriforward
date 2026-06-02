import { z } from "zod";
import { router, protectedProcedure } from "@/server/trpc";

export const watchlistRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const watches = await ctx.prisma.productWatch.findMany({
      where: { userId: ctx.user.id },
      include: {
        product: {
          include: {
            category: true,
            orders: { where: { status: "Open" }, select: { id: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return watches.map((w) => ({
      id: w.product.id,
      name: w.product.name,
      slug: w.product.category.name.toLowerCase().replace(/\s+/g, "-"),
      unit: w.product.unit,
      latestPriceMin: 0,
      latestPriceMax: 0,
      openOrderCount: w.product.orders.length,
      isWatched: true,
    }));
  }),

  add: protectedProcedure
    .input(z.object({ productId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.productWatch.upsert({
        where: {
          userId_productId: {
            userId: ctx.user.id,
            productId: input.productId,
          },
        },
        create: {
          userId: ctx.user.id,
          productId: input.productId,
        },
        update: {},
      });
      return { success: true };
    }),

  remove: protectedProcedure
    .input(z.object({ productId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.productWatch.deleteMany({
        where: {
          userId: ctx.user.id,
          productId: input.productId,
        },
      });
      return { success: true };
    }),

  isWatched: protectedProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ ctx, input }) => {
      const watch = await ctx.prisma.productWatch.findUnique({
        where: {
          userId_productId: {
            userId: ctx.user.id,
            productId: input.productId,
          },
        },
      });
      return !!watch;
    }),
});
