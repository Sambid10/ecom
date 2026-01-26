import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import * as z from "zod";
import { TRPCError } from "@trpc/server";
import { User } from "@/payload-types";
export const reviewProcedure = createTRPCRouter({
    getMany: baseProcedure.input(z.object({
        productId: z.string()
    }
    )).query(({ ctx, input }) => {
        const { productId } = input
        if(!productId){
            throw new TRPCError({code:"NOT_FOUND",message:"No product found"})
        }
        const allreview=ctx.payload.find({
            collection:"reviews",
            depth:0,
            pagination:false,
            where:{
                product:{
                    equals:productId
                }
            }
        })
        return allreview
    }),
    getOne: protectedProcedure.input(
        z.object({
            productId: z.string(),

        })
    ).query(async ({ ctx, input }) => {
        const { productId } = input
        const product = await ctx.payload.findByID({
            collection: "products",
            id: productId
        })
        if (!product) {
            throw new TRPCError({ code: "NOT_FOUND", message: "product not found" })
        }
        const reviewsData = await ctx.payload.find({
            collection: "reviews",
            limit: 5,
            where: {
                and: [{
                    product: {
                        equals: product.id
                    }
                }, {
                    user: {
                        equals: ctx.session.user.id
                    }
                }]
            }
        })
        const review = reviewsData.docs[0]
        if (!review) {
            return null
        }

        return {
            ...review,
            docs: reviewsData.docs.map((doc) => ({
                ...doc,
                user: doc.user as User
            }))

        }
    }),
    createReview: protectedProcedure.input(
        z.object({
            productId: z.string(),
            description: z.string().max(250),
            rating: z.number().max(5).min(1)
        })
    ).mutation(async ({ ctx, input }) => {
        const { description, productId, rating } = input
        const product = await ctx.payload.findByID({
            collection: "products",
            id: input.productId
        })
        if (!product) {
            throw new TRPCError({ code: "NOT_FOUND", message: "product not found" })
        }
        const existingreviewdata = await ctx.payload.find({
            collection: "reviews",
            where: {
                and: [{
                    product: {
                        equals: product.id
                    }
                }, {
                    user: {
                        equals: ctx.session.user.id
                    }
                }]
            }
        })
        if (existingreviewdata.totalDocs > 0) {
            throw new TRPCError({ code: "BAD_REQUEST", message: "Review already created" })
        }
        const review = await ctx.payload.create({
            collection: "reviews",
            data: {
                description: description,
                product: productId,
                user: ctx.session.user.id,
                rating: rating
            }
        })
        return review
    }),
    updateReview: protectedProcedure.input(
        z.object({
            reviewId: z.string(),
            description: z.string().max(250),
            rating: z.number().max(5).min(1)
        })
    ).mutation(async ({ ctx, input }) => {
        const { description, reviewId, rating } = input
        const exisitingReview = await ctx.payload.findByID({
            collection: "reviews",
            depth: 1,
            id: reviewId
        })

        if (!exisitingReview) {
            throw new TRPCError({ code: "BAD_REQUEST", message: "Review not found" })
        }
        const user = exisitingReview.user as User
        if (user.id !== ctx.session.user.id) {
            throw new TRPCError({ code: "UNAUTHORIZED", message: "You are not allowed to update this review." })
        }
        const updatedreview = await ctx.payload.update({
            collection: "reviews",
            id: input.reviewId,
            data: {
                description: description,
                rating: rating
            }
        })
        return updatedreview
    })

})
