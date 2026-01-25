"use client"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import ReviewForm from "./ReviewForm"
interface Props {
    productId: string
}
export default function ReviewSidebar({ productId }: Props) {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.reviews.getOne.queryOptions({
        productId: productId
    }))
    console.log(data)
    return (
        <div>
            <ReviewForm
            initialData={data}
            productId={productId}
            />
        </div>
    )
}
