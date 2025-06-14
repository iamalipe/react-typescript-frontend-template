import "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@/types/generic-type";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ApiErrorResponse | Error;
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
import { projectQuery } from "./api-query/project-query";

const apiQuery = {
  auth: authQuery(queryClient),
  project: projectQuery(queryClient),
};

export type ApiQuery = typeof apiQuery;

export default apiQuery;
