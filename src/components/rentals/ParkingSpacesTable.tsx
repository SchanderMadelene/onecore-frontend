
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PublishParkingSpacesDialog } from "./PublishParkingSpacesDialog";
import { PublishedParkingTab } from "./tabs/PublishedParkingTab";
import { ReadyForOfferTab } from "./tabs/ReadyForOfferTab";
import { OfferedTab } from "./tabs/OfferedTab";
import { HistoryTab } from "./tabs/HistoryTab";
import { NeedsRepublishTab } from "./tabs/NeedsRepublishTab";

export function ParkingSpacesTable() {
  return (
    <div className="w-full space-y-8">
      <Tabs defaultValue="publicerade" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="publicerade">
            Publicerade
          </TabsTrigger>
          <TabsTrigger value="klaraForErbjudande">
            Klara för erbjudande
          </TabsTrigger>
          <TabsTrigger value="erbjudna">
            Erbjudna
          </TabsTrigger>
          <TabsTrigger value="historik">
            Historik
          </TabsTrigger>
          <TabsTrigger value="behovAvPublicering">
            Behov av publicering
          </TabsTrigger>
        </TabsList>

        <TabsContent value="publicerade">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <PublishParkingSpacesDialog />
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Sök bilplats..." className="pl-9 w-full sm:w-[300px]" />
              </div>
            </div>
            <PublishedParkingTab />
          </div>
        </TabsContent>

        <TabsContent value="klaraForErbjudande">
          <ReadyForOfferTab />
        </TabsContent>

        <TabsContent value="erbjudna">
          <OfferedTab />
        </TabsContent>

        <TabsContent value="historik">
          <HistoryTab />
        </TabsContent>

        <TabsContent value="behovAvPublicering">
          <NeedsRepublishTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
