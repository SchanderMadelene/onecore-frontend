// Types - explicit re-exports to avoid conflicts
export type { ExtendedInspection } from './types';
export type { 
  Inspection,
  InspectionRoom,
  InspectionStatus,
  TenantSnapshot,
  ResidenceInfo,
  InspectionSubmitData,
} from './types';

// Data
export { getAllInspections, AVAILABLE_INSPECTORS, CURRENT_USER } from './data';

// Hooks
export { useInspectionFilters } from './hooks';
export { useInspectionSorting, type SortField, type SortDirection } from './hooks';
export { useInspectionForm, useInspectionProgress } from './hooks';

// Components
export { 
  InspectionsHeader,
  DateCell,
  InspectorCell,
  SortableHeader,
} from './components';
