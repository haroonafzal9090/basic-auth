import { NextRequest, NextResponse } from "next/server";

export default async function GET(request:NextRequest) {
    const user = JSON.parse(request.headers.get("user") as string);

    
    return NextResponse.json(user)



}