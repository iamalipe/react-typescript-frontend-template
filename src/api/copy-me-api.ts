import { qString } from "@/lib/utils";
import type { ApiNormalResponse, TableConfigType } from "@/types/generic-type";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

export type CopyMeType = {
  _id: string;
  stringRequired: string;
  stringTextarea: string;
  stringOptional?: string;
  stringTextareaOptional?: string;

  numberDecimal: number;
  numberInt: number;
  numberSlider: number;

  dateOnly: string;
  dateTime: string;
  dateRangeStart: string;
  dateRangeEnd: string;
  dateTimeRangeStart: string;
  dateTimeRangeEnd: string;

  booleanSwitch: boolean;
  enumString: 'Active' | 'Inactive' | 'Block' | 'Pending';
  customOptionalString: string;

  fileImage?: string;
  fileDoc?: string;

  singleArray: string[];
  arrayObject: Array<{ label: string; value: string }>;
  twoDArray: number[][];
  nestedObject: {
    title: string;
    priority: number;
  };

  userId: string;
  createdAt: string;
  updatedAt: string;
};

// We will support form data upload, so inputs can contain Files or URLs
export type ApiCopyMeCreate = Omit<
  CopyMeType,
  "_id" | "userId" | "createdAt" | "updatedAt" | "fileImage" | "fileDoc"
> & {
  fileImage?: File | string | null;
  fileDoc?: File | string | null;
};

export type ApiCopyMeUpdate = Partial<ApiCopyMeCreate>;

export type ApiCopyMeGetAll = ApiNormalResponse & {
  data: CopyMeType[];
  pagination: { total: number; page: number; limit: number };
  sort: { orderBy: string; order: "asc" | "desc" };
  config?: TableConfigType;
};

export type ApiCopyMeGet = ApiNormalResponse & { data: CopyMeType };

export type ApiCopyMeGetAllParams = {
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: "asc" | "desc";
  search?: string;
  enumString?: "Active" | "Inactive" | "Block" | "Pending";
  booleanSwitch?: "true" | "false";
};

// Helper function to build FormData from complex copy-me values
const buildFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, val]) => {
    if (val === undefined || val === null) {
      return;
    }
    // Handle files
    if (val instanceof File) {
      formData.append(key, val);
    } else if (Array.isArray(val) || (typeof val === "object" && !(val instanceof Date))) {
      // Serialize arrays & objects as JSON strings to be preprocessed by Zod
      formData.append(key, JSON.stringify(val));
    } else {
      formData.append(key, val);
    }
  });
  return formData;
};

export const copyMeAPI = (axiosInstance: AxiosInstance) => ({
  getAll: async (
    params?: ApiCopyMeGetAllParams,
    config?: AxiosRequestConfig,
  ): Promise<ApiCopyMeGetAll> => {
    try {
      const stringifiedParams = params ? qString(params) : "";
      const response = await axiosInstance.get<ApiCopyMeGetAll>(
        `/copy-me?${stringifiedParams}`,
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

  get: async (
    id: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiCopyMeGet> => {
    try {
      const response = await axiosInstance.get<ApiCopyMeGet>(
        `/copy-me/${id}`,
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

  create: async (
    data: ApiCopyMeCreate,
    config?: AxiosRequestConfig,
  ): Promise<ApiCopyMeGet> => {
    try {
      const formData = buildFormData(data);
      const response = await axiosInstance.post<ApiCopyMeGet>(
        "/copy-me",
        formData,
        {
          ...config,
          headers: {
            ...config?.headers,
            "Content-Type": "multipart/form-data",
          },
        },
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
    config?: AxiosRequestConfig,
  ): Promise<ApiCopyMeGet> => {
    try {
      const formData = buildFormData(data);
      const response = await axiosInstance.put<ApiCopyMeGet>(
        `/copy-me/${id}`,
        formData,
        {
          ...config,
          headers: {
            ...config?.headers,
            "Content-Type": "multipart/form-data",
          },
        },
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
    config?: AxiosRequestConfig,
  ): Promise<ApiNormalResponse> => {
    try {
      const response = await axiosInstance.delete<ApiNormalResponse>(
        `/copy-me/${id}`,
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
