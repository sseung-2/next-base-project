"use server";

import { cookies } from "next/headers";

export const getServerCookie = async (name: string) => {
  return await cookies().get(name)?.value;
};

export const setServerCookie = async (name: string, value: string) => {
  cookies().set(name, value, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 초 * 분 * 시
  });
};

export const deleteServerCookie = async (name: string) => {
  cookies().delete(name);
};
