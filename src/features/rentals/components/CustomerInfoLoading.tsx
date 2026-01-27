
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export const CustomerInfoLoading = () => (
  <Card className="bg-accent/50 mt-4">
    <CardContent className="pt-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-64" />
          <Skeleton className="h-3 w-56" />
        </div>
        <Skeleton className="h-6 w-20" />
      </div>
    </CardContent>
  </Card>
);
