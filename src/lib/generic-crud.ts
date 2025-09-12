// generic-crud.ts

import type { ApiNormalResponse } from "@/types/generic-type";
import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { qString } from "./utils";

export const genericCRUD = <T, U = T>(
  axiosInstance: AxiosInstance,
  endpoint: string
) => ({
  getAll: async (
    params?: { [key: string]: any },
    config?: AxiosRequestConfig
  ): Promise<ApiNormalResponse & { data: T[] }> => {
    try {
      const stringifiedParams = params ? qString(params) : "";
      const response = await axiosInstance.get<
        ApiNormalResponse & { data: T[] }
      >(`${endpoint}?${stringifiedParams}`, config);
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
  ): Promise<ApiNormalResponse & { data: T[] }> => {
    try {
      const response = await axiosInstance.get<
        ApiNormalResponse & { data: T[] }
      >(`${endpoint}/${id}`, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as ApiNormalResponse;
      }
      throw error;
    }
  },

  create: async (
    data: U,
    config?: AxiosRequestConfig
  ): Promise<ApiNormalResponse & { data: T[] }> => {
    try {
      const response = await axiosInstance.post<
        ApiNormalResponse & { data: T[] }
      >(endpoint, data, config);
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
    data: Partial<U>,
    config?: AxiosRequestConfig
  ): Promise<ApiNormalResponse & { data: T[] }> => {
    try {
      const response = await axiosInstance.put<
        ApiNormalResponse & { data: T[] }
      >(`${endpoint}/${id}`, data, config);
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
        `${endpoint}/${id}`,
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
