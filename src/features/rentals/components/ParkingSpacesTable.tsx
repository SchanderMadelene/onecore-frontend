
import { useSearchParams } from "react-router-dom";
import { PublishedParkingTab } from "./tabs/PublishedParkingTab";
import { ReadyForOfferTab } from "./tabs/ReadyForOfferTab";
import { OfferedTab } from "./tabs/OfferedTab";
import { HistoryTab } from "./tabs/HistoryTab";
import { NeedsRepublishTab } from "./tabs/NeedsRepublishTab";
import { MobileTabs } from "@/components/ui/mobile-tabs";
import { useParkingSpaceListingsByType } from "../hooks/useParkingSpaceListingsByType";
import { useStorageSpaceListingsByType } from "../hooks/useStorageSpaceListingsByType";
import type { AssetType } from "../utils/asset-config";

interface Props {
  assetType?: AssetType;
}

export function ParkingSpacesTable({ assetType = "parking" }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSubTab = searchParams.get("subtab") || "publicerade";
  const isStorage = assetType === "storage";

  const useByType = isStorage ? useStorageSpaceListingsByType : useParkingSpaceListingsByType;
  const published = useByType("published");
  const ready = useByType("ready-for-offer");
  const offered = useByType("offered");
  const republish = useByType("needs-republish");

  const handleSubTabChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("subtab", value);
    setSearchParams(newParams);
  };

  const cnt = (n?: number) => (typeof n === "number" ? ` (${n})` : "");

  const tabs = [
    {
      value: "publicerade",
      label: `Publicerade${cnt(published.data?.length)}`,
      content: <PublishedParkingTab assetType={assetType} />,
    },
    {
      value: "klaraForErbjudande",
      label: `Klara för erbjudande${cnt(ready.data?.length)}`,
      content: <ReadyForOfferTab assetType={assetType} />,
    },
    {
      value: "erbjudna",
      label: `Erbjudna${cnt(offered.data?.length)}`,
      content: <OfferedTab assetType={assetType} />,
    },
    {
      value: "historik",
      label: "Historik",
      content: <HistoryTab assetType={assetType} />,
    },
    {
      value: "behovAvPublicering",
      label: `Behov av publicering${cnt(republish.data?.length)}`,
      content: <NeedsRepublishTab assetType={assetType} />,
    },
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
