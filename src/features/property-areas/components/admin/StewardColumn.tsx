import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PropertyCard } from './PropertyCard';
import { StewardInfo, PropertyForAdmin } from '../../types/admin-types';

interface StewardColumnProps {
  steward: StewardInfo;
  properties: PropertyForAdmin[];
  activePropertyId?: string | null;
}

export function StewardColumn({ steward, properties, activePropertyId }: StewardColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: steward.refNr,
    data: {
      steward,
      type: 'steward'
    }
  });

  return (
    <Card 
      ref={setNodeRef}
      className={`
        flex-shrink-0 w-[280px] flex flex-col h-full
        transition-all duration-200
        ${isOver ? 'ring-2 ring-primary bg-primary/5' : ''}
      `}
    >
      <CardHeader className="pb-3 space-y-1">
        <div className="font-semibold text-base">{steward.name}</div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
  );
}
