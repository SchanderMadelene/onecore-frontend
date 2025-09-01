
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus } from "lucide-react";
import { UnpublishedHousingTable } from "./UnpublishedHousingTable";
import { PublishedHousingTable } from "./PublishedHousingTable";
import { OfferedHousingTable } from "./OfferedHousingTable";
import { ReadyForOfferHousingTable } from "./ReadyForOfferHousingTable";
import { ApplicantProfileModal } from "./ApplicantProfileModal";
import { useNavigate, useLocation } from "react-router-dom";
import { MobileTabs } from "@/components/ui/mobile-tabs";
import { useState, useEffect } from "react";

export function HousingSpacesTable() {
  const navigate = useNavigate();
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

  const handleCreateHousingAd = () => {
    navigate('/rentals/create-housing-ad', {
      state: { activeHousingTab: currentTab }
    });
  };

  const tabs = [
    {
      value: "publicerade",
      label: "Publicerade",
      content: (
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Sök publicerad bostad..." className="pl-9 w-full sm:w-[300px]" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2" onClick={handleCreateHousingAd}>
                <UserPlus className="h-4 w-4" />
                Ny bostadsannons
              </Button>
              <ApplicantProfileModal />
            </div>
          </div>
          <PublishedHousingTable />
        </div>
      )
    },
    {
      value: "klaraForErbjudande",
      label: "Klara för erbjudande",
      content: (
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Sök bostad klar för erbjudande..." className="pl-9 w-full sm:w-[300px]" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2" onClick={handleCreateHousingAd}>
                <UserPlus className="h-4 w-4" />
                Ny bostadsannons
              </Button>
              <ApplicantProfileModal />
            </div>
          </div>
          <ReadyForOfferHousingTable />
        </div>
      )
    },
    {
      value: "erbjudna",
      label: "Erbjudna",
      content: (
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Sök erbjuden bostad..." className="pl-9 w-full sm:w-[300px]" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2" onClick={handleCreateHousingAd}>
                <UserPlus className="h-4 w-4" />
                Ny bostadsannons
              </Button>
              <ApplicantProfileModal />
            </div>
          </div>
          <OfferedHousingTable />
        </div>
      )
    },
    {
      value: "historik",
      label: "Historik",
      content: (
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Sök i historik..." className="pl-9 w-full sm:w-[300px]" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2" onClick={handleCreateHousingAd}>
                <UserPlus className="h-4 w-4" />
                Ny bostadsannons
              </Button>
              <ApplicantProfileModal />
            </div>
          </div>
          <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
            <div className="text-center">
              <p>Ingen historik</p>
            </div>
          </div>
        </div>
      )
    },
    {
      value: "behovAvPublicering",
      label: "Behov av publicering",
      content: (
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Sök opublicerad bostad..." className="pl-9 w-full sm:w-[300px]" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2" onClick={handleCreateHousingAd}>
                <UserPlus className="h-4 w-4" />
                Ny bostadsannons
              </Button>
              <ApplicantProfileModal />
            </div>
          </div>
          <UnpublishedHousingTable />
        </div>
      )
    }
  ];

  return (
    <div className="w-full space-y-8">
      <MobileTabs 
        value={currentTab} 
        onValueChange={setCurrentTab}
        tabs={tabs}
      />
    </div>
  );
}
