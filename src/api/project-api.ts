// project-api.ts
import { genericCRUD } from "@/lib/generic-crud";
import type { AxiosInstance } from "axios";

export type ProjectType = {
  _id: string;
  name: string;
  userId: string;
  slug: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ProjectRawType = Pick<ProjectType, "name" | "slug" | "description">;

// Module-specific APIs
export const projectAPI = (axiosInstance: AxiosInstance) =>
  genericCRUD<ProjectType, ProjectRawType>(axiosInstance, "project");
