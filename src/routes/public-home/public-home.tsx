import { Link } from "@tanstack/react-router";

const PublicHome = () => {
  return (
    <>
      <div className="flex min-h-svh overflow-hidden bg-background flex-col">
        {/* Single Entrance to Admin Dashboard */}
        <Link
          to="/admin"
          className="relative flex-1 flex items-center justify-center hover:scale-102 transition-all duration-500 ease-out"
        >
          <img
            src="/admin-img.jpg"
            alt="Admin Dashboard"
            className="absolute inset-0 blur-sm w-full h-full object-cover brightness-75"
          />
          <div className="relative z-10 text-center flex flex-col gap-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-wider drop-shadow-lg">
              ADMIN DASHBOARD
            </h1>
            <p className="text-lg md:text-xl text-gray-200 drop-shadow-md max-w-md mx-auto px-4">
              Access the secure administrator portal to manage your copy-me templates and user activities.
            </p>
            <span className="inline-block mt-4 px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-lg">
              Go to Console
            </span>
          </div>
          <div className="absolute inset-0 bg-black/45" />
        </Link>
      </div>
    </>
  );
};
export default PublicHome;
