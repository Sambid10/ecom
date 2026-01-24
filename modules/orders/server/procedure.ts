import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import * as z from "zod";
import { Media, Tenant } from "@/payload-types";
import { TRPCError } from "@trpc/server";
export const orderRouter = createTRPCRouter({
    getOne: protectedProcedure.input(
        z.object({
            productId: z.string()
        })
    ).query(async ({ ctx, input }) => {
        const { payload } = ctx;
        const data = await payload.find({
            collection: "orders",
            pagination: false,
            limit: 1,
            depth: 0,
            where: {
                and: [{
                    product: {
                        equals: input.productId
                    }
                },
                {
                    user: {
                        equals: ctx.session.user.id
                    }
                }
                ]

            }
        });
        const order = data.docs[0]
        console.log(order)
        if (!order) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Order not found"
            });
        }

        const productsData = await ctx.payload.findByID({
            collection: "products",
            id: order.product as string
        })
        return productsData
    }),
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
