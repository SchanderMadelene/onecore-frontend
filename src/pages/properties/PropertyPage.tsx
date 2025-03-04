
import { useParams } from "react-router-dom";
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";

const PropertyPage = () => {
  const { city, district } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          {city && district 
            ? `${city.charAt(0).toUpperCase() + city.slice(1)} - ${district.charAt(0).toUpperCase() + district.slice(1)}`
            : "Fastigheter"}
        </h1>
        <p className="text-muted-foreground">
          Information om fastigheter i {district}, {city}.
        </p>
      </div>
    </PageLayout>
  );
};

export default PropertyPage;
