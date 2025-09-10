import "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

import type { ApiNormalResponse } from "@/types/generic-type";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ApiNormalResponse | Error;
  }
}

// Create and export queryClient first to avoid circular dependencies
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    mutations: {
      retry: false,
    },
  },
});

// Import query modules after exporting queryClient
import { authQuery } from "./api-query/auth-query";
import { copyMeQuery } from "./api-query/copy-me-query";
import { generalQuery } from "./api-query/general-query";

const apiQuery = {
  auth: authQuery(queryClient),
  copyMe: copyMeQuery(queryClient),
  general: generalQuery(queryClient),
};

export type ApiQuery = typeof apiQuery;

export default apiQuery;
