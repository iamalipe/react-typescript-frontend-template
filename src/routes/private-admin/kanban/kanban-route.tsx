import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

import ErrorPage from "@/components/general/error-page";
import LoadingElement from "@/components/general/loading-element";
import PageNotFound from "@/components/general/page-not-found";
import privateAdminRoute from "@/routes/private-admin/private-admin-route";

const kanbanRoute = createRoute({
  getParentRoute: () => privateAdminRoute,
  path: "/kanban",
  component: lazyRouteComponent(() => import("./kanban")),
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});

export default kanbanRoute;
