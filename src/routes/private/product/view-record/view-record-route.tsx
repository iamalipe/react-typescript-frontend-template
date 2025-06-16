import ErrorPage from "@/components/general/error-page";
import LoadingElement from "@/components/general/loading-element";
import PageNotFound from "@/components/general/page-not-found";
import { getOneZodSchema } from "@/lib/generic-validation";
import privateRoute from "@/routes/private/private-route";
import { createRoute } from "@tanstack/react-router";
import React from "react";

const viewRecordRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: "/product/$id",
  component: React.lazy(
    () => import("@/routes/private/product/view-record/view-record")
  ),
  loader: async ({ context: { apiQuery }, params: { id } }) => {
    const data = await apiQuery.product.get(id);
    return { data, crumb: data.data?.name };
  },
  beforeLoad: ({ params }) => getOneZodSchema.parse(params),
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});

export default viewRecordRoute;
