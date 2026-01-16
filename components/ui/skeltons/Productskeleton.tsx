'use client'
import { Skeleton } from '../skeleton'

export default function ProductskeletonWrapper() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
      {new Array(3).fill(0).map((_, index) => (
        <Skeleton className='aspect-3/4' key={index} />
      ))}
    </div>
  )
}
