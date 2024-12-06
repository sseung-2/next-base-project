import apiUrl from "@/utils/apis";
import { authGet } from "@/utils/axios/axios.common";

export const getBeforeStartEventList = async () => {
  const res = await authGet(
    `/v1/kiosk-event/keefo-event/list/before-start?pageSize=10&currentPage=1`
  );

  return res.data;
};

export const getSalesList = async (params: {
  pageSize: number;
  currentPage: number;
  eventName?: string | null;
  kioskMachineId?: string | null;
  status?: string | null;
  started?: Date | null;
  ended?: Date | null;
}) => {
  const queryParams = new URLSearchParams();

  queryParams.append("pageSize", params.pageSize.toString());
  queryParams.append("currentPage", params.currentPage.toString());

  if (params.eventName) queryParams.append("eventName", params.eventName);
  if (params.kioskMachineId)
    queryParams.append("kioskMachineId", params.kioskMachineId);
  if (params.status) queryParams.append("status", params.status);
  if (params.started)
    queryParams.append("started", params.started.toISOString());
  if (params.ended) queryParams.append("ended", params.ended.toISOString());

  console.log(queryParams.toString());

  const res = await authGet(`${apiUrl.getSalesList}?${queryParams.toString()}`);
  return res.data;
};
