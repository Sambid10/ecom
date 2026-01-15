"use client"
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react"
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
    const [isOpen, setIsOpen] = useState(false)
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
        <div className="border rounded-md bg-white shadow-md">
            <div className="p-3 border-b flex items-center justify-between">
                <p className="font-medium">Filters</p>
                <button
                    onClick={() => setFilters({ minPrice: "", maxPrice: "", tags: [] ,sort:""})}
                    className="border-b border-gray-400 cursor-pointer flex items-center gap-2 ">
                    <h1>Clear</h1> <h1 className="text-red-500 ">X</h1>
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
