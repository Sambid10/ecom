import React, { Suspense } from 'react'
import { ErrorBoundary } from "react-error-boundary";
import SearchFilters from '@/components/ui/search-filters'
import SearchInput from '@/components/ui/search-filters/SearchInput'
import ContainerWrapper from '@/components/ui/containerWrapper/ContainerWrapper'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import Loading from '@/components/ui/Loading/Loading'
import Footer from '@/components/ui/footer/footer';
import TenantNavbar from '@/components/ui/Tenant/TenantNavbar/TenantNavbar';
import { Metadata } from 'next';
export async function generateMetadata(
    { params }: { params: { slug: string } }
): Promise<Metadata> {
    const { slug } = await params;

    return {
        title: `${slug} | K-Shopify`,
    };
}
export default async function layout({ children, params }: { children: React.ReactNode, params: Promise<{ slug: string }> }) {
    const queryClient = getQueryClient()
    const { slug } = await params
    void queryClient.prefetchQuery(
        trpc.category.getMany.queryOptions()
    )
    void queryClient.prefetchQuery(
        trpc.tenant.getOne.queryOptions({
            slug
        })
    )
    return (
        <>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <div className="sticky top-0 z-50">
                    <TenantNavbar tenantSlug={slug} />
                    <ContainerWrapper>
                        <SearchInput />
                    </ContainerWrapper>

                </div>
                <Suspense
                    fallback={<Loading divclassName='h-16 flex items-center justify-center' />}>
                    <ErrorBoundary fallback={<p>Error fetching categories.Please try again.</p>}>

                        <SearchFilters />


                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
            <ContainerWrapper>
                {children}
            </ContainerWrapper>
            <Footer isTenant={true} slug={slug} /></>


    )
}
