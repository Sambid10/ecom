import ContainerWrapper from '@/components/ui/containerWrapper/ContainerWrapper'
interface Props {
    params: Promise<{
        category: string;
        subcategory: string
    }>
}
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import ProductListView from '@/components/ui/ProductListWrapper/ProductListView';
export default async function CategoryPage({ params }: Props) {
    const { category, subcategory } = await params
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
        categorySlug: subcategory
    }))
    return (
        <ContainerWrapper>
                <HydrationBoundary state={dehydrate(queryClient)}>
                   <ProductListView category={category} subcategory={subcategory}/>
                </HydrationBoundary>
        </ContainerWrapper>

    )
}
