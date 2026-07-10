import { QueryClient, queryOptions, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

  useUpdateProfile: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: Parameters<typeof api.auth.updateProfile>[0]) =>
        api.auth.updateProfile(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: currentUserQueryKey });
      },
    });
  },

  logoutUser: async () => {
    const result = await api.auth.logout();
    queryClient.invalidateQueries({ queryKey: currentUserQueryKey });
    queryClient.invalidateQueries();
    return result;
  },
});
