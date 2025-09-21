import { createRoute } from "@tanstack/react-router";

import authRoute from "@/routes/auth/auth-route";
import Login from "./login";

const login2Route = createRoute({
  getParentRoute: () => authRoute,
  path: "/login2",
  component: Login,
});

export default login2Route;
