import { createTRPCRouter } from '../init';
import { categoriesRouter } from '@/modules/procedure/categories/procedure';
export const appRouter = createTRPCRouter({
  category:categoriesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;