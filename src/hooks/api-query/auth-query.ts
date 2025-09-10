import { useQuery, queryOptions, QueryClient } from "@tanstack/react-query";

import api from "@/api/api";

export const currentUserQueryKey = ["current-user"];
const getCurrentUserOptions = () =>
  queryOptions({
    queryKey: [...currentUserQueryKey],
    queryFn: () => api.auth.me(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });

// Create a function that returns the authQuery object with the provided queryClient
export const authQuery = (queryClient: QueryClient) => ({
  getCurrentUserOptions: getCurrentUserOptions,
  getCurrentUser: () => queryClient.fetchQuery(getCurrentUserOptions()),
  useGetCurrentUser: () => useQuery(getCurrentUserOptions()),
});
