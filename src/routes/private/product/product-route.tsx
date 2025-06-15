import { createRoute } from "@tanstack/react-router";

import ErrorPage from "@/components/general/error-page";
import LoadingElement from "@/components/general/loading-element";
import PageNotFound from "@/components/general/page-not-found";
import { getAllZodSchema } from "@/lib/generic-validation";
import privateRoute from "@/routes/private/private-route";
import Product from "@/routes/private/product/product";
import { zodValidator } from "@tanstack/zod-adapter";

const productRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: "/product",
  component: Product,
  loaderDeps: ({ search: { order, orderBy, limit, page, mode } }) => ({
    order,
    orderBy,
    limit,
    page,
    mode,
  }),
  loader: async ({ context: { apiQuery }, deps }) => ({
    data: await apiQuery.product.getAll(deps),
    crumb: "Product",
  }),
  validateSearch: zodValidator(getAllZodSchema),
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});

export default productRoute;
