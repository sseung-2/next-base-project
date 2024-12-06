export const getAuthByCookie = (cookieString: string) => {
  console.trace("getAuthByCookie 호출됨");
  const cookies = cookieString.split("; "); // 각 쿠키를 분리
  let auth: { accessToken?: string; role?: string; email?: string } = {};

  cookies.forEach((cookie) => {
    const [key, value] = cookie.split("=");

    if (key === "auth") {
      try {
        auth = JSON.parse(decodeURIComponent(value)); // 'auth' 쿠키의 값을 JSON으로 파싱
      } catch (e) {
        console.error("쿠키 파싱 오류:", e);
      }
    }
  });

  return auth;
};
