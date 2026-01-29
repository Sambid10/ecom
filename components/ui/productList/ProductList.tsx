"use client"

import { useProductFilter } from "@/hooks/useProductFilter"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import ProductCard from "../ProductCard/productCard"
import { useState } from "react"
import NoProduct from "../skeltons/NoProduct"
import { usePathname, useSearchParams } from "next/navigation"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn, generateTenantUrl } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
interface Props {
  category?: string
  tenantSlug?: string
  className?: string
  isTenant: boolean
}

export const DEFAULT_PAGE = 1
export const DEFAULT_TOTAL_ITEMS = 8
export default function ProductList({ category, tenantSlug, className, isTenant = false }: Props) {
  const [filters] = useProductFilter()
  const search = useSearchParams()
  const pathname = usePathname()
  const page = search.get("page") ?? DEFAULT_PAGE
  const totalLimit = search.get("totalLimit") ?? DEFAULT_TOTAL_ITEMS
  const trpc = useTRPC()
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      categorySlug: category,
      tenantSlug: tenantSlug,
      page: Number(page) < 1 ? DEFAULT_PAGE : Number(page),
      limit: Number(totalLimit) < 1 ? DEFAULT_TOTAL_ITEMS : Number(totalLimit),
      ...filters,
    })
  )

  if (data.docs.length === 0) {
    return <NoProduct />
  }

  const totalPages = Math.ceil(data.totalDocs / Number(totalLimit))
  return (
    <>
      {isTenant &&
        <div className="flex flex-row justify-between items-center mb-2">
          <h1 className="font-medium text-2xl capitalize">{tenantSlug}'s Product's</h1>
          {Number(totalPages) > 1 &&
            <div className="h-full flex items-center justify-center">
              <Link
                href={`${generateTenantUrl(tenantSlug!)}/all`}
                className='border  bg-white border-black px-4 py-2 flex items-center gap-1 text-black rounded-md hover:bg-gray-100'>
                <h1 className="text-base uppercase font-normal">View All Products</h1>  <ChevronRight className="size-4" />
              </Link>
            </div>

          }
        </div>
      }
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-5",
          className
        )}
      >
        {data.docs.map((product) => {
          // const ratings = product.review.map((rev)=>rev.rating)
          // console.log(ratings)

          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              pic={product.image?.url}
              authorUsername={product.tenant.name}
              authorImageUrl={product.tenant.image?.url}
              isPurchased={product.isPurchased}
              reviewRating={product.finalrating}
              reviewCount={5}
              price={product.price}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
            />
          );
        })}


      </div>

      {!isTenant && Number(totalPages) > 1 && (
        <div className="absolute right-0 bottom-4">
          <Pagination>
            <PaginationContent>
              {Number(page) > 1 && (
                <PaginationItem>
                  <PaginationPrevious href={`${pathname}?page=${Number(page) - 1}&totalLimit=${totalLimit}`} />
                </PaginationItem>
              )}

              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    className={cn(
                      Number(page) === index + 1 ? "bg-black text-white" : "bg-white text-black",
                      "hover:bg-gray-200 border-gray-400 border"
                    )}
                    href={`${pathname}?page=${index + 1}&totalLimit=${totalLimit}`}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {totalPages !== Number(page) && (
                <PaginationItem>
                  <PaginationNext href={`${pathname}?page=${Number(page) + 1}&totalLimit=${totalLimit}`} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}

    </>
  )
}
