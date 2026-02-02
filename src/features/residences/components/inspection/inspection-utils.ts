import { CheckCircle, AlertTriangle, XCircle, LucideIcon } from "lucide-react";

export const COMPONENT_LABELS: Record<string, string> = {
  wall1: 'Vägg 1',
  wall2: 'Vägg 2',
  wall3: 'Vägg 3',
  wall4: 'Vägg 4',
  floor: 'Golv',
  ceiling: 'Tak',
  details: 'Detaljer',
};

export const getComponentLabel = (component: string): string => {
  return COMPONENT_LABELS[component] || component;
};

export const getConditionColor = (condition: string): string => {
  switch (condition) {
    case 'Bra':
      return 'text-green-600';
    case 'Acceptabel':
      return 'text-amber-500';
    case 'Skadad':
      return 'text-destructive';
    default:
      return 'text-muted-foreground';
  }
};

export const getConditionIcon = (condition: string): LucideIcon => {
  switch (condition) {
    case 'Bra':
      return CheckCircle;
    case 'Acceptabel':
      return AlertTriangle;
    case 'Skadad':
      return XCircle;
    default:
      return CheckCircle;
  }
};

export const getConditionLabel = (condition: string): string => {
  switch (condition) {
    case 'Bra':
      return 'Bra';
    case 'Acceptabel':
      return 'Acceptabel';
    case 'Skadad':
      return 'Skadad';
    default:
      return condition || 'Ej angivet';
  }
};

export const hasRemark = (condition: string): boolean => {
  return condition === 'Acceptabel' || condition === 'Skadad';
};

export const getCostResponsibilityLabel = (responsibility: string): string => {
  return responsibility === 'tenant' ? 'Hyresgästens ansvar' : 'Hyresvärdens ansvar';
};

import type { InspectionRoom } from "./types";

export const getDefaultExpandedComponents = (rooms: Record<string, InspectionRoom>): string[] => {
  const expanded: string[] = [];
  Object.entries(rooms).forEach(([roomId, room]) => {
    Object.entries(room.conditions).forEach(([component, condition]) => {
      if (hasRemark(condition)) {
        expanded.push(`${roomId}-${component}`);
      }
    });
  });
  return expanded;
};

export const countRemarks = (room: InspectionRoom): number => {
  return Object.values(room.conditions).filter(condition => hasRemark(condition)).length;
};

export const getRoomWorstCondition = (room: InspectionRoom): string => {
  const conditions = Object.values(room.conditions) as string[];
  if (conditions.includes('Skadad')) return 'Skadad';
  if (conditions.includes('Acceptabel')) return 'Acceptabel';
  return 'Bra';
};
