import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import * as z from "zod"
export const TenantsRouter = createTRPCRouter({
    getOne: baseProcedure.input(
        z.object({
            slug: z.string()
        })
    ).query(async ({ ctx, input }) => {
        const data = await ctx.payload.find({
            collection: "tenants",
            where: {
                slug: { equals: input.slug }
            },
            limit: 1,
            pagination: false
        })
        const tenant = data.docs[0]
        if (!tenant) throw new TRPCError({ code: "NOT_FOUND", message: "No Tenant Found" })
        return tenant
    })

})