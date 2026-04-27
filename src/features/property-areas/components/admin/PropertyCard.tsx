import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { PropertyForAdmin } from '../../types/admin-types';
import { BuildingTypeBadge } from '../BuildingTypeBadge';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: PropertyForAdmin;
  draggable?: boolean;
}

export function PropertyCard({ property, draggable = true }: PropertyCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: property.id,
    data: { fromKvvArea: property.kvvArea },
    disabled: !draggable,
  });

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'p-3 rounded-md border bg-card flex items-start gap-2',
        draggable && 'cursor-grab active:cursor-grabbing',
        isDragging && 'opacity-40 shadow-lg z-50 relative'
      )}
      {...attributes}
      {...listeners}
    >
      {draggable && (
        <GripVertical className="h-4 w-4 text-muted-foreground/60 flex-shrink-0 mt-0.5" />
      )}
      <div className="min-w-0 flex-1">
        <div className="font-medium text-sm truncate">
          {property.propertyName}
        </div>
        <div className="text-xs text-muted-foreground truncate">
          {property.address}
        </div>
        <BuildingTypeBadge type={property.buildingType} className="mt-1" />
      </div>
    </div>
  );
}
