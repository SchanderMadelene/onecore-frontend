import type { Inspection, InspectionRoom } from '../types';

export interface CostItem {
  id: string;           // Unik identifierare (roomId-component)
  roomId: string;
  roomName: string;
  component: string;
  componentLabel: string;
  condition: string;
  actions: string[];
  note?: string;
  responsibility: 'tenant' | 'landlord';
}

export interface PdfOptions {
  inspection: Inspection;
  recipient: 'outgoing' | 'incoming';
  selectedCostItems?: string[]; // Array of cost item IDs to include
  roomNames?: Record<string, string>; // Map of roomId to room name
}

const COMPONENT_LABELS: Record<string, string> = {
  wall1: 'Vägg 1',
  wall2: 'Vägg 2',
  wall3: 'Vägg 3',
  wall4: 'Vägg 4',
  floor: 'Golv',
  ceiling: 'Tak',
  details: 'Detaljer',
};

/**
 * Extraherar alla poster med kostnadsansvar från en besiktning
 */
export function extractCostItems(
  inspection: Inspection,
  roomNames?: Record<string, string>
): CostItem[] {
  const costItems: CostItem[] = [];

  Object.entries(inspection.rooms).forEach(([roomId, room]) => {
    const components = ['wall1', 'wall2', 'wall3', 'wall4', 'floor', 'ceiling', 'details'] as const;

    components.forEach((component) => {
      const responsibility = room.costResponsibility?.[component];
      const condition = room.conditions?.[component];
      const actions = room.actions?.[component] || [];
      const note = room.componentNotes?.[component];

      // Endast inkludera om det finns ett kostnadsansvar tilldelat
      if (responsibility) {
        costItems.push({
          id: `${roomId}-${component}`,
          roomId,
          roomName: roomNames?.[roomId] || `Rum ${roomId}`,
          component,
          componentLabel: COMPONENT_LABELS[component] || component,
          condition: condition || '',
          actions,
          note,
          responsibility,
        });
      }
    });
  });

  return costItems;
}

/**
 * Filtrerar kostnadsposter för endast hyresgästens ansvar
 */
export function getTenantCostItems(costItems: CostItem[]): CostItem[] {
  return costItems.filter((item) => item.responsibility === 'tenant');
}
