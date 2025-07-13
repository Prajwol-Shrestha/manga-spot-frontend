import { NextRequest, NextResponse } from "next/server";


const protectedRoutes = ['/profile', '/bookmarks', '/history']

export default function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token');
    
    if(!token && protectedRoutes.includes(request.nextUrl.pathname)){
        return NextResponse.redirect(new URL('/login', request.url))
    } 


    return NextResponse.next();
}