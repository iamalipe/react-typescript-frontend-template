import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, Clock, Heart, MessageCircle, Share } from "lucide-react";

interface BlogPost {
  id: string;
  title?: string;
  content: string;
  author: string;
  date: string;
  readTime?: string;
  tags: string[];
  likes?: number;
  comments?: number;
}

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Card className="w-full border-border bg-card hover:bg-accent/50 transition-colors flex-none">
      <CardContent className="p-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-2 px-2 mt-2">
          <div className="flex items-center gap-3">
            {/* <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div> */}
            <div>
              <p className="font-semibold text-foreground text-sm">
                {post.author}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                {post.readTime && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleBookmark}>
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <a className="block px-2 cursor-pointer">
          <div className="mb-2">
            {post?.title && (
              <h2 className="font-bold text-lg text-foreground mb-2 hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h2>
            )}
            <p className="text-muted-foreground text-base leading-relaxed line-clamp-3">
              {post.content}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                // className="text-xs px-2 py-1"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </a>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={
                // TODO : Dark Mode fix
                "flex items-center gap-2 hover:bg-red-100 hover:text-red-500"
              }
            >
              {/* <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} /> */}
              <Heart className={"h-4 w-4"} />
              {post.likes
                ? post.likes > 0 && (
                    <span className="text-sm">{post.likes}</span>
                  )
                : null}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              // TODO : Dark Mode fix
              className="flex items-center gap-2 hover:bg-blue-100 hover:text-blue-500"
            >
              <MessageCircle className="h-4 w-4" />
              {post.comments
                ? post.comments > 0 && (
                    <span className="text-sm">{post.comments}</span>
                  )
                : null}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              // TODO : Dark Mode fix
              className="flex items-center gap-2 hover:bg-green-100 hover:text-green-500"
            >
              <Share className="h-4 w-4" />
              <span className="text-sm">Share</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
