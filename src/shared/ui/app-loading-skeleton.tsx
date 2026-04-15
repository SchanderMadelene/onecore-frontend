
import { Skeleton } from "@/shared/ui/skeleton";

export function AppLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar skeleton */}
      <div className="h-14 border-b bg-background fixed top-0 w-full z-50 flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-8 w-8 rounded lg:hidden" />
          <Skeleton className="h-7 w-28 rounded" />
        </div>
        <Skeleton className="h-9 w-64 rounded-md hidden sm:block" />
        <div className="flex items-center space-x-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      {/* Body */}
      <div className="flex h-[calc(100vh-3.5rem)] mt-14">
        {/* Sidebar skeleton – hidden on mobile */}
        <aside className="hidden lg:block w-[320px] border-r bg-background p-4 space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-3" style={{ paddingLeft: `${(i % 3) * 16}px` }}>
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 rounded" style={{ width: `${100 - (i % 3) * 20}px` }} />
            </div>
          ))}
        </aside>

        {/* Content skeleton */}
        <main className="flex-1 p-4 sm:p-6 space-y-6 overflow-hidden">
          <Skeleton className="h-8 w-48 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((n) => (
              <div key={n} className="rounded-lg border bg-card p-6 space-y-4">
                <Skeleton className="h-5 w-2/3 rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-3/4 rounded" />
              </div>
            ))}
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <Skeleton className="h-5 w-1/3 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-2/3 rounded" />
          </div>
        </main>
      </div>
    </div>
  );
}
