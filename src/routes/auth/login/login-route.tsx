import { createRoute } from "@tanstack/react-router";

import Login from "@/routes/auth/login/login";
import authRoute from "@/routes/auth/auth-route";

const loginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/login",
  component: Login,
});

export default loginRoute;
