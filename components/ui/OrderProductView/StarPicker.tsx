"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { StarIcon } from "lucide-react"

interface Props {
  value?: number // the rating to display, can be decimal for averages
  onChange?: (value: number) => void // called when user selects a star
  disabled?: boolean // true if interactive input is disabled
  className?: string
  hoverable?: boolean // optional: allow hover effect (default true)
}

export default function StarPicker({
  value = 0,
  onChange,
  disabled = false,
  className,
  hoverable = true,
}: Props) {
  const [hoverValue, setHoverValue] = useState(0)

  // If hover is allowed, use hoverValue for display, otherwise just use value
  const displayValue = hoverable ? hoverValue || value : value

  return (
    <div className={cn("flex items-center", disabled && "cursor-not-allowed", className)}>
      {[1, 2, 3, 4, 5].map((star) => {
        // Determine full or half star
        const isFull = displayValue >= star
        const isHalf = !isFull && displayValue >= star - 0.5

        return (
          <button
            key={star}
            type="button"
            disabled={disabled}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => hoverable && !disabled && setHoverValue(star)}
            onMouseLeave={() => hoverable && !disabled && setHoverValue(0)}
            className="relative "
          >
            {isFull && <StarIcon className="size-6 fill-yellow-400 stroke-yellow-500" />}
            {isHalf && !isFull && (
              <StarIcon
                className="size-6 stroke-yellow-500"
                style={{ fill: "url(#half-star)" }}
              />
            )}
            {!isFull && !isHalf && <StarIcon className="size-6 stroke-gray-600" />}
          </button>
        )
      })}

      {/* Gradient definition for half stars */}
      <svg width="0" height="0">
        <linearGradient id="half-star">
          <stop offset="50%" stopColor="#facc15" /> {/* left half yellow */}
          <stop offset="50%" stopColor="transparent" /> {/* right half empty */}
        </linearGradient>
      </svg>
    </div>
  )
}
