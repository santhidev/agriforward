import "server-only";

import { appRouter } from "@/server/routers/_app";
import { createCallerFactory, createContext } from "@/server/trpc";

const createCaller = createCallerFactory(appRouter);

export const api = createCaller(await createContext());
