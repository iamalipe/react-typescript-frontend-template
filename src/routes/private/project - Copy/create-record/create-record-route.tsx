import ErrorPage from "@/components/general/error-page";
import LoadingElement from "@/components/general/loading-element";
import PageNotFound from "@/components/general/page-not-found";
import { createRoute } from "@tanstack/react-router";
import React from "react";
import privateRoute from "@/routes/private/private-route";

const createRecordRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: "/artist/new",
  component: React.lazy(
    () => import("@/routes/private/artist/create-record/create-record")
  ),
  loader: async () => ({
    crumb: "New Artist",
  }),
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});

export default createRecordRoute;
