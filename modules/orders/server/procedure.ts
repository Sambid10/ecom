import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import * as z from "zod";
import { Media, Tenant } from "@/payload-types";
export const orderRouter = createTRPCRouter({
    getMany: protectedProcedure.input(
        z.object({
            page: z.number().default(1),
            limit: z.number().default(2),
        })
    ).query(async ({ ctx, input }) => {
        const { payload } = ctx;
        const data = await payload.find({
            collection: "orders",
            pagination: false,
            depth: 0,
            where: {
                user: {
                    equals: ctx.session.user.id
                }
            },

        });
        const productIds = data.docs.map((order) => order.product)
        console.log(productIds)
        const productsData = await ctx.payload.find({
            collection: "products",
            page: input.page,
            limit: input.limit,
            pagination: true,
            where: {
                id: {
                    in: productIds
                }
            }
        })
        console.log(productsData.totalDocs, "AS")
        return {
            ...productsData,
            docs: productsData.docs.map((doc) => ({
                ...doc,
                image: doc.image as Media,
                tenant: doc.tenant as Tenant & { image: Media | null },
            }))
        };
    })
});
