import { Modal } from "@/app/_components/common/modal";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const fetchAuth = async () => {
  const response = await axios.get("/api/login");
  return response.data.auth;
};

export const onRequestClient = async (config: InternalAxiosRequestConfig) => {
  const auth = await fetchAuth();

  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }
  return config;
};

interface ErrorResponse {
  message: string;
  code: string;
  status: number;
}

export const onResponseErrorClient = async (
  error: AxiosError<ErrorResponse, InternalAxiosRequestConfig>
) => {
  if (error.response) {
    const { status, message, code } = error.response.data;
    console.log(
      `[AXIOS CLIENT ERROR] status: ${status}, code: ${code}, msg: ${message}`
    );

    switch (error.response.status) {
      case 401:
        window.location.href = "/";
        Modal.alert({
          title: "토큰 만료",
          content: "토큰이 만료되었습니다. 다시 로그인 해주세요.",
        });
    }
  }
  return Promise.reject(error);
};
