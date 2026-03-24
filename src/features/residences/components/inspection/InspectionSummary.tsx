import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Room } from "@/types/api";
import type { InspectionRoom } from "./types";
import { COMPONENT_LABELS, getConditionColor, getConditionLabel, hasRemark, getCostResponsibilityLabel } from "./inspection-utils";

interface InspectionSummaryProps {
  rooms: Room[];
  inspectionData: Record<string, InspectionRoom>;
  onCostUpdate: (roomId: string, costKey: string, value: number | null) => void;
}

interface RemarkItem {
  roomId: string;
  roomName: string;
  componentKey: string;
  label: string;
  condition: string;
  actions: string[];
  note: string;
  costResponsibility: string | null;
  costKey: string;
  cost: number | null;
  isCustomComponent: boolean;
}

function collectRemarks(rooms: Room[], inspectionData: Record<string, InspectionRoom>): RemarkItem[] {
  const remarks: RemarkItem[] = [];

  rooms.forEach(room => {
    const data = inspectionData[room.id];
    if (!data) return;

    // Base components
    const componentKeys = Object.keys(data.conditions) as Array<keyof typeof data.conditions>;
    componentKeys.forEach(key => {
      const condition = data.conditions[key];
      if (hasRemark(condition)) {
        remarks.push({
          roomId: room.id,
          roomName: room.name,
          componentKey: key,
          label: COMPONENT_LABELS[key] || key,
          condition,
          actions: data.actions[key] || [],
          note: data.componentNotes[key] || "",
          costResponsibility: data.costResponsibility[key],
          costKey: key,
          cost: data.costs[key] ?? null,
          isCustomComponent: false,
        });
      }
    });

    // Custom components (always show them as remarks)
    data.customComponents.forEach(comp => {
      remarks.push({
        roomId: room.id,
        roomName: room.name,
        componentKey: comp.id,
        label: comp.label,
        condition: "",
        actions: [],
        note: "",
        costResponsibility: null,
        costKey: comp.id,
        cost: data.costs[comp.id] ?? null,
        isCustomComponent: true,
      });
    });
  });

  return remarks;
}

export function InspectionSummary({ rooms, inspectionData, onCostUpdate }: InspectionSummaryProps) {
  const remarks = collectRemarks(rooms, inspectionData);

  // Group by room
  const groupedByRoom = remarks.reduce<Record<string, RemarkItem[]>>((acc, remark) => {
    if (!acc[remark.roomId]) acc[remark.roomId] = [];
    acc[remark.roomId].push(remark);
    return acc;
  }, {});

  const totalCost = remarks.reduce((sum, r) => sum + (r.cost || 0), 0);
  const tenantCost = remarks
    .filter(r => r.costResponsibility === 'tenant')
    .reduce((sum, r) => sum + (r.cost || 0), 0);
  const landlordCost = remarks
    .filter(r => r.costResponsibility === 'landlord')
    .reduce((sum, r) => sum + (r.cost || 0), 0);

  if (remarks.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Inga anmärkningar registrerade.</p>
          <p className="text-sm text-muted-foreground mt-1">
            Alla komponenter är i gott skick.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Sammanställning</h3>
              <p className="text-sm text-muted-foreground">
                {remarks.length} anmärkning{remarks.length !== 1 ? "ar" : ""} i {Object.keys(groupedByRoom).length} rum
              </p>
            </div>
            {totalCost > 0 && (
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total kostnad</p>
                <p className="text-lg font-semibold">{totalCost.toLocaleString('sv-SE')} kr</p>
              </div>
            )}
          </div>

          {/* Cost breakdown by responsibility */}
          {(tenantCost > 0 || landlordCost > 0) && (
            <>
              <Separator className="my-3" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Hyresgästens ansvar</p>
                  <p className="text-sm font-medium">{tenantCost.toLocaleString('sv-SE')} kr</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Hyresvärdens ansvar</p>
                  <p className="text-sm font-medium">{landlordCost.toLocaleString('sv-SE')} kr</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Remarks per room */}
      {Object.entries(groupedByRoom).map(([roomId, roomRemarks]) => (
        <Card key={roomId}>
          <CardContent className="p-4">
            <h4 className="font-medium text-base mb-3">{roomRemarks[0].roomName}</h4>

            <div className="rounded-md border border-border overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[1fr_auto_120px] items-center px-3 py-2 bg-muted/50 text-xs text-muted-foreground">
                <span>Komponent</span>
                <span className="px-2">Status</span>
                <span className="text-right">Kostnad (kr)</span>
              </div>

              {/* Rows */}
              {roomRemarks.map((remark, index) => (
                <div
                  key={remark.costKey}
                  className={`px-3 py-2 ${
                    index < roomRemarks.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className="grid grid-cols-[1fr_auto_120px] items-center gap-2">
                    <div>
                      <span className="text-sm font-medium">{remark.label}</span>
                      {remark.actions.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {remark.actions.map(action => (
                            <Badge key={action} variant="secondary" className="text-xs px-1.5 py-0">
                              {action}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {remark.costResponsibility && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {getCostResponsibilityLabel(remark.costResponsibility)}
                        </p>
                      )}
                    </div>

                    <div className="px-2">
                      {remark.condition ? (
                        <Badge
                          variant="outline"
                          className={`text-xs ${getConditionColor(remark.condition)}`}
                        >
                          {getConditionLabel(remark.condition)}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs text-muted-foreground">
                          Detalj
                        </Badge>
                      )}
                    </div>

                    <Input
                      type="number"
                      min={0}
                      placeholder="0"
                      value={remark.cost ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        onCostUpdate(remark.roomId, remark.costKey, val === "" ? null : Number(val));
                      }}
                      className="h-8 text-sm text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>

                  {remark.note && (
                    <p className="text-xs text-muted-foreground mt-1 italic">
                      {remark.note}
                    </p>
                  )}
                </div>
              ))}

              {/* Room total */}
              {roomRemarks.some(r => r.cost !== null && r.cost > 0) && (
                <div className="grid grid-cols-[1fr_auto_120px] items-center px-3 py-2 border-t border-border bg-muted/30">
                  <span className="text-sm font-medium">Totalt rum</span>
                  <span></span>
                  <span className="text-sm font-semibold text-right pr-3">
                    {roomRemarks.reduce((sum, r) => sum + (r.cost || 0), 0).toLocaleString('sv-SE')} kr
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
