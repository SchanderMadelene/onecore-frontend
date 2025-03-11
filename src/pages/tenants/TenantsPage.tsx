
import { useParams } from "react-router-dom";
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";

const TenantsPage = () => {
  const { type } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-2">
          {type === "companies" ? "Företagshyresgäster" : "Privata hyresgäster"}
        </h1>
        <p className="text-muted-foreground mb-6">
          Information om {type === "companies" ? "företagshyresgäster" : "privata hyresgäster"}.
        </p>
      </div>
    </PageLayout>
  );
};

export default TenantsPage;
