import { SearchParams } from "nuqs/server"
import { HydrationBoundary } from "@tanstack/react-query"
import { loadProductFilter } from "@/hooks/searchParams"
import { getQueryClient } from "@/trpc/server"
import { dehydrate } from "@tanstack/react-query"
import { trpc } from "@/trpc/server"
import ProductList from "@/components/ui/productList/ProductList"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import ProductskeletonWrapper from "@/components/ui/skeltons/Productskeleton"
interface Props {
    searchParams: Promise<SearchParams>
    params: Promise<{ slug: string }>
}
export default async function Page({ params, searchParams }: Props) {
    const { slug } = await params
    const filters = await loadProductFilter(searchParams)
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(
        trpc.products.getMany.queryOptions({
            ...filters,
            limit: 6,
            tenantSlug: slug
        })
    )
    return (

        <HydrationBoundary state={dehydrate(queryClient)}>
            {/* <ProductListView tenantSlug={slug}/> */}
            <Suspense fallback={<ProductskeletonWrapper number={4}  className="min-h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5"/>}>
                <ErrorBoundary fallback={"Error fetching products"}>
                    <div className="min-h-screen pt-4 pb-6">
                         <ProductList isTenant={true} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5" tenantSlug={slug} />
                    </div>
                   
                </ErrorBoundary>

            </Suspense>

        </HydrationBoundary>

    )
}

