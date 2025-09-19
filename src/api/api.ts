// api.ts
import axios from "axios";

// import all api
import { authAPI } from "./auth-api";
import { blogAPI } from "./blog-api";
import { copyMeAPI } from "./copy-me-api";
import { productAPI } from "./product-api";

// Axios instance configuration
const VITE_API_URL = (import.meta.env.VITE_API_URL as string) || "";
export const axiosInstance = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
});

// Export all APIs
const api = {
  auth: authAPI(axiosInstance),
  copyMe: copyMeAPI(axiosInstance),
  product: productAPI(axiosInstance),
  blog: blogAPI(axiosInstance),
};

export type ApiType = typeof api;

export default api;
