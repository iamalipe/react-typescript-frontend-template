export type ApiValidationError = { message: string; path: string };

export type ApiNormalResponse = {
  success: boolean;
  message: string;
  timestamp: string;
  errors: ApiValidationError[];
};
