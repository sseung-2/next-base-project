"use client";

import { LoadingSpinner } from "@icons/index";
import S from "./styles.module.scss";

const LoadingPage = () => {
  return (
    <div className={S.dimm}>
      <LoadingSpinner />
    </div>
  );
};

export default LoadingPage;
