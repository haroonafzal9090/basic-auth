import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose"

export default async function middleware(request:NextRequest) {
    let jwt = request.cookies.get("token")?.value

    console.log("token:", jwt);

    const secret = new TextEncoder().encode(
        process.env.JWT_SECRET
    )

    if (!jwt){
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.rewrite(url)
    }else {
        const {payload, protectedHeader} = await jose.jwtVerify(jwt,secret);
        const headers = new Headers(request.headers);
        headers.set("user", JSON.stringify(payload.email))

        console.log(payload);
        console.log(protectedHeader)

        return NextResponse.next({request:{
            headers:headers
        }
        })
    }

   
    
}