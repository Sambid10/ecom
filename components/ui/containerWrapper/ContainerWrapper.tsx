import React from "react"
import { cn } from "@/lib/utils"
export default function ContainerWrapper({ children, className }: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("max-w-360 mx-auto px-4", className)}>
      {children}
    </div>
  )
}
