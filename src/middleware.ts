import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  // 로그인 연결 후 풀기

  const auth = cookies().get("auth")?.value;
  const path = request.nextUrl.pathname;

  // 홈에서 auth가 있을 때에는 자동로그인처럼
  if (path === "/" && !!auth) {
    const url = request.nextUrl.clone();
    url.pathname = "/sales";

    return NextResponse.redirect(url);
  }

  if (path !== "/") {
    if (!auth) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public|api).*)"],
};
