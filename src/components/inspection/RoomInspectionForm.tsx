
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, ChevronRight, ImagePlus } from "lucide-react";
import type { Room, InspectionItem } from "@/types/api";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface RoomInspectionFormProps {
  rooms?: Room[];
}

const commonIssues = [
  "Slitage utöver normal förslitning",
  "Fuktskada",
  "Färgsläpp/tapetsläpp",
  "Spricka",
  "Trasigt handtag/beslag",
  "Skada i ytskikt",
  "Funktionsfel",
  "Saknas helt",
  "Felaktig installation",
  "Rengöringsbehov"
];

const getInitialInspectionItems = () => ({
  floor: [
    { id: "f1", type: "floor", name: "Parkettgolv", condition: "good", notes: "" },
    { id: "f2", type: "floor", name: "Trösklar", condition: "good", notes: "" }
  ],
  wall: [
    { id: "w1", type: "wall", name: "Väggar", condition: "good", notes: "" },
    { id: "w2", type: "wall", name: "Tapeter", condition: "good", notes: "" }
  ],
  ceiling: [
    { id: "c1", type: "ceiling", name: "Innertak", condition: "good", notes: "" }
  ],
  appliance: [
    { id: "a1", type: "appliance", name: "Kylskåp", condition: "good", notes: "" },
    { id: "a2", type: "appliance", name: "Spis", condition: "good", notes: "" }
  ]
});

export const RoomInspectionForm = ({ rooms }: RoomInspectionFormProps) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [customNote, setCustomNote] = useState("");
  const [approvedRooms, setApprovedRooms] = useState<Set<string>>(new Set());
  const [roomInspectionItems, setRoomInspectionItems] = useState<Record<string, Record<string, InspectionItem[]>>>({});

  const handleRoomApproval = (roomId: string) => {
    const newApprovedRooms = new Set(approvedRooms);
    newApprovedRooms.add(roomId);
    setApprovedRooms(newApprovedRooms);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Bild uppladdad:", file.name);
      // Här skulle vi normalt hantera bilduppladdningen
    }
  };

  const handleRoomSelection = (roomId: string) => {
    setSelectedRoomId(roomId);
    // Säkerställ att rummet har inspektionsdata
    setRoomInspectionItems(prev => {
      if (!prev[roomId]) {
        return {
          ...prev,
          [roomId]: getInitialInspectionItems()
        };
      }
      return prev;
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Rum att besiktiga</h3>
      <div className="grid gap-4">
        {rooms?.map((room) => (
          <div
            key={room.id}
            className="border rounded-lg p-4 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{room.name || room.code}</h4>
                <p className="text-sm text-muted-foreground">
                  {room.roomType?.name || "Typ ej specificerad"}
                </p>
                {approvedRooms.has(room.id) && (
                  <Badge className="mt-2 bg-green-500">
                    <Check className="mr-1 h-3 w-3" /> Godkänt
                  </Badge>
                )}
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => handleRoomSelection(room.id)}
                >
                  Detaljerad besiktning
                  <ChevronRight className="h-4 w-4" />
                </Button>
                {!approvedRooms.has(room.id) && (
                  <Button
                    variant="secondary"
                    className="gap-2"
                    onClick={() => handleRoomApproval(room.id)}
                  >
                    <Check className="h-4 w-4" />
                    Godkänn rum
                  </Button>
                )}
              </div>
            </div>
            
            {selectedRoomId === room.id && roomInspectionItems[room.id] && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {Object.entries(roomInspectionItems[room.id]).map(([category, items]) => (
                    <InspectionCategory 
                      key={category}
                      title={
                        category === 'floor' ? 'Golv' :
                        category === 'wall' ? 'Väggar' :
                        category === 'ceiling' ? 'Tak' :
                        'Vitvaror'
                      }
                      items={items}
                      onItemClick={(itemId) => {
                        setSelectedItemId(itemId);
                        setSelectedIssues([]);
                        setCustomNote("");
                      }}
                    />
                  ))}
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedRoomId(null)}
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
        ))}
      </div>

      <Dialog 
        open={selectedItemId !== null} 
        onOpenChange={() => setSelectedItemId(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Registrera anmärkning</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium">Vanliga åtgärder</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {commonIssues.map((issue) => (
                  <div key={issue} className="flex items-center space-x-2">
                    <Checkbox
                      id={`issue-${issue}`}
                      checked={selectedIssues.includes(issue)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedIssues([...selectedIssues, issue]);
                        } else {
                          setSelectedIssues(selectedIssues.filter(i => i !== issue));
                        }
                      }}
                    />
                    <Label htmlFor={`issue-${issue}`}>{issue}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customNote">Övriga anteckningar</Label>
              <Textarea
                id="customNote"
                placeholder="Beskriv anmärkningen..."
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUpload">Lägg till bild</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => document.getElementById("imageUpload")?.click()}
                >
                  <ImagePlus className="h-4 w-4" />
                  Välj bild
                </Button>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setSelectedItemId(null)}
              >
                Avbryt
              </Button>
              <Button
                onClick={() => {
                  console.log("Sparar anmärkning:", {
                    itemId: selectedItemId,
                    issues: selectedIssues,
                    customNote,
                  });
                  setSelectedItemId(null);
                }}
              >
                Spara anmärkning
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface InspectionCategoryProps {
  title: string;
  items: InspectionItem[];
  onItemClick: (itemId: string) => void;
}

const InspectionCategory = ({ title, items, onItemClick }: InspectionCategoryProps) => (
  <div className="space-y-3">
    <h5 className="font-medium">{title}</h5>
    {items.map((item) => (
      <div key={item.id} className="space-y-2">
        <div className="flex justify-between items-center">
          <Button 
            variant="ghost" 
            className="p-0 h-auto hover:bg-transparent hover:underline"
            onClick={() => onItemClick(item.id)}
          >
            {item.name}
          </Button>
          <Badge 
            variant={item.condition === 'good' ? 'secondary' : 'destructive'}
            className="cursor-pointer"
            onClick={() => onItemClick(item.id)}
          >
            {item.condition === 'good' ? 'Godkänt' : 'Anmärkning'}
          </Badge>
        </div>
      </div>
    ))}
  </div>
);
