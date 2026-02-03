import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Pencil } from 'lucide-react';
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
  onReassignArea
}: StewardColumnProps) {
  const [showAssignDialog, setShowAssignDialog] = useState(false);

  const handleAssign = (newStewardRefNr: string) => {
    if (onReassignArea) {
      onReassignArea(kvvArea.kvvArea, newStewardRefNr);
    }
  };

  return (
    <>
      <Card 
        className="flex-shrink-0 w-[280px] flex flex-col h-full"
      >
        <CardHeader className="pb-3 space-y-1">
          <div className="flex items-start justify-between">
            <div className="font-bold text-lg">{kvvArea.kvvArea}</div>
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
        kvvArea={kvvArea.kvvArea}
        currentSteward={{ refNr: kvvArea.stewardRefNr, name: kvvArea.stewardName, phone: kvvArea.stewardPhone }}
        allStewards={allStewards}
        onAssign={handleAssign}
      />
    </>
  );
}
