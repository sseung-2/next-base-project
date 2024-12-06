import axios, { AxiosRequestConfig } from "axios";
import { getServerCookie } from "../serverCookie";

type AuthCookie = {
  email: string;
  role: string;
  accessToken: string;
};

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_KIFFO_KIOSK_ADMIN_SERVER_URL}`,
  withCredentials: true,
});

instance.interceptors.request.use(async (res) => {
  await getServerCookie("auth").then((auth) => {
    if (auth) {
      res.headers.Authorization = `Bearer ${
        (JSON.parse(auth) as AuthCookie).accessToken
      }`;
    }
  });

  return res;
});

instance.interceptors.response.use(
  (res) => res,
  (err) => err
);

export const authGet = (url: string, config?: AxiosRequestConfig) =>
  instance.get(url, config);

export const authPost = (
  url: string,
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  body?: any,
  config?: AxiosRequestConfig
) => instance.post(url, body, config);

export default instance;
