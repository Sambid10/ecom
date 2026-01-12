import ContainerWrapper from '@/components/ui/containerWrapper/ContainerWrapper'
import ProductFilters from '@/components/ui/productList/ProductFilters'
import ProductList from '@/components/ui/productList/ProductList'
import Productskeleton from '@/components/ui/skeltons/Productskeleton'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
interface Props {
    params: Promise<{
        category: string
    }>
}
import Link from 'next/link'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
export default async function CategoryPage({ params }: Props) {
    const { category } = await params
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(
        trpc.products.getMany.queryOptions({
            categorySlug: category
        })
    )
    return (
        <ContainerWrapper>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <div className='grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 space-x-6'>
                    <div className="lg:col-span-2 lg:sticky lg:top-30 lg:max-h-[calc(100vh-164px-128px)] lg:overflow-y-auto flex flex-col gap-2 w-full">
                        <div className='flex items-center gap-2 h-8'>
                            <Link
                                className='text-blue-600 font-medium text-base capitalize  hover:underline'
                                href={`/`}
                            >Home</Link>
                            <h1 className='text-blue-500
                            00'>&gt;</h1>
                            <Link
                                className='text-blue-600 font-medium text-base capitalize hover:underline'
                                href={`${category}`}
                            >{category}</Link>
                        </div>
                        <ProductFilters />
                    </div>
                    <div className='lg:col-span-4 xl:col-span-6 overflow-y-auto min-h-screen gap-y-6 pt-10 lg:ml-4'>
                        <Suspense fallback={<Productskeleton />}>
                            <ErrorBoundary fallback={<p>Error fetching Products.Please try again.</p>}>
                                <ProductList category={category} />
                            </ErrorBoundary>
                        </Suspense>
                    </div>
                </div>
            </HydrationBoundary>
        </ContainerWrapper>

    )
}
