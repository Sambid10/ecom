"use client"
import { Category } from "@/payload-types"
import CategoryDropDown from "./CategoryDropDown"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CustomCategory } from "./types"
interface Props{
    data:CustomCategory[]
}
export default function Categories({data}:Props) {
    console.log(data,"TESES")
  return (
    <div className="noScrollbar mt-4 relative  flex gap-2 w-full overflow-x-auto">
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
