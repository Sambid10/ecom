import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import * as z from "zod";
import { Media, Tenant } from "@/payload-types";
import { TRPCError } from "@trpc/server";

export const checkOutRouter = createTRPCRouter({
    getProducts: baseProcedure.input(
        z.object({
            ids: z.array(z.string())
        })
    ).query(async ({ ctx, input }) => {
        const { payload } = ctx;
        const data = await payload.find({
            collection: "products",
            depth: 2,
            where: {
                id: {
                    in: input.ids
                }
            }
        });

        if(data.totalDocs !== input.ids.length){
            throw new TRPCError({code:"NOT_FOUND",message:"Products not found."})
        }
        
        return {
            ...data,
            docs: data.docs.map((doc) => ({
                ...doc,
                image: doc.image as Media,
                tenant: doc.tenant as Tenant & { image: Media | null }
            }))
        };
    })
});
