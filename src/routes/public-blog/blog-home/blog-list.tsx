import apiQuery from "@/hooks/use-api-query";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import { BlogCard } from "../components/blog-card";
import { BlogCardSkeleton } from "../components/blog-card-skeleton";

const BlogList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = apiQuery.blog.useGetInfinite({
    limit: 10,
  });

  const { loadMoreRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    threshold: 0.5,
  });

  // Flatten all pages of data
  const allBlogs = data?.pages.flatMap((page) => page.data) || [];

  if (isLoading) {
    return (
      <div className="animate-fadeIn flex-1 flex flex-col gap-4">
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">
          Error loading blogs. Please try again.
        </p>
      </div>
    );
  }

  if (allBlogs.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">No blogs available.</p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn flex-1 flex flex-col gap-4">
      {allBlogs.map((blog) => (
        <BlogCard
          key={blog._id}
          post={{
            id: blog._id,
            title: "",
            content: blog.content,
            author: "Anonymous", // You might want to add author field to your API
            date: blog.createdAt,
            tags: blog.topic.split(","), // You might want to add tags field to your API
            likes: 0, // You might want to add likes field to your API
            comments: 0, // You might want to add comments field to your API
          }}
        />
      ))}

      {/* Load more trigger */}
      <div ref={loadMoreRef} className="h-4">
        {isFetchingNextPage && <BlogCardSkeleton />}
      </div>
    </div>
  );
};

export default BlogList;
