"use client"
import { useOutsideClick } from "@/hooks/useOutsideClick"
import { motion } from "motion/react"
import { useRef } from "react"
import CustomButton from "@/components/ui/customButton"
import Link from "next/link"
import { navbarItems } from "./navbaritems"
import { usePathname } from "next/navigation"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import Loading from "../Loading/Loading"
import { LayoutDashboard } from "lucide-react"
import { ChevronRight } from "lucide-react"
export default function NavbarSidebar({ open, setOpen }: {
    open: boolean,
    setOpen: (open: boolean) => void
}) {
    const trpc = useTRPC()
    const { data: session, isLoading } = useQuery(trpc.auth.session.queryOptions())
    const ref = useRef<HTMLDivElement>(null)
    const pathname = usePathname()
    useOutsideClick({ handler: () => setOpen(false), ref: ref })
    return (
        <div className="relative">
            <motion.div
                ref={ref}
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: "easeIn" }}
                className='fixed top-0 z-100 border-r-black border right-0 w-[60%] bg-background min-h-screen p-4 overflow-y-auto'>
                <div>
                    <div className="flex flex-col gap-2">
                        <h1 className='font-dance text-center font-semibold text-2xl md:text-3xl bg-clip-text text-transparent bg-linear-to-r from-[#000000] to-gray-800'>
                            K-Albumia
                        </h1>
                        {isLoading ? (
                            <Loading />
                        ) : session?.user ? (
                            <div className="flex flex-col gap-2 sm:max-w-75 sm:mx-auto w-full mt-2">
                                <CustomButton
                                    iconClassName="h-4 w-4 mr-2"
                                    icon={LayoutDashboard}
                                    className="bg-linear-to-r from-[#121221] to-stone-700 text-white"
                                    text="Dashboard"
                                    href="/admin"
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2 sm:max-w-75 sm:mx-auto w-full">
                                <CustomButton
                                    className="bg-linear-to-r from-[#121221] to-stone-700 text-white"
                                    text="Sign-in"
                                    href="/sign-in"
                                />
                                <CustomButton
                                    className="bg-linear-to-r from-[#121221] to-stone-700 text-white"
                                    text="Start Selling"
                                    href="/sign-up"
                                />
                            </div>
                        )}

                    </div>
                    <div className="h-8" />
                    <div className="flex flex-col gap-4 items-center">
                        {navbarItems.map((nav, _) =>
                            <Link
                                onClick={() => setOpen(false)}
                                key={nav.id}
                                href={nav.href}
                                className="flex group items-center gap-2 w-full  justify-center"
                            >
                                <span className="w-5 flex justify-center">
                                    <ChevronRight
                                        className={`transition-opacity ${pathname === nav.href ? "opacity-100" : "opacity-0"
                                            }`}
                                    />
                                </span>

                                <h1
                                    className={`relative text-2xl
                                    after:absolute after:left-0 after:-bottom-1
                                    after:h-0.5 after:w-full
                                    after:origin-left after:scale-x-0
                                    after:bg-black after:transition-transform after:duration-300
                                      group-hover:after:scale-x-100
                                        ${pathname === nav.href
                                            ? "text-black font-semibold after:scale-x-100"
                                            : "text-gray-500"
                                        }
  `}
                                >
                                    {nav.children}
                                </h1>

                            </Link>

                        )}
                    </div>

                </div>
            </motion.div>
            <div

                className='fixed left-0 z-90 bg-black/40 min-h-screen top-0 w-full backdrop-blur-xs' />
        </div>

    )
}
