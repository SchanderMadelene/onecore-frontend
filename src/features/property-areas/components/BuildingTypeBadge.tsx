import React from 'react';
import { getBuildingTypeStyle } from '../utils/building-type-colors';
import { getBuildingTypeName } from '../data';
import { cn } from '@/lib/utils';

interface BuildingTypeBadgeProps {
  type: string | undefined;
  className?: string;
}

export function BuildingTypeBadge({ type, className }: BuildingTypeBadgeProps) {
  if (!type) return null;
  
  const style = getBuildingTypeStyle(type);
  if (!style) return null;
  
  return (
    <span 
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
        style.bg,
        style.text,
        className
      )}
    >
      {getBuildingTypeName(type)}
    </span>
  );
}
