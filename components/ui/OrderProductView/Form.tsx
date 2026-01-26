import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "../form"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Textarea } from "../textarea"
import { useTRPC } from '@/trpc/client'
import { ReviewGetOne } from '@/modules/reviews/types'
import StarPicker from './StarPicker'
import { Button } from '../button'
import Loading from '../Loading/Loading'
const FormSchema = z.object({
    ratings: z.number().max(5).min(1, { error: "Rating is required" }),
    description: z.string().min(1, { error: "Description is required" }).max(255, { error: "Max 255 characters." }),
})
export default function zForms({ initialData, productId ,closeDialog}: {
    initialData: ReviewGetOne
    productId: string
    closeDialog?:()=>void
}) {
    const trpc = useTRPC()
    const queryClient = useQueryClient()
    const form = useForm<z.infer<typeof FormSchema>>({
        defaultValues: {
            description: initialData?.description ?? "",
            ratings: initialData?.rating ?? 0,
        },
        resolver: zodResolver(FormSchema)
    })
    const reviewmutaion = useMutation(trpc.reviews.createReview.mutationOptions({
        onSuccess: () => {
            toast.success("Review submitted.")
            queryClient.invalidateQueries(trpc.reviews.getOne.queryFilter())
        },
        onError: (err) => {
            console.error(err)
            toast.error("Failed to submit review.")
        }
    }))
    const updatemutation = useMutation(
        trpc.reviews.updateReview.mutationOptions({
            onSuccess: () => {
                toast.success("Review updated.", {
                    style: {
                        backgroundColor: "#16A34A", // green-600
                        color: "white",
                    }
                });
                queryClient.invalidateQueries(
                    trpc.reviews.getOne.queryFilter()
                );
                closeDialog?.()

            },
            onError: (err) => {
                console.error(err);
                toast.error("Failed to update review.", {
                    style: {
                        backgroundColor: "#DC2626", // red-600
                        color: "white",
                    },
                });
            },
        })
    );


    const handleSubmit = (values: z.infer<typeof FormSchema>) => {
        if (!initialData) {
            reviewmutaion.mutate({ description: values.description, rating: values.ratings, productId: productId })
        } else {
            updatemutation.mutate({ description: values.description, rating: values.ratings, reviewId: initialData.id })
        }
    }

    return (
        <Form {...form}>
            <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                    control={form.control}
                    name="ratings"
                    render={({ field }) =>
                        <FormControl>
                            <FormItem>
                                <div className="flex items-center justify-between h-4">
                                    <FormLabel>Rating:</FormLabel>
                                    <FormMessage />
                                </div>

                                <StarPicker
                                   
                                    disabled={reviewmutaion.isPending || updatemutation.isPending }
                                    value={field.value}
                                    onChange={field.onChange}
                                />

                            </FormItem>
                        </FormControl>

                    }
                >
                </FormField>
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) =>
                        <FormControl>
                            <FormItem>
                                <div className="flex items-center justify-between h-4">
                                    <FormLabel>Description:</FormLabel>
                                    <FormMessage />
                                </div>

                                <Textarea
                                    disabled={reviewmutaion.isPending || updatemutation.isPending }
                                    className="shadow-sm border bg-white border-gray-800 min-h-26"
                                    placeholder="Want to leave a review?"
                                    {...field}
                                />

                            </FormItem>
                        </FormControl>

                    }
                >

                </FormField>
                    <div className="flex justify-end w-full">
                        <Button
                            className="px-6 w-30 py-1 text-base cursor-pointer"
                            disabled={false}
                        >
                            {reviewmutaion.isPending || updatemutation.isPending ? <h1><Loading /></h1> :
                                (initialData ? "Update" : "Submit")
                            }

                        </Button>
                    </div>

            </form>
        </Form>
    )
}
