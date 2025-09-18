import { Button, Input } from "@/components/ui";
import { Plus, Search, TrendingUp } from "lucide-react";
import { BlogCard } from "../components/blog-card";

const BlogHome = () => {
  return (
    <>
      <main className="flex-1 overflow-auto flex flex-col">
        <div className="flex-1 container mx-auto px-4 py-4 max-w-2xl flex flex-col">
          {/* Search Bar */}
          <div className="relative mb-4 flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search posts, topics, or authors..."
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>

          {/* Quick Actions */}
          <div className="flex items-center mb-4 justify-between flex-none">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </Button>
            </div>
            <Button size="sm" variant="secondary">
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </div>
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
