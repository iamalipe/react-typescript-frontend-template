import { createRoute, redirect } from "@tanstack/react-router";

import AuthLayout from "@/routes/auth/auth-layout";
import { rootRoute } from "@/routes/root-route";

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "_auth",
  component: AuthLayout,
  beforeLoad: async ({ context: { apiQuery } }) => {
    const res = await apiQuery.auth.getCurrentUser();
    if (res && res.success) {
      throw redirect({
        to: "/",
      });
    }
  },
});

export default authRoute;
