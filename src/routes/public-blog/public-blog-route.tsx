import { createRoute } from "@tanstack/react-router";

import ErrorPage from "@/components/general/error-page";
import LoadingElement from "@/components/general/loading-element";
import PageNotFound from "@/components/general/page-not-found";
import { rootRoute } from "@/routes/root-route";
import PublicBlog from "./public-blog";

const publicBlogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: PublicBlog,
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});

export default publicBlogRoute;
