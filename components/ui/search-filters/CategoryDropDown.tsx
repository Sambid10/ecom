"use client"
import { useEffect, useRef, useState } from "react"
import { Button } from "../button"
import { CategoriesGetManySingle } from "@/modules/procedure/categories/types"
import Link from "next/link"
interface Props {
    category: CategoriesGetManySingle,
    activeCategory: string | undefined
}

const DROPDOWN_WIDTH = 192
const BRIDGE_HEIGHT = 8

export default function CategoryDropDown({ category, activeCategory }: Props) {
    const [open, setOpen] = useState(false)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const triggerRef = useRef<HTMLDivElement>(null)

    const calculatePosition = () => {
        if (!triggerRef.current) return

        const rect = triggerRef.current.getBoundingClientRect()

        let left = rect.left
        const top = rect.bottom + 8

        if (left + DROPDOWN_WIDTH > window.innerWidth) {
            left = rect.right - DROPDOWN_WIDTH
        }
        left = Math.max(8, Math.min(left, window.innerWidth - DROPDOWN_WIDTH - 8))
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
        >
            <Link

                href={`/${category.slug}`}
                className={`${open || activeCategory === category.slug ? "bg-black text-white" : "bg-white text-black"} h-9 w-fit px-4  rounded-full border cursor-pointer border-black  hover:text-white hover:bg-gray-800 inline-flex items-center justify-center gap-2 whitespace-nowrap  text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive`}>
                {category.name}
            </Link>

            {open && category.subcategories && category.subcategories.length > 0 && (
                <>
                    <div
                        style={{
                            position: "fixed",
                            top: position.top - BRIDGE_HEIGHT,
                            left: position.left,
                            width: DROPDOWN_WIDTH * 1.5,
                            height: 24,
                            zIndex: 9999,
                        }}
                    />
                    <div
                        style={{
                            position: "fixed",
                            top: position.top,
                            left: position.left,
                            zIndex: 9999,
                        }}

                        className="w-48 rounded-md bg-white p-4 border border-black shadow-lg text-black"
                    >
                        {category.subcategories.map((sub) => (

                            <Link
                                key={sub.slug} href={`/${category.slug}/${sub.slug}`}>
                                <div className="flex items-center mr-1.5">
                                    <h1 className="mr-1.5">•</h1><h1 className="underline text-sm py-1"> {sub.name}</h1>
                                </div>

                            </Link>

                        ))}


                    </div>
                </>
            )}

        </div>
    )
}
