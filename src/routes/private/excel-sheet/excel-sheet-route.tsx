import { createRoute } from "@tanstack/react-router";

import ErrorPage from "@/components/general/error-page";
import LoadingElement from "@/components/general/loading-element";
import PageNotFound from "@/components/general/page-not-found";
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
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});

const excelSheetRouteMain = createRoute({
  getParentRoute: () => excelSheetRoute,
  path: "/",
  component: ExcelSheetMain,
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});
const excelSheetRouteC1 = createRoute({
  getParentRoute: () => excelSheetRoute,
  path: "/c1",
  component: ExcelSheetC1,
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});
const excelSheetRouteC2 = createRoute({
  getParentRoute: () => excelSheetRoute,
  path: "/c2",
  component: ExcelSheetC2,
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
});

excelSheetRoute.addChildren([
  excelSheetRouteMain,
  excelSheetRouteC1,
  excelSheetRouteC2,
]);

export default excelSheetRoute;
