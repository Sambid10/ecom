"use client"
import { Fragment, Suspense } from 'react'
import Image from 'next/image'
import { ErrorBoundary } from 'react-error-boundary'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import Link from 'next/link'
import ProductPageSkeleton from '../skeltons/ProductPageSkeleton'
import CustomButton from '../customButton'
import { Button } from '../button'
import { ShoppingCart, Star } from 'lucide-react'
import { Progress } from '../progress'
export default function ProductPage({ productId, tenantSlug }: {
    productId: string
    tenantSlug: string
}) {
    return (
        <Suspense fallback={<ProductPageSkeleton />}>
            <ErrorBoundary fallback={<h1>Error fetching data</h1>}>
                <ProductPageSuspense productId={productId} tenantSlug={tenantSlug} />
            </ErrorBoundary>
        </Suspense>
    )
}
function ProductPageSuspense({ productId, tenantSlug }: {
    productId: string
    tenantSlug: string
}) {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.products.getOne.queryOptions({
        id: productId
    }))
    const { data: tenantdata } = useSuspenseQuery(trpc.tenant.getOne.queryOptions({
        slug: tenantSlug
    }))
    return (
        <div className='min-h-screen flex flex-col pb-12 pt-2' >
            <div className=' w-full lg:max-w-300 h-[50vh]  mx-auto relative bg-white rounded-t-md border border-b-0 border-gray-800'>
                <Image
                    fill
                    alt='product pic'
                    className='object-contain'
                    src={`${data.image.url ?? "/pictures/place.png"}`}
                />
            </div>
            <div className=' w-full lg:max-w-300 h-fit  mx-auto relative bg-white rounded-b-md border border-gray-800'>
                <div className='grid grid-cols-1 md:grid-cols-6'>
                    <div className='md:col-span-4 border-t-transparent border-l-transparent border-b-gray-800 md:border-b-transparent border md:border-r-gray-800'>
                        <div className=' px-4 '>
                            <div className='line-clamp-2 border border-l-transparent border-r-transparent border-b-gray-800 border-t-transparent  -mx-4.25 pb-4 pt-4'>
                                <h1 className='font-medium text-lg px-4'>&middot; {data.product.name}</h1>
                            </div>
                            <div className='grid grid-cols-12 border-b-gray-800 border-transparent border-r-transparent border-l-transparent  border -mx-4 '>
                                <div className='col-span-2 border border-l-transparent border-t-transparent border-b-transparent border-r-gray-800'>
                                    <h1 className=' pt-4 pb-4 px-4 flex items-center justify-start ml-2 text-base font-mediume'>
                                        {new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                        }).format(Number(data.product.price))}
                                    </h1>

                                </div>
                                <div className='col-span-4 flex items-center justify-start ml-2 gap-3 border border-l-transparent border-t-transparent border-b-transparent border-r-gray-800'>
                                    <img
                                        className='object-cover h-9 w-9 rounded-full border border-gray-300'
                                        alt='tenant owner pic'
                                        src={`${tenantdata.image.url ?? "/pictures/avatar.png"}`}
                                    />
                                    <Link
                                        href={`/tenants/${tenantdata.tenant.name}`}
                                    >
                                        <h1 className='text-base font-medium capitalize text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-700 hover:border-blue-600 border-b border-transparent'>{tenantdata.tenant.name}</h1>
                                    </Link>

                                </div>
                                <div className='col-span-6 flex items-center justify-start ml-2'>
                                    Ratings
                                </div>
                            </div>
                            <div className='py-4 px-2'>
                                <h1 className='font-medium mb-1'>Product Description:</h1>
                                <p className='text-gray-800 text-[14px]'>{data.product.description}</p>
                            </div>
                        </div>

                    </div>
                    <div className='md:col-span-2'>
                        <div className='border-b border-gray-800'>
                            <div className='py-4 px-4 flex flex-col w-full gap-2 '>
                                <Button
                                title='Add to Cart'
                                className='cursor-pointer xs:w-[60%] w-[70%] mx-auto md:w-full h-11 rounded-full'>
                                    <ShoppingCart className='h-9 w-9' />
                                    <h1 className='text-base'>Add to Cart</h1>
                                </Button>
                                <h1 className='text-center text-sm text-gray-800'>{data.product.refundPolicy} money back guarntee.</h1>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 py-4 px-4'>
                                <div className='flex justify-between'>
                                        <h1>Ratings</h1>
                                        <div className='flex items-center gap-2'>
                                            <Star className='fill-yellow-500 h-4 w-4'/>
                                            <h1 className='text-sm'>(5)  /5 ratings</h1>
                                        </div>
                                </div>
                                <div className='grid grid-cols-[auto_1fr_auto] gap-3 mt-2'>
                                    {[5,4,3,2,1].map((stars)=>
                                    <Fragment key={stars}>
                                        <div className='text-sm text-gray-800 flex items-center gap-1  '>
                                            <h1>{stars}</h1> 
                                            <h1>{stars === 1 ? "star" : "stars"}</h1>
                                        </div>
                                        <Progress 
                                        value={29}
                                        className='h-[25px] bg-gray-200/50 border border-black'/>
                                        <div>
                                           <h1 className='text-sm text-gray-800'> {0}%</h1>
                                            </div>
                                    </Fragment>
                                    )}
                                </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>

    )
}
