import ErrorPage from "@/components/general/error-page";
import LoadingElement from "@/components/general/loading-element";
import PageNotFound from "@/components/general/page-not-found";
import { getOneZodSchema } from "@/lib/generic-validation";
import { createRoute } from "@tanstack/react-router";
import React from "react";
import privateRoute from "@/routes/private/private-route";

const viewRecordRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: "/artist/$id",
  component: React.lazy(
    () => import("@/routes/private/artist/view-record/view-record")
  ),
  loader: async ({ context: { apiQuery }, params: { id } }) => {
    const data = await apiQuery.artist.get(id);
    return { data, crumb: data.data.name };
  },
  beforeLoad: ({ params }) => getOneZodSchema.parse(params),
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});

export default viewRecordRoute;
