import { createRoute, redirect } from "@tanstack/react-router";

import authRoute from "@/routes/auth/auth-route";
import Login from "@/routes/auth/login/login";

const loginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/login",
  component: Login,
  beforeLoad: async ({ context: { apiQuery } }) => {
    const res = await apiQuery.auth.getCurrentUser();
    if (res && res.success) {
      throw redirect({
        to: "/admin",
      });
    }
  },
});

export default loginRoute;
