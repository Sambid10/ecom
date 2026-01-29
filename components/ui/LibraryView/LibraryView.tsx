"use client"
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery} from '@tanstack/react-query'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Suspense } from 'react'
import NoProduct from '../skeltons/NoProduct'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import LibraryProductCard from './LibraryProductCard'
import { DEFAULT_PAGE, DEFAULT_TOTAL_ITEMS } from '../productList/ProductList'
import { usePathname, useSearchParams } from 'next/navigation'
import { ErrorBoundary } from 'react-error-boundary'
import ProductskeletonWrapper from '../skeltons/Productskeleton'

export default function LibraryViewSuspense() {
  return <Suspense fallback={<ProductskeletonWrapper className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-5' number={5} />}>
    <ErrorBoundary fallback={<p>Error fetching data</p>}>
    <LibraryView/>
    </ErrorBoundary>
  </Suspense>

}
export function LibraryView() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const search = useSearchParams()
  const pathname = usePathname()

  const page = Number(search.get("page") ?? DEFAULT_PAGE)
  const totalLimit = Number(search.get("totalLimit") ?? 8)

  const trpc = useTRPC()

  const { data } = useSuspenseQuery(
    trpc.orders.getMany.queryOptions({
      page: page < 1 ? DEFAULT_PAGE : page,
      limit: totalLimit < 1 ? DEFAULT_TOTAL_ITEMS : totalLimit,

    })
  )
  const totalPages = Math.ceil(data.totalDocs / totalLimit)

  if (data.docs.length === 0) {
    return (
    <div className='h-[50vh]'>
 <NoProduct />
    </div>
    )
  }

  return (

    <div className="flex flex-col gap-6 relative">
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-5"
        )}
      >
        {data.docs.map((product) => (
          <LibraryProductCard
            key={product.id}
            id={product.id}
            description={product.description!}
            name={product.name}
            pic={product.image?.url}
            authorUsername={product.tenant.name}
            authorImageUrl={product.tenant.image?.url}
            reviewRating={3}
            reviewCount={5}
            price={product.price}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex absolute -bottom-12 right-0 z-30">
          <Pagination>
            <PaginationContent>
              {page > 1 && (
                <PaginationItem>
                  <PaginationPrevious href={`${pathname}?page=${page - 1}&totalLimit=${totalLimit}`} />
                </PaginationItem>
              )}

              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href={`${pathname}?page=${index + 1}&totalLimit=${totalLimit}`}
                    className={cn(
                      page === index + 1 ? "bg-black text-white" : "bg-white text-black",
                      "hover:bg-gray-200 border border-gray-400"
                    )}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {page < totalPages && (
                <PaginationItem>
                  <PaginationNext href={`${pathname}?page=${page + 1}&totalLimit=${totalLimit}`} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
