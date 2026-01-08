import { cn } from "@/lib/utils"
import { LoaderCircle } from "lucide-react"
export default function Loading({className,divclassName}: {
  className?: string
  divclassName?:string
}) {
  return (
    <div className={cn("",divclassName)}>
 <LoaderCircle className={cn("animate-spin h-6 w-6 mx-auto")} />
    </div>
     
  )
}
