import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Pencil, GripVertical, Building2, Home, DoorOpen, Car } from 'lucide-react';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import { PropertyCard } from './PropertyCard';
import { StewardAssignmentDialog } from './StewardAssignmentDialog';
import { KvvAreaInfo, PropertyForAdmin } from '../../types/admin-types';

interface Steward {
  refNr: string;
  name: string;
  phone?: string;
}

interface StewardColumnProps {
  kvvArea: KvvAreaInfo;
  properties: PropertyForAdmin[];
  allStewards?: Steward[];
  onReassignArea?: (kvvArea: string, toStewardRefNr: string) => void;
}

export function StewardColumn({
  kvvArea,
  properties,
  allStewards = [],
  onReassignArea,
}: StewardColumnProps) {
  const [showAssignDialog, setShowAssignDialog] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: kvvArea.kvvArea,
    data: { type: 'column' },
  });

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: `col-${kvvArea.kvvArea}`,
    data: { type: 'column', kvvArea: kvvArea.kvvArea },
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  const handleAssign = (newStewardRefNr: string) => {
    onReassignArea?.(kvvArea.kvvArea, newStewardRefNr);
  };

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        className={cn(
          "flex-shrink-0 w-[280px] flex flex-col h-full transition-shadow",
          isOver && "ring-2 ring-primary/50"
        )}
      >
        <CardHeader className="pb-3 space-y-1">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-1">
              <button
                className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing -ml-1"
                {...attributes}
                {...listeners}
                aria-label="Dra för att sortera om"
              >
                <GripVertical className="h-4 w-4" />
              </button>
              <div className="font-bold text-lg">{kvvArea.kvvArea}</div>
            </div>
            {onReassignArea && (
              <Button
                variant="subtle"
                size="icon"
                className="h-7 w-7 -mt-1 -mr-2"
                onClick={() => setShowAssignDialog(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="font-medium text-sm">{kvvArea.stewardName}</div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{kvvArea.stewardRefNr}</span>
            {kvvArea.stewardPhone && (
              <>
                <span>•</span>
                <span>{kvvArea.stewardPhone}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
            <span className="flex items-center gap-1" title="Fastigheter">
              <Building2 className="h-3.5 w-3.5" />
              {kvvArea.propertyCount}
            </span>
            {kvvArea.entranceCount > 0 && (
              <span className="flex items-center gap-1" title="Uppgångar">
                <Home className="h-3.5 w-3.5" />
                {kvvArea.entranceCount}
              </span>
            )}
            <span className="flex items-center gap-1" title="Bostäder">
              <DoorOpen className="h-3.5 w-3.5" />
              {kvvArea.residenceCount}
            </span>
            {kvvArea.parkingCount > 0 && (
              <span className="flex items-center gap-1" title="P-platser">
                <Car className="h-3.5 w-3.5" />
                {kvvArea.parkingCount}
              </span>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full px-4 pb-4">
            <div ref={setDroppableRef} className="space-y-2 min-h-[120px]">
              <SortableContext
                items={properties.map((p) => p.id)}
                strategy={verticalListSortingStrategy}
              >
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} kvvArea={kvvArea.kvvArea} />
                ))}
              </SortableContext>
              {properties.length === 0 && (
                <div className={cn(
                  "text-center py-8 text-muted-foreground text-sm rounded-md border border-dashed",
                  isOver && "border-primary/50 bg-primary/5"
                )}>
                  {isOver ? "Släpp här" : "Inga fastigheter"}
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <StewardAssignmentDialog
        open={showAssignDialog}
        onOpenChange={setShowAssignDialog}
        kvvArea={kvvArea.kvvArea}
        currentSteward={{
          refNr: kvvArea.stewardRefNr,
          name: kvvArea.stewardName,
          phone: kvvArea.stewardPhone,
        }}
        allStewards={allStewards}
        onAssign={handleAssign}
      />
    </>
  );
}
