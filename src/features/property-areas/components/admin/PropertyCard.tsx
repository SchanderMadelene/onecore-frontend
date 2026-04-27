import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, ArrowRightLeft, Home, Car } from 'lucide-react';
import { PropertyForAdmin } from '../../types/admin-types';
import { BuildingTypeBadge } from '../BuildingTypeBadge';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: PropertyForAdmin;
  draggable?: boolean;
  isMoved?: boolean;
  movedFromKvvArea?: string;
}

export function PropertyCard({ property, draggable = true, isMoved = false, movedFromKvvArea }: PropertyCardProps) {
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
        'p-3 rounded-md border bg-card flex items-start gap-2 transition-colors',
        draggable && 'cursor-grab active:cursor-grabbing',
        isDragging && 'opacity-40 shadow-lg z-50 relative',
        isMoved && 'border-primary border-2 bg-primary/5'
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
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <BuildingTypeBadge type={property.buildingType} />
          {isMoved && movedFromKvvArea && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded">
              <ArrowRightLeft className="h-3 w-3" />
              Flyttad från {movedFromKvvArea}
            </span>
          )}
        </div>
        {(typeof property.residenceCount === 'number' && property.residenceCount > 0) ||
        (typeof property.parkingCount === 'number' && property.parkingCount > 0) ? (
          <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground">
            {typeof property.residenceCount === 'number' && property.residenceCount > 0 && (
              <span className="inline-flex items-center gap-1">
                <Home className="h-[16px] w-[16px]" />
                {property.residenceCount}
              </span>
            )}
            {typeof property.parkingCount === 'number' && property.parkingCount > 0 && (
              <span className="inline-flex items-center gap-1">
                <Car className="h-3 w-3" />
                {property.parkingCount}
              </span>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
