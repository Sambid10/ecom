import AdBanner from '@/components/ui/adBanner'
import React from 'react'
import Navbar from './navbar'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Scrolls away */}
      <AdBanner />

      {/* Stays sticky */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {children}
    </div>
  )
}
