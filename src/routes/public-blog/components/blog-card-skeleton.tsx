import { Skeleton } from "@/components/ui";
import { Card, CardContent } from "@/components/ui/card";
import { getRandomInt } from "@/lib/utils";

export function BlogCardSkeleton() {
  return (
    <Card className="w-full border-border bg-card flex-none">
      <CardContent className="p-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-2 px-2 mt-2">
          <div className="flex items-center gap-3">
            <div>
              <Skeleton className="h-8 w-32" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="block px-2">
          <div className="mb-2 flex flex-col gap-1">
            <Skeleton
              className="h-6"
              style={{
                width: `${getRandomInt(30, 100)}%`,
              }}
              aria-hidden="true"
            />
            <Skeleton
              className="h-6"
              style={{
                width: `${getRandomInt(30, 100)}%`,
              }}
              aria-hidden="true"
            />
            <Skeleton
              className="h-6"
              style={{
                width: `${getRandomInt(30, 100)}%`,
              }}
              aria-hidden="true"
            />
            <Skeleton
              className="h-6"
              style={{
                width: `${getRandomInt(30, 100)}%`,
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
