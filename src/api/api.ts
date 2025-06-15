// api.ts
import axios from "axios";

// import all api
import { authAPI } from "./auth-api";
import { productAPI } from "./product-api";
import { projectAPI } from "./project-api";

// Axios instance configuration
const VITE_API_URL = (import.meta.env.VITE_API_URL as string) || "";
export const axiosInstance = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
});

// Export all APIs
const api = {
  auth: authAPI(axiosInstance),
  project: projectAPI(axiosInstance),
  product: productAPI(axiosInstance),
};

export type ApiType = typeof api;

export default api;
