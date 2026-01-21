import ContainerWrapper from '@/components/ui/containerWrapper/ContainerWrapper'
import { getQueryClient, trpc } from '@/trpc/server'
import type { SearchParams } from "nuqs/server"
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
interface Props {
    searchParams: Promise<SearchParams>,
    params:Promise<{slug:string}>
}
import { loadProductFilter } from '@/hooks/searchParams'
import ProductListView from '@/components/ui/ProductListWrapper/ProductListView'
export default async function AllPage({ searchParams ,params}: Props) {
    const filters = await loadProductFilter(searchParams)
    const {slug}=await params
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(
        trpc.products.getMany.queryOptions({
            maxPrice: filters.maxPrice,
            minPrice: filters.minPrice
        })
    )
    void queryClient.prefetchInfiniteQuery(
        trpc.tags.getMany.infiniteQueryOptions({
            limit: 10
        })
    )
    return (
       
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProductListView  tenantSlug={slug}/>
            </HydrationBoundary>
       

    )
}
