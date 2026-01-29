import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { expandedLineItem } from "@/modules/zustand/checkout/procedure/types";

export async function POST(req: Request) {
    let event: Stripe.Event;

    // 1️⃣ Construct Stripe event
    try {
        const payloadText = await req.text();
        const signature = req.headers.get("stripe-signature") as string;

        event = stripe.webhooks.constructEvent(
            payloadText,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        if (!(err instanceof Error)) {
            console.log("Non-Error thrown:", err);
        }
        return NextResponse.json(
            { message: `Webhook error: ${errorMessage}` },
            { status: 400 }
        );
    }

    console.log("✅ Webhook received:", event.id, event.type);

    const permittedEvents: string[] = ["checkout.session.completed", "account.updated"];

    // 2️⃣ Ignore unpermitted events
    if (!permittedEvents.includes(event.type)) {
        return NextResponse.json({ message: "Event not handled" }, { status: 200 });
    }

    // 3️⃣ Initialize Payload CMS
    const payload = await getPayload({ config });

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;

                if (!session.metadata?.userId) {
                    throw new Error("User ID is required in session metadata");
                }

                // Find the user in Payload
                const user = await payload.findByID({
                    collection: "users",
                    id: session.metadata.userId
                });

                if (!user) {
                    throw new Error("User not found");
                }

                // Retrieve expanded session with line items
                const expandedSession = await stripe.checkout.sessions.retrieve(
                    session.id,
                    {
                        expand: ["line_items.data.price.product"],
                    },
                    {
                        stripeAccount: event.account,
                    }
                );


                const lineItems = expandedSession.line_items?.data as expandedLineItem[];
                if (!lineItems || lineItems.length === 0) {
                    throw new Error("No line items found in checkout session");
                }

                // Create orders in Payload
                for (const item of lineItems) {
                    const productId = item.price.product.metadata?.id;
                    if (!productId) {
                        console.warn(`Skipping item without metadata id: ${item.price.product.name}`);
                        continue;
                    }

                    await payload.create({
                        collection: "orders",
                        data: {
                            stripeCheckoutSessionid: session.id,
                            user: user.id,
                            stripeAccountId: event.account,
                            product: productId,
                            name: item.price.product.name
                        }
                    });
                }
                break;
            }

            case "account.updated": {
                const account = event.data.object as Stripe.Account;

                await payload.update({
                    collection: "tenants",
                    where: {
                        stripeAccountId: {
                            equals: account.id
                        }
                    },
                    data: {
                        stripeDetailsSumbitted: account.details_submitted
                    }
                });
                break;
            }

            default:
                throw new Error("Unhandled event type");
        }
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return NextResponse.json(
            { message, stack: err instanceof Error ? err.stack : undefined },
            { status: 500 }
        );
    }

    return NextResponse.json({ message: "Received" }, { status: 200 });
}
