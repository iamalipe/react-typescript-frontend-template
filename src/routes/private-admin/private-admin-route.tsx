import { createTypeSafeLoaderDeps } from "@/lib/generic-validation";
import { mongoIdRegex } from "@/lib/utils";
import PrivateAdminLayout from "@/routes/private-admin/private-admin-layout";
import { rootRoute } from "@/routes/root-route";
import { createRoute, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

export const dialogStateZodSchema = z.object({
  mode: z.enum(["CREATE", "UPDATE", "VIEW"]).optional(),
  dialog: z.enum(["Copy-Me", "Product"]).optional(),
  id: z.string().regex(mongoIdRegex, "Invalid id").optional(),
});
export type DialogStateType = z.infer<typeof dialogStateZodSchema>;

export const privateRouteZodSchema = z.object({
  ds: z.string().optional(), // dialog state
});

const privateAdminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: PrivateAdminLayout,
  loaderDeps: ({ search }) =>
    createTypeSafeLoaderDeps(privateRouteZodSchema, search),
  validateSearch: zodValidator(privateRouteZodSchema),
  beforeLoad: async ({ location, context: { apiQuery } }) => {
    const res = await apiQuery.auth.getCurrentUser();
    if (!res || !res.success) {
      throw redirect({
        to: "/login",
        search: location.href !== "/" && {
          redirect: location.href,
        },
      });
    }
  },
});

export default privateAdminRoute;
