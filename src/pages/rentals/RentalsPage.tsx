import { PageLayout } from "@/layouts";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Key } from "lucide-react";
import { ParkingSpacesTable, HousingSpacesTable, StorageSpacesTable } from "@/features/rentals";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";
import { RentalsHeader } from "./components/RentalsHeader";

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

  // Toppnivåsidan /rentals — redirecta till första aktiva sektion
  if (!section) {
    if (features.showRentalsHousing) return <Navigate to="/rentals/housing" replace />;
    if (features.showRentalsParking) return <Navigate to="/rentals/parking" replace />;
    if (features.showRentalsStorage) return <Navigate to="/rentals/storage" replace />;

    return (
      <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
        <div className="w-full">
          <RentalsHeader />
          <div className="flex items-center justify-center h-[400px] text-muted-foreground border rounded-md">
            <div className="text-center">
              <Key className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
              <p>Inga uthyrningssektioner är aktiverade</p>
              <p className="text-sm mt-2">Aktivera bostad, bilplats eller förråd i inställningarna</p>
            </div>
          </div>
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
