export const dynamic="force-dynamic"
import SignUpView from '@/components/views/SignUpView'
import {caller} from "@/trpc/server"
import { redirect } from 'next/navigation'
export default async function SignUppage() {
  const session=await caller.auth.session()
  if(session.user){
    return redirect("/")
  }
  return (
    <SignUpView/>
  )
}
