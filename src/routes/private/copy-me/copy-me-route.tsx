import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

import ErrorPage from "@/components/general/error-page";
import LoadingElement from "@/components/general/loading-element";
import PageNotFound from "@/components/general/page-not-found";
import privateRoute from "@/routes/private/private-route";
import { zodValidator } from "@tanstack/zod-adapter";

import { createTypeSafeLoaderDeps } from "@/lib/generic-validation";
import { z } from "zod";

export const getAllZodSchema = z.object({
  page: z.number().min(0).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(10),
  mode: z.enum(["CREATE", "UPDATE", "VIEW"]).optional(),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
  orderBy: z
    .string()
    .optional()
    .transform((val) => (val === "" || val === undefined ? "createdAt" : val))
    .default("createdAt"),
});

const copyMeRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: "/copy-me",
  // component: CopyMe,
  component: lazyRouteComponent(() => import("./copy-me")),
  loaderDeps: ({ search }) => createTypeSafeLoaderDeps(getAllZodSchema, search),
  loader: async ({ context: { apiQuery }, deps }) => {
    const data = await apiQuery.copyMe.getAll(deps);
    // await sleep(2000);
    return {
      data: data,
      crumb: "Copy Me",
    };
  },
  validateSearch: zodValidator(getAllZodSchema),
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});

export default copyMeRoute;
