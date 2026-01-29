"use client"

import Loading from "@/components/ui/Loading/Loading"
import { useTRPC } from "@/trpc/client"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"

export default function StripeVerify() {
  const trpc=useTRPC()
  const {mutate:verify}=useMutation(trpc.checkout.verify.mutationOptions({
    onSuccess:(data)=>{
        window.location.href=data.url
    },
    onError:()=>{
        window.location.href="/"
    }
  }))
  useEffect(()=>{
    verify()
  },[verify])
    return (
    <div className="flex flex-col gap-2 min-h-screen items-center justify-center">
        <Loading/>
        <h1 className="text-[14px] text-gray-800">Redirecting you to Stripe...</h1>
    </div>
  )
}
