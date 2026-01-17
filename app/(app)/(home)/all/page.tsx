import ContainerWrapper from '@/components/ui/containerWrapper/ContainerWrapper'
import { getQueryClient, trpc } from '@/trpc/server'
import type { SearchParams } from "nuqs/server"
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
interface Props {
    searchParams: Promise<SearchParams>
}
import { loadProductFilter } from '@/hooks/searchParams'
import ProductListView from '@/components/ui/ProductListWrapper/ProductListView'
export default async function CategoryPage({ searchParams }: Props) {
    const filters = await loadProductFilter(searchParams)
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
        <ContainerWrapper>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProductListView />
            </HydrationBoundary>
        </ContainerWrapper>

    )
}
