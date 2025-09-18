import Footer from "@/components/general/footer";
import Header from "@/components/general/header";
import { Outlet } from "@tanstack/react-router";

const PublicBlogLayout = () => {
  return (
    <>
      <div className="h-full-x flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-hidden flex bg-background">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};
export default PublicBlogLayout;
