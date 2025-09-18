import { Link } from "@tanstack/react-router";

const PublicHome = () => {
  return (
    <>
      <div className="flex min-h-svh overflow-hidden bg-background flex-col md:flex-row">
        {/* Column 1 */}
        <Link
          to="/blog"
          className="relative flex-1 flex items-center justify-center"
        >
          <img
            src="/blog-img.jpg"
            alt="Blog"
            className="absolute inset-0 w-full blur-sm h-full object-cover"
          />
          <span className="text-2xl absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
            Blog
          </span>
        </Link>
        {/* Column 2 */}
        <Link
          to="/admin"
          className="relative flex-1 flex items-center justify-center"
        >
          <img
            src="/admin-img.jpg"
            alt="Admin"
            className="absolute inset-0 blur-sm w-full h-full object-cover"
          />
          <span className="text-2xl absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
            Admin
          </span>
        </Link>
      </div>
    </>
  );
};
export default PublicHome;
