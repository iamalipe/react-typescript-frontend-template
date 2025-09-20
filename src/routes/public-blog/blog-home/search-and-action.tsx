import { Button, Input } from "@/components/ui";
import { PlusIcon, SearchIcon, TrendingUpIcon } from "lucide-react";

const SearchAndAction = () => {
  return (
    <>
      {/* Search Bar */}
      <div className="relative mb-4 flex-none">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
            <TrendingUpIcon className="h-4 w-4 mr-2" />
            Trending
          </Button>
        </div>
        <Button size="sm" variant="secondary">
          <PlusIcon className="h-4 w-4 mr-2" />
          Create Post
        </Button>
      </div>
    </>
  );
};

export default SearchAndAction;
