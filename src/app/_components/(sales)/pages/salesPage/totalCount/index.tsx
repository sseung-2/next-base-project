"use client";

import S from "./styles.module.scss";
import DownExcelButton from "@/app/_components/common/downExcelButton";

interface TotalCountProps {
  payCount: number;
  refundCount: number;
  totalAmount: number;
  totalCount: number;
}

const TotalCount = ({
  payCount,
  refundCount,
  totalAmount,
  totalCount,
}: TotalCountProps) => {
  return (
    <div className={S["count-container"]}>
      <div className={S["count-wrapper"]}>
        <div className={S["count-box"]}>
          <span className={S["title"]}>결제</span>
          <span className={S["result"]}>
            <p>{payCount}</p>건
          </span>
        </div>
        <div className={S["count-box"]}>
          <span className={S["title"]}>환불</span>
          <span className={S["result"]}>
            <p>{refundCount}</p>건
          </span>
        </div>
        <div className={S["count-box"]}>
          <span className={S["title"]}>매출액</span>
          <span className={S["result"]}>
            <p>{totalAmount}</p>원
          </span>
        </div>
      </div>
      <div className={S["excel-container"]}>
        <div className={S["data-count"]}>
          <span>
            총<p>{totalCount}</p>건
          </span>
        </div>
        <div>
          <DownExcelButton />
        </div>
      </div>
    </div>
  );
};

export default TotalCount;
