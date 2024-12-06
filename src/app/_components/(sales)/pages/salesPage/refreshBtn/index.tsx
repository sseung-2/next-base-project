"use client";

import { RefreshIcon } from "@icons/index";
import S from "./styles.module.scss";
import { Modal } from "@/app/_components/common/modal";

const RefreshBtn = () => {
  const handleRefreshFilter = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // Modal.confirm({ title: "모달테스트" });
    Modal.alert({ title: "모달테스트", content: "내용 있을 때" });
    // router.replace(pathname);
  };
  return (
    <button className={S["btn-wrap"]} onClick={handleRefreshFilter}>
      <RefreshIcon />
    </button>
  );
};

export default RefreshBtn;
