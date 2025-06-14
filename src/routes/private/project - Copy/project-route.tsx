import { createRoute } from "@tanstack/react-router";

import ErrorPage from "@/components/general/error-page";
import LoadingElement from "@/components/general/loading-element";
import PageNotFound from "@/components/general/page-not-found";
import { getAllZodSchema } from "@/lib/generic-validation";
import privateRoute from "@/routes/private/private-route";
import Project from "@/routes/private/project/project";
import { zodValidator } from "@tanstack/zod-adapter";

const projectRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: "/project",
  component: Project,
  loaderDeps: ({ search: { sort, limit, page, mode } }) => ({
    sort,
    limit,
    page,
    mode,
  }),
  loader: async ({ context: { apiQuery }, deps }) => ({
    data: await apiQuery.project.getAll(deps),
    crumb: "Project",
  }),
  validateSearch: zodValidator(getAllZodSchema),
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});

export default projectRoute;
