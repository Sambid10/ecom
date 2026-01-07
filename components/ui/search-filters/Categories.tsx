import { Category } from "@/payload-types"
import CategoryDropDown from "./CategoryDropDown"
interface Props{
    data:any
}
export default function Categories({data}:Props) {
    console.log(data,"TESES")
  return (
    <div className="noScrollbar mt-4  flex gap-2 w-full overflow-x-auto">
        {data.docs.map((cat:Category)=>
            <div key={cat.id}>
                <CategoryDropDown
                category={cat}
                />
            </div>
        )}
    </div>
  )
}
