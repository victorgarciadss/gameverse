import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
    const userRole =  await getToken({ req: request });

    if(userRole?.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
    }
    else {
        return NextResponse.next();
    }
}

export const config = {
    matcher: ["/dashboard/:path*"]
}