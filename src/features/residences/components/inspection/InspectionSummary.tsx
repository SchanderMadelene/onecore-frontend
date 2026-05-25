import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { StickyNote, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Room } from "@/types/api";
import type { InspectionRoom, CostAdjustment } from "./types";
import { COMPONENT_LABELS, hasRemark, getCostResponsibilityLabel } from "./inspection-utils";
import { AdjustCostReasonDialog } from "./AdjustCostReasonDialog";

// Schablonvärde och avskrivningstid per komponenttyp (mock)
const COMPONENT_DEPRECIATION: Record<string, { schablon: number; totalYears: number; yearsLeft: number }> = {
  walls: { schablon: 8000, totalYears: 15, yearsLeft: 6 },
  floor: { schablon: 25000, totalYears: 20, yearsLeft: 8 },
  ceiling: { schablon: 5000, totalYears: 15, yearsLeft: 9 },
  appliances: { schablon: 10000, totalYears: 10, yearsLeft: 3 },
  refrigerator: { schablon: 8000, totalYears: 10, yearsLeft: 3 },
  freezer: { schablon: 7000, totalYears: 10, yearsLeft: 3 },
  washingMachine: { schablon: 9000, totalYears: 10, yearsLeft: 3 },
  tumbleDryer: { schablon: 8000, totalYears: 10, yearsLeft: 3 },
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
  onCostAdjust?: (roomId: string, costKey: string, amount: number, reason: string) => void;
  onCostAdjustClear?: (roomId: string, costKey: string) => void;
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
  schablonCost: number;
  adjustment?: CostAdjustment;
  effectiveCost: number;
  isCustomComponent: boolean;
  customType?: string;
}

function collectRemarks(rooms: Room[], inspectionData: Record<string, InspectionRoom>): RemarkItem[] {
  const remarks: RemarkItem[] = [];

  rooms.forEach(room => {
    const data = inspectionData[room.id];
    if (!data) return;

    const adjustments = data.costAdjustments || {};

    const componentKeys = Object.keys(data.conditions) as Array<keyof typeof data.conditions>;
    componentKeys.forEach(key => {
      const condition = data.conditions[key];
      if (hasRemark(condition)) {
        const schablon = calcCost(getDepreciation(key));
        const adj = adjustments[key];
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
          schablonCost: schablon,
          adjustment: adj,
          effectiveCost: adj ? adj.amount : schablon,
          isCustomComponent: false,
        });
      }
    });

    data.customComponents.forEach(comp => {
      const schablon = calcCost(getDepreciation(comp.type, comp.type));
      const adj = adjustments[comp.id];
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
        schablonCost: schablon,
        adjustment: adj,
        effectiveCost: adj ? adj.amount : schablon,
        isCustomComponent: true,
        customType: comp.type,
      });
    });
  });

  return remarks;
}

interface EditableCostProps {
  remark: RemarkItem;
  onAdjust?: (amount: number, reason: string) => void;
  onClear?: () => void;
  className?: string;
}

function EditableCost({ remark, onAdjust, onClear, className }: EditableCostProps) {
  const [value, setValue] = useState(String(remark.effectiveCost));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingAmount, setPendingAmount] = useState<number | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(String(remark.effectiveCost));
  }, [remark.effectiveCost]);

  const commit = () => {
    const parsed = parseInt(value.replace(/\s/g, ""), 10);
    if (isNaN(parsed) || parsed < 0) {
      setValue(String(remark.effectiveCost));
      return;
    }
    if (parsed === remark.effectiveCost) {
      setValue(String(parsed));
      return;
    }
    if (!onAdjust) return;
    if (parsed === remark.schablonCost) {
      // back to schablon → clear adjustment
      onClear?.();
      return;
    }
    setPendingAmount(parsed);
    setDialogOpen(true);
  };

  const handleCancelDialog = () => {
    setValue(String(remark.effectiveCost));
    setPendingAmount(null);
  };

  const handleConfirmDialog = (reason: string) => {
    if (pendingAmount != null && onAdjust) {
      onAdjust(pendingAmount, reason);
    }
    setPendingAmount(null);
  };

  const isAdjusted = !!remark.adjustment;
  const canEdit = !!onAdjust;

  return (
    <div className={cn("inline-flex items-center gap-1.5 justify-end", className)}>
      {isAdjusted && (
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={cn(
                "inline-flex items-center justify-center rounded-sm p-0.5 transition-colors hover:text-foreground",
                popoverOpen ? "text-highlight" : "text-muted-foreground"
              )}
              aria-label="Visa motivering"
            >
              <StickyNote className="h-3.5 w-3.5" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-72 p-3 space-y-2">
            <div className="space-y-1">
              <p className="text-xs font-medium">Justerad kostnad</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Schablon</span>
                <span className="tabular-nums">{remark.schablonCost.toLocaleString("sv-SE")} kr</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Justerat</span>
                <span className="font-medium tabular-nums">{remark.effectiveCost.toLocaleString("sv-SE")} kr</span>
              </div>
            </div>
            <Separator />
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Motivering</p>
              <p className="text-sm whitespace-pre-wrap break-words">{remark.adjustment?.reason}</p>
            </div>
            {remark.adjustment && (
              <p className="text-[11px] text-muted-foreground">
                {new Date(remark.adjustment.adjustedAt).toLocaleString("sv-SE", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </p>
            )}
            {onClear && (
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  onClear();
                  setPopoverOpen(false);
                }}
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                Återställ till schablon
              </Button>
            )}
          </PopoverContent>
        </Popover>
      )}

      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => setValue(e.target.value.replace(/[^\d]/g, ""))}
        onFocus={(e) => e.currentTarget.select()}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            (e.target as HTMLInputElement).blur();
          }
          if (e.key === "Escape") {
            setValue(String(remark.effectiveCost));
            (e.target as HTMLInputElement).blur();
          }
        }}
        disabled={!canEdit}
        className={cn(
          "w-16 text-right tabular-nums text-sm font-medium bg-transparent border border-transparent rounded px-1.5 py-0.5 outline-none transition-colors",
          "hover:border-input focus:border-ring focus:bg-background",
          !canEdit && "opacity-100"
        )}
      />
      <span className="text-sm font-medium tabular-nums shrink-0">kr</span>

      <AdjustCostReasonDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        componentLabel={remark.label}
        schablon={remark.schablonCost}
        newAmount={pendingAmount ?? remark.effectiveCost}
        existingReason={remark.adjustment?.reason}
        onConfirm={handleConfirmDialog}
        onCancel={handleCancelDialog}
      />
    </div>
  );
}

export function InspectionSummary({ rooms, inspectionData, onCostAdjust, onCostAdjustClear }: InspectionSummaryProps) {
  const remarks = collectRemarks(rooms, inspectionData);

  const groupedByRoom = remarks.reduce<Record<string, RemarkItem[]>>((acc, remark) => {
    if (!acc[remark.roomId]) acc[remark.roomId] = [];
    acc[remark.roomId].push(remark);
    return acc;
  }, {});

  const totalCost = remarks.reduce((sum, r) => sum + r.effectiveCost, 0);
  const tenantCost = remarks
    .filter(r => r.costResponsibility === 'tenant')
    .reduce((sum, r) => sum + r.effectiveCost, 0);
  const landlordCost = remarks
    .filter(r => r.costResponsibility === 'landlord')
    .reduce((sum, r) => sum + r.effectiveCost, 0);

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
                <p className="text-lg font-semibold tabular-nums">{totalCost.toLocaleString('sv-SE')} kr</p>
              </div>
            )}
          </div>

          {(tenantCost > 0 || landlordCost > 0) && (
            <>
              <Separator className="my-3" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Ansvar: Hyresgäst</p>
                  <p className="text-sm font-medium tabular-nums">{tenantCost.toLocaleString('sv-SE')} kr</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Ansvar: Mimer</p>
                  <p className="text-sm font-medium tabular-nums">{landlordCost.toLocaleString('sv-SE')} kr</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {Object.entries(groupedByRoom).map(([roomId, roomRemarks]) => (
        <Card key={roomId}>
          <CardContent className="p-4">
            <h4 className="font-medium text-base mb-3">{roomRemarks[0].roomName}</h4>

            <div className="rounded-md border border-border overflow-hidden">
              <div className="hidden sm:grid grid-cols-[1.5fr_70px_100px_140px] items-center gap-3 px-3 py-2 bg-muted/50 text-xs text-muted-foreground">
                <span>Komponent</span>
                <span className="text-right">År kvar</span>
                <span className="text-right">Schablon</span>
                <span className="text-right">Kostnad</span>
              </div>

              {roomRemarks.map((remark, index) => {
                const dep = getDepreciation(remark.componentKey, remark.customType);
                return (
                  <div
                    key={remark.costKey}
                    className={`px-3 py-3 ${
                      index < roomRemarks.length - 1 ? 'border-b border-border' : ''
                    }`}
                  >
                    <div className="hidden sm:grid grid-cols-[1.5fr_70px_100px_140px] items-center gap-3">
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
                      <EditableCost
                        remark={remark}
                        onAdjust={onCostAdjust ? (amount, reason) => onCostAdjust(remark.roomId, remark.costKey, amount, reason) : undefined}
                        onClear={onCostAdjustClear ? () => onCostAdjustClear(remark.roomId, remark.costKey) : undefined}
                      />
                    </div>

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
                        <EditableCost
                          remark={remark}
                          onAdjust={onCostAdjust ? (amount, reason) => onCostAdjust(remark.roomId, remark.costKey, amount, reason) : undefined}
                          onClear={onCostAdjustClear ? () => onCostAdjustClear(remark.roomId, remark.costKey) : undefined}
                        />
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

              {roomRemarks.some(r => r.effectiveCost > 0) && (
                <div className="flex items-center justify-between px-3 py-2 border-t border-border bg-muted/30">
                  <span className="text-sm font-medium">Totalt rum</span>
                  <span className="text-sm font-semibold tabular-nums">
                    {roomRemarks.reduce((sum, r) => sum + r.effectiveCost, 0).toLocaleString('sv-SE')} kr
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
