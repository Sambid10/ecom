import AdBanner from '@/components/ui/adBanner'
import React, { Suspense } from 'react'
import Navbar from '@/components/ui/navbar/navbar'
import { ErrorBoundary } from "react-error-boundary";
import SearchFilters from '@/components/ui/search-filters'
import SearchInput from '@/components/ui/search-filters/SearchInput'
import ContainerWrapper from '@/components/ui/containerWrapper/ContainerWrapper'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import Loading from '@/components/ui/Loading/Loading'
import Footer from '@/components/ui/footer/footer';
export default async function layout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.category.getMany.queryOptions()
  )

  return (
    <div>
      <AdBanner />
      <div className="sticky top-0 z-50">
        <Navbar />
        <ContainerWrapper>
          <SearchInput className='lg:max-w-300'/>
        </ContainerWrapper>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense
          fallback={<Loading divclassName='h-16 flex items-center justify-center' />}>
          <ErrorBoundary fallback={<p>Error fetching categories.Please try again.</p>}>
            <SearchFilters />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>

      {children}
      <Footer isTenant={false}/>
    </div>
  )
}
