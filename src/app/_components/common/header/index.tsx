"use client";

import { useRouter } from "next/navigation";
import { LogoSm } from "public/assets/images";
import S from "./styles.module.scss";
import { Modal } from "../modal";
import { deleteServerCookie } from "@/utils/serverCookie";
import { useEffect, useState } from "react";

const Header = () => {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(localStorage.getItem("LoginEmail"));
  }, []);

  const handleLogout = async () => {
    try {
      await deleteServerCookie("auth");
      router.replace("/");
      localStorage.removeItem("LoginEmail");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      Modal.alert({
        title: "에러",
        content: "로그아웃 처리 중 문제가 발생했습니다.",
      });
    }
  };
  const router = useRouter();
  return (
    <header className={S.header}>
      <div
        onClick={() => {
          router.replace("/sales");
        }}
        className={S["logo-container"]}
      >
        <LogoSm />
      </div>
      <div className={S["login-info-container"]}>
        <span>{email}</span>
        <button
          onClick={() =>
            Modal.confirm({
              title: "로그아웃",
              content: "로그아웃하시겠습니까?",
              onConfirm: () => {
                handleLogout();
              },
            })
          }
        >
          로그아웃
        </button>
      </div>
    </header>
  );
};

export default Header;
