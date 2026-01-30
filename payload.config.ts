import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { fileURLToPath } from "url";
import sharp from "sharp";
import {vercelBlobStorage} from "@payloadcms/storage-vercel-blob"
import type { Config } from './payload-types'
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Categories } from "./collections/Categories";
import { Products } from "./collections/Products";
import { Tags } from "./collections/Tags";
import { Tenants } from "./collections/Tenants";
import { Orders } from "./collections/Order";
import { Reviews } from "./collections/Review";
import { isSuperAdmin } from "./lib/access";
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components:{
      beforeNavLinks:["@/components/ui/stripe-account-verify#StripeaccountverifyButton"]
    }
  },
  collections: [Users, Media,Categories,Products,Tags,Tenants,Orders,Reviews],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || "",
  }),
  sharp,
  plugins: [
     multiTenantPlugin<Config>({
      collections: {
        products:{},
      },
      tenantsArrayField:{
        includeDefaultField:false
      },
      userHasAccessToAllTenants:(user)=>isSuperAdmin(user)
    }),
    vercelBlobStorage({
      enabled:true,
      clientUploads:true,
      collections:{
        media:true
      },
      token:process.env.BLOB_READ_WRITE_TOKEN
    })
  ],
});
