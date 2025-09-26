import { createRootRouteWithContext } from "@tanstack/react-router";

import { ApiType } from "@/api/api";
import ErrorPage from "@/components/general/error-page";
import LoadingElement from "@/components/general/loading-element";
import PageNotFound from "@/components/general/page-not-found";
import { ApiQuery } from "@/hooks/use-api-query";
import RootLayout from "@/routes/root-layout";

// privateRoute
import homeRoute from "@/routes/private-admin/home/home-route";
import privateAdminRoute from "@/routes/private-admin/private-admin-route";

// authRoute
import authRoute from "@/routes/auth/auth-route";
import loginRoute from "@/routes/auth/login/login-route";
import registerRoute from "@/routes/auth/register/register-route";
import kanbanRoute from "./private-admin/kanban/kanban-route";
import productRoute from "./private-admin/product/product-route";
import profileRoute from "./private-admin/profile/profile-route";
import blogHomeRoute from "./public-blog/blog-home/blog-home-route";
import publicBlogRoute from "./public-blog/public-blog-route";
import publicHomeRoute from "./public-home/public-home-route";

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
  publicHomeRoute,
  publicBlogRoute.addChildren([blogHomeRoute]),
  privateAdminRoute.addChildren([
    homeRoute,
    kanbanRoute,
    productRoute,
    profileRoute,
  ]),
  authRoute.addChildren([loginRoute, registerRoute]),
]);
