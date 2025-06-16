import { createRootRouteWithContext } from "@tanstack/react-router";

import { ApiType } from "@/api/api";
import ErrorPage from "@/components/general/error-page";
import LoadingElement from "@/components/general/loading-element";
import PageNotFound from "@/components/general/page-not-found";
import { ApiQuery } from "@/hooks/use-api-query";
import RootLayout from "@/routes/root-layout";

// privateRoute
import homeRoute from "@/routes/private/home/home-route";
import privateRoute from "@/routes/private/private-route";

// authRoute
import authRoute from "@/routes/auth/auth-route";
import loginRoute from "@/routes/auth/login/login-route";
import registerRoute from "@/routes/auth/register/register-route";
import productRoute from "./private/product/product-route";
import viewProductRoute from "./private/product/view-record/view-record-route";

export const rootRoute = createRootRouteWithContext<{
  apiQuery: ApiQuery;
  api: ApiType;
}>()({
  component: RootLayout,
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});

export const routeTree = rootRoute.addChildren([
  privateRoute.addChildren([homeRoute, productRoute, viewProductRoute]),
  authRoute.addChildren([loginRoute, registerRoute]),
]);
