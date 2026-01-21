import Link from 'next/link'
interface Props{
    slug:string
}
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { generateTenantUrl } from '@/lib/utils'
export default async function CheckoutNavbar({slug}:Props) {
    return (
        <nav className='h-16 w-full bg-background'>
            <div className='relative h-full max-w-360 mx-auto px-4 flex items-center justify-between'>
                {/* Logo */}
                <Link href={"/"}>
                    <h1 className='capitalize font-dance font-semibold text-2xl md:text-3xl bg-clip-text text-transparent bg-linear-to-r from-[#000000] to-gray-800'>
                        {slug}'s K-Shopify
                    </h1>
                </Link>
                 <Link 
              href={`${generateTenantUrl(slug!)}`}
              className='border  bg-white border-black px-4 py-2 flex items-center gap-1 text-black rounded-md hover:bg-gray-100'>
                <ChevronLeft className="size-4" />
                <h1 className="text-base uppercase font-normal">Continue Back</h1>  
              </Link>
            </div>
        </nav>
    )
}
