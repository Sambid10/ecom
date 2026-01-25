import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
interface Props {
    params: Promise<{ productId: string }>
}
import OrderProductViewSuspense from "@/components/ui/OrderProductView/OrderProductView"
export default async function page({ params }: Props) {
    const { productId } = await params
    const queryClient=getQueryClient()
    void queryClient.prefetchQuery(trpc.orders.getOne.queryOptions({
        productId:productId
    }))
    void queryClient.prefetchQuery(trpc.reviews.getOne.queryOptions({
        productId:productId
    }))
    return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <OrderProductViewSuspense productId={productId}/>
            </HydrationBoundary>
    )
}
