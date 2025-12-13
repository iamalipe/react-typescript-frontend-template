import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

import ErrorPage from "@/components/general/error-page";
import LoadingElement from "@/components/general/loading-element";
import PageNotFound from "@/components/general/page-not-found";
import privateAdminRoute from "@/routes/private-admin/private-admin-route";

const componentViewRoute = createRoute({
  getParentRoute: () => privateAdminRoute,
  path: "/component-view",
  component: lazyRouteComponent(() => import("./component-view")),
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
  loader: () => {
    return {
      crumb: "Component View",
    };
  },
});

export default componentViewRoute;
