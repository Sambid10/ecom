"use client"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
interface Props {
  category?: string
}
export default function ProductList({ category }: Props) {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.products.getMany.queryOptions({
    categorySlug: category
  }))
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 space-x-4">
      {data.docs.map((product) =>
        <div key={product.id} className="bg-white border rounded-md p-4">
          <h1>{product.name}</h1>
          <p>${product.price}</p>
        </div>
      )}
    </div>
  )
}
