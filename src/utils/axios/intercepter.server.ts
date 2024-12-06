import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

export const onRequestServer = async (config: InternalAxiosRequestConfig) => {
  const auth = cookies().get("auth")?.value;
  if (auth) {
    const accessToken = JSON.parse(auth).accessToken as string;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    }
  }

  throw new Error("로그인이 필요합니다.");
};

interface ErrorResponse {
  success: boolean;
  statusCode: number;
  errorCode: string;
  reason: string;
}

export const onResponseErrorServer = async (
  error: AxiosError<ErrorResponse, InternalAxiosRequestConfig>
) => {
  if (error.response) {
    const { statusCode, errorCode, reason } = error.response.data;
    console.log(
      `[AXIOS SERVER ERROR] status: ${statusCode}, code: ${errorCode}, msg: ${reason}`
    );

    switch (statusCode) {
      case 401:
        cookies().delete("auth");
    }
    return Promise.reject(error);
  }
};
