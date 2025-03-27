import { useQuery } from "@tanstack/react-query";

interface PaginationQueryParams {
  queryKey: any[];
  queryFn: (page: number, pageSize: number) => Promise<any>;
  page: number;
  pageSize: number;
}

export const usePaginationListQuery = ({
  queryKey,
  queryFn,
  page,
  pageSize,
}: PaginationQueryParams) => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: [...queryKey, page],
    queryFn: () => queryFn(page, pageSize),
    placeholderData: (prevData) => prevData,
  });

  const totalItems = data?.total || 0;
  const items = data?.items || [];

  return { items, totalItems, isLoading, isFetching, error };
};
