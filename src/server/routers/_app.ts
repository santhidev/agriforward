import { router } from "@/server/trpc";
import { authRouter } from "./auth";
import { productRouter } from "./products";
import { purchaseOrderRouter } from "./purchaseOrders";
import { offerRouter } from "./offers";
import { watchlistRouter } from "./watchlist";
import { walletRouter } from "./wallet";
import { ratingRouter } from "./ratings";

export const appRouter = router({
  auth: authRouter,
  product: productRouter,
  order: purchaseOrderRouter,
  offer: offerRouter,
  watchlist: watchlistRouter,
  wallet: walletRouter,
  rating: ratingRouter,
});

export type AppRouter = typeof appRouter;
