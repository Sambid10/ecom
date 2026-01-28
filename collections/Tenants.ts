import { isSuperAdmin } from '@/lib/access'
import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
    slug: 'tenants',
    access:{
        create:({req})=>isSuperAdmin(req.user),
        delete:({req})=>isSuperAdmin(req.user),
    },
    admin: {
        useAsTitle: "slug"
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: "Store Name",
            admin: {
                description: "This is the name of the store (eg: Sambid's Store)"
            },
        }, {
            name: "slug",
            type: "text",
            index: true,
            required: true,
            unique: true,
            access:{
                update:({req})=>isSuperAdmin(req.user),
            },
            admin: {
                description:
                    "this is subdomain for the store (eg:[sambid].vercel.app)"
            }
        },{
            name:"stripeAccountId",
            type:"text",
            required:true,
            access:{
                update:({req})=>isSuperAdmin(req.user)
            },
            admin:{
            
                description:"Stripe account ID associated with ur shop."
            }
        },{
            name:"stripeDetailsSumbitted",
            type:"checkbox",
            admin:{
               
                description:"You cannot create products until you submut your stripe details"
            }
        },{
            name:"image",
            type:"upload",
            relationTo:"media"
        }
    ],
    
}
