

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { UnpublishedHousingTable } from "./UnpublishedHousingTable";
import { PublishedHousingTable } from "./PublishedHousingTable";
import { OfferedHousingTable } from "./OfferedHousingTable";
import { ContractHousingTable } from "./ContractHousingTable";
import { ReadyForOfferHousingTable } from "./ReadyForOfferHousingTable";
import { HistoryHousingTable } from "./HistoryHousingTable";
import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useHousingStatus } from "../hooks/useHousingStatus";
import { publishedHousingSpaces } from "../data/published-housing";
import { unpublishedHousingSpaces } from "../data/unpublished-housing";

function HousingTabToolbar({
  placeholder,
}: {
  placeholder: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder={placeholder} className="pl-9 w-full sm:w-[300px]" />
      </div>
    </div>
  );
}

export function HousingSpacesTable() {
  
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState("publicerade");

  // Handle navigation from offer creation
  useEffect(() => {
    if (location.state?.activeHousingTab) {
      setCurrentTab(location.state.activeHousingTab);
      // Clear the state to prevent it from persisting
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);



  const { filterHousingByStatus } = useHousingStatus();

  const counts = {
    behovAvPublicering: unpublishedHousingSpaces.length,
    publicerade: filterHousingByStatus(publishedHousingSpaces, 'published').length,
    klaraForErbjudande: filterHousingByStatus(publishedHousingSpaces, 'ready_for_offer').length,
    erbjudna: filterHousingByStatus(publishedHousingSpaces, 'offered').length,
    kontrakt: filterHousingByStatus(publishedHousingSpaces, 'contract').length,
  };

  const tabs = [
    {
      value: "behovAvPublicering",
      label: `Publicera (${counts.behovAvPublicering})`,
      content: (
        <div className="flex flex-col space-y-4">
          <HousingTabToolbar placeholder="Sök opublicerad bostad..." />
          <UnpublishedHousingTable />
        </div>
      )
    },
    {
      value: "publicerade",
      label: `Publicerat nu (${counts.publicerade})`,
      content: (
        <div className="flex flex-col space-y-4">
          <HousingTabToolbar placeholder="Sök publicerad bostad..." />
          <PublishedHousingTable />
        </div>
      )
    },
    {
      value: "klaraForErbjudande",
      label: `Erbjud visning (${counts.klaraForErbjudande})`,
      content: (
        <div className="flex flex-col space-y-4">
          <HousingTabToolbar placeholder="Sök bostad klar för erbjudande..." />
          <ReadyForOfferHousingTable />
        </div>
      )
    },
    {
      value: "erbjudna",
      label: `Visning (${counts.erbjudna})`,
      content: (
        <div className="flex flex-col space-y-4">
          <HousingTabToolbar placeholder="Sök erbjuden bostad..." />
          <OfferedHousingTable />
        </div>
      )
    },
    {
      value: "kontrakt",
      label: `Erbjud kontrakt (${counts.kontrakt})`,
      content: (
        <div className="flex flex-col space-y-4">
          <HousingTabToolbar placeholder="Sök bostad för kontrakt..." />
          <ContractHousingTable />
        </div>
      )
    },
    {
      value: "historik",
      label: "Historik",
      content: (
        <div className="flex flex-col space-y-4">
          <HousingTabToolbar placeholder="Sök i historik..." />
          <HistoryHousingTable />
        </div>
      )
    }
  ];

  return (
    <div className="w-full space-y-8">
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid mb-8 min-h-[44px]" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="min-h-[40px] px-2 text-xs sm:text-sm sm:px-3">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
