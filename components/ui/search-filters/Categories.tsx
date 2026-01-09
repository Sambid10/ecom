"use client"
import { CategoriesGetMany } from "@/modules/procedure/categories/types"
import CategoryDropDown from "./CategoryDropDown"
interface Props{
    data:CategoriesGetMany
}
export default function Categories({data}:Props) {
    console.log(data,"TESES")
  return (
    <div className="noScrollbar  relative  flex gap-2 w-full overflow-x-auto h-16 items-center">
        {data.map((cat)=>
            <div key={cat.id} >
                <CategoryDropDown
                category={cat}
                />
            </div>
        )}
    </div>
  )
}
