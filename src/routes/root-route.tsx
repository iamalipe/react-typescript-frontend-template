import { createRootRouteWithContext } from "@tanstack/react-router";

import { ApiType } from "@/api/api";
import ErrorPage from "@/components/general/error-page";
import LoadingElement from "@/components/general/loading-element";
import PageNotFound from "@/components/general/page-not-found";
import { ApiQuery } from "@/hooks/use-api-query";
import RootLayout from "@/routes/root-layout";

// privateRoute
import copyMeRoute from "@/routes/private/copy-me/copy-me-route";
import homeRoute from "@/routes/private/home/home-route";
import privateRoute from "@/routes/private/private-route";

// authRoute
import authRoute from "@/routes/auth/auth-route";
import loginRoute from "@/routes/auth/login/login-route";
import registerRoute from "@/routes/auth/register/register-route";
import excelSheetRoute from "./private/excel-sheet/excel-sheet-route";
import kanbanRoute from "./private/kanban/kanban-route";
import productRoute from "./private/product/product-route";

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
  privateRoute.addChildren([
    homeRoute,
    copyMeRoute,
    excelSheetRoute,
    kanbanRoute,
    productRoute,
  ]),
  authRoute.addChildren([loginRoute, registerRoute]),
]);
