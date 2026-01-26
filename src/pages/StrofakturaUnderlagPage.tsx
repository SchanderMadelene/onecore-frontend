import { useState } from "react";
import { PageLayout } from "@/layout/PageLayout";
import { StrofakturaForm } from "@/components/strofaktura/StrofakturaForm";

export default function StrofakturaUnderlagPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Ströfaktura underlag
          </h1>
          <p className="text-muted-foreground">
            Hantera underlag för ströfakturering
          </p>
        </div>

        <StrofakturaForm />
      </div>
    </PageLayout>
  );
}
