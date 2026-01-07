"use client"
import { useEffect, useRef, useState } from "react"
import { Button } from "../button"
interface Props {
    category: any
}

const DROPDOWN_WIDTH = 192
const BRIDGE_HEIGHT = 8

export default function CategoryDropDown({ category }: Props) {
    const [open, setOpen] = useState(false)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const triggerRef = useRef<HTMLDivElement>(null)

    const subcategories = category?.subcategories?.docs ?? []

    const calculatePosition = () => {
        if (!triggerRef.current) return

        const rect = triggerRef.current.getBoundingClientRect()

        let left = rect.left
        const top = rect.bottom + 8

        if (left + DROPDOWN_WIDTH > window.innerWidth) {
            left = rect.right - DROPDOWN_WIDTH
        }
        setPosition({ top, left })
    }

    useEffect(() => {
        if (!open) return

        calculatePosition()
        window.addEventListener("resize", calculatePosition)
        window.addEventListener("scroll", calculatePosition, true)

        return () => {
            window.removeEventListener("resize", calculatePosition)
            window.removeEventListener("scroll", calculatePosition, true)
        }
    }, [open])

    return (
        <div
            ref={triggerRef}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className="relative"
        >
            <Button className={`${open ? "bg-black text-white" : "bg-white text-black"} h-10 rounded-full border border-black  hover:text-white hover:bg-black`}>
                {category.name}
            </Button>

            {open && subcategories.length > 0 && (
                <>
                    <div
                        style={{
                            position: "fixed",
                            top: position.top - BRIDGE_HEIGHT,
                            left: position.left,
                            width: DROPDOWN_WIDTH,
                            height: BRIDGE_HEIGHT,
                            zIndex: 9999,


                        }}
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                    />

                    <div
                        style={{
                            position: "fixed",
                            top: position.top,
                            left: position.left,
                            zIndex: 9999,
                        }}
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                        className="w-48 rounded-md bg-white p-4 border border-black shadow-lg text-black"
                    >
                        {subcategories.map((sub: any) => (
                            <div key={sub.id} className="py-1 cursor-pointer">
                                <ul className="list-disc pl-4">
                                    <li className="text-sm underline underline-offset-2 hover:text-gray-800">
                                        {sub.name}
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </>
            )}

        </div>
    )
}
