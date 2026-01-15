
"use client"

import { ChangeEvent } from "react";
import { Input } from "../input";
import { Label } from "../label";

interface Props {
    minPrice?: string | null;
    maxPrice?: string | null;
    onMinPriceChange: (val: string) => void;
    onMaxPriceChange: (val: string) => void;
}

export const formatAsCurrency = (val: string) => {
    const numericVal = val.replace(/[^0-9.]/g, "")
    const parts = numericVal.split(".")
    const formattedVal = parts[0] + (parts.length > 1 ? "." + parts[1].slice(0, 2) : "")
    if (!formattedVal) return ""
    const numberVal = parseFloat(formattedVal)
    if (isNaN(numberVal)) return ""
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(numberVal)

}

export default function PriceFilter({ onMaxPriceChange, onMinPriceChange, maxPrice, minPrice }: Props) {
    const handleMinPriceChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const numericval= e.target.value.replace(/[^0-9.]/g, "")
        onMinPriceChange(numericval)
    }
    const handleMaxPriceChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const numericval= e.target.value.replace(/[^0-9.]/g, "")
        onMaxPriceChange(numericval)
    }
    return (
        <div className="flex flex-col gap-2 mt-2">
            <div className="flex flex-col gap-2">
                <Label className="font-medium text-[14px]  text-gray-800">
                    Minimum Price:
                </Label>
                <Input
                    type="text"
                    placeholder="$0"
                    value={minPrice ? formatAsCurrency(minPrice) : ""}
                    onChange={handleMinPriceChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label className="font-medium text-[14px] text-gray-800">
                    Maximum Price:
                </Label>
                <Input
                    type="text"
                    placeholder="$10,000,000"
                    value={maxPrice ? formatAsCurrency(maxPrice) : ""}
                    onChange={handleMaxPriceChange}
                />
            </div>
        </div>
    )
}
