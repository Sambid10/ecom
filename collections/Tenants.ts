import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
    slug: 'tenants',
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
            admin: {
                description:
                    "this is subdomain for the store (eg:[sambid].vercel.app)"
            }
        },{
            name:"stripeAccountId",
            type:"text",
            required:true,
            admin:{
                readOnly:true,
            }
        },{
            name:"stripeDetailsSumbitted",
            type:"checkbox",
            admin:{
                readOnly:true,
                description:"You cannot create products until you submut your stripe details"
            }
        },{
            name:"image",
            type:"upload",
            relationTo:"media"
        }
    ],
    
}
