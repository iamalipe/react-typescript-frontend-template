import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

import ErrorPage from "@/components/general/error-page";
import LoadingElement from "@/components/general/loading-element";
import PageNotFound from "@/components/general/page-not-found";
import privateRoute from "@/routes/private/private-route";

const kanbanRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: "/kanban",
  // component: Kanban,
  component: lazyRouteComponent(() => import("./kanban")),
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});

export default kanbanRoute;
