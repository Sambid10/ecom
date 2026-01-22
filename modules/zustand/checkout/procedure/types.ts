import type Stripe from "stripe"

export type ProductMetaDataTypes = {
    sripeAccountId: string
    id: string
    name: string,
    price: number
}
export type expandedLineItem = Stripe.LineItem & {
    price: Stripe.Price & {
        product: Stripe.Product & {
            metadata: ProductMetaDataTypes
        }
    }
}