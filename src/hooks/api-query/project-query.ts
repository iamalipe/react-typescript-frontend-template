import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import api from "@/api/api";
import { ProjectRawType } from "@/api/project-api";
import { QueryClient } from "@tanstack/react-query";

export const projectQueryKey = ["project"];

const getAllOptions = (params?: { [key: string]: unknown }) =>
  queryOptions({
    queryKey: [...projectQueryKey, params],
    queryFn: () => api.project.getAll(params),
  });

const getOptions = (id: string) =>
  queryOptions({
    queryKey: [...projectQueryKey, id],
    queryFn: () => api.project.get(id),
  });

export const projectQuery = (queryClient: QueryClient) => ({
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
      mutationFn: (data: ProjectRawType) => api.project.create(data),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: projectQueryKey }),
    });
  },
  create: async (data: ProjectRawType) => {
    const result = await api.project.create(data);
    queryClient.invalidateQueries({ queryKey: projectQueryKey });
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
        data: Partial<ProjectRawType>;
      }) => api.project.update(id, data),
      onSuccess: (_, { id }) =>
        queryClient.invalidateQueries({ queryKey: [...projectQueryKey, id] }),
    });
  },
  update: async ({
    id,
    data,
  }: {
    id: string;
    data: Partial<ProjectRawType>;
  }) => {
    const result = await api.project.update(id, data);
    queryClient.invalidateQueries({ queryKey: [...projectQueryKey, id] });
    return result;
  },

  // delete
  useDelete: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => api.project.delete(id),
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: projectQueryKey }),
    });
  },
  delete: async (id: string) => {
    const result = await api.project.delete(id);
    queryClient.invalidateQueries({ queryKey: projectQueryKey });
    return result;
  },
});
