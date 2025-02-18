
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Room } from "@/types/api";
import { InspectionStart } from "./inspection/InspectionStart";
import { InspectionRoom } from "./inspection/InspectionRoom";
import { InspectionHistory } from "./inspection/InspectionHistory";
import type { InspectionRoom as InspectionRoomType, Inspection } from "./inspection/types";

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
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);
  const [inspectionData, setInspectionData] = useState<Record<string, InspectionRoomType>>({});
  const [startedInspection, setStartedInspection] = useState(false);
  const [inspectionHistory, setInspectionHistory] = useState<Inspection[]>(loadInspections);

  const handleStartInspection = () => {
    setStartedInspection(true);
    const initialData: Record<string, InspectionRoomType> = {};
    rooms.forEach(room => {
      initialData[room.id] = {
        roomId: room.id,
        conditions: {
          walls: "",
          floor: "",
          ceiling: "",
          details: ""
        },
        actions: {
          walls: [],
          floor: [],
          ceiling: [],
          details: []
        },
        componentNotes: {
          walls: "",
          floor: "",
          ceiling: "",
          details: ""
        },
        photos: []
      };
    });
    setInspectionData(initialData);
  };

  const handleConditionUpdate = (
    roomId: string,
    field: keyof InspectionRoomType["conditions"],
    value: string
  ) => {
    setInspectionData(prev => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        conditions: {
          ...prev[roomId].conditions,
          [field]: value
        },
        actions: {
          ...prev[roomId].actions,
          [field]: []
        }
      }
    }));
  };

  const handleActionUpdate = (
    roomId: string,
    field: keyof InspectionRoomType["actions"],
    action: string
  ) => {
    setInspectionData(prev => {
      const currentActions = prev[roomId].actions[field];
      const newActions = currentActions.includes(action)
        ? currentActions.filter(a => a !== action)
        : [...currentActions, action];

      return {
        ...prev,
        [roomId]: {
          ...prev[roomId],
          actions: {
            ...prev[roomId].actions,
            [field]: newActions
          }
        }
      };
    });
  };

  const handleComponentNoteUpdate = (
    roomId: string,
    field: keyof InspectionRoomType["componentNotes"],
    note: string
  ) => {
    setInspectionData(prev => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        componentNotes: {
          ...prev[roomId].componentNotes,
          [field]: note
        }
      }
    }));
  };

  const handleLoadInspection = (inspection: Inspection) => {
    setInspectionData(inspection.rooms);
    setStartedInspection(true);
    toast.success("Besiktning laddad");
  };

  const handleSaveInspection = () => {
    const newInspection: Inspection = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      inspectedBy: "Test Användare", // Detta skulle komma från inloggad användare
      rooms: inspectionData
    };

    const updatedHistory = [newInspection, ...inspectionHistory];
    setInspectionHistory(updatedHistory);
    saveInspections(updatedHistory);
    
    toast.success("Besiktningen har sparats");
  };

  if (!startedInspection) {
    return (
      <div className="space-y-6">
        <InspectionHistory 
          inspections={inspectionHistory}
          onLoadInspection={handleLoadInspection}
        />
        <InspectionStart onStart={handleStartInspection} />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Besiktning</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rooms.map(room => (
            <InspectionRoom
              key={room.id}
              room={room}
              isExpanded={expandedRoomId === room.id}
              onToggle={() => setExpandedRoomId(expandedRoomId === room.id ? null : room.id)}
              inspectionData={inspectionData[room.id]}
              onConditionUpdate={(field, value) => handleConditionUpdate(room.id, field, value)}
              onActionUpdate={(field, action) => handleActionUpdate(room.id, field, action)}
              onComponentNoteUpdate={(field, note) => handleComponentNoteUpdate(room.id, field, note)}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" onClick={() => setStartedInspection(false)}>
            Avbryt
          </Button>
          <Button onClick={handleSaveInspection}>
            Spara besiktning
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
