import { createRoute } from "@tanstack/react-router";

import ErrorPage from "@/components/general/error-page";
import LoadingElement from "@/components/general/loading-element";
import PageNotFound from "@/components/general/page-not-found";
import publicBlogRoute from "../public-blog-route";
import BlogHome from "./blog-home";

const blogHomeRoute = createRoute({
  getParentRoute: () => publicBlogRoute,
  path: "/",
  component: BlogHome,
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});

export default blogHomeRoute;
