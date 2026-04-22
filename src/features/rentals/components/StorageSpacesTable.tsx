import { useSearchParams } from "react-router-dom";
import { PublishedParkingTab } from "./tabs/PublishedParkingTab";
import { ReadyForOfferTab } from "./tabs/ReadyForOfferTab";
import { OfferedTab } from "./tabs/OfferedTab";
import { HistoryTab } from "./tabs/HistoryTab";
import { NeedsRepublishTab } from "./tabs/NeedsRepublishTab";
import { MobileTabs } from "@/components/ui/mobile-tabs";

/**
 * Förråd återanvänder samma flikstruktur som bilplats men med egen datakälla
 * och egna etiketter via assetType="storage".
 */
export function StorageSpacesTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSubTab = searchParams.get("subtab") || "publicerade";

  const handleSubTabChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("subtab", value);
    setSearchParams(newParams);
  };

  const tabs = [
    { value: "publicerade", label: "Publicerade", content: <PublishedParkingTab assetType="storage" /> },
    { value: "klaraForErbjudande", label: "Klara för erbjudande", content: <ReadyForOfferTab assetType="storage" /> },
    { value: "erbjudna", label: "Erbjudna", content: <OfferedTab assetType="storage" /> },
    { value: "historik", label: "Historik", content: <HistoryTab assetType="storage" /> },
    { value: "behovAvPublicering", label: "Behov av publicering", content: <NeedsRepublishTab assetType="storage" /> },
  ];

  return (
    <div className="w-full space-y-8">
      <MobileTabs value={currentSubTab} onValueChange={handleSubTabChange} tabs={tabs} />
    </div>
  );
}
