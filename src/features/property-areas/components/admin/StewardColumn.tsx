import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Pencil } from 'lucide-react';
import { PropertyCard } from './PropertyCard';
import { StewardAssignmentDialog } from './StewardAssignmentDialog';
import { StewardInfo, PropertyForAdmin } from '../../types/admin-types';

interface Steward {
  refNr: string;
  name: string;
  phone?: string;
}

interface StewardColumnProps {
  steward: StewardInfo;
  properties: PropertyForAdmin[];
  activePropertyId?: string | null;
  allStewards?: Steward[];
  onReassignArea?: (fromStewardRefNr: string, toStewardRefNr: string) => void;
}

export function StewardColumn({ 
  steward, 
  properties, 
  activePropertyId,
  allStewards = [],
  onReassignArea
}: StewardColumnProps) {
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  
  const { isOver, setNodeRef } = useDroppable({
    id: steward.refNr,
    data: {
      steward,
      type: 'steward'
    }
  });

  const handleAssign = (newStewardRefNr: string) => {
    if (onReassignArea) {
      onReassignArea(steward.refNr, newStewardRefNr);
    }
  };

  return (
    <>
      <Card 
        ref={setNodeRef}
        className={`
          flex-shrink-0 w-[280px] flex flex-col h-full
          transition-all duration-200
          ${isOver ? 'ring-2 ring-primary bg-primary/5' : ''}
        `}
      >
        <CardHeader className="pb-3 space-y-1">
          <div className="flex items-start justify-between">
            <div className="font-bold text-lg">{steward.kvvArea || 'Ej tilldelat'}</div>
            {onReassignArea && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 -mt-1 -mr-2"
                onClick={() => setShowAssignDialog(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="font-medium text-sm">{steward.name}</div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{steward.refNr}</span>
            {steward.phone && (
              <>
                <span>•</span>
                <span>{steward.phone}</span>
              </>
            )}
          </div>
          <Badge variant="outline" className="w-fit">
            {properties.length} {properties.length === 1 ? 'fastighet' : 'fastigheter'}
          </Badge>
        </CardHeader>
        
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full px-4 pb-4">
            <div className="space-y-2">
              {properties.map(property => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                  isDragging={activePropertyId === property.id}
                />
              ))}
              {properties.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  Inga fastigheter
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      
      <StewardAssignmentDialog
        open={showAssignDialog}
        onOpenChange={setShowAssignDialog}
        kvvArea={steward.kvvArea || 'Ej tilldelat'}
        currentSteward={{ refNr: steward.refNr, name: steward.name, phone: steward.phone }}
        allStewards={allStewards}
        onAssign={handleAssign}
      />
    </>
  );
}
