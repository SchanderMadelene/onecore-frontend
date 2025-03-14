
import { useParams } from "react-router-dom";
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";

const PropertyPage = () => {
  const { city, district } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-2">
          {city && district 
            ? `${city.charAt(0).toUpperCase() + city.slice(1)} - ${district.charAt(0).toUpperCase() + district.slice(1)}`
            : "Fastigheter"}
        </h1>
        <p className="text-muted-foreground mb-6">
          Information om fastigheter i {district}, {city}.
        </p>
      </div>
    </PageLayout>
  );
};

export default PropertyPage;
