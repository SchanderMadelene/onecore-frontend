import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PropertyForAdmin } from '../../types/admin-types';
import { getBuildingTypeName } from '../../data';

interface PropertyCardProps {
  property: PropertyForAdmin;
  isDragging?: boolean;
}

export function PropertyCard({ property, isDragging }: PropertyCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: property.id,
    data: {
      property,
      type: 'property'
    }
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        group flex items-start gap-2 p-3 rounded-md border bg-card
        hover:border-primary/50 hover:shadow-sm transition-all
        ${isDragging ? 'opacity-50 shadow-lg ring-2 ring-primary' : ''}
      `}
    >
      <button
        {...listeners}
        {...attributes}
        className="mt-0.5 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground touch-none"
        aria-label="Dra för att flytta"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">
          {property.propertyName}
        </div>
        <div className="text-xs text-muted-foreground truncate">
          {property.address}
        </div>
        {property.buildingType && (
          <Badge variant="secondary" className="mt-1 text-xs">
            {getBuildingTypeName(property.buildingType)}
          </Badge>
        )}
      </div>
    </div>
  );
}
