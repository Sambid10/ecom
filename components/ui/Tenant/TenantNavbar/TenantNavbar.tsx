"use client"
import Link from 'next/link'
import { NavBarItem } from '../../navbar/navbaritems'
import CustomButton from '@/components/ui/customButton'
import { LayoutDashboardIcon, Library, ListOrdered, MenuIcon, Package } from 'lucide-react'
import { useRef, useState } from 'react'
import NavbarSidebar from '../../navbar/navbarSidebar'
import { AnimatePresence } from 'motion/react'
import { useTRPC } from '@/trpc/client'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import Loading from '../../Loading/Loading'
import { Tenant } from '@/payload-types'
import CheckoutButton from '../../CheckoutButton/CheckoutButton'
import { useOutsideClick } from '@/hooks/useOutsideClick'
export default function TenantNavbar({ tenantSlug }: {
    tenantSlug: string
}) {
    const trpc = useTRPC()
    const ref = useRef<HTMLDivElement>(null)
    const { data, isLoading } = useQuery(trpc.auth.session.queryOptions())
    const [profileOpen, setProfileOpen] = useState(false)
    const [navSidebar, setnavSidebar] = useState(false)
    const tenant = data?.user?.tenants?.[0]?.tenant as Tenant | undefined
    const { data: tenantdata } = useSuspenseQuery(trpc.tenant.getOne.queryOptions({
        slug: tenantSlug
    }))
    let tenantImageUrl: string | null = null
    const handleClick = () => {
        setProfileOpen((prev) => !prev)
    }
    useOutsideClick({ handler: handleClick, ref })
    if (tenant && tenant.image && typeof tenant.image !== "string") {
        tenantImageUrl = tenant.image.url ?? null
    }

    return (
        <nav className='h-16 w-full bg-background'>
            <div className='relative h-full max-w-360 mx-auto px-4 flex items-center justify-between'>
                {/* Logo */}
                <Link href={"/"}>                     <h1 className='font-dance capitalize font-semibold text-2xl md:text-3xl bg-clip-text text-transparent bg-linear-to-r from-[#000000] to-gray-800'>
                    {tenantdata.tenant.name}'s K-Shopify                     </h1>
                </Link>

                <div className='lg:absolute lg:left-1/2 lg:top-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 hidden lg:flex'>
                    <NavBarItem />
                </div>
                {isLoading ?
                    <Loading divclassName='w-32 hidden lg:block' /> :
                    <div className='flex gap-2'>
                        {data?.user ? <>
                            <div
                                ref={ref}
                                className='relative'>
                                <img
                                    onClick={handleClick}
                                    src={tenantImageUrl ? tenantImageUrl : "/pictures/avatar.png"}
                                    alt={tenant?.name ?? "Tenant Image"}
                                    className="h-10 w-10 rounded-full cursor-pointer object-cover border border-gray-400/80"
                                />
                                {profileOpen &&
                                    <div className='absolute z-30 top-full right-0 w-64  bg-white border border-gray-800 shadow-md rounded-md text-sm'>
                                        <div className='flex gap-2 w-full p-4'>
                                            <img
                                                src={tenantImageUrl ? tenantImageUrl : "/pictures/avatar.png"}
                                                alt={tenant?.name ?? "Tenant Image"}
                                                className="h-10 w-10 rounded-full cursor-pointer object-cover border border-gray-400/80"
                                            />
                                            <div className='flex flex-col font-medium truncate '>
                                                <h1 className="truncate text-[16px]">{data?.user?.username}</h1>
                                                <h1 className="truncate font-normal">{data?.user?.email}</h1>
                                            </div>
                                        </div>
                                        <div className='border-t border-gray-800  w-full'>
                                            <Link
                                                href={"/library"}
                                                className='hover:bg-gray-200 w-full  flex items-center gap-2 rounded-b-md px-4'
                                            >
                                                <Package className='h-4 w-4'/>
                                                <h1 className='py-2'>Your Orders</h1>
                                            </Link>
                                             
                                        </div>
                                    </div>

                                }
                            </div>

                            <Link
                                href={"/admin"}
                                className='hidden bg-linear-to-r rounded-full h-10 w-fit px-3 border border-gray-600 lg:flex items-center gap-2 justify-center from-[#121221] to-stone-700 text-white'
                            >
                                <LayoutDashboardIcon className='h-3.75 w-3.75' />
                                <h1 className='text-sm'>Dashboard</h1>

                            </Link>
                        </> :
                            <div className='hidden lg:flex lg:gap-1'>
                                <CustomButton className='bg-linear-to-r from-[#121221] to-stone-700 text-white' text='Sign-in' href='/sign-in' />
                                <CustomButton className='bg-linear-to-r from-[#121221] to-stone-700 text-white ' text='Start Selling' href='/sign-up' />
                            </div>
                        }
                        <CheckoutButton tenantSlug={tenantSlug} />
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
