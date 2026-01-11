import SignInView from '@/components/views/SigninView'
import {caller} from "@/trpc/server"
import { redirect } from 'next/navigation'
export default async function Signpage() {
  const session=await caller.auth.session()
  if(session.user){
    return redirect("/")
  }
  return (
    <SignInView/>
  )
}
