"use client";

import { useRouter } from "next/navigation";
import S from "./styles.module.scss";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClose?: () => void;
}

const Backdrop = ({ children, onClose }: Props) => {
  const router = useRouter();

  const onRouteBack = () => {
    router.back();
  };

  return (
    <div onClick={onClose ? onClose : onRouteBack} className={S.backdrop}>
      {children}
    </div>
  );
};

export default Backdrop;
