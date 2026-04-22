
import { useSearchParams } from "react-router-dom";
import { PublishedParkingTab } from "./tabs/PublishedParkingTab";
import { ReadyForOfferTab } from "./tabs/ReadyForOfferTab";
import { OfferedTab } from "./tabs/OfferedTab";
import { HistoryTab } from "./tabs/HistoryTab";
import { NeedsRepublishTab } from "./tabs/NeedsRepublishTab";
import { MobileTabs } from "@/components/ui/mobile-tabs";

export function ParkingSpacesTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSubTab = searchParams.get("subtab") || "publicerade";

  const handleSubTabChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("subtab", value);
    setSearchParams(newParams);
  };

  const tabs = [
    { value: "publicerade", label: "Publicerade", content: <PublishedParkingTab assetType="parking" /> },
    { value: "klaraForErbjudande", label: "Klara för erbjudande", content: <ReadyForOfferTab assetType="parking" /> },
    { value: "erbjudna", label: "Erbjudna", content: <OfferedTab assetType="parking" /> },
    { value: "historik", label: "Historik", content: <HistoryTab assetType="parking" /> },
    { value: "behovAvPublicering", label: "Behov av publicering", content: <NeedsRepublishTab assetType="parking" /> },
  ];

  return (
    <div className="w-full space-y-8">
      <MobileTabs 
        value={currentSubTab} 
        onValueChange={handleSubTabChange}
        tabs={tabs}
      />
    </div>
  );
}
