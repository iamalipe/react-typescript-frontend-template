// project-api.ts
import { qString } from "@/lib/utils";
import { ApiNormalResponse } from "@/types/generic-type";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

export type CopyMeType = {
  _id: string;
  stringField: string;
  numberField: number;
  floatField: number;
  enumField: "A" | "B" | "C";
  bigStringField: string;
  arrayField: string[];
  dateField: string;
  datetimeField: string;
  objectField: {
    key1: string;
    key2: number;
  };
  arrayOfObjectsField: Array<{
    name: string;
    value: number;
  }>;
  mixedField: any;
  booleanField: boolean;
  // bufferField: Buffer;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiCopyMeCreate = Pick<
  CopyMeType,
  | "arrayField"
  | "arrayOfObjectsField"
  | "bigStringField"
  | "booleanField"
  // | "bufferField"
  | "dateField"
  | "datetimeField"
  | "enumField"
  | "floatField"
  | "numberField"
  | "objectField"
  | "stringField"
>;

export type ApiCopyMeUpdate = Partial<
  Pick<
    CopyMeType,
    | "arrayField"
    | "arrayOfObjectsField"
    | "bigStringField"
    | "booleanField"
    // | "bufferField"
    | "dateField"
    | "datetimeField"
    | "enumField"
    | "floatField"
    | "numberField"
    | "objectField"
    | "stringField"
  >
>;

export type ApiCopyMeGetAll = ApiNormalResponse & {
  data: CopyMeType[];
  pagination: { total: number; page: number; limit: number };
  sort: { orderBy: string; order: "asc" | "desc" };
};
export type ApiCopyMeGet = ApiNormalResponse & { data: CopyMeType };

export type ApiCopyMeGetAllParams = {
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: "asc" | "desc";
};

export const copyMeAPI = (axiosInstance: AxiosInstance) => ({
  getAll: async (
    params?: ApiCopyMeGetAllParams,
    config?: AxiosRequestConfig
  ): Promise<ApiCopyMeGetAll> => {
    try {
      const stringifiedParams = params ? qString(params) : "";
      const response = await axiosInstance.get<ApiCopyMeGetAll>(
        `/copy-me?${stringifiedParams}`,
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

  get: async (
    id: string,
    config?: AxiosRequestConfig
  ): Promise<ApiCopyMeGet> => {
    try {
      const response = await axiosInstance.get<ApiCopyMeGet>(
        `/copy-me/${id}`,
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
    data: ApiCopyMeCreate,
    config?: AxiosRequestConfig
  ): Promise<ApiCopyMeGet> => {
    try {
      const response = await axiosInstance.post<ApiCopyMeGet>(
        "/copy-me",
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
    data: ApiCopyMeUpdate,
    config?: AxiosRequestConfig
  ): Promise<ApiCopyMeGet> => {
    try {
      const response = await axiosInstance.put<ApiCopyMeGet>(
        `/copy-me/${id}`,
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
        `/copy-me/${id}`,
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
