import { Outlet } from "@tanstack/react-router";

import Header from "@/components/general/header";
import Footer from "@/components/general/footer";
import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const PrivateLayout = () => {
  return (
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
    </>
  );
};
export default PrivateLayout;
