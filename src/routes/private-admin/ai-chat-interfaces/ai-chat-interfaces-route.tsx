import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

import ErrorPage from "@/components/general/error-page";
import LoadingElement from "@/components/general/loading-element";
import PageNotFound from "@/components/general/page-not-found";
import privateAdminRoute from "@/routes/private-admin/private-admin-route";

const aiChatInterfacesRoute = createRoute({
  getParentRoute: () => privateAdminRoute,
  path: "/ai-chat",
  component: lazyRouteComponent(() => import("./ai-chat-interfaces")),
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});

export default aiChatInterfacesRoute;
