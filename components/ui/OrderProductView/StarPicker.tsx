"use client"
import { useState } from "react";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";

interface Props{
    value?:number,
    onChange?:(value:number)=>void,
    disabled?:boolean,
    className?:string
}

export default function StarPicker({className,disabled,onChange,value=0}:Props) {
  const [hovervalue,setHoverValue]=useState(0)
    return (
    <div className={cn("flex items-center",disabled  && "opacity-50 cursor-not-allowed",className)}>
        {[1,2,3,4,5].map((star,index)=>
            <button
            key={index}
            type="button"
            onClick={()=>onChange?.(star)}
            onMouseEnter={()=>setHoverValue(star)}
            onMouseLeave={()=>setHoverValue(0)}
            >
                <StarIcon className={cn("size-6",(hovervalue || value) >= star ? "fill-yellow-400 stroke-yellow-500" : "stroke-gray-600",className)}/>
            </button>
        )}
    </div>
  )
}
