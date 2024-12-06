import { QueryClient } from "@tanstack/react-query";

const getQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1분 동안 데이터 캐싱
      },
    },
  });
};
export default getQueryClient;
