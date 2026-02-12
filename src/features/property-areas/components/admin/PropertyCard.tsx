import React from 'react';
import { PropertyForAdmin } from '../../types/admin-types';
import { BuildingTypeBadge } from '../BuildingTypeBadge';

interface PropertyCardProps {
  property: PropertyForAdmin;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div
      className="p-3 rounded-md border bg-card"
    >
      <div className="font-medium text-sm truncate">
        {property.propertyName}
      </div>
      <div className="text-xs text-muted-foreground truncate">
        {property.address}
      </div>
      <BuildingTypeBadge type={property.buildingType} className="mt-1" />
    </div>
  );
}
