"use client"
import { useProductFilter } from "@/hooks/useProductFilter"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import ProductCard from "../ProductCard/productCard"
import { useState } from "react"
import NoProduct from "../skeltons/NoProduct"
import { usePathname } from "next/navigation"
import { useSearchParams } from "next/navigation"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Props {
  category?: string
}
const DEFAULT_PAGE = 1
const DEFAULT_TOTAL_ITEMS = 6
export default function ProductList({ category }: Props) {
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
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
        {data.docs.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            description={product.description!}
            name={product.name}
            pic={product.image?.url}
            authorUsername="Sam"
            authorImageUrl={undefined}
            reviewRating={3}
            reviewCount={5}
            price={product.price}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          />
        ))}
      </div>
      <div className="absolute right-0 bottom-4">
        <Pagination>
          <PaginationContent>
            {Number(page) > 1 &&
              <PaginationItem>
                <PaginationPrevious href={`/albums?page=${Number(page) - 1}&totalLimit=${totalLimit}`} />
              </PaginationItem>
            }

            {Array.from({ length: totalPages }).map((_, index) =>
              <PaginationItem key={index}>
                <PaginationLink
                
                  className={`${Number(page) === index  + 1? "bg-black text-white" : "bg-white text-black"} hover:bg-gray-200 border-gray-400 border`}
                  href={`/albums?page=${index + 1}&totalLimit=${totalLimit}`}>{index + 1}</PaginationLink>
              </PaginationItem>
            )}
            {totalPages !== Number(page) &&
              <PaginationItem>
                <PaginationNext href={`/albums?page=${Number(page) + 1}&totalLimit=${totalLimit}`} />
              </PaginationItem>
            }

          </PaginationContent>
        </Pagination>
      </div>

    </div>

  )
}
