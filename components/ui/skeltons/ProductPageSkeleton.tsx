import React from 'react'
import { Skeleton } from '../skeleton'

export default function ProductPageSkeleton() {
  return (
        <div className='min-h-screen flex flex-col pb-12 pt-2' >
            <div className=' w-full lg:max-w-300 h-[50vh]  mx-auto relative rounded-t-md border border-b-0 border-gray-800'>
                    <Skeleton className='h-full  mx-auto rounded-none  w-1/2'/>
            </div>
            <div className=' w-full lg:max-w-300 h-fit  mx-auto relative  rounded-b-md border border-gray-800'>
                <div className='grid grid-cols-1 md:grid-cols-6'>
                    <div className='md:col-span-4 border-t-transparent border-l-transparent border-b-gray-800 md:border-b-transparent border md:border-r-gray-800'>
                        <div className=' px-4 '>
                            <div className='line-clamp-2 h-20 py-2 px-2 border border-l-transparent border-r-transparent border-b-gray-800 border-t-transparent  -mx-4.25 '>
                                <Skeleton className='h-full w-full'/>
                            </div>
                            <div className='grid grid-cols-12 border-b-gray-800 border-transparent border-r-transparent border-l-transparent  border -mx-4 '>
                                <div className='col-span-2 px-2 py-1 h-10 border border-l-transparent border-t-transparent border-b-transparent border-r-gray-800'>
                                    <Skeleton className='h-full w-full'/>

                                </div>
                                <div className='col-span-4 h-10 px-2  py-1 flex items-center justify-start ml-2 gap-3 border border-l-transparent border-t-transparent border-b-transparent border-r-gray-800'>
                                  <Skeleton className='h-full w-full'/>

                                </div>
                                <div className='col-span-6 px-2 py-1 flex items-center justify-start ml-2'>
                                     <Skeleton className='h-full w-full'/>
                                </div>
                            </div>
                            <div className='px-4 h-10 mt-4 mb-4 '>
                             <Skeleton className='h-full w-full'/>
                        </div>
                        </div>

                    </div>
                    <div className='md:col-span-2'>
                        <div className='px-4 h-50 mt-4 mb-4 '>
                             <Skeleton className='h-full w-full'/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
  )
}
