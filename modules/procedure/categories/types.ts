import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

export type CategoriesGetMany=inferRouterOutputs<AppRouter>["category"]["getMany"]
export type CategoriesGetManySingle=CategoriesGetMany[0]