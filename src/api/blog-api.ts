// project-api.ts
import { qString } from "@/lib/utils";
import { ApiNormalResponse } from "@/types/generic-type";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

export type BlogType = {
  _id: string;
  topic: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiBlogCreate = Pick<BlogType, "topic" | "content">;

export type ApiBlogUpdate = Partial<Pick<BlogType, "topic" | "content">>;

export type ApiBlogGetAll = ApiNormalResponse & {
  data: BlogType[];
  pagination: { total: number; page: number; limit: number };
  sort: { orderBy: string; order: "asc" | "desc" };
};
export type ApiBlogGet = ApiNormalResponse & { data: BlogType };

export type ApiBlogGetAllParams = {
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: "asc" | "desc";
};

export const blogAPI = (axiosInstance: AxiosInstance) => ({
  getAll: async (
    params?: ApiBlogGetAllParams,
    config?: AxiosRequestConfig
  ): Promise<ApiBlogGetAll> => {
    try {
      const stringifiedParams = params ? qString(params) : "";
      const response = await axiosInstance.get<ApiBlogGetAll>(
        `/blog?${stringifiedParams}`,
        config
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as ApiNormalResponse;
      }
      throw error;
    }
  },

  get: async (id: string, config?: AxiosRequestConfig): Promise<ApiBlogGet> => {
    try {
      const response = await axiosInstance.get<ApiBlogGet>(
        `/blog/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as ApiNormalResponse;
      }
      throw error;
    }
  },

  create: async (
    data: ApiBlogCreate,
    config?: AxiosRequestConfig
  ): Promise<ApiBlogGet> => {
    try {
      const response = await axiosInstance.post<ApiBlogGet>(
        "/blog",
        data,
        config
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as ApiNormalResponse;
      }
      throw error;
    }
  },

  update: async (
    id: string,
    data: ApiBlogUpdate,
    config?: AxiosRequestConfig
  ): Promise<ApiBlogGet> => {
    try {
      const response = await axiosInstance.put<ApiBlogGet>(
        `/blog/${id}`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as ApiNormalResponse;
      }
      throw error;
    }
  },

  delete: async (
    id: string,
    config?: AxiosRequestConfig
  ): Promise<ApiNormalResponse> => {
    try {
      const response = await axiosInstance.delete<ApiNormalResponse>(
        `/blog/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as ApiNormalResponse;
      }
      throw error;
    }
  },
});
