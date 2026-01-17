"use client"
import { ChevronDown, ChevronRight, LucideIcon, Trash, Trash2Icon } from "lucide-react"
import React, { useState } from "react"
import { cn } from "@/lib/utils"
import PriceFilter from "./PriceFilter"
import { useProductFilter } from "@/hooks/useProductFilter"
import TagsFilter from "./TagsFilter"
interface ProductFilterProps {
    title: string,
    className?: string,
    children: React.ReactNode
}

const ProductFilter = ({ children, title, className }: ProductFilterProps) => {
    const [isOpen, setIsOpen] = useState(true)
    const Icon = isOpen ? ChevronDown : ChevronRight
    return (
        <div className={cn("p-3 border-b flex-col gap-2", className)}>
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}>
                <p className="font-medium">{title}</p>
                <Icon className="size-5" />
            </div>
            {isOpen && children}
        </div>
    )
}


export default function ProductFilters() {
    const [filters, setFilters] = useProductFilter()
    const onChange = (key: keyof typeof filters, value: unknown) => {
        setFilters({ ...filters, [key]: value })
    }
    return (
        <div className="border rounded-md bg-white shadow-md mt-10">
            <div className="p-3 border-b flex items-center justify-between">
                <p className="font-medium">Filters</p>
                <button
                    onClick={() => setFilters({ minPrice: "", maxPrice: "", tags: [] ,sort:"newest"})}
                    className="border-b border-gray-400 cursor-pointer flex items-center gap-1 ">
                    <h1 className="text-[15px]">Clear</h1> <h1 className="text-red-500 "><Trash2Icon className="h-3.5 w-3.5"/></h1>
                </button>

            </div>
            <ProductFilter title="Price">
                <PriceFilter
                    minPrice={filters.minPrice}
                    maxPrice={filters.maxPrice}
                    onMaxPriceChange={(val) => onChange("maxPrice", val)}
                    onMinPriceChange={(val) => onChange("minPrice", val)}
                />
            </ProductFilter>
            <ProductFilter title="Tags">
                <TagsFilter
                    tags={filters.tags}
                    onTagsChange={(val) => onChange("tags", val)}
                />
            </ProductFilter>
        </div>

    )
}
