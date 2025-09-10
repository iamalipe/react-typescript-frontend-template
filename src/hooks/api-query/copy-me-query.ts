import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import api from "@/api/api";
import {
  ApiCopyMeCreate,
  ApiCopyMeGetAllParams,
  ApiCopyMeUpdate,
} from "@/api/copy-me-api";
import { QueryClient } from "@tanstack/react-query";

export const copyMeQueryKey = ["copy-me"];

const getAllOptions = (params?: ApiCopyMeGetAllParams) =>
  queryOptions({
    queryKey: [...copyMeQueryKey, params],
    queryFn: () => api.copyMe.getAll(params),
  });

const getOptions = (id: string) =>
  queryOptions({
    queryKey: [...copyMeQueryKey, id],
    queryFn: () => api.copyMe.get(id),
  });

export const copyMeQuery = (queryClient: QueryClient) => ({
  // getAll
  getAllOptions,
  getAll: (params?: ApiCopyMeGetAllParams) =>
    queryClient.fetchQuery(getAllOptions(params)),
  useGetAll: (params?: ApiCopyMeGetAllParams) =>
    useQuery(getAllOptions(params)),

  // get
  getOptions,
  get: (id: string) => queryClient.fetchQuery(getOptions(id)),
  useGet: (id: string) => useQuery(getOptions(id)),

  // create
  useCreate: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: ApiCopyMeCreate) => api.copyMe.create(data),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: copyMeQueryKey }),
    });
  },
  create: async (data: ApiCopyMeCreate) => {
    const result = await api.copyMe.create(data);
    queryClient.invalidateQueries({ queryKey: copyMeQueryKey });
    return result;
  },

  // update
  useUpdate: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: ApiCopyMeUpdate }) =>
        api.copyMe.update(id, data),
      onSuccess: (_, { id }) =>
        queryClient.invalidateQueries({ queryKey: [...copyMeQueryKey, id] }),
    });
  },
  update: async ({ id, data }: { id: string; data: ApiCopyMeUpdate }) => {
    const result = await api.copyMe.update(id, data);
    queryClient.invalidateQueries({ queryKey: [...copyMeQueryKey, id] });
    return result;
  },

  // delete
  useDelete: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => api.copyMe.delete(id),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: copyMeQueryKey }),
    });
  },
  delete: async (id: string) => {
    const result = await api.copyMe.delete(id);
    queryClient.invalidateQueries({ queryKey: copyMeQueryKey });
    return result;
  },
});
