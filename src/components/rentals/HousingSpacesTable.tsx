
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus } from "lucide-react";
import { UnpublishedHousingTable } from "./UnpublishedHousingTable";
import { useNavigate } from "react-router-dom";
import { MobileTabs } from "@/components/ui/mobile-tabs";
import { useState } from "react";

export function HousingSpacesTable() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("behovAvPublicering");

  const handleCreateProfile = () => {
    navigate('/rentals/residence-profile');
  };

  const tabs = [
    {
      value: "publicerade",
      label: "Publicerade",
      content: (
        <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
          <div className="text-center">
            <p>Inga publicerade bostäder</p>
          </div>
        </div>
      )
    },
    {
      value: "klaraForErbjudande",
      label: "Klara för erbjudande",
      content: (
        <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
          <div className="text-center">
            <p>Inga bostäder klara för erbjudande</p>
          </div>
        </div>
      )
    },
    {
      value: "erbjudna",
      label: "Erbjudna",
      content: (
        <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
          <div className="text-center">
            <p>Inga erbjudna bostäder</p>
          </div>
        </div>
      )
    },
    {
      value: "historik",
      label: "Historik",
      content: (
        <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
          <div className="text-center">
            <p>Ingen historik</p>
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
              <Button variant="outline" className="flex items-center gap-2" onClick={handleCreateProfile}>
                <UserPlus className="h-4 w-4" />
                Ny bostadsannons
              </Button>
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
