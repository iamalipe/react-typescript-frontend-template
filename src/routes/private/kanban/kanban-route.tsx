import { createRoute } from "@tanstack/react-router";

import privateRoute from "@/routes/private/private-route";
import Kanban from "./kanban";

const kanbanRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: "/kanban",
  component: Kanban,
});

export default kanbanRoute;
