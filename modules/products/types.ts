import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

export type ProductsGetMany=inferRouterOutputs<AppRouter>["products"]["getMany"]
export type ProductGetManySingle=ProductsGetMany