"use client";

import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type PropsWithChildren } from "react";
import getQueryClient from "../../utils/queryClient";

let browserQueryClient: QueryClient | undefined = undefined;

function providerQueryClient() {
  if (isServer) {
    return getQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = getQueryClient();

    return browserQueryClient;
  }
}

export default function ReactQueryProvider({ children }: PropsWithChildren) {
  const queryClient = providerQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
