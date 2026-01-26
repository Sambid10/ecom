"use client"
import { SearchIcon } from "lucide-react"
import { Input } from "../input"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Package } from "lucide-react"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
interface Props {
    disabled?: boolean
    className?: string
}
export default function SearchInput({ disabled, className }: Props) {
    const trpc=useTRPC()
    const {data:session}=useQuery(trpc.auth.session.queryOptions())
    return (
        <div className="w-full bg-background pb-2 flex items-center gap-2">
            <div className={cn("relative w-full lg:flex lg:mx-auto", className)}>
                <Input
                    placeholder="Search Products"
                    className="border shadow-md border-black rounded-full bg-white h-10 pl-14" />
                <button
                    title="Seach"
                    className="border-r text-sm border-black absolute inset-0 w-12 flex items-center justify-center cursor-pointer ">
                    <SearchIcon className="h-5.75 w-5.75" />
                </button>
            </div>
            {session?.user?.id && 
              <Link
              prefetch
                href={"/library"}
                className='hover:bg-gray-100 bg-white rounded-full h-10 w-fit  flex items-center gap-2 border border-black px-2 md:px-4' 
            >
                <Package className='h-3.75 w-3.75' />
                <h1 className='text-sm'>Library</h1>
            </Link>
            }
          
        </div>
    )
}
