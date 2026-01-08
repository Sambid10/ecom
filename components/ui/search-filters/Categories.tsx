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
