import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
    admin: {
        useAsTitle: "description"
    },
    slug: "reviews",
    fields: [
        {
            name: "description",
            type: "textarea",
            required: true
        },
        {
            name: "rating",
            type: "number",
            required: true,
            min: 1,
            max: 5
        }
        , {
            name: "product",
            type: "relationship",
            relationTo: "products",
            hasMany: false,
            required: true
        }
        , {
            name: "user",
            type: "relationship",
            relationTo: "users",
            hasMany: false,
            required: true
        }

    ]
}