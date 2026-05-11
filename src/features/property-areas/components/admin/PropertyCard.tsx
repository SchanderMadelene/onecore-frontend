import React from 'react';
import { GripVertical, Home, DoorOpen, Car } from 'lucide-react';
import { PropertyForAdmin } from '../../types/admin-types';
import { BuildingTypeBadge } from '../BuildingTypeBadge';

interface PropertyCardProps {
  property: PropertyForAdmin;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const hasCounts = (property.residenceCount ?? 0) > 0 || (property.parkingCount ?? 0) > 0;

  return (
    <div className="p-3 rounded-md border bg-card flex gap-2">
      <GripVertical className="h-4 w-4 text-muted-foreground/60 mt-0.5 flex-shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="font-medium text-sm truncate">{property.propertyName}</div>
        <div className="text-xs text-muted-foreground truncate">{property.address}</div>
        <BuildingTypeBadge type={property.buildingType} className="mt-1" />
        {hasCounts && (
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1.5">
            {(property.residenceCount ?? 0) > 0 && (
              <span className="flex items-center gap-1" title="Bostäder">
                <DoorOpen className="h-3.5 w-3.5" />
                {property.residenceCount}
              </span>
            )}
            {(property.parkingCount ?? 0) > 0 && (
              <span className="flex items-center gap-1" title="P-platser">
                <Car className="h-3.5 w-3.5" />
                {property.parkingCount}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
