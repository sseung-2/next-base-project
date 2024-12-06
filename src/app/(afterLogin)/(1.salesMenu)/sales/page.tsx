import SalesPage from "@/app/_components/(sales)/pages/salesPage";
import { getSalesList } from "@/service/sales";
import getQueryClient from "@/utils/queryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

const Sales = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["salesList", 1],
    queryFn: () => getSalesList({ pageSize: 10, currentPage: 1 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SalesPage />
    </HydrationBoundary>
  );
};

export default Sales;
