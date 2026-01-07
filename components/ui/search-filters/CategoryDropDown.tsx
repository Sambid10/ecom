"use client"
import { useState } from "react"
import { Button } from "../button"

interface Props {
    category: any
}

export default function CategoryDropDown({
    category,
}: Props) {
    const [open, setOpen] = useState(false)

    const subcategories = category?.subcategories?.docs ?? []
    const handleMouseEnter = () => {
        setOpen(true)
    }
    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setOpen(false)}
        >
            <Button
                className={`${open ? "bg-gray-100 shadow-md" : "bg-white"
                    } h-10 rounded-full text-gray-800 hover:bg-gray-100 cursor-pointer border border-black`}
            >
                {category.name}
            </Button>
            {open && subcategories.length > 0 && (
                <>
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[9px] border-t-[#121212] ml-4 mt-0.5 "/>
                    <div className="absolute top-full w-48 rounded-md bg-white p-4 border border-black text-black">
                        {subcategories.map((sub: any) => (
                            <div
                                key={sub.id}
                                className="py-1 hover:text-gray-800 cursor-pointer"
                            >
                                <ul className="list-disc pl-4">
                                    <li className="text-sm underline underline-offset-2">{sub.name}</li>
                                </ul>
                            </div>
                        ))}
                    </div></>

            )}
        </div>
    )
}
