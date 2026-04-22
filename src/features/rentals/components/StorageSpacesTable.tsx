import { useSearchParams } from "react-router-dom";
import { PublishedStorageTab } from "./tabs-storage/PublishedStorageTab";
import { ReadyForOfferStorageTab } from "./tabs-storage/ReadyForOfferStorageTab";
import { OfferedStorageTab } from "./tabs-storage/OfferedStorageTab";
import { HistoryStorageTab } from "./tabs-storage/HistoryStorageTab";
import { NeedsRepublishStorageTab } from "./tabs-storage/NeedsRepublishStorageTab";
import { MobileTabs } from "@/components/ui/mobile-tabs";

export function StorageSpacesTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSubTab = searchParams.get("subtab") || "publicerade";

  const handleSubTabChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("subtab", value);
    setSearchParams(newParams);
  };

  const tabs = [
    { value: "publicerade", label: "Publicerade", content: <PublishedStorageTab /> },
    { value: "klaraForErbjudande", label: "Klara för erbjudande", content: <ReadyForOfferStorageTab /> },
    { value: "erbjudna", label: "Erbjudna", content: <OfferedStorageTab /> },
    { value: "historik", label: "Historik", content: <HistoryStorageTab /> },
    { value: "behovAvPublicering", label: "Behov av publicering", content: <NeedsRepublishStorageTab /> },
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
