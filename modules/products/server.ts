import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Sort, Where } from "payload";
import * as z from "zod";
import { Category, Media, Order, Review, Tenant } from "@/payload-types";
import { sortValues } from "@/hooks/searchParams";
import { headers as getHeader } from "next/headers";
export const productRouter = createTRPCRouter({
  getOne: baseProcedure.input(
    z.object({
      id: z.string()
    })
  ).query(async ({ ctx, input }) => {
    const { id } = input
  const headers = await getHeader()
    const session = await ctx.payload.auth({ headers })
    const product = await ctx.payload.findByID({
      collection: "products",
      depth: 1,
      id: id,
      select: {
        content: false
      }
    })
    let ispurchasedProduct = false
    if (session.user) {
      const purchasedorder = await ctx.payload.find({
        collection: "orders",
        depth: 1,
        where: {
          and: [
            {
              product: {
                equals: input.id
              }
            }, {
              user: {
                equals: session.user?.id
              }
            },
          ]
        }
      })
      ispurchasedProduct = !!purchasedorder.docs[0]
    }



    return { product, image: product.image as Media, additionalimage: product["additional images"] as Media[], ispurchasedProduct }
  }),
  getMany: baseProcedure.input(
    z.object({
      page: z.number().default(1),
      limit: z.number().default(2),
      categorySlug: z.string().nullable().optional(),
      minPrice: z.string().nullable().optional(),
      maxPrice: z.string().nullable().optional(),
      tags: z.array(z.string()).nullable().optional(),
      sort: z.enum(sortValues).nullable().optional(),
      tenantSlug: z.string().nullable().optional()
    })
  ).query(async ({ ctx, input }) => {

    const where: Where = {};
    const headers = await getHeader()
    const session = await ctx.payload.auth({ headers })
    // sort
    let sort: Sort = "-createdAt";
    if (input.sort === "oldest") {
      sort = "createdAt";
    }
    // newest + trending just default to newest

    // price
    if (input.minPrice && input.maxPrice) {
      where.price = {
        less_than_equal: Number(input.maxPrice),
        greater_than_equal: Number(input.minPrice)
      };
    } else if (input.minPrice) {
      where.price = {
        greater_than_equal: Number(input.minPrice)
      };
    } else if (input.maxPrice) {
      where.price = {
        less_than_equal: Number(input.maxPrice)
      };
    }

    if (input.tenantSlug) {
      where["tenant.slug"] = {
        equals: input.tenantSlug
      }
    }
    // category
    if (input.categorySlug) {
      const categorydata = await ctx.payload.find({
        collection: "categories",
        limit: 1,
        depth: 1,
        pagination: false,
        where: {
          slug: {
            equals: input.categorySlug
          }
        }
      });

      const formattedData = categorydata.docs.map((doc) => ({
        ...doc,
        subcategories: (doc.subcategories?.docs ?? []).map((sub) => ({
          ...(sub as Category),
          subcategories: undefined
        }))
      }));

      const Parentcategory = formattedData[0];

      if (Parentcategory) {
        const subcategoriesSlugs = Parentcategory.subcategories.map(
          (sub) => sub.slug
        );

        where["category.slug"] = {
          in: [Parentcategory.slug, ...subcategoriesSlugs]
        };
      }
    }

    // tags
    if (input.tags && input.tags.length > 0) {
      where["tags.name"] = {
        in: input.tags
      };
    }

    const { payload } = ctx;
    const data = await payload.find({
      collection: "products",
      depth: 2,
      where,
      sort,
      page: input.page,
      limit: input.limit,
      select: {
        content: false
      }
    });
    const productIds = data.docs.map(p => p.id)
    const allReviews = await ctx.payload.find({
      collection: "reviews",
      depth: 1,
      limit: 0,
      where: {
        product: {
          in: productIds
        }
      }
    })
    const reviewMap: Record<string, Review[]> = {}

    allReviews.docs.forEach((r) => {
      const pid = typeof r.product === "string" ? r.product : r.product.id
      if (!reviewMap[pid]) reviewMap[pid] = []
      reviewMap[pid].push(r as unknown as Review)
    })


    let purchasedproductIds: string[] = []
    if (session.user) {
      const productIds = data.docs.map((prod) => prod.id)
      const purchasedorder = await ctx.payload.find({
        collection: "orders",
        depth: 1,
        where: {
          and: [
            {
              product: {
                in: productIds
              }
            }, {
              user: {
                equals: session.user?.id
              }
            }
          ]
        }
      })
      purchasedproductIds = purchasedorder.docs.map((order) => {
        let product = order.product
        return typeof product === "string" ? product : product.id
      })
    }
    return {
      ...data,
      docs: data.docs.map(doc => {
        const reviews = reviewMap[doc.id] ?? []
        const avgRating =
          reviews.length > 0
            ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
            : 0
        const finalrating = Math.round((avgRating + Number.EPSILON) * 2) / 2
        return {
          ...doc,
          reviews,
          finalrating,
          isPurchased: purchasedproductIds.includes(doc.id),
          image: doc.image as Media,
          tenant: doc.tenant as Tenant & { image: Media | null }
        }
      })
    }
  })
});
