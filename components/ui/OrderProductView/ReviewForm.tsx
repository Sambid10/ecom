"use client"

import { ReviewGetOne } from "@/modules/reviews/types"
import { Tenant } from "@/payload-types"
import Image from "next/image"
import StarPicker from "./StarPicker"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import Forms from "./Form"
import { useState } from "react"
import FormDialog from "./FormDialog"
import { Progress } from "../progress"

interface Props {
    productId: string,
    initialData: ReviewGetOne
}

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

    const [edit, setEdit] = useState(false)
    const handleOpen = () => setEdit(prev => !prev)

    // ⭐ Ratings calculations
    const allRatings = reviewData?.docs.map(rev => rev.rating) ?? []
    const total = allRatings.reduce((sum, num) => sum + num, 0)
    const average = allRatings.length > 0 ? total / allRatings.length : 0
    const roundedAverage = Math.round(average * 2) / 2

    // Count ratings per star
    const starCounts = [5, 4, 3, 2, 1].map(star =>
        reviewData?.docs.filter(rev => rev.rating === star).length ?? 0
    )
    const totalReviews = reviewData?.docs.length ?? 0
    const starPercentages = starCounts.map(count =>
        totalReviews > 0 ? (count / totalReviews) * 100 : 0
    )

    return (
        <div>
            <div className="flex flex-col md:flex-row max-w-4xl mx-auto gap-8 py-8 md:px-8 px-4 md:justify-center w-full">

                {/* Average Rating */}
                <div className="flex w-full md:w-[40%] flex-col justify-center items-center font-semibold text-6xl gap-4">
                    <h1>{roundedAverage} / 5.0</h1>
                    <StarPicker disabled={true} value={roundedAverage} />
                </div>

                {/* Ratings Breakdown */}
                <div className="flex w-full flex-col gap-2 md:w-[60%] mx-auto max-w-lg md:max-w-none">
                    {[5, 4, 3, 2, 1].map((stars, index) => {
                        const percentage = Math.round(starPercentages[index])
                        return (
                            <div key={stars} className="flex items-center gap-3">
                                {/* Star label */}
                                <div className="text-sm text-gray-800 w-12 shrink-0 font-medium">
                                    {stars} {stars === 1 ? "star" : "stars"}
                                </div>

                                {/* Progress bar */}
                                <Progress
                                    value={starPercentages[index]}
                                    className="flex-1 h-6 bg-gray-200/50 rounded-full border border-black"
                                />

                                {/* Count and percentage */}
                                <div className="text-sm w-20 font-medium text-gray-700 text-left">
                                    {starCounts[index]} ({percentage}%)
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="h-px bg-gray-800 w-full" />
            {/* Review Form */}
            {!initialData && (
                <div className="p-4 bg-gray-50">
                    <h1 className="font-medium text-lg mb-2 text-gray-800">
                        Liked it? Please give us a review.
                    </h1>
                    <Forms initialData={initialData} productId={productId} />
                </div>
            )}

            {/* Existing Review */}
            {initialData && (
                <div className="px-4 md:px-8 py-8 bg-gray-50 rounded-md ">
                    <div className="flex mb-4 gap-2 items-center justify-between">
                        <h1 className="font-medium text-lg">Your Review.</h1>
                        <div className="flex gap-4">
                            <button
                                onClick={handleOpen}
                                type="button"
                                className="text-blue-600 underline text-base underline-offset-4 cursor-pointer"
                            >
                                Edit?
                            </button>
                            <button
                                type="button"
                                className="text-red-600 underline text-base underline-offset-4 cursor-pointer"
                            >
                                Delete?
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-2 w-full">
                        <div className="relative h-12 w-12">
                            <Image
                                src={tenantImageUrl ?? "/pictures/avatar.png"}
                                fill
                                className="rounded-full object-cover"
                                alt="profile pic"
                            />
                        </div>
                        <div className="flex flex-col">
                            <StarPicker disabled={true} value={initialData.rating} />
                            <h1 className="capitalize font-medium">
                                {initialData.docs.map(user => user.user.username).join(", ")}
                            </h1>
                        </div>
                    </div>

                    <h1 className="mt-2 text-gray-800 text-[15px]">{initialData.description}</h1>
                </div>

            )}
            <div className="p-8 border-t border-gray-800">
                <h1 className="font-medium text-lg">All Reviews.</h1>
            </div>
            {edit && (
                <FormDialog
                    initialData={initialData}
                    open={edit}
                    productId={productId}
                    setOpen={handleOpen}
                />
            )}
        </div>
    )
}
