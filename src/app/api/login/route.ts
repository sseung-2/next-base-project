// import instance from "@/utils/axios/axios.common";
import apiUrl from "@/utils/apis";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const request = await req.json();
  const { email, password } = request;

  try {
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_KIFFO_KIOSK_ADMIN_SERVER_URL}${apiUrl.login}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email,
        password,
      }),
    });
    const auth = res.data;

    if (auth) {
      cookies().set("auth", JSON.stringify(auth), {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24, // 초 * 분 * 시
      });
    }

    // 절대 URL로 리디렉션
    return NextResponse.json({ status: "success", email });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: true,
        message:
          error.response?.data?.message || "로그인 요청 처리 중 에러 발생",
      },
      { status: error.response?.status || 500 }
    );
  }
}

export async function GET() {
  const authCookie = cookies().get("auth");

  if (authCookie) {
    return NextResponse.json({ auth: JSON.parse(authCookie.value) });
  } else {
    return NextResponse.json(
      { error: "Auth cookie not found" },
      { status: 401 }
    );
  }
}
