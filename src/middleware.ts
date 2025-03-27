import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const auth = cookies().get("auth")?.value;
  const path = request.nextUrl.pathname;

  if (!!auth) {
    // 홈에서 auth가 있을 때에는 자동로그인처럼
    if (path === "/") {
      const url = request.nextUrl.clone();
      url.pathname = "/sales";

      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public|api).*)"],
};
