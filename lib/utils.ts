import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateTenantUrl(slug: string) {
  //in dev use noraml routing
  if (process.env.NODE_ENV === "development") {
    return `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${slug}`
  }
  //in prod use subdomain
  const protocal = "https"
  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN!
  return `${protocal}://${slug}.${domain}`
}