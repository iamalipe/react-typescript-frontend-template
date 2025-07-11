import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { NuqsAdapter } from "nuqs/adapters/react";
import { createRoot } from "react-dom/client";

import "@/style/custom.css";
import "@/style/index.css";

import { routeTree } from "@/routes/root-route";
import { StrictMode } from "react";
import api from "./api/api";
import apiQuery, { queryClient } from "./hooks/use-api-query";

const router = createRouter({
  routeTree: routeTree,
  context: {
    apiQuery: apiQuery,
    api: api,
  },
  // defaultPreload: 'intent',
  // defaultStaleTime: 5000,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root");
if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <RouterProvider router={router} />
        </NuqsAdapter>
      </QueryClientProvider>
    </StrictMode>
  );
}
