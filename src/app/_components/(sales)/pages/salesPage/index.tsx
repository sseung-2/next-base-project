"use client";

import React, { useState, useEffect } from "react";

import PageTitle from "@/app/_components/common/pageTitle";
import Filter from "./filter";
import S from "./styles.module.scss";
import Table from "@/app/_components/common/table";
import PageContainer from "@/app/_components/common/pageContainer";
import TotalCount from "./totalCount";
import Pagination from "@/app/_components/common/pagination";
import { Modal } from "../../../common/modal";
import Toast from "../../../common/toast";
import { formatNumber } from "@/hooks/common";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "@/app/_components/common/loading";
import { getSalesList } from "@/service/sales";

type SalesData = {
  orderId: number;
  eventName: string;
  machineName: string;
  paymentAuthNumber: string;
  photoAuthNumber: string;
  amount: string;
  status: string;
  completedAt: boolean;
  refundedAt?: string;
};

const STATUS_SELECT_LIST = [
  { id: null, name: "전체" },
  { id: "COMPLETED", name: "구매완료" },
  {
    id: "REFUNDED",
    name: "환불완료",
  },
];

let MACHINE_SELECT_LIST: { id: number | null; name: string }[] = [];

const SalesPage = () => {
  const LISTCOUNT = 10;
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [PayTotalAmount, setPayTotalAmount] = useState<{
    payCount: number;
    refundCount: number;
    totalAmount: number;
  }>({ payCount: 0, refundCount: 0, totalAmount: 0 });
  const [filter, setFilter] = useState<{
    eventName: string | null;
    kioskMachineId: string | null;
    status: string | null;
    started: Date | null;
    ended: Date | null;
  }>({
    eventName: null,
    kioskMachineId: null,
    status: null,
    started: null,
    ended: null,
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["salesList", page],
    queryFn: () =>
      getSalesList({
        pageSize: LISTCOUNT,
        currentPage: page,
        eventName: filter.eventName,
        kioskMachineId: filter.kioskMachineId,
        status: filter.status,
        started: filter.started,
        ended: filter.ended,
      }),
  });

  useEffect(() => {
    if (data && data.count) {
      setTotalCount(data.count);
      setPayTotalAmount({
        payCount: data.payCount,
        refundCount: data.refundCount,
        totalAmount: data.totalAmount,
      });

      MACHINE_SELECT_LIST = [
        { id: null, name: "전체" },
        ...data.kioskMachineList.map((machine: any) => ({
          id: machine.kioskMachineId,
          name: machine.name,
        })),
      ];
    }
  }, [data]);

  const columns: {
    header: string;
    key: keyof SalesData;
    render?: (row: SalesData, index: number) => React.ReactNode;
  }[] = [
    {
      header: "No.",
      key: "orderId",
      render: (_row, index) => (
        <span>{(page - 1) * LISTCOUNT + (index + 1)}</span>
      ),
    },
    { header: "이벤트명", key: "eventName" },
    { header: "기기명", key: "machineName" },
    { header: "인증번호", key: "photoAuthNumber" },
    { header: "결제 승인번호", key: "paymentAuthNumber" },
    {
      header: "결제 금액",
      key: "amount",
      render: (row: SalesData) => {
        return <span>{formatNumber(row.amount)}</span>;
      },
    },
    { header: "결제 일자", key: "completedAt" },
    {
      header: "상태",
      key: "status",
      render: (row) =>
        row.status === "COMPLETED" ? (
          <span className={S["buy"]}>구매완료</span>
        ) : row.status === "REFUNDED" ? (
          <span className={S["refund"]}>환불완료</span>
        ) : (
          <span className={S["buy"]}>진행중</span>
        ),
    },
    {
      header: "환불",
      key: "refundedAt",
      render: (row) =>
        !row.refundedAt ? (
          <button
            onClick={() =>
              Modal.confirm({
                title: "환불",
                content: "환불을 진행하시겠습니까?",
                onConfirm: () => {
                  handleButtonClick(row.orderId);
                  Toast({ title: "환불이 완료되었습니다." });
                },
              })
            }
            className={S["refund-button"]}
          >
            환불
          </button>
        ) : (
          <span>{row.refundedAt}</span>
        ),
    },
  ];

  const handleButtonClick = (id: number) => {
    console.log(id);
  };

  const pageHandler = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const onSubmit = () => {
    refetch();
    setPage(1);
  };

  return (
    <PageContainer>
      <PageTitle title="매출 현황" />
      <Filter
        filter={filter}
        setFilter={setFilter}
        onSubmit={onSubmit}
        kioskMachineIdOption={MACHINE_SELECT_LIST}
        statusOption={STATUS_SELECT_LIST}
      />
      <TotalCount
        payCount={PayTotalAmount.payCount}
        refundCount={PayTotalAmount.refundCount}
        totalAmount={PayTotalAmount.totalAmount}
        totalCount={totalCount}
      />
      <Table columns={columns} data={data?.orderList} />
      <Pagination
        count={totalCount || 1}
        pageHandler={pageHandler}
        page={page || 1}
        LISTCOUNT={10}
      />
      {isLoading && <LoadingPage />}
    </PageContainer>
  );
};

export default SalesPage;
