import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

export type ReviewGetOne=inferRouterOutputs<AppRouter>["reviews"]["getOne"]
