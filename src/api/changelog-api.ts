import { qString } from "@/lib/utils";
import type { ApiNormalResponse } from "@/types/generic-type";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

export type ChangeLogType = {
  _id: string;
  module: string;
  title: string;
  newValue: any;
  oldValue: any;
  formattedNewValue: string;
  formattedOldValue: string;
  referenceId?: string;
  referenceModel?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiChangeLogGetAll = ApiNormalResponse & {
  data: ChangeLogType[];
  pagination: { total: number; page: number; limit: number };
  sort: { orderBy: string; order: "asc" | "desc" };
};

export type ApiChangeLogGetAllParams = {
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: "asc" | "desc";
};

export const changeLogAPI = (axiosInstance: AxiosInstance) => ({
  getAll: async (
    params?: ApiChangeLogGetAllParams,
    config?: AxiosRequestConfig,
  ): Promise<ApiChangeLogGetAll> => {
    try {
      const stringifiedParams = params ? qString(params) : "";
      const response = await axiosInstance.get<ApiChangeLogGetAll>(
        `/change-log?${stringifiedParams}`,
        config,
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
