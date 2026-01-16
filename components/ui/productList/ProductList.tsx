"use client"
import { useProductFilter } from "@/hooks/useProductFilter"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import ProductCard from "../ProductCard/productCard"
import { useState } from "react"
import NoProduct from "../skeltons/NoProduct"

interface Props {
  category?: string
}

export default function ProductList({ category }: Props) {
  const [filters] = useProductFilter()
  const trpc = useTRPC()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      categorySlug: category,
      ...filters,
    })
  )

  if (data.docs.length === 0) {
    return <NoProduct />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
      {data.docs.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          description={product.description!}
          name={product.name}
          pic={product.image?.url}
          authorUsername="Sam"
          authorImageUrl={undefined}
          reviewRating={3}
          reviewCount={5}
          price={product.price}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
        />
      ))}
    </div>
  )
}
