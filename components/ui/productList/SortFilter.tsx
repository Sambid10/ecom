"use client"
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { useProductFilter } from '@/hooks/useProductFilter'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useRef, useState } from 'react'
import { keyof } from 'zod'

export default function SortFilter() {
    const ref = useRef<HTMLDivElement>(null)
    const [filter,setFilter]=useProductFilter()
    const onClick=(key:keyof typeof filter,value:unknown)=>{
        setFilter({...filter,[key]:value})
    }
    const [openSortfilter, setOpenSortfilter] = useState(false)

    useOutsideClick({ handler: () => setOpenSortfilter(false), ref })

    return (
        <div ref={ref}>
            <button
                onClick={() => setOpenSortfilter(prev => !prev)}
                className='bg-black rounded-full border border-black h-8 w-24 text-white flex items-center gap-1 justify-center cursor-pointer'
            >
                <p>Sort</p>
                {!openSortfilter ? <ChevronDown className='h-4 w-4' /> : <ChevronUp className='h-4 w-4' />}
            </button>

            {openSortfilter && (
                <div className='border  border-black bg-white absolute top-[110%] rounded-md shadow-md h-fit w-30 right-0 z-40'>
                    <button 
                    onClick={()=>onClick("sort","trending")}
                    className='cursor-pointer w-full text-left '>
                        <h1 className='text-sm border-b border-black w-full p-1.5 hover:bg-gray-100 rounded-t-md '>Trending</h1>
                    </button>
                    <button
                     onClick={()=>onClick("sort","newest")}
                    className='cursor-pointer w-full text-left'>
                        <h1 className='text-sm border-b border-black w-full p-1.5 hover:bg-gray-100 rounded-t-md '>Newest</h1>
                    </button>
                    <button 
                     onClick={()=>onClick("sort","oldest")}
                    className='cursor-pointer w-full text-left'>
                        <h1 className='text-sm  w-full p-1.5 hover:bg-gray-100 rounded-b-md '>Oldest</h1>
                    </button>
                </div>
            )}
        </div>
    )
}
