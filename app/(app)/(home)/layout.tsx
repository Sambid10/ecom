import AdBanner from '@/components/ui/adBanner'
import React from 'react'
import Navbar from '@/components/ui/navbar/navbar'
import SearchFilters from '@/components/ui/search-filters'
import { getPayload } from 'payload'
import configPromise from "@payload-config"
import SearchInput from '@/components/ui/search-filters/SearchInput'
import ContainerWrapper from '@/components/ui/containerWrapper/ContainerWrapper'
export default async function layout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({
    config: configPromise
  })
  const data = await payload.find({
    collection: "categories",
    depth: 1,
    where: {
      parent: {
        exists: false
      }
    }
  })
  return (
    <div>
      <AdBanner />
      <div className="sticky top-0 z-50">
        <Navbar />
        <ContainerWrapper>
          <SearchInput />
        </ContainerWrapper>

      </div>
      <SearchFilters data={data} />
      {children}
    </div>
  )
}
