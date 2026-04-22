import { PageLayout } from "@/layouts";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { ParkingSpacesTable, HousingSpacesTable, StorageSpacesTable } from "@/features/rentals";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";
import { RentalsHeader } from "./components/RentalsHeader";
import { RentalsOverview } from "./RentalsOverview";

type RentalsSection = "housing" | "parking" | "storage";

interface RentalsPageProps {
  section?: RentalsSection;
}

const sectionMeta: Record<RentalsSection, { title: string; subtitle: string; toggle: keyof ReturnType<typeof useFeatureToggles>["features"] }> = {
  housing: { title: "Bostad", subtitle: "Hantera bostadsannonser, intresseanmälningar och tilldelning", toggle: "showRentalsHousing" },
  parking: { title: "Bilplats", subtitle: "Hantera bilplatsannonser, intresseanmälningar och tilldelning", toggle: "showRentalsParking" },
  storage: { title: "Förråd", subtitle: "Hantera förrådsannonser, intresseanmälningar och tilldelning", toggle: "showRentalsStorage" },
};

const RentalsPage = ({ section }: RentalsPageProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { features } = useFeatureToggles();

  // Toppnivåsidan /rentals — visa samlingsöversikt
  if (!section) {
    return (
      <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
        <div className="w-full">
          <RentalsHeader />
          <RentalsOverview />
        </div>
      </PageLayout>
    );
  }

  const meta = sectionMeta[section];
  const isEnabled = features[meta.toggle];

  if (!isEnabled) {
    return <Navigate to="/rentals" replace />;
  }

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{meta.title}</h1>
          <p className="text-muted-foreground mt-1">{meta.subtitle}</p>
        </div>

        {section === "housing" && <HousingSpacesTable />}
        {section === "parking" && <ParkingSpacesTable />}
        {section === "storage" && <StorageSpacesTable />}
      </div>
    </PageLayout>
  );
};

export default RentalsPage;
