import { createRootRoute } from "@tanstack/react-router"

import ErrorPage from "@/components/general/error-page"
import LoadingElement from "@/components/general/loading-element"
import PageNotFound from "@/components/general/page-not-found"
import RootLayout from "@/routes/root-layout"

// privateRoute
import homeRoute from "@/routes/private-admin/home/home-route"
import privateAdminRoute from "@/routes/private-admin/private-admin-route"

// authRoute
import authRoute from "@/routes/auth/auth-route"
import loginRoute from "@/routes/auth/login/login-route"
import registerRoute from "@/routes/auth/register/register-route"
import copyMeRoute from "./private-admin/copy-me/copy-me-route"
import profileRoute from "./private-admin/profile/profile-route"
import publicHomeRoute from "./public-home/public-home-route"

export const rootRoute = createRootRoute({
  component: RootLayout,
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
  pendingComponent: LoadingElement,
})

export const routeTree = rootRoute.addChildren([
  publicHomeRoute,
  privateAdminRoute.addChildren([homeRoute, copyMeRoute, profileRoute]),
  authRoute.addChildren([loginRoute, registerRoute]),
])
