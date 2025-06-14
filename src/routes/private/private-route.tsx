import { createRoute, redirect } from "@tanstack/react-router";

import PrivateLayout from "@/routes/private/private-layout";
import { rootRoute } from "@/routes/root-route";

const privateRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "_private",
  component: PrivateLayout,
  beforeLoad: async ({ location, context: { apiQuery } }) => {
    const res = await apiQuery.auth.getCurrentUser();
    if (!res || !res.success) {
      throw redirect({
        to: "/login",
        search: location.href !== "/" && {
          redirect: location.href,
        },
      });
    }
  },
});

export default privateRoute;
