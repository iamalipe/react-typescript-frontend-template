// generic-type.ts
export type ApiValidationError = { message?: string; path?: string };

export type ApiSortReturn = { orderBy: string; order: "asc" | "desc" }[];

export type ApiPaginationReturn = {
  page: number;
  limit: number;
  total: number;
  current: number;
};

export type ApiErrorResponse = {
  success?: boolean;
  message?: string;
  data?: null;
  timestamp?: string;
  errors?: ApiValidationError[];
};

export type ApiGetAllResponse<T> = {
  success: boolean;
  data: T[];
  total: number;
  orderBy: string;
  order: "asc" | "desc";
  page: number;
  limit: number;
  errors: ApiValidationError[];
  timestamp: string;
  message: string;
};

export type ApiNormalResponse<T> = {
  success: boolean;
  errors: ApiValidationError[];
  data: T | null;
  timestamp: string;
  message: string;
};

export type ApiQueryParams = {
  page?: number; // Optional page number
  limit?: number; // Optional limit per page
  orderBy?: string; // Optional
  order?: "asc" | "desc"; // Optional
  [key: string]: unknown; // Additional key-value pairs
};
