import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Pencil, Building2, DoorOpen, Car } from 'lucide-react';
import { PropertyCard } from './PropertyCard';
import { StewardAssignmentDialog } from './StewardAssignmentDialog';
import { KvvAreaInfo, PropertyForAdmin } from '../../types/admin-types';
import { cn } from '@/lib/utils';

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
  movedPropertyOrigins?: Map<string, string>;
}

export function StewardColumn({ 
  kvvArea, 
  properties, 
  allStewards = [],
  onReassignArea,
  movedPropertyOrigins
}: StewardColumnProps) {
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  
  const { setNodeRef, isOver } = useDroppable({
    id: `kvv-${kvvArea.kvvArea}`,
    data: { kvvArea: kvvArea.kvvArea },
  });

  const handleAssign = (newStewardRefNr: string) => {
    if (onReassignArea) {
      onReassignArea(kvvArea.kvvArea, newStewardRefNr);
    }
  };

  return (
    <>
      <Card 
        className={cn(
          'flex-shrink-0 w-[280px] flex flex-col h-full transition-colors',
          isOver && 'ring-2 ring-primary ring-offset-2 bg-primary/5'
        )}
      >
        <CardHeader className="pb-3 space-y-1">
          <div className="flex items-start justify-between">
            <div className="font-bold text-lg">{kvvArea.kvvArea}</div>
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
          {(() => {
            const totalResidences = properties.reduce((sum, p) => sum + (p.residenceCount || 0), 0);
            const totalParking = properties.reduce((sum, p) => sum + (p.parkingCount || 0), 0);
            return (
              <div className="flex items-center gap-3 pt-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1" title="Fastigheter">
                  <Building2 className="h-4 w-4" />
                  {properties.length}
                </span>
                {totalResidences > 0 && (
                  <span className="inline-flex items-center gap-1" title="Bostäder totalt">
                    <DoorOpen className="h-4 w-4" />
                    {totalResidences}
                  </span>
                )}
                {totalParking > 0 && (
                  <span className="inline-flex items-center gap-1" title="Bilplatser totalt">
                    <Car className="h-4 w-4" />
                    {totalParking}
                  </span>
                )}
              </div>
            );
          })()}
        </CardHeader>
        
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full px-4 pb-4">
            <div ref={setNodeRef} className="space-y-2 min-h-[120px]">
              {properties.map(property => {
                const movedFrom = movedPropertyOrigins?.get(property.id);
                return (
                  <PropertyCard 
                    key={property.id} 
                    property={property}
                    isMoved={!!movedFrom}
                    movedFromKvvArea={movedFrom}
                  />
                );
              })}
              {properties.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed border-muted rounded-md">
                  Släpp fastighet här
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
        currentSteward={{ refNr: kvvArea.stewardRefNr, name: kvvArea.stewardName, phone: kvvArea.stewardPhone }}
        allStewards={allStewards}
        onAssign={handleAssign}
      />
    </>
  );
}
