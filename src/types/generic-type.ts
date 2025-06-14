// generic-type.ts
export type ApiValidationError = { message: string; path: string };

export type ApiSortReturn = { orderBy: string; order: "asc" | "desc" }[];

export type ApiPaginationReturn = {
  page: number;
  limit: number;
  total: number;
  current: number;
};

export type ApiErrorResponse = {
  success: boolean;
  message: string;
  errors: ApiValidationError[];
};

export type ApiGetAllResponse<T> = {
  success: boolean;
  sort: ApiSortReturn;
  pagination: ApiPaginationReturn;
  data: T[];
};

export type ApiNormalResponse<T> = {
  success: boolean;
  data: T;
};

export type ApiQueryParams = {
  page?: number; // Optional page number
  limit?: number; // Optional limit per page
  sort?: ApiSortReturn;
  [key: string]: unknown; // Additional key-value pairs
};
