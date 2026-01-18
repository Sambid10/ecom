import { authRouter } from '@/modules/auth/server/procedure';
import { createTRPCRouter } from '../init';
import { categoriesRouter } from '@/modules/procedure/categories/procedure';
import { productRouter } from '@/modules/products/server';
import { tagsRouter } from '@/modules/tags/server/server';
import { TenantsRouter } from '@/modules/tenants/procedure';
export const appRouter = createTRPCRouter({
  auth:authRouter,
  category:categoriesRouter,
  products:productRouter,
  tags:tagsRouter,
  tenant:TenantsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;