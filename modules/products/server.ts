import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Sort, Where } from "payload";
import * as z from "zod";
import { Category, Media } from "@/payload-types";
import { sortValues } from "@/hooks/searchParams";

export const productRouter = createTRPCRouter({
  getMany: baseProcedure.input(
    z.object({
      page:z.number().default(1),
      limit:z.number().default(2),
      categorySlug: z.string().nullable().optional(),
      minPrice: z.string().nullable().optional(),
      maxPrice: z.string().nullable().optional(),
      tags: z.array(z.string()).nullable().optional(),
      sort: z.enum(sortValues).nullable().optional()
    })
  ).query(async ({ ctx, input }) => {

    const where: Where = {};

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
      depth: 1,
      where,
      sort,
      page:input.page,
      limit:input.limit,
    });

    return {
      ...data,
      docs: data.docs.map((doc) => ({
        ...doc,
        image: doc.image as Media 
      }))
    };
  })
});
