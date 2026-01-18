import { SearchParams } from "nuqs/server"
import { HydrationBoundary } from "@tanstack/react-query"
import { loadProductFilter } from "@/hooks/searchParams"
import { getQueryClient } from "@/trpc/server"
import { dehydrate } from "@tanstack/react-query"
import { trpc } from "@/trpc/server"
import ProductListView from "@/components/ui/ProductListWrapper/ProductListView"
import ContainerWrapper from "@/components/ui/containerWrapper/ContainerWrapper"
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
           limit:6,
           tenantSlug:slug 
        })
    )
    return (
        
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProductListView tenantSlug={slug}/>
            </HydrationBoundary>
      
    )
}

