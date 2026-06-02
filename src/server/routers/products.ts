import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "@/server/trpc";

export const productRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    const user = ctx.user;

    const products = await ctx.prisma.product.findMany({
      include: {
        category: true,
        orders: {
          where: { status: "Open" },
          include: {
            offers: {
              select: { pricePerUnit: true },
            },
          },
        },
      },
      orderBy: { name: "asc" },
    });

    let watchedIds: Set<string> = new Set();
    if (user) {
      const watches = await ctx.prisma.productWatch.findMany({
        where: { userId: user.id },
        select: { productId: true },
      });
      watchedIds = new Set(watches.map((w) => w.productId));
    }

    return products.map((p) => {
      const allOfferPrices = p.orders.flatMap((o) =>
        o.offers.map((offer) => Number(offer.pricePerUnit))
      );
      const priceMin = allOfferPrices.length > 0 ? Math.min(...allOfferPrices) : 0;
      const priceMax = allOfferPrices.length > 0 ? Math.max(...allOfferPrices) : 0;

      return {
        id: p.id,
        name: p.name,
        slug: p.category.name.toLowerCase().replace(/\s+/g, "-"),
        unit: p.unit,
        latestPriceMin: priceMin,
        latestPriceMax: priceMax,
        openOrderCount: p.orders.length,
        isWatched: watchedIds.has(p.id),
      };
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = ctx.user;

      const product = await ctx.prisma.product.findUnique({
        where: { id: input.id },
        include: {
          category: true,
          orders: {
            where: { status: "Open" },
            include: {
              offers: {
                select: { pricePerUnit: true },
              },
            },
          },
        },
      });
      if (!product) return null;

      const allOfferPrices = product.orders.flatMap((o) =>
        o.offers.map((offer) => Number(offer.pricePerUnit))
      );
      const priceMin = allOfferPrices.length > 0 ? Math.min(...allOfferPrices) : 0;
      const priceMax = allOfferPrices.length > 0 ? Math.max(...allOfferPrices) : 0;

      let isWatched = false;
      if (user) {
        const watch = await ctx.prisma.productWatch.findUnique({
          where: {
            userId_productId: { userId: user.id, productId: input.id },
          },
        });
        isWatched = !!watch;
      }

      return {
        id: product.id,
        name: product.name,
        slug: product.category.name.toLowerCase().replace(/\s+/g, "-"),
        unit: product.unit,
        latestPriceMin: priceMin,
        latestPriceMax: priceMax,
        isWatched,
      };
    }),

  search: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = ctx.user;

      const products = await ctx.prisma.product.findMany({
        where: { name: { contains: input.query, mode: "insensitive" } },
        include: {
          category: true,
          orders: {
            where: { status: "Open" },
            include: {
              offers: { select: { pricePerUnit: true } },
            },
          },
        },
        orderBy: { name: "asc" },
      });

      let watchedIds: Set<string> = new Set();
      if (user) {
        const watches = await ctx.prisma.productWatch.findMany({
          where: { userId: user.id },
          select: { productId: true },
        });
        watchedIds = new Set(watches.map((w) => w.productId));
      }

      return products.map((p) => {
        const allOfferPrices = p.orders.flatMap((o) =>
          o.offers.map((offer) => Number(offer.pricePerUnit))
        );
        const priceMin = allOfferPrices.length > 0 ? Math.min(...allOfferPrices) : 0;
        const priceMax = allOfferPrices.length > 0 ? Math.max(...allOfferPrices) : 0;

        return {
          id: p.id,
          name: p.name,
          slug: p.category.name.toLowerCase().replace(/\s+/g, "-"),
          unit: p.unit,
          latestPriceMin: priceMin,
          latestPriceMax: priceMax,
          openOrderCount: p.orders.length,
          isWatched: watchedIds.has(p.id),
        };
      });
    }),
});
