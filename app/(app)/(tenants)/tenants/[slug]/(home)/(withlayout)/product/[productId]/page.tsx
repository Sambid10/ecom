import ProductPage from "@/components/ui/Pages/ProductPage"
import { getQueryClient } from "@/trpc/server"
import { trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
interface Props {
    params: Promise<{
        productId: string,
        slug:string
    }>
}
export default async function page({ params }: Props) {
    const { productId ,slug} = await params
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(trpc.products.getOne.queryOptions({
        id: productId
    }))
    void queryClient.prefetchQuery(trpc.tenant.getOne.queryOptions({
        slug:slug
    }))
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductPage productId={productId} tenantSlug={slug}/>
        </HydrationBoundary>
    )
}
