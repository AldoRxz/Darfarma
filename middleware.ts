import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export default auth((req) => {
    const { pathname } = req.nextUrl
    const isAdmin = req.auth?.user?.role === "ADMIN"

    // Protect /admin routes - only admins
    if (pathname.startsWith("/admin")) {
        if (!req.auth?.user) {
            return NextResponse.redirect(new URL("/login", req.url))
        }
        if (!isAdmin) {
            return NextResponse.redirect(new URL("/", req.url))
        }
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/admin/:path*"],
}
