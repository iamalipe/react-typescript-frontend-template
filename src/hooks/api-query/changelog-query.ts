import {
  keepPreviousData,
  queryOptions,
  useQuery,
} from "@tanstack/react-query";

import api from "@/api/api";
import {
  type ApiChangeLogGetAllParams,
} from "@/api/changelog-api";
import { QueryClient } from "@tanstack/react-query";

export const changeLogQueryKey = ["changelog"];

const getAllOptions = (params?: ApiChangeLogGetAllParams) =>
  queryOptions({
    queryKey: [...changeLogQueryKey, params],
    queryFn: () => api.changelog.getAll(params),
    placeholderData: keepPreviousData,
  });

export const changeLogQuery = (queryClient: QueryClient) => ({
  getAllOptions,
  getAll: (params?: ApiChangeLogGetAllParams) =>
    queryClient.fetchQuery(getAllOptions(params)),
  useGetAll: (params?: ApiChangeLogGetAllParams) =>
    useQuery(getAllOptions(params)),
});
