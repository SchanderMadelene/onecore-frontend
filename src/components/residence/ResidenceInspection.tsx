
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import type { Room } from "@/types/api";
import type { Inspection } from "./inspection/types";
import { InspectionsList } from "./inspection/InspectionsList";
import { InspectionHistory } from "./inspection/InspectionHistory";

interface ResidenceInspectionProps {
  rooms: Room[];
}

const LOCAL_STORAGE_KEY = "inspections";

const loadInspections = (): Inspection[] => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

const saveInspections = (inspections: Inspection[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(inspections));
};

export const ResidenceInspection = ({ rooms }: ResidenceInspectionProps) => {
  const [inspections, setInspections] = useState<Inspection[]>(loadInspections);

  const handleInspectionCreated = () => {
    setInspections(loadInspections());
    toast.success("Besiktningen har skapats");
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Besiktningar</CardTitle>
        <Button size="sm" variant="outline" className="h-8">
          <PlusIcon className="h-4 w-4 mr-2" />
          Skapa besiktning
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="active">Aktiv besiktning</TabsTrigger>
            <TabsTrigger value="history">Besiktningshistorik</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="pt-2">
            <InspectionsList
              rooms={rooms}
              inspections={inspections}
              onInspectionCreated={handleInspectionCreated}
            />
          </TabsContent>
          <TabsContent value="history" className="pt-2">
            <InspectionHistory inspections={inspections} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
