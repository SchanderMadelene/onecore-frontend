
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <header className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-gradient">Hej [namn] välkommen till OneCORE</h1>
        </header>
      </div>
    </PageLayout>
  );
};

export default Index;
