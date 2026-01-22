import { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
    slug: "orders",
    admin: {
        useAsTitle: "name"
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true
        },
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false
        }, {
            name: "product",
            type: "relationship",
            required: true,
            hasMany: false,
            relationTo: "products"
        },{
            name:"stripeCheckoutSessionid",
            type:"text",
            required:true
        }
    ]
}