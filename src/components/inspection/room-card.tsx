
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronRight } from "lucide-react";
import type { Room } from "@/types/api";
import { InspectionCategories } from "./inspection-categories";
import { useRoomInspection } from "./use-room-inspection";

interface RoomCardProps {
  room: Room;
  isApproved: boolean;
  onApprove: () => void;
  onSelectItem: (itemId: string) => void;
}

export const RoomCard = ({ 
  room, 
  isApproved, 
  onApprove, 
  onSelectItem 
}: RoomCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { inspectionItems, initializeRoom } = useRoomInspection();

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{room.name || room.code}</h4>
          <p className="text-sm text-muted-foreground">
            {room.roomType?.name || "Typ ej specificerad"}
          </p>
          {isApproved && (
            <Badge className="mt-2 bg-green-500">
              <Check className="mr-1 h-3 w-3" /> Godkänt
            </Badge>
          )}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => {
              setIsExpanded(!isExpanded);
              if (!isExpanded) {
                initializeRoom(room.id);
              }
            }}
          >
            Detaljerad besiktning
            <ChevronRight className="h-4 w-4" />
          </Button>
          {!isApproved && (
            <Button
              variant="secondary"
              className="gap-2"
              onClick={onApprove}
            >
              <Check className="h-4 w-4" />
              Godkänn rum
            </Button>
          )}
        </div>
      </div>
      
      {isExpanded && inspectionItems[room.id] && (
        <div className="space-y-4">
          <InspectionCategories
            items={inspectionItems[room.id]}
            onItemClick={onSelectItem}
          />
          
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsExpanded(false)}
            >
              Stäng
            </Button>
            <Button
              onClick={() => console.log("Sparar rumsbesiktning")}
            >
              Spara
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
