"use client"
import Link from 'next/link'
import { NavBarItem } from './navbaritems'
import CustomButton from '@/components/ui/customButton'
import { LayoutDashboard, LayoutDashboardIcon, MenuIcon } from 'lucide-react'
import { useState } from 'react'
import NavbarSidebar from './navbarSidebar'
import { AnimatePresence } from 'motion/react'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
import Loading from '../Loading/Loading'
import { da } from 'zod/v4/locales'
import { Tenant } from '@/payload-types'
export default function Navbar() {
    const trpc = useTRPC()
    const { data, isLoading } = useQuery(trpc.auth.session.queryOptions())
    const [navSidebar, setnavSidebar] = useState(false)
    const tenant = data?.user?.tenants?.[0]?.tenant as Tenant | undefined

    let tenantImageUrl: string | null = null

    if (tenant && tenant.image && typeof tenant.image !== "string") {
        tenantImageUrl = tenant.image.url ?? null
    }

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
                {isLoading ?
                    <Loading divclassName='w-32 hidden lg:block' /> :
                    <div className='flex gap-2'>
                        {data?.user ? <>
                            <img
                                src={tenantImageUrl ? tenantImageUrl : "/pictures/avatar.png"}
                                alt={tenant?.name ?? "Tenant Image"}
                                className="h-10 w-10 rounded-full object-cover border border-gray-600"
                            />
                            <Link
                                href={"/admin"}
                                className='hidden bg-linear-to-r rounded-full h-10 w-fit px-3 border border-gray-600 lg:flex items-center gap-2 justify-center from-[#121221] to-stone-700 text-white'
                            >
                                <LayoutDashboardIcon className='h-3.75 w-3.75' />
                                <h1 className='text-sm'>Dashboard</h1>

                            </Link>
                        </> :
                            <>
                                <CustomButton className='bg-linear-to-r from-[#121221] to-stone-700 text-white' text='Sign-in' href='/sign-in' />
                                <CustomButton className='bg-linear-to-r from-[#121221] to-stone-700 text-white ' text='Start Selling' href='/sign-up' />
                            </>
                        }
                        <div className="block lg:hidden">
                            <button
                                onClick={() => setnavSidebar(true)}
                                className="px-2 py-2 hover:bg-white cursor-pointer transition-all ease-in duration-300 rounded-full border border-gray-800 flex items-center justify-center">
                                <MenuIcon className="w-6 h-6 text-gray-800" />
                            </button>
                        </div>
                    </div>
                }


            </div>
            <AnimatePresence>
                {navSidebar &&
                    <NavbarSidebar open={navSidebar} setOpen={setnavSidebar} />
                }
            </AnimatePresence>
        </nav>
    )
}
