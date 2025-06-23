
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
          <PublishedParkingTab />
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
