import { PageLayout } from "@/layouts";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Car, Home, Archive } from "lucide-react";
import { ParkingSpacesTable, HousingSpacesTable } from "@/features/rentals";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";

type RentalType = "bostad" | "bilplats" | "forrad";

const TYPE_META: Record<RentalType, { title: string; icon: React.ReactNode; toggleKey: keyof ReturnType<typeof useFeatureToggles>["features"] }> = {
  bostad: { title: "Bostad", icon: <Home className="h-5 w-5" />, toggleKey: "showRentalsHousing" },
  bilplats: { title: "Bilplats", icon: <Car className="h-5 w-5" />, toggleKey: "showRentalsParking" },
  forrad: { title: "Förråd", icon: <Archive className="h-5 w-5" />, toggleKey: "showRentalsStorage" },
};

const RentalsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { features } = useFeatureToggles();

  const segment = location.pathname.split("/")[2] as RentalType | undefined;
  const type: RentalType = (segment && segment in TYPE_META) ? segment : "bostad";
  const meta = TYPE_META[type];
  const isEnabled = features[meta.toggleKey];

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/rentals")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold text-muted-foreground">Uthyrning</h2>
        </div>

        <div className="flex items-center gap-3">
          {meta.icon}
          <h1 className="text-3xl font-bold tracking-tight">{meta.title}</h1>
        </div>

        {!isEnabled ? (
          <div className="flex items-center justify-center h-[400px] text-muted-foreground border rounded-md">
            <div className="text-center">
              <p>{meta.title} är inte aktiverad</p>
              <p className="text-sm mt-2">Aktivera sektionen i inställningarna</p>
            </div>
          </div>
        ) : type === "bostad" ? (
          <HousingSpacesTable />
        ) : type === "bilplats" ? (
          <ParkingSpacesTable assetType="parking" />
        ) : (
          <ParkingSpacesTable assetType="storage" />
        )}
      </div>
    </PageLayout>
  );
};

export default RentalsPage;
