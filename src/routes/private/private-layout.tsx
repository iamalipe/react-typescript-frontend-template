import { Outlet } from "@tanstack/react-router";

import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import Footer from "@/components/general/footer";
import Header from "@/components/general/header";
import RootDialog from "@/components/root-dialog/root-dialog";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SocketProvider } from "@/context/SocketContext";

const PrivateLayout = () => {
  return (
    <SocketProvider>
      <>
        <div className="h-full-x flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 overflow-hidden flex bg-background">
            <SidebarProvider>
              <AppSidebar />
              <Outlet />
            </SidebarProvider>
          </div>
          <Footer />
        </div>
        <RootDialog />
      </>
    </SocketProvider>
  );
};
export default PrivateLayout;
