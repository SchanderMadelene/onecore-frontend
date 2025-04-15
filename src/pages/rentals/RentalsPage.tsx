
import { PageLayout } from "@/components/layout/PageLayout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RentalsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-6">Uthyrning</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Uthyrningsöversikt</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Här kommer uthyrningsinformation att visas.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default RentalsPage;
