
import { useState } from "react";
import { toast } from "sonner";
import type { Room } from "@/types/api";
import { InspectionStart } from "./inspection/InspectionStart";
import { InspectionHistory } from "./inspection/InspectionHistory";
import type { InspectionRoom as InspectionRoomType, Inspection } from "./inspection/types";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Circle } from "lucide-react";

interface ResidenceInspectionProps {
  rooms: Room[];
}

// Simulera lokal lagring av besiktningar
const LOCAL_STORAGE_KEY = "inspections";

const loadInspections = (): Inspection[] => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

const saveInspections = (inspections: Inspection[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(inspections));
};

export const ResidenceInspection = ({ rooms }: ResidenceInspectionProps) => {
  const [inspectionHistory, setInspectionHistory] = useState<Inspection[]>(loadInspections);
  const [currentInspection, setCurrentInspection] = useState<{
    inspectorName: string;
    rooms: Record<string, InspectionRoomType>;
  } | null>(null);

  const handleLoadInspection = (inspection: Inspection) => {
    setCurrentInspection({
      inspectorName: inspection.inspectedBy,
      rooms: inspection.rooms
    });
    toast.success("Besiktning laddad");
  };

  const handleSaveInspection = (inspectorName: string, inspectionData: Record<string, InspectionRoomType>) => {
    const newInspection: Inspection = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      inspectedBy: inspectorName,
      rooms: inspectionData
    };

    const updatedHistory = [newInspection, ...inspectionHistory];
    setInspectionHistory(updatedHistory);
    saveInspections(updatedHistory);
    setCurrentInspection(null);
    
    toast.success("Besiktningen har sparats");
  };

  const getInspectionProgress = () => {
    if (!currentInspection) return null;

    const roomProgress = rooms.map(room => {
      const inspection = currentInspection.rooms[room.id];
      if (!inspection) return { room, status: "not-started" as const };

      const conditions = Object.values(inspection.conditions);
      const isComplete = conditions.every(c => c !== "");
      const isApproved = conditions.every(c => c === "good" || c === "acceptable");
      const hasStarted = conditions.some(c => c !== "");

      if (isApproved) return { room, status: "approved" as const };
      if (isComplete) return { room, status: "needs-action" as const };
      if (hasStarted) return { room, status: "in-progress" as const };
      return { room, status: "not-started" as const };
    });

    const total = roomProgress.length;
    const completed = roomProgress.filter(r => 
      r.status === "approved" || r.status === "needs-action"
    ).length;
    const approved = roomProgress.filter(r => r.status === "approved").length;
    const inProgress = roomProgress.filter(r => r.status === "in-progress").length;

    return {
      rooms: roomProgress,
      progress: (completed / total) * 100,
      stats: { total, completed, approved, inProgress }
    };
  };

  const progress = getInspectionProgress();

  return (
    <div className="space-y-6">
      <InspectionHistory 
        inspections={inspectionHistory}
        onLoadInspection={handleLoadInspection}
      />
      
      {currentInspection ? (
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Pågående besiktning</CardTitle>
                <span className="text-sm text-muted-foreground">
                  Besiktningsman: {currentInspection.inspectorName}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              {progress && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="grid gap-1">
                      <div className="font-medium">Totalt framsteg</div>
                      <div className="text-muted-foreground">
                        {progress.stats.completed} av {progress.stats.total} rum klara
                      </div>
                    </div>
                    <div>{Math.round(progress.progress)}%</div>
                  </div>
                  <Progress value={progress.progress} className="h-2" />
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        {progress.stats.approved} rum godkända
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                      <span className="text-sm">
                        {progress.stats.completed - progress.stats.approved} rum behöver åtgärd
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Circle className="h-4 w-4 text-blue-500 fill-current" />
                      <span className="text-sm">
                        {progress.stats.inProgress} rum påbörjade
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Circle className="h-4 w-4 text-gray-300" />
                      <span className="text-sm">
                        {progress.stats.total - progress.stats.completed - progress.stats.inProgress} rum ej påbörjade
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <InspectionStart
          rooms={rooms}
          onSave={handleSaveInspection}
        />
      )}
    </div>
  );
};
