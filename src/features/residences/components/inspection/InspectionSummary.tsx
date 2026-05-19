import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Room } from "@/types/api";
import type { InspectionRoom } from "./types";
import { COMPONENT_LABELS, hasRemark, getCostResponsibilityLabel } from "./inspection-utils";

// Schablonvärde och avskrivningstid per komponenttyp (mock)
const COMPONENT_DEPRECIATION: Record<string, { schablon: number; totalYears: number; yearsLeft: number }> = {
  walls: { schablon: 8000, totalYears: 15, yearsLeft: 6 },
  floor: { schablon: 25000, totalYears: 20, yearsLeft: 8 },
  ceiling: { schablon: 5000, totalYears: 15, yearsLeft: 9 },
  appliances: { schablon: 10000, totalYears: 10, yearsLeft: 3 },
  kitchenDoors: { schablon: 18000, totalYears: 20, yearsLeft: 12 },
  baseboards: { schablon: 2000, totalYears: 15, yearsLeft: 7 },
  interiorDoors: { schablon: 4000, totalYears: 25, yearsLeft: 15 },
  outlets: { schablon: 500, totalYears: 25, yearsLeft: 10 },
  switches: { schablon: 500, totalYears: 25, yearsLeft: 10 },
  windowSills: { schablon: 1500, totalYears: 20, yearsLeft: 8 },
  windowFrames: { schablon: 6000, totalYears: 30, yearsLeft: 20 },
  radiators: { schablon: 4000, totalYears: 30, yearsLeft: 18 },
  ventilation: { schablon: 3000, totalYears: 20, yearsLeft: 10 },
  shelving: { schablon: 2500, totalYears: 15, yearsLeft: 6 },
  curtainRods: { schablon: 800, totalYears: 15, yearsLeft: 8 },
  lighting: { schablon: 2000, totalYears: 15, yearsLeft: 7 },
  other: { schablon: 1000, totalYears: 10, yearsLeft: 5 },
};

function getDepreciation(componentKey: string, customType?: string) {
  return COMPONENT_DEPRECIATION[componentKey] ?? (customType ? COMPONENT_DEPRECIATION[customType] : undefined);
}

function calcCost(d?: { schablon: number; totalYears: number; yearsLeft: number }) {
  if (!d || d.totalYears <= 0) return 0;
  const years = Math.max(0, d.yearsLeft);
  return Math.round(d.schablon * (years / d.totalYears));
}

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
  cost: number;
  isCustomComponent: boolean;
  customType?: string;
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
          cost: calcCost(getDepreciation(key)),
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
        note: comp.note || "",
        costResponsibility: null,
        costKey: comp.id,
        cost: calcCost(getDepreciation(comp.type, comp.type)),
        isCustomComponent: true,
        customType: comp.type,
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
                  <p className="text-xs text-muted-foreground">Ansvar: Hyresgäst</p>
                  <p className="text-sm font-medium">{tenantCost.toLocaleString('sv-SE')} kr</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Ansvar: Mimer</p>
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
              {/* Header (only on sm+) */}
              <div className="hidden sm:grid grid-cols-[1.5fr_70px_100px_100px] items-center gap-3 px-3 py-2 bg-muted/50 text-xs text-muted-foreground">
                <span>Komponent</span>
                <span className="text-right">År kvar</span>
                <span className="text-right">Schablon</span>
                <span className="text-right">Kostnad</span>
              </div>

              {/* Rows */}
              {roomRemarks.map((remark, index) => {
                const dep = getDepreciation(remark.componentKey, remark.customType);
                return (
                  <div
                    key={remark.costKey}
                    className={`px-3 py-3 ${
                      index < roomRemarks.length - 1 ? 'border-b border-border' : ''
                    }`}
                  >
                    {/* Desktop layout */}
                    <div className="hidden sm:grid grid-cols-[1.5fr_70px_100px_100px] items-center gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-medium">{remark.label}</div>
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
                      <span className="text-sm text-right tabular-nums">
                        {dep ? `${dep.yearsLeft} år` : "—"}
                      </span>
                      <span className="text-sm text-right tabular-nums text-muted-foreground">
                        {dep ? `${dep.schablon.toLocaleString('sv-SE')} kr` : "—"}
                      </span>
                      <span className="text-sm font-medium text-right tabular-nums">
                        {remark.cost.toLocaleString('sv-SE')} kr
                      </span>
                    </div>

                    {/* Mobile layout: stacked */}
                    <div className="sm:hidden space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium">{remark.label}</div>
                          {remark.costResponsibility && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {getCostResponsibilityLabel(remark.costResponsibility)}
                            </p>
                          )}
                        </div>
                        <span className="text-sm font-semibold tabular-nums whitespace-nowrap">
                          {remark.cost.toLocaleString('sv-SE')} kr
                        </span>
                      </div>
                      {remark.actions.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {remark.actions.map(action => (
                            <Badge key={action} variant="secondary" className="text-xs px-1.5 py-0">
                              {action}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>
                          År kvar:{" "}
                          <span className="text-foreground tabular-nums">
                            {dep ? `${dep.yearsLeft} år` : "—"}
                          </span>
                        </span>
                        <span>
                          Schablon:{" "}
                          <span className="text-foreground tabular-nums">
                            {dep ? `${dep.schablon.toLocaleString('sv-SE')} kr` : "—"}
                          </span>
                        </span>
                      </div>
                    </div>

                    {remark.note && (
                      <p className="text-xs text-muted-foreground mt-2 italic">
                        {remark.note}
                      </p>
                    )}
                  </div>
                );
              })}

              {/* Room total */}
              {roomRemarks.some(r => r.cost > 0) && (
                <div className="flex items-center justify-between px-3 py-2 border-t border-border bg-muted/30">
                  <span className="text-sm font-medium">Totalt rum</span>
                  <span className="text-sm font-semibold tabular-nums">
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
