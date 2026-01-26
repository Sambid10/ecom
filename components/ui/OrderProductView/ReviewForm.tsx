"use client"
import { ReviewGetOne } from "@/modules/reviews/types"
interface Props {
    productId: string,
    initialData: ReviewGetOne
}
import Image from "next/image"
import { Tenant } from "@/payload-types"
import StarPicker from "./StarPicker"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import Forms from "./Form"
import { useState } from "react"
import FormDialog from "./FormDialog"
export default function ReviewForm({ initialData, productId }: Props) {
    const trpc = useTRPC()
    const { data } = useQuery(trpc.auth.session.queryOptions())
    const tenant = data?.user?.tenants?.[0]?.tenant as Tenant | undefined
    let tenantImageUrl: string | null = null
    if (tenant && tenant.image && typeof tenant.image !== "string") {
        tenantImageUrl = tenant.image.url ?? null
    }
    const { data: reviewData } = useQuery(trpc.reviews.getMany.queryOptions({
        productId: productId
    }))
    console.log(reviewData, "REVIREW ME PLS")
    const [edit, setEdit] = useState(false)
    const handleOpen = () => {
        setEdit((prev) => !prev)
    }
    const allratings = reviewData?.docs.map((rev) => rev.rating) ?? []
    const total = allratings?.reduce((sum, num) => sum + num, 0)
    const average=allratings.length > 0 ? total/ allratings.length : 0
    const roundedAverage = Math.round(average * 2) / 2;

    return (
        <div>
            <div className="p-8 font-semibold text-6xl flex flex-col gap-2">
                <h1>{roundedAverage} / 5.0</h1>
                <StarPicker disabled={true}  value={roundedAverage}/>
            </div>

            {!initialData &&
                <div className="p-4">
                    <h1 className="font-medium text-lg mb-2 text-gray-800">Liked it? Please give us a review.</h1>
                    <Forms initialData={initialData} productId={productId} />
                </div>}
            {initialData &&
                <div className="p-8">
                    <div className="flex mb-4 gap-2 items-center justify-between">

                        <h1 className="font-medium text-lg">Your Review.</h1>
                        <div className="flex gap-4">
                            <button
                                onClick={handleOpen}
                                type="button"
                                className="text-blue-600 underline text-base  underline-offset-4 cursor-pointer">Edit?</button>
                            <button
                                type="button"
                                className="text-red-600 underline text-base  underline-offset-4 cursor-pointer">Delete?</button>
                        </div>
                    </div>
                    <div className="flex gap-2 w-full">
                        <div className="relative h-12 w-12 ">
                            <Image
                                src={tenantImageUrl ?? "/pictures/avatar.png"}
                                fill
                                className="rounded-full object-cover"
                                alt="profile pic"
                            />
                        </div>
                        <div className="flex flex-col">

                            <StarPicker disabled={true} value={initialData.rating} />
                            <h1 className="capitalize font-medium">{initialData.docs.map((user) => user.user.username)}</h1>
                        </div>
                    </div>
                    <h1 className="mt-2 text-gray-800 text-[15px]">{initialData.description}</h1>
                </div>
            }
            {edit && <FormDialog initialData={initialData} open={edit} productId={productId} setOpen={handleOpen} />}
        </div>
    )
}
