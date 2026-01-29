import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api/|_next/|_vercel|media/|[\\w-]+\\.\\w+).*)"
  ],
}

export default async function middleware(req:NextRequest){
    const url=req.nextUrl;

    const hostname=req.headers.get("host") || ""
    const rootDomain=process.env.NEXT_PUBLIC_ROOT_DOMAIN || ""
    if(hostname.endsWith(`.${rootDomain}`)){
        const tenantslug=hostname.replace(`.${rootDomain}`,"");
        return NextResponse.rewrite(new URL(`/tenants/${tenantslug}${url.pathname}`,req.url))
    }
    return NextResponse.next()
}