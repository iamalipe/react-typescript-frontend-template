import { BlogCard } from "../components/blog-card";
import SearchAndAction from "./search-and-action";

const BlogHome = () => {
  return (
    <>
      <main className="flex-1 overflow-auto flex flex-col">
        <div className="flex-1 container mx-auto px-4 py-4 max-w-2xl flex flex-col">
          <SearchAndAction />
          {/* Blog List Cards */}
          <div className="animate-fadeIn flex-1 flex flex-col gap-4">
            {Array.from({ length: 50 }, (_, i) => (
              <BlogCard
                key={i}
                post={{
                  id: `${i}`,
                  content: `Excerpt for blog post ${i}`,
                  author: `Author ${i}`,
                  date: "2023-01-01",
                  tags: [],
                  likes: 0,
                  comments: 5,
                }}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
export default BlogHome;
