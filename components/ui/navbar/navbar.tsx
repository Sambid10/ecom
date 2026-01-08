"use client"
import Link from 'next/link'
import { NavBarItem } from './navbaritems'
import CustomButton from '@/components/ui/customButton'
import { MenuIcon } from 'lucide-react'
import { useState } from 'react'
import NavbarSidebar from './navbarSidebar'
import { AnimatePresence } from 'motion/react'
export default function Navbar() {
    const [navSidebar, setnavSidebar] = useState(false)
    return (
        <nav className='h-16 w-full bg-background'>
            <div className='relative h-full max-w-360 mx-auto px-4 flex items-center justify-between'>
                {/* Logo */}
                <Link href={"/"}>
                    <h1 className='font-dance font-semibold text-2xl md:text-3xl bg-clip-text text-transparent bg-linear-to-r from-[#000000] to-gray-800'>
                        K-Shopify
                    </h1>
                </Link>

                <div className='lg:absolute lg:left-1/2 lg:top-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 hidden lg:flex'>
                    <NavBarItem />
                </div>

                <div className='hidden lg:flex gap-2'>
                    <CustomButton className='bg-linear-to-r from-[#121221] to-stone-700 text-white' text='Login' href='/login' />
                    <CustomButton className='bg-linear-to-r from-[#121221] to-stone-700 text-white ' text='Start Selling' href='/login' />
                </div>
                <div className="block lg:hidden">
                    <button
                        onClick={() => setnavSidebar(true)}
                        className="px-2 py-2 hover:bg-white cursor-pointer transition-all ease-in duration-300 rounded-full border border-gray-800 flex items-center justify-center">
                        <MenuIcon className="w-6 h-6 text-gray-800" />
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {navSidebar &&
                    <NavbarSidebar open={navSidebar} setOpen={setnavSidebar} />
                }
            </AnimatePresence>
        </nav>
    )
}
