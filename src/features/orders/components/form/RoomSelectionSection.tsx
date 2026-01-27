
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Room } from "@/types/api";

type RoomSelectionSectionProps = {
  selectedRoom: string;
  setSelectedRoom: (roomId: string) => void;
  availableRooms: Room[];
};

export function RoomSelectionSection({
  selectedRoom,
  setSelectedRoom,
  availableRooms,
}: RoomSelectionSectionProps) {
  if (availableRooms.length === 0) return null;

  return (
    <div className="space-y-2">
      <Label htmlFor="room">Rum</Label>
      <Select value={selectedRoom} onValueChange={setSelectedRoom}>
        <SelectTrigger id="room">
          <SelectValue placeholder="Välj rum" />
        </SelectTrigger>
        <SelectContent>
          {availableRooms.map(room => (
            <SelectItem key={room.id} value={room.id}>
              {room.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
