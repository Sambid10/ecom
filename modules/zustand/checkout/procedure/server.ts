import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import * as z from "zod";
import { Media, Tenant } from "@/payload-types";
import { TRPCError } from "@trpc/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
export const checkOutRouter = createTRPCRouter({
    verify: protectedProcedure.mutation(async ({ ctx, input }) => {
        const user = await ctx.payload.findByID({
            collection: "users",
            id: ctx.session.user.id,
            depth: 0 //tenantid
        })
        if (!user) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "User not found"
            })
        }
        const tenantId = user.tenants?.[0].tenant as string //this is id decause depth=0
        const tenenat = await ctx.payload.findByID({
            collection: "tenants",
            id: tenantId
        })
        if (!tenenat) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Tenant not found"
            })
        }
        const accountLink = await stripe.accountLinks.create({
            account: tenenat.stripeAccountId,
            refresh_url: `${process.env.NEXT_PUBLIC_APP_URL!}/admin`,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL!}/admin`,
            type: "account_onboarding"
        })
        if (!accountLink.url) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Failed to create verification link"
            })
        }
        return { url: accountLink.url }
    }
    ),
    purchase: protectedProcedure.input(z.object({
        productIds: z.array(z.string()).min(1),
        tenantSlug: z.string().min(1),
    })).mutation(async ({ ctx, input }) => {
        const products = await ctx.payload.find({
            collection: "products",
            depth: 2,
            select: {
                content: false
            },
            where: {
                and: [
                    {
                        id: {
                            in: input.productIds
                        }
                    }, {
                        "tenant.slug": {
                            equals: input.tenantSlug
                        }
                    }, {
                        isArchived: {
                            not_equals: true,
                        }
                    }
                ]
            }
        })
        if (products.totalDocs !== input.productIds.length) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Produts not found" })
        }
        const tenantsData = await ctx.payload.find({
            collection: "tenants",
            limit: 1,
            pagination: false,
            where: {
                slug: {
                    equals: input.tenantSlug
                }
            }
        })
        const tenant = tenantsData.docs[0]
        if (!tenant) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Tenant not found" })
        }
        if (!tenant.stripeDetailsSumbitted) {
            throw new TRPCError({ code: "BAD_REQUEST", message: "Tenant not allowed to sell products" })
        }
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
            products.docs.map((prod) => ({
                quantity: 1,
                price_data: {
                    unit_amount: prod.price * 100,
                    currency: "usd",
                    product_data: {
                        name: prod.name,
                        metadata: {
                            sripeAccountId: tenant.stripeAccountId,
                            id: prod.id,
                            name: prod.name,
                            price: prod.price
                        } as Stripe.MetadataParam
                    }
                }
            }))
        const totalAmount = products.docs.reduce((acc, item) => acc + item.price * 100, 0)
        const platformfee = Math.round(totalAmount * (10 / 100));
        const checkout = await stripe.checkout.sessions.create({
            customer_email: ctx.session.user.email,
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${tenant.slug}/checkout?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${tenant.slug}/checkout?success=false`,
            line_items: lineItems,
            invoice_creation: {
                enabled: true
            },
            mode: "payment",
            metadata: {
                userId: ctx.session.user.id
            },
            payment_intent_data: {
                application_fee_amount: platformfee
            }
        }, {
            stripeAccount: tenant.stripeAccountId
        })
        if (!checkout.url) {
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "something bad happend." })
        }
        return {
            url: checkout.url
        }
    }),
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
                and: [{
                    id: {
                        in: input.ids
                    }
                }, {
                    isArchived: {
                        not_equals: true
                    }
                }]

            }
        });

        if (data.totalDocs !== input.ids.length) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Products not found." })
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
