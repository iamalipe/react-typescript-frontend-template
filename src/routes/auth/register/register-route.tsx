import { createRoute } from "@tanstack/react-router";

import Register from "@/routes/auth/register/register";
import authRoute from "@/routes/auth/auth-route";

const registerRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/register",
  component: Register,
});

export default registerRoute;
