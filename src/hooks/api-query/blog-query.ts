import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import api from "@/api/api";
import {
  ApiBlogCreate,
  ApiBlogGetAllParams,
  ApiBlogUpdate,
} from "@/api/blog-api";
import { QueryClient } from "@tanstack/react-query";

export const blogQueryKey = ["blog"];

const getAllOptions = (params?: ApiBlogGetAllParams) =>
  queryOptions({
    queryKey: [...blogQueryKey, params],
    queryFn: () => api.blog.getAll(params),
  });

const getOptions = (id: string) =>
  queryOptions({
    queryKey: [...blogQueryKey, id],
    queryFn: () => api.blog.get(id),
  });

export const blogQuery = (queryClient: QueryClient) => ({
  // getAll
  getAllOptions,
  getAll: (params?: ApiBlogGetAllParams) =>
    queryClient.fetchQuery(getAllOptions(params)),
  useGetAll: (params?: ApiBlogGetAllParams) => useQuery(getAllOptions(params)),

  // get
  getOptions,
  get: (id: string) => queryClient.fetchQuery(getOptions(id)),
  useGet: (id: string) => useQuery(getOptions(id)),

  // create
  useCreate: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: ApiBlogCreate) => api.blog.create(data),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: blogQueryKey }),
    });
  },
  create: async (data: ApiBlogCreate) => {
    const result = await api.blog.create(data);
    queryClient.invalidateQueries({ queryKey: blogQueryKey });
    return result;
  },

  // update
  useUpdate: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: ApiBlogUpdate }) =>
        api.blog.update(id, data),
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: blogQueryKey });
        queryClient.invalidateQueries({ queryKey: [...blogQueryKey, id] });
      },
    });
  },
  update: async ({ id, data }: { id: string; data: ApiBlogUpdate }) => {
    const result = await api.blog.update(id, data);
    queryClient.invalidateQueries({ queryKey: blogQueryKey });
    queryClient.invalidateQueries({ queryKey: [...blogQueryKey, id] });
    return result;
  },

  // delete
  useDelete: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => api.blog.delete(id),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: blogQueryKey }),
    });
  },
  delete: async (id: string) => {
    const result = await api.blog.delete(id);
    queryClient.invalidateQueries({ queryKey: blogQueryKey });
    return result;
  },
});
