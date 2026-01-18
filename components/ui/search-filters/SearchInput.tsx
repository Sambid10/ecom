import { SearchIcon } from "lucide-react"
import { Input } from "../input"

interface Props {
    disabled?: boolean
}
export default function SearchInput({ disabled }: Props) {
    return (
        <div className="w-full bg-background pb-2">
            <div className="relative w-full lg:max-w-300 lg:flex lg:mx-auto">
                <Input
                    placeholder="Search Products"
                    className="border shadow-md border-black rounded-full bg-white h-10 pl-14" />
                <button 
                title="Seach"
                className="border-r text-sm border-black absolute inset-0 w-12 flex items-center justify-center cursor-pointer ">
                    <SearchIcon className="h-5.75 w-5.75" />
                </button>
            </div>
        </div>
    )
}
