import { genericCRUD } from "@/lib/generic-crud";
import { type AxiosInstance } from "axios";

export type ProductType = {
  _id: string;
  name: string;
  userId: string;
  category: string;
  slug: string;
  price: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductRawType = Pick<
  ProductType,
  "name" | "category" | "price" | "description"
>;
const ENDPOINT = "product";

// Module-specific APIs
export const productAPI = (axiosInstance: AxiosInstance) => ({
  ...genericCRUD<ProductType, ProductRawType>(axiosInstance, ENDPOINT),
});
