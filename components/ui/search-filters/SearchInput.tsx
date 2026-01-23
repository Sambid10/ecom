import { SearchIcon } from "lucide-react"
import { Input } from "../input"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Props {
    disabled?: boolean
    className?:string
}
export default function SearchInput({ disabled,className }: Props) {
    return (
        <div className="w-full bg-background pb-2">
            <div className={cn("relative w-full lg:flex lg:mx-auto",className)}>
                <Input
                    placeholder="Search Products"
                    className="border shadow-md border-black rounded-full bg-white h-10 pl-14" />
                <button 
                title="Seach"
                className="border-r text-sm border-black absolute inset-0 w-12 flex items-center justify-center cursor-pointer ">
                    <SearchIcon className="h-5.75 w-5.75" />
                </button>
            </div>
            <Link
            href={"/"}
            >
                Library
            </Link>
        </div>
    )
}
