"use client"
import { CategoriesGetMany } from "@/modules/procedure/categories/types"
import CategoryDropDown from "./CategoryDropDown"
import { useParams, usePathname } from "next/navigation"
interface Props {
    data: CategoriesGetMany
}
import Link from "next/link"
export default function Categories({ data }: Props) {
    const params = useParams()
    const pathname = usePathname()
    console.log("pathname")
    const categoryParmas = params.category as string | undefined
    const activeCategory = categoryParmas
    return (
        <div className="noScrollbar  relative  flex gap-2 w-full overflow-x-auto h-16 items-center">
            <Link
                href={"/all"}
                className={`${pathname === "/all" ? "bg-black text-white" : "bg-white text-black"} h-9 w-fit px-4 rounded-full border cursor-pointer border-black  hover:text-white hover:bg-gray-800 inline-flex items-center justify-center gap-2 whitespace-nowrap  text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive`}>
                All
            </Link>
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
