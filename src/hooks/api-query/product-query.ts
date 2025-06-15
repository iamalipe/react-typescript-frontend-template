import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import api from "@/api/api";
import { ProductRawType } from "@/api/product-api";
import { QueryClient } from "@tanstack/react-query";

export const productQueryKey = ["product"];

const getAllOptions = (params?: { [key: string]: unknown }) =>
  queryOptions({
    queryKey: [...productQueryKey, params],
    queryFn: () => api.product.getAll(params),
  });

const getOptions = (id: string) =>
  queryOptions({
    queryKey: [...productQueryKey, id],
    queryFn: () => api.product.get(id),
  });

export const productQuery = (queryClient: QueryClient) => ({
  // getAll
  getAllOptions,
  getAll: (params?: { [key: string]: unknown }) =>
    queryClient.fetchQuery(getAllOptions(params)),
  useGetAll: (params?: { [key: string]: unknown }) =>
    useQuery(getAllOptions(params)),

  // get
  getOptions,
  get: (id: string) => queryClient.fetchQuery(getOptions(id)),
  useGet: (id: string) => useQuery(getOptions(id)),

  // create
  useCreate: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: ProductRawType) => api.product.create(data),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: productQueryKey }),
    });
  },
  create: async (data: ProductRawType) => {
    const result = await api.product.create(data);
    queryClient.invalidateQueries({ queryKey: productQueryKey });
    return result;
  },

  // update
  useUpdate: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        id,
        data,
      }: {
        id: string;
        data: Partial<ProductRawType>;
      }) => api.product.update(id, data),
      onSuccess: (_, { id }) =>
        queryClient.invalidateQueries({ queryKey: [...productQueryKey, id] }),
    });
  },
  update: async ({
    id,
    data,
  }: {
    id: string;
    data: Partial<ProductRawType>;
  }) => {
    const result = await api.product.update(id, data);
    queryClient.invalidateQueries({ queryKey: [...productQueryKey, id] });
    return result;
  },

  // delete
  useDelete: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => api.product.delete(id),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: productQueryKey }),
    });
  },
  delete: async (id: string) => {
    const result = await api.product.delete(id);
    queryClient.invalidateQueries({ queryKey: productQueryKey });
    return result;
  },
});
