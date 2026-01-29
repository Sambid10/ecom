import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config"
import { expandedLineItem } from "@/modules/zustand/checkout/procedure/types";

export async function POST(req: Request) {
    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(
            await req.text(),
            req.headers.get("stripe-signature") as string,
            process.env.STRIPE_WEBHOOK_SECRET as string
        )
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "undefinded"
        if (err! instanceof Error) {
            console.log(err, "XXXX")
        }
        return NextResponse.json({
            message: `webhook error ${errorMessage}`
        }, {
            status: 400
        })
    }
    console.log("Success!!! HURRRAY!!", event.id)
    const permittedEvents: string[] = [
        "checkout.session.completed",
        "account.updated"
    ]
    const payload = await getPayload({ config: config })
    if (permittedEvents.includes(event.type)) {
        let data;
        try {
            switch (event.type) {
                case "checkout.session.completed":
                    data = event.data.object as Stripe.Checkout.Session
                    if (!data.metadata?.userId) {
                        throw new Error("User id required")
                    }
                    const user = await payload.findByID({
                        collection: "users",
                        id: data.metadata.userId
                    })
                    if (!user) {
                        throw new Error("User not found")
                    }
                    const expandedSession = await stripe.checkout.sessions.retrieve(
                        data.id, {
                        expand: ["line_items.data.price.product"]
                    }, {
                        stripeAccount:event.account
                    }
                    )
                    if (!expandedSession.line_items?.data || expandedSession.line_items.data.length === 0) {
                        throw new Error("No line items found")
                    }
                    const lineItems = expandedSession.line_items.data as expandedLineItem[]
                    for (const item of lineItems) {
                        await payload.create({
                            collection: "orders",
                            data: {
                                stripeCheckoutSessionid: data.id,
                                user: user.id,
                                stripeAccountId:event.account,
                                product: item.price.product.metadata.id,
                                name: item.price.product.name
                            }
                        })
                    }
                    break;
                case "account.updated":
                    data = event.data.object as Stripe.Account
                    await payload.update({
                        collection: "tenants",
                        where: {
                            stripeAccountId: {
                                equals: data.id
                            }
                        },
                        data: {
                            stripeDetailsSumbitted: data.details_submitted
                        }
                    })
                    break;
                default:
                    throw new Error("Unhanled event")
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err)
            return NextResponse.json({
                message,
                stack: err instanceof Error ? err.stack : undefined
            }, {
                status: 500
            })
        }

    }
    return NextResponse.json({ message: "Recieved" }, { status: 200 })
}