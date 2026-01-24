import ContainerWrapper from '@/components/ui/containerWrapper/ContainerWrapper'
import Footer from '@/components/ui/footer/footer'
import Navbar from '@/components/ui/navbar/navbar'
import React from 'react'

export default function layout({ children }: {
    children: React.ReactNode
}) {
    return (
        <div>
            <div className='sticky top-0 z-30'>
                <Navbar />
            </div>
                {children}
            <Footer isTenant={false} />
        </div>
    )
}
