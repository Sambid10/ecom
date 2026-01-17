"use client"
import Link from 'next/link'
import SmallProductCard from '../ProductCard/SmallProductCard'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTRPC } from '@/trpc/client'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Loading from '../Loading/Loading'
export default function NewProductSection() {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.products.getMany.queryOptions({
        limit:5
    }))
    const [hoveredId, setHoveredId] = useState<string | null>(null)
    return (
        <div className='mt-8'>
            <h1 className='text-[24px] font-medium mb-2'>
                New Products
            </h1>
            <div className='bg-background shadow py-4 rounded-md border border-gray-600'>
                <div className='mb-4 h-fit md:pb-0  px-4 flex flex-col md:flex-row gap-2 md:gap-0 md:items-center md:justify-between '>
                    <h1 className=' text-sm'>Check our new products here..</h1>
                    <Link
                        className='border bg-white border-black px-4 py-2 rounded-md hover:bg-gray-100'
                        href={"/all"}
                    >
                        <h1 className='text-center'>SHOP ALL PRODUCTS</h1>
                    </Link>
                </div>
                <div className='grid gap-4 md:gap-4 px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                    <Suspense fallback={<Loading/>}>
                        <ErrorBoundary fallback={<p>Something bad happended.</p>}>
                            {data?.docs.map((product) =>
                                <SmallProductCard
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
                            )}

                        </ErrorBoundary>
                    </Suspense>
                </div>

            </div>
        </div>
    )
}
