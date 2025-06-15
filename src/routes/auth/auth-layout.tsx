import FooterPublic from "@/components/general/footer-public";
import { Outlet } from "@tanstack/react-router";

const AuthLayout = () => {
  return (
    <div className="h-full-x flex flex-col overflow-hidden">
      {/* <div className="flex flex-col items-center justify-center gap-6 bg-background p-6 md:p-10"> */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <Outlet />
      </div>
      <FooterPublic />
    </div>
  );
};
export default AuthLayout;
