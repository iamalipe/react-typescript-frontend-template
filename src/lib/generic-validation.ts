import { z } from "zod";
import { mongoIdRegex } from "./utils";

export const paginationZodSchema = z
  .object({
    page: z.number().min(0).optional().default(1),
    limit: z.number().min(1).max(100).optional().default(20),
  })
  .transform((data) => {
    // Remove default values to return undefined for them
    const result: { page?: number; limit?: number } = {};
    if (data.page !== 1) {
      result.page = data.page;
    }
    if (data.limit !== 10) {
      result.limit = data.limit;
    }
    return result;
  });

export type paginationZodSchemaType = z.infer<typeof paginationZodSchema>;

export const sortArrayZodSchema = z
  .array(
    z.object({
      order: z
        .string()
        .optional()
        .refine((val) => !val || ["asc", "desc"].includes(val), {
          message: "Order must be 'asc' or 'desc'",
        })
        .transform((val) => (val === "" || val === undefined ? "desc" : val))
        .default("desc"),
      orderBy: z
        .string()
        .optional()
        .transform((val) =>
          val === "" || val === undefined ? "createdAt" : val
        )
        .default("createdAt"),
    })
  )
  .transform((val) =>
    val.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.orderBy === item.orderBy)
    )
  )
  .default([]);

export type sortArrayZodSchemaType = {
  orderBy: string;
  order: "asc" | "desc";
}[];

export const getAllZodSchema = z
  .object({
    page: z.number().min(0).optional(),
    limit: z.number().min(1).optional(),
    orderBy: z.string().optional(),
    order: z.enum(["asc", "desc"]).optional(),
    mode: z.enum(["CREATE", "UPDATE", "VIEW"]).optional(),
  })
  .transform((data) => {
    // Remove default values to return undefined for them
    const result: {
      page?: number;
      limit?: number;
      orderBy?: string;
      order?: "asc" | "desc";
      mode?: "CREATE" | "UPDATE" | "VIEW";
    } = {};

    if (data.page && data.page > 1) {
      result.page = data.page;
    }
    if (data.limit && data.limit !== 20) {
      result.limit = data.limit;
    }
    if (data.orderBy && data.orderBy !== "createdAt") {
      result.orderBy = data.orderBy;
      if (data.order && data.order !== "desc") {
        result.order = data.order;
      }
    }
    if (data.mode) {
      result.mode = data.mode;
    }
    return result;
  });

export const getOneZodSchema = z.object({
  id: z.string().regex(mongoIdRegex, "Invalid id"),
});
