import ContainerWrapper from '@/components/ui/containerWrapper/ContainerWrapper'
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
import { ca } from 'zod/v4/locales'
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
            <div className='min-h-screen ml-4'>
                <div className='flex items-center gap-2'>
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
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <Suspense fallback={<Productskeleton />}>
                        <ErrorBoundary fallback={<p>Error fetching Products.Please try again.</p>}>
                            <ProductList category={category} />
                        </ErrorBoundary>
                    </Suspense>
                </HydrationBoundary>
            </div>

        </ContainerWrapper>

    )
}
