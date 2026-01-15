import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Underlag
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              Innehåll för ströfaktura underlag kommer här
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
