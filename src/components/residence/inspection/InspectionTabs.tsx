
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicInformation } from "./BasicInformation";
import type { Room } from "@/types/api";

interface InspectionTabsProps {
  inspectorName: string;
  roomCount: number;
  children: React.ReactNode;
}

export const InspectionTabs = ({ inspectorName, roomCount, children }: InspectionTabsProps) => {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="w-full justify-start bg-background border-b rounded-none px-0">
        <TabsTrigger value="basic" className="text-base data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
          Grundläggande info
        </TabsTrigger>
        <TabsTrigger value="protocol" className="text-base data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
          Protokoll
        </TabsTrigger>
        <TabsTrigger value="floorplan" className="text-base data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
          Planritning
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="basic" className="mt-6">
        <BasicInformation 
          inspectorName={inspectorName}
          roomCount={roomCount}
        />
      </TabsContent>

      <TabsContent value="protocol" className="mt-6">
        {children}
      </TabsContent>

      <TabsContent value="floorplan" className="mt-6">
        <div className="flex items-center justify-center h-[400px] border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">Planritning är inte tillgänglig</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};
