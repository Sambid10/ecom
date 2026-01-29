import { isSuperAdmin } from '@/lib/access'
import { Tenant } from '@/payload-types';
import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
    slug: "products",
    admin: {
        useAsTitle: "name",
        description:"You must verify your account before selling/creating products."
    },
    access: {
        create: ({ req }) => {
            if (isSuperAdmin(req.user)) true;
            const tenant = req.user?.tenants?.[0]?.tenant as Tenant
            if(!tenant){
                return false
            }
            return Boolean(tenant.stripeDetailsSumbitted)
        },
        delete:({req})=>
            isSuperAdmin(req.user)
        
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true
        },
        {
            name: "description",
            type: "text",
        }, {
            name: "price",
            type: "number",
            required: true,
        }, {
            name: "category",
            type: "relationship",
            relationTo: "categories",
            hasMany: false
        }, {
            name: "image",
            type: "upload",
            relationTo: "media",
            required: true,
        },
        {
            name: "additional images",
            type: "upload",
            relationTo: "media",
            hasMany: true,
            required: true,
            admin: {
                description: "Atleast add 1 image for product validation."
            },
        },
        {
            name: "refundPolicy",
            type: "select",
            options: ["30-day", "14-day", "7-day", "3-day", "1-day", "no-refund"],
            defaultValue: "30-day"
        }, {
            name: "tags",
            type: "relationship",
            relationTo: "tags",
            hasMany: true
        }, {
            name: "review",
            type: "relationship",
            relationTo: "reviews",
            hasMany: true,
        },{
            name:"content",
            type:"textarea",
            admin:{
                description:"Protected content only visible to customers after purchase.Add product documentaions and bonus material.Support markdown formatting"
            }
        },{
            name:"isArchived",
            label:"Archive",
            defaultValue:false,
            type:"checkbox",
            admin:{
                description:"If checked this product will be archived."
            }
        }
    ]
}