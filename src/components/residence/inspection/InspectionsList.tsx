import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { InspectionTabs } from "./form/InspectionTabs";
import { RoomCard } from "./room-view/RoomCard";
import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType } from "./types";
import { useToast } from "@/components/ui/use-toast";
import { Home } from "lucide-react";
import { Link, useParams } from "react-router-dom";

interface InspectionsListProps {
  rooms: Room[];
  apartmentInfo?: {
    address: string;
    hasMainKey: boolean;
  };
}

export function InspectionsList({ 
  rooms,
  apartmentInfo
}: InspectionsListProps) {
  const { toast } = useToast();
  const { id } = useParams();
  const [inspectorName, setInspectorName] = useState<string>("");
  const [expandedRoomIds, setExpandedRoomIds] = useState<string[]>([]);
  const [currentInspection, setCurrentInspection] = useState<{
    inspectorName: string;
    rooms: Record<string, InspectionRoomType>;
  } | null>(null);
  
  useEffect(() => {
    // Load existing inspection data from localStorage on component mount
    const storedInspection = localStorage.getItem(`inspectionData-${id}`);
    if (storedInspection) {
      setCurrentInspection(JSON.parse(storedInspection));
    }
  }, [id]);

  useEffect(() => {
    // Save inspection data to localStorage whenever it changes
    if (currentInspection) {
      localStorage.setItem(`inspectionData-${id}`, JSON.stringify(currentInspection));
    }
  }, [currentInspection, id]);

  const handleToggleRoom = (roomId: string) => {
    setExpandedRoomIds(prev =>
      prev.includes(roomId) ? prev.filter(id => id !== roomId) : [...prev, roomId]
    );
  };

  const handleStartInspection = () => {
    if (!inspectorName) {
      toast({
        title: "Välj besiktningsman",
        description: "Du måste välja en besiktningsman för att starta en besiktning.",
      });
      return;
    }

    const initialRoomsData: Record<string, InspectionRoomType> = rooms.reduce((acc: Record<string, InspectionRoomType>, room) => {
      acc[room.id] = {
        roomId: room.id,
        conditions: {
          wall1: "",
          wall2: "",
          wall3: "",
          wall4: "",
          floor: "",
          ceiling: "",
          details: ""
        },
        actions: {
          wall1: [],
          wall2: [],
          wall3: [],
          wall4: [],
          floor: [],
          ceiling: [],
          details: []
        },
        componentNotes: {
          wall1: "",
          wall2: "",
          wall3: "",
          wall4: "",
          floor: "",
          ceiling: "",
          details: ""
        },
        photos: [],
        isApproved: false,
        isHandled: false
      };
      return acc;
    }, {});

    setCurrentInspection({
      inspectorName: inspectorName,
      rooms: initialRoomsData,
    });
  };

  const handleSave = (inspectorName: string, rooms: Record<string, InspectionRoomType>) => {
    setCurrentInspection({
      inspectorName: inspectorName,
      rooms: rooms,
    });
    toast({
      title: "Besiktning sparad",
      description: "Besiktningen har sparats i webbläsaren.",
    });
  };

  return (
    <div className="w-full space-y-4">
      <div className="w-full">
        <Button 
          variant="outline" 
          asChild
        >
          <Link to={`/`}>
            <Home className="h-4 w-4 mr-2" />
            Tillbaka till översikten
          </Link>
        </Button>
      </div>

      <InspectionTabs
        inspectorName={inspectorName}
        setInspectorName={setInspectorName}
        apartmentInfo={apartmentInfo}
        rooms={rooms}
        expandedRoomIds={expandedRoomIds}
        inspectionData={currentInspection?.rooms || {}}
        onToggleRoom={handleToggleRoom}
        onConditionUpdate={(roomId, field, value) => {
          setCurrentInspection(prev => {
            if (!prev) return prev;
            return {
              ...prev,
              rooms: {
                ...prev.rooms,
                [roomId]: {
                  ...prev.rooms[roomId],
                  conditions: {
                    ...prev.rooms[roomId].conditions,
                    [field]: value
                  }
                }
              }
            };
          });
        }}
        onActionUpdate={(roomId, field, action) => {
          setCurrentInspection(prev => {
            if (!prev) return prev;
            return {
              ...prev,
              rooms: {
                ...prev.rooms,
                [roomId]: {
                  ...prev.rooms[roomId],
                  actions: {
                    ...prev.rooms[roomId].actions,
                    [field]: [action]
                  }
                }
              }
            };
          });
        }}
        onComponentNoteUpdate={(roomId, field, note) => {
          setCurrentInspection(prev => {
            if (!prev) return prev;
            return {
              ...prev,
              rooms: {
                ...prev.rooms,
                [roomId]: {
                  ...prev.rooms[roomId],
                  componentNotes: {
                    ...prev.rooms[roomId].componentNotes,
                    [field]: note
                  }
                }
              }
            };
          });
        }}
      />

      <div className="space-y-3">
        {rooms.map(room => (
          <RoomCard
            key={room.id}
            room={room}
            isExpanded={expandedRoomIds.includes(room.id)}
            onToggle={() => handleToggleRoom(room.id)}
            currentInspection={currentInspection}
            onStartInspection={handleStartInspection}
            onSave={handleSave}
          />
        ))}
      </div>
    </div>
  );
}
