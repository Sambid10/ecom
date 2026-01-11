"use client"
import { CategoriesGetMany } from "@/modules/procedure/categories/types"
import CategoryDropDown from "./CategoryDropDown"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ca } from "zod/v4/locales"
interface Props {
    data: CategoriesGetMany
}
export default function Categories({ data }: Props) {
    const params = useParams()
     const router = useRouter();
    const categoryParmas = params.category as string | undefined
    const activeCategory = categoryParmas || "all"
    return (
        <div className="noScrollbar  relative  flex gap-2 w-full overflow-x-auto h-16 items-center">
            {data.map((cat) =>
                    <CategoryDropDown
                    key={cat.slug}
                        activeCategory={activeCategory}
                        category={cat}
                    />
            )}
        </div>
    )
}
