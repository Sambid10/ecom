import AdBanner from '@/components/ui/adBanner'
import React from 'react'
import Navbar from '@/components/ui/navbar/navbar'
import SearchFilters from '@/components/ui/search-filters'
import { getPayload } from 'payload'
import configPromise from "@payload-config"
import SearchInput from '@/components/ui/search-filters/SearchInput'
import ContainerWrapper from '@/components/ui/containerWrapper/ContainerWrapper'
import { Category } from '@/payload-types'
import { CustomCategory } from '@/components/ui/search-filters/types'
export default async function layout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({
    config: configPromise
  })
  const data = await payload.find({
    collection: "categories",
    depth: 1,
    pagination:false,
    where: {
      parent: {
        exists: false
      }
    }
  })
  const formattedData:CustomCategory[]=data.docs.map((doc)=>({
    ...doc,
    subcategories:(doc.subcategories?.docs ?? []).map((doc)=>({
      ...(doc as Category),
      subcategories:undefined
    }))
  }))
  return (
    <div>
      <AdBanner />
      <div className="sticky top-0 z-50">
        <Navbar />
        <ContainerWrapper>
          <SearchInput />
        </ContainerWrapper>

      </div>
      <SearchFilters data={formattedData} />
      {children}
    </div>
  )
}
