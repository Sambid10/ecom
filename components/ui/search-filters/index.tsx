"use client"
import { useSuspenseQuery } from "@tanstack/react-query"
import ContainerWrapper from "../containerWrapper/ContainerWrapper"
import Categories from "./Categories"
import { useTRPC } from "@/trpc/client"
export default function SearchFilters() {
  const trpc=useTRPC()
  const {data} = useSuspenseQuery(trpc.category.getMany.queryOptions())
  return (
    <div>
        <ContainerWrapper>
            <Categories data={data}/>
        </ContainerWrapper>
    </div>
  )
}
