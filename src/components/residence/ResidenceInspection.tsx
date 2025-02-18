
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Camera, Plus, Wrench, PaintRoller, Hammer } from "lucide-react";
import type { Room } from "@/types/api";

interface InspectionRoom {
  roomId: string;
  conditions: {
    walls: string;
    floor: string;
    ceiling: string;
    details: string;
  };
  actions: {
    walls: string[];
    floor: string[];
    ceiling: string[];
    details: string[];
  };
  notes: string;
  photos: string[];
}

interface ResidenceInspectionProps {
  rooms: Room[];
}

export const ResidenceInspection = ({ rooms }: ResidenceInspectionProps) => {
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);
  const [inspectionData, setInspectionData] = useState<Record<string, InspectionRoom>>({});
  const [startedInspection, setStartedInspection] = useState(false);
  
  const handleStartInspection = () => {
    setStartedInspection(true);
    const initialData: Record<string, InspectionRoom> = {};
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
        notes: "",
        photos: []
      };
    });
    setInspectionData(initialData);
  };

  const handleConditionUpdate = (
    roomId: string,
    field: keyof InspectionRoom["conditions"],
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
          [field]: [] // Återställ åtgärder när tillståndet ändras
        }
      }
    }));
  };

  const handleActionUpdate = (
    roomId: string,
    field: keyof InspectionRoom["actions"],
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

  const handleNotesUpdate = (roomId: string, notes: string) => {
    setInspectionData(prev => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        notes
      }
    }));
  };

  const handleSaveInspection = () => {
    console.log("Sparar besiktning:", inspectionData);
  };

  const needsAction = (condition: string) => {
    return condition === "needs_attention" || condition === "damaged";
  };

  if (!startedInspection) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Besiktning</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-4">Ingen aktiv besiktning</h3>
            <p className="text-muted-foreground mb-6">
              Starta en ny besiktning för att dokumentera lägenhetens skick
            </p>
            <Button onClick={handleStartInspection}>
              <Plus className="mr-2 h-4 w-4" />
              Starta ny besiktning
            </Button>
          </div>
        </CardContent>
      </Card>
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
            <div key={room.id} className="border rounded-lg">
              <button
                className="w-full bg-card hover:bg-accent/50 p-4 flex items-center justify-between text-left"
                onClick={() => setExpandedRoomId(expandedRoomId === room.id ? null : room.id)}
              >
                <span className="font-medium">{room.name || room.roomType?.name || room.code}</span>
                {expandedRoomId === room.id ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>

              {expandedRoomId === room.id && (
                <div className="p-4 border-t space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Väggar</label>
                      <select 
                        className="w-full border rounded-md p-2 mt-1"
                        value={inspectionData[room.id]?.conditions.walls}
                        onChange={(e) => handleConditionUpdate(room.id, "walls", e.target.value)}
                      >
                        <option value="">Välj skick</option>
                        <option value="good">Bra skick</option>
                        <option value="acceptable">Acceptabelt</option>
                        <option value="needs_attention">Behöver åtgärd</option>
                        <option value="damaged">Skadat</option>
                      </select>
                      {needsAction(inspectionData[room.id]?.conditions.walls) && (
                        <div className="mt-2 flex gap-2">
                          <Button
                            size="sm"
                            variant={inspectionData[room.id]?.actions.walls.includes("painting") ? "default" : "outline"}
                            onClick={() => handleActionUpdate(room.id, "walls", "painting")}
                          >
                            <PaintRoller className="h-4 w-4 mr-1" />
                            Målning
                          </Button>
                          <Button
                            size="sm"
                            variant={inspectionData[room.id]?.actions.walls.includes("repair") ? "default" : "outline"}
                            onClick={() => handleActionUpdate(room.id, "walls", "repair")}
                          >
                            <Wrench className="h-4 w-4 mr-1" />
                            Reparation
                          </Button>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium">Golv</label>
                      <select 
                        className="w-full border rounded-md p-2 mt-1"
                        value={inspectionData[room.id]?.conditions.floor}
                        onChange={(e) => handleConditionUpdate(room.id, "floor", e.target.value)}
                      >
                        <option value="">Välj skick</option>
                        <option value="good">Bra skick</option>
                        <option value="acceptable">Acceptabelt</option>
                        <option value="needs_attention">Behöver åtgärd</option>
                        <option value="damaged">Skadat</option>
                      </select>
                      {needsAction(inspectionData[room.id]?.conditions.floor) && (
                        <div className="mt-2 flex gap-2">
                          <Button
                            size="sm"
                            variant={inspectionData[room.id]?.actions.floor.includes("repair") ? "default" : "outline"}
                            onClick={() => handleActionUpdate(room.id, "floor", "repair")}
                          >
                            <Wrench className="h-4 w-4 mr-1" />
                            Reparation
                          </Button>
                          <Button
                            size="sm"
                            variant={inspectionData[room.id]?.actions.floor.includes("replacement") ? "default" : "outline"}
                            onClick={() => handleActionUpdate(room.id, "floor", "replacement")}
                          >
                            <Hammer className="h-4 w-4 mr-1" />
                            Byte
                          </Button>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium">Tak</label>
                      <select 
                        className="w-full border rounded-md p-2 mt-1"
                        value={inspectionData[room.id]?.conditions.ceiling}
                        onChange={(e) => handleConditionUpdate(room.id, "ceiling", e.target.value)}
                      >
                        <option value="">Välj skick</option>
                        <option value="good">Bra skick</option>
                        <option value="acceptable">Acceptabelt</option>
                        <option value="needs_attention">Behöver åtgärd</option>
                        <option value="damaged">Skadat</option>
                      </select>
                      {needsAction(inspectionData[room.id]?.conditions.ceiling) && (
                        <div className="mt-2 flex gap-2">
                          <Button
                            size="sm"
                            variant={inspectionData[room.id]?.actions.ceiling.includes("painting") ? "default" : "outline"}
                            onClick={() => handleActionUpdate(room.id, "ceiling", "painting")}
                          >
                            <PaintRoller className="h-4 w-4 mr-1" />
                            Målning
                          </Button>
                          <Button
                            size="sm"
                            variant={inspectionData[room.id]?.actions.ceiling.includes("repair") ? "default" : "outline"}
                            onClick={() => handleActionUpdate(room.id, "ceiling", "repair")}
                          >
                            <Wrench className="h-4 w-4 mr-1" />
                            Reparation
                          </Button>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium">Detaljer</label>
                      <select 
                        className="w-full border rounded-md p-2 mt-1"
                        value={inspectionData[room.id]?.conditions.details}
                        onChange={(e) => handleConditionUpdate(room.id, "details", e.target.value)}
                      >
                        <option value="">Välj skick</option>
                        <option value="good">Bra skick</option>
                        <option value="acceptable">Acceptabelt</option>
                        <option value="needs_attention">Behöver åtgärd</option>
                        <option value="damaged">Skadat</option>
                      </select>
                      {needsAction(inspectionData[room.id]?.conditions.details) && (
                        <div className="mt-2 flex gap-2">
                          <Button
                            size="sm"
                            variant={inspectionData[room.id]?.actions.details.includes("repair") ? "default" : "outline"}
                            onClick={() => handleActionUpdate(room.id, "details", "repair")}
                          >
                            <Wrench className="h-4 w-4 mr-1" />
                            Reparation
                          </Button>
                          <Button
                            size="sm"
                            variant={inspectionData[room.id]?.actions.details.includes("replacement") ? "default" : "outline"}
                            onClick={() => handleActionUpdate(room.id, "details", "replacement")}
                          >
                            <Hammer className="h-4 w-4 mr-1" />
                            Byte
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Anteckningar</label>
                    <textarea
                      className="w-full border rounded-md p-2 mt-1"
                      rows={3}
                      value={inspectionData[room.id]?.notes}
                      onChange={(e) => handleNotesUpdate(room.id, e.target.value)}
                      placeholder="Skriv eventuella kommentarer eller noteringar här..."
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">Foton</label>
                    <Button variant="outline">
                      <Camera className="mr-2 h-4 w-4" />
                      Lägg till foto
                    </Button>
                  </div>
                </div>
              )}
            </div>
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
