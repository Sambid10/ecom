import { CollectionConfig } from "payload";
import { isSuperAdmin } from "@/lib/access";
export const Orders: CollectionConfig = {
    slug: "orders",
    access: {
        read: () => true,
        create: ({ req }) => isSuperAdmin(req.user),
        update: ({ req }) => isSuperAdmin(req.user),
        delete: ({ req }) => isSuperAdmin(req.user)
    },
    admin: {
        useAsTitle: "name",
        hidden:({user})=> !isSuperAdmin(user)
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
        }, {
            name: "stripeCheckoutSessionid",
            type: "text",
            admin:{
                description:"stripe Checkout session associated with this order."
            },
            required: true
        }
    ]
}