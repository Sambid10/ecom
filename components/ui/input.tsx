import * as React from "react"

import { cn } from "@/lib/utils"
import { Icon, icons, User } from "lucide-react"
import type { LucideIcon } from "lucide-react"
interface InputProps extends React.ComponentProps<"input"> {
  icon?: LucideIcon
  divclassName?: string
}
function Input({ className, icon: Icon, divclassName, type, ...props }: InputProps) {
  return (
    <>
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus:border focus:border-blue-700 active:border active:border-blue-700 active:shadow",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      {Icon && (
        <Icon className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-600 h-5 w-5" />
      )}</>
    // <div className={cn("",divclassName)}>

    // </div>

  )
}

export { Input }
