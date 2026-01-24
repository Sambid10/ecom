"use client"
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ProductPageSkeleton from '../skeltons/ProductPageSkeleton'
import ContainerWrapper from '../containerWrapper/ContainerWrapper'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
export default function OrderProductViewSuspense({ productId }: { productId: string }) {
    return (
        <Suspense fallback={<ProductPageSkeleton />}>
            <ErrorBoundary fallback={<h1>Error fetching data</h1>}>
                <ProductPageSuspense productId={productId} />
            </ErrorBoundary>
        </Suspense>
    )
}

function ProductPageSuspense({ productId }: { productId: string }) {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.orders.getOne.queryOptions({ productId: productId }))
    return (
        <>
            <div className="border-y border-black bg-white">
                <ContainerWrapper className="max-w-7xl py-4 relative">
                    <div className="flex md:flex-row flex-col items-start  md:items-center gap-2 md:gap-1 justify-between w-full">
                        <h1 className="text-xl md:text-xl font-medium w-full md:w-[80%] line-clamp-2 md:line-clamp-1">{data.name}</h1>
                        <Link
                            href={`/library`}
                            className='w-fit  border  bg-background border-black md:px-4 md:py-2 py-1.5 px-3 flex items-center gap-1 text-black rounded-md hover:bg-gray-100'>
                            <ChevronLeft className="size-3 md:size-4" />
                            <h1 className="text-sm md:text-base uppercase font-normal"> Go Back</h1>
                        </Link>
                    </div>

                </ContainerWrapper>
            </div>
            <div className='min-h-screen'>
                <h1></h1>
            </div></>


    )
}

