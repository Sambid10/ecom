"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { navbarItems } from "../navbar/navbaritems"
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import SocialButton from "./SocialButton";
import Image from "next/image";
export default function Footer() {
    const pathname = usePathname()
    return (
        <footer className='h-56 py-4 w-full bg-white border-t border-gray-800'>
            <div className='relative h-full max-w-7xl gap-4 mx-auto px-4 flex flex-col items-center justify-center'>
                <Link href={"/"}>
                    <h1 className='font-dance font-semibold text-3xl md:text-4xl '>
                        K-Shopify
                    </h1>
                </Link>
                <div className="flex flex-row gap-6 items-center">
                    {navbarItems.map((nav, _) =>
                        <Link
                            key={nav.id}
                            href={nav.href}
                            className="flex group items-center gap-6 w-full"
                        >

                            <h1
                                className={`relative text-sm md:text-[15px]
                                    after:absolute after:left-0 after:-bottom-1
                                    after:h-[1px] after:w-full
                                    after:origin-left after:scale-x-0
                                    after:bg-black after:transition-transform after:duration-300
                                      group-hover:after:scale-x-100
                                        ${pathname === nav.href
                                        ? "text-black font-semibold after:scale-x-100"
                                        : "text-gray-700"
                                    }`}
                            >
                                {nav.children}
                            </h1>

                        </Link>

                    )}
                </div>
                <div className="flex flex-row gap-4">
                    <SocialButton
                        className="fill-blue-600"
                        href="https://www.facebook.com/sambid.shakya"
                        Icon={FaFacebook}
                    />

                    <SocialButton
                        className="fill-gray-900"
                        href="https://github.com/Sambid10"
                        Icon={FaGithub}
                    />

                    <SocialButton
                        className="fill-pink-600"
                        href="https://www.instagram.com/sambidshakya/"
                        Icon={FaInstagram}
                    />

                </div>
                <div className="h-[0.5px] w-full  bg-black" />
                <div className="flex gap-2 items-center">
                    <h1 className="text-sm text-gray-800">Powered By:</h1>
                    <Image
                        height={120}
                        width={120}
                        alt="payload"
                        src={"/pictures/payload.svg"}
                    />
                </div>


            </div>
        </footer>
    )
}
