import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Toaster } from "@/components/ui/sonner";
import AlertPopupProvider from "@/components/alert-popup/alert-popup-provider";

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster position="top-center" richColors visibleToasts={10} />
      <AlertPopupProvider />
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools />
    </>
  );
};
export default RootLayout;
