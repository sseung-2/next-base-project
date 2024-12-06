"use client";
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import LoginInput from "../_components/(login)/common/loginInput";
import S from "./styles.module.scss";
import { Logo } from "public/assets/images";
import CheckBox from "../_components/common/checkBox";
import Button from "../_components/common/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Modal } from "../_components/common/modal";
import { setServerCookie } from "@/utils/serverCookie";

export interface Login {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const [isSaveEmail, setIsSaveEmail] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Login>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    shouldFocusError: true,
  });

  const emailRegister = register("email", {
    required: { value: true, message: "이메일을 입력해 주세요" },
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "이메일 형식에 맞지 않습니다.",
    },
  });

  const passwordRegister = register("password", {
    required: "비밀번호를 입력해 주세요",
    minLength: {
      value: 8,
      message: "대소문자/숫자/특수문자를 포함한 10자~16자를 입력해 주세요.",
    },
  });

  const onSubmit: SubmitHandler<Login> = async (data) => {
    const { email, password } = data;
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_KIFFO_KIOSK_ADMIN_SERVER_URL}/v1/auth/login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status === 200) {
        setServerCookie("auth", JSON.stringify(response.data));
        localStorage?.setItem("LoginEmail", data.email);
        if (isSaveEmail) {
          localStorage?.setItem("savedEmail", data.email);
        } else {
          localStorage?.removeItem("savedEmail");
        }

        router.push("/sales");
      }
    } catch {
      Modal.alert({ title: "로그인에 실패했습니다." });
    }
  };

  const handleSaveEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSaveEmail(e.target.checked);
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
      setIsSaveEmail(true);
    }
  }, [setValue]);

  return (
    <div className={S["login-container"]}>
      <div className={S["login-wrapper"]}>
        <Logo />
        <form onSubmit={handleSubmit(onSubmit)} className={S["form-wrapper"]}>
          <LoginInput
            {...emailRegister}
            option={"email"}
            placeholder="이메일"
            error={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <LoginInput
            {...passwordRegister}
            option={"password"}
            placeholder="비밀번호"
            error={!!errors.password}
            errorMessage={errors.password?.message}
          />
          <CheckBox
            checked={isSaveEmail}
            onChange={handleSaveEmail}
            label="이메일 기억하기"
          />
          <div className={S["button-container"]}>
            <Button text="로그인" size="L" submit />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
