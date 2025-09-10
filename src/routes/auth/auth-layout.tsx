import { Outlet } from "@tanstack/react-router";

const AuthLayout = () => {
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <Outlet />
      </div>
    </>
  );
};
export default AuthLayout;
