"use client"
import Image from "next/image"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { HomeIcon, Lock, Mail, User } from "lucide-react"
import { useTRPC } from "@/trpc/client"
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Loading from "@/components/ui/Loading/Loading"
import { useRouter } from "next/navigation"
export default function SignUpView() {
  const queryClient=useQueryClient()
  const [showpass, setshowpass] = useState<boolean>(false)
  const handleSeePassword = () => {
    setshowpass((prev) => !prev)
  }
  const trpc = useTRPC()
  const router=useRouter()
  const formSchema = z.object({
    email: z.email({ error: "Invalid email format." }),
    password: z.string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Za-z]/, "Password must contain at least one letter.")
      .regex(/[0-9]/, "Password must contain at least one number."),
    username: z.string().min(3, "Username must be atleast 3 characters.")
      .max(40, "Username must be less than 40 characters.")
      .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, "Username can only contain lowercase,numbers.")
      .refine(
        (val) => !val.includes("--"), "Username cannot contain --"
      ).transform((val) => val.toLowerCase())
  })
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  })
  const registerMutation = useMutation(trpc.auth.register.mutationOptions({
    onSuccess: async() => {
      await queryClient.invalidateQueries(trpc.auth.session.queryFilter())
      router.push("/")
    },
    onError: (err) => {
      toast.error(err.message, {
        style: {
          backgroundColor: "#DC2626", // red-600
          color: "white"
        }
      })
    }
  }))
  function onSubmit(values: z.infer<typeof formSchema>) {
    registerMutation.mutate(values)
  }

  return (
    <div className="min-h-screen w-full flex bg-white">

      <div className="lg:w-[40%] relative lg:block hidden overflow-hidden">
        <Image
          src="/pictures/fin1.jpg"
          fill
          priority
          alt="signinpage"
          className="object-contain"
        />

        <svg
          className="absolute top-0 right-0 h-full z-10"
          width="150"
          height="100%"
          viewBox="0 0 100 800"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0 C90 200 -20 500 0 800 L100 800 L100 0 Z"
            fill="#FCF8F8"
          />



        </svg>

      </div>
      <div className="lg:w-[60%] w-full bg-background flex items-center justify-center relative">
        <Link
        prefetch
          title="Go Home"
          href={"/"}
          className="absolute flex items-center justify-center hover:bg-gray-100  top-4 left-8 h-12 w-12 border border-gray-800 bg-background rounded-full ">
          <HomeIcon />
        </Link>
        <div className="flex flex-col gap-8 w-full items-center">
          <h1 className='font-dance font-bold text-7xl '>
            K-Shopify.
          </h1>
          <h1 className='font-dance font-bold text-3xl -mt-4'>
            Create your new account.
          </h1>
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-[80%] md:w-[50%] lg:w-[60%]">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between h-4">
                      <FormLabel>Username :</FormLabel>
                      <FormMessage className="mr-2" />
                    </div>

                    <FormControl>
                      <div className="relative">
                        <Input
                          disabled={registerMutation.isPending}
                          icon={User}
                          className="h-12 pl-10 border rounded-full bg-white border-black" {...field} placeholder="Enter your username" />
                      </div>

                    </FormControl>
                    <FormDescription className="text-[12px]">Your shop will be available as <strong>username.vercel.app</strong></FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between h-4">
                      <FormLabel>Email :</FormLabel>
                      <FormMessage className="mr-2" />
                    </div>

                    <FormControl>
                      <div className="relative">
                        <Input
                          disabled={registerMutation.isPending}
                          icon={Mail}
                          className="h-12 pl-10 border rounded-full bg-white border-black" {...field} placeholder="Enter your email" />
                      </div>

                    </FormControl>

                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between h-4">
                      <FormLabel>Password :</FormLabel>
                      <FormMessage />
                    </div>

                    <FormControl>
                      <div className="relative">
                        <Input
                          disabled={registerMutation.isPending}
                          icon={Lock} type={showpass ? "text" : "password"} className="h-12 pl-10 bg-white border rounded-full border-black" {...field} placeholder="Enter your password" />
                      </div>

                    </FormControl>

                  </FormItem>
                )}
              />
              <div

                className="flex items-center gap-2">
                <Checkbox
                  onClick={() => handleSeePassword()}
                  id="terms" className="border border-black" />
                <Label htmlFor="terms">Show Password</Label>
              </div>
              <div className="w-full flex flex-col items-end gap-2">
                <Button
                  disabled={registerMutation.isPending}
                  className="rounded-full h-10 cursor-pointer w-32 text-lg" type="submit">
                  {registerMutation.isPending ? <Loading /> : <h1>Sign-up</h1>}
                </Button>
              </div>
              <span className="flex w-full justify-center gap-1">
                <h1 className="text-gray-800">Already have an account?</h1>
                <Link
                prefetch
                  href={"/sign-in"}
                  className="text-blue-600 underline">
                  Sign in here !!</Link>
              </span>

            </form>
          </Form>
        </div>

      </div>
    </div>

  )
}
