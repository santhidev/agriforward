import { z } from "zod";
import { router, protectedProcedure } from "@/server/trpc";

export const ratingRouter = router({
  byOrder: protectedProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ ctx, input }) => {
      const rating = await ctx.prisma.rating.findUnique({
        where: { orderId: input.orderId },
        include: {
          fromUser: { select: { displayName: true } },
          toUser: { select: { displayName: true } },
        },
      });
      if (!rating) return null;
      return {
        id: rating.id,
        orderId: rating.orderId,
        fromUserName: rating.fromUser.displayName,
        toUserName: rating.toUser.displayName,
        score: rating.score,
        comment: rating.comment,
        createdAt: rating.createdAt.toISOString(),
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        orderId: z.string(),
        toUserId: z.string(),
        score: z.number().min(1).max(5),
        comment: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.prisma.rating.findUnique({
        where: { orderId: input.orderId },
      });
      if (existing) throw new Error("ให้คะแนนแล้ว");

      const rating = await ctx.prisma.rating.create({
        data: {
          orderId: input.orderId,
          fromUserId: ctx.user.id,
          toUserId: input.toUserId,
          score: input.score,
          comment: input.comment ?? null,
        },
      });
      return { id: rating.id };
    }),
});
