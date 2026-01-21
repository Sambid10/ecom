'use client'
import { cn } from '@/lib/utils'
import { Skeleton } from '../skeleton'

export default function ProductskeletonWrapper({className,number=3}:{
  className?:string
  number:number
}) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4",className)}>
      {new Array(number).fill(0).map((_, index) => (
        <Skeleton className='aspect-3/4' key={index} />
      ))}
    </div>
  )
}
