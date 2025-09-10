import { createRoute } from "@tanstack/react-router";

import privateRoute from "@/routes/private/private-route";
import {
  ExcelSheetC1,
  ExcelSheetC2,
  ExcelSheetLayout,
  ExcelSheetMain,
} from "./excel-sheet";

const excelSheetRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: "/excel-sheet",
  component: ExcelSheetLayout,
});

const excelSheetRouteMain = createRoute({
  getParentRoute: () => excelSheetRoute,
  path: "/",
  component: ExcelSheetMain,
});
const excelSheetRouteC1 = createRoute({
  getParentRoute: () => excelSheetRoute,
  path: "/c1",
  component: ExcelSheetC1,
});
const excelSheetRouteC2 = createRoute({
  getParentRoute: () => excelSheetRoute,
  path: "/c2",
  component: ExcelSheetC2,
});

excelSheetRoute.addChildren([
  excelSheetRouteMain,
  excelSheetRouteC1,
  excelSheetRouteC2,
]);

export default excelSheetRoute;
