import BlogList from "./blog-list";
import SearchAndAction from "./search-and-action";

const BlogHome = () => {
  return (
    <>
      <main className="flex-1 overflow-auto flex flex-col">
        <div className="flex-1 container mx-auto px-4 py-4 max-w-2xl flex flex-col">
          <SearchAndAction />
          {/* Blog List Cards */}
          <BlogList />
        </div>
      </main>
    </>
  );
};
export default BlogHome;
