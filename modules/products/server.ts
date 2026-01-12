import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Where } from "payload";
import * as z from "zod"
import { Category } from "@/payload-types";
export const productRouter = createTRPCRouter({
    getMany: baseProcedure.input(
        z.object({
            categorySlug: z.string().nullable().optional(),
            minPrice: z.string().nullable().optional(),
            maxPrice: z.string().nullable().optional(),
        })
    ).query(async ({ ctx, input }) => {
        const where: Where = {
        }
        if (input.minPrice && input.maxPrice) {
            where.price = {
                less_than_equal: input.maxPrice,
                greater_than_equal: input.minPrice
            }
        } else if (input.minPrice) {
            where.price = {
                greater_than_equal: input.minPrice
            }
        } else {
            where.price = {
                less_than_equal: input.maxPrice,
            }
        }
        if (input.categorySlug) {
            const categorydata = await ctx.payload.find({
                collection: "categories",
                limit: 1,
                depth: 1,
                pagination: false,
                where: {
                    slug: {
                        equals: input.categorySlug
                    }
                }
            })
            const formattedData = categorydata.docs.map((doc) => ({
                ...doc,
                subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
                    ...(doc as Category),
                    subcategories: undefined
                }))
            }))
            console.log(formattedData)
            const subcategoriesSlugs = []
            const Parentcategory = formattedData[0]

            if (Parentcategory) {
                subcategoriesSlugs.push(
                    ...Parentcategory.subcategories.map((sub) => sub.slug)
                )
            }
            where["category.slug"] = {
                in: [Parentcategory.slug, ...subcategoriesSlugs]
            }
        }
        const { payload } = ctx
        const data = await payload.find({
            collection: "products",
            depth: 1,
            where: where
        })
        return data
    })

})