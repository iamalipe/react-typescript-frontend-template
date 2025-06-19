import { createRoute } from "@tanstack/react-router";

import ErrorPage from "@/components/general/error-page";
import LoadingElement from "@/components/general/loading-element";
import PageNotFound from "@/components/general/page-not-found";
import { getAllZodSchema } from "@/lib/generic-validation";
import privateRoute from "@/routes/private/private-route";
import Users from "@/routes/private/users/users";
import { zodValidator } from "@tanstack/zod-adapter";

const usersRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: "/users",
  component: Users,
  loaderDeps: ({ search: { order, orderBy, limit, page, mode } }) => ({
    order,
    orderBy,
    limit,
    page,
    mode,
  }),
  loader: async ({ context: { apiQuery }, deps }) => ({
    data: await apiQuery.product.getAll(deps),
    crumb: "Users",
  }),
  validateSearch: zodValidator(getAllZodSchema),
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});

export default usersRoute;
