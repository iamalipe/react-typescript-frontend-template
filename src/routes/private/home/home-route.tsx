import { createRoute } from "@tanstack/react-router";

import Home from "@/routes/private/home/home";
import privateRoute from "@/routes/private/private-route";

const homeRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: "/",
  component: Home,
});

export default homeRoute;
