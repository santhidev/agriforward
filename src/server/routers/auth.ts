import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "@/server/trpc";

export const authRouter = router({
  me: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.user) return null;

    const dbUser = await ctx.prisma.user.findUnique({
      where: { id: ctx.user.id },
    });

    return dbUser;
  }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        displayName: z.string().min(1).optional(),
        farmName: z.string().optional(),
        companyName: z.string().optional(),
        address: z.string().optional(),
        role: z.enum(["BUYER", "SELLER", "BOTH"]).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.update({
        where: { id: ctx.user.id },
        data: input,
      });
      return user;
    }),
});
