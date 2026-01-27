// Residences Components - Barrel Export

// Main components
export * from './ErrorState';
export * from './LoadingState';
export * from './MobileAccordion';
export * from './OrdersManagement';
export * from './ResidenceBasicInfo';
export * from './ResidenceContent';
export * from './ResidenceDocuments';
export * from './ResidenceFloorplan';
export { ResidenceInfo } from './ResidenceInfo';
export * from './ResidenceInspection';
export * from './RoomOrientation';

// Tabs
export * from './tabs/FeatureGatedContent';
export * from './tabs/ResidenceTabsContent';
export * from './tabs/ResidenceTabsList';

// Inspection types
export type { 
  Inspection, 
  InspectionRoom, 
  InspectionStatus, 
  TenantSnapshot, 
  ResidenceInfo as ResidenceInfoType, 
  InspectionSubmitData 
} from './inspection/types';

// Inspection components
export * from './inspection/ActionChecklist';
export * from './inspection/ComponentDetailSheet';
export * from './inspection/ComponentInspectionCard';
export * from './inspection/ConditionSelect';
export * from './inspection/InspectionAccordion';
export * from './inspection/InspectionEmpty';
export * from './inspection/InspectionFormDialog';
export * from './inspection/InspectionHistory';
export * from './inspection/InspectionProgress';
export * from './inspection/InspectionReadOnly';
export { InspectionRoom as InspectionRoomComponent } from './inspection/InspectionRoom';
export * from './inspection/InspectionStart';
export * from './inspection/InspectionsList';
export * from './inspection/PhotoCapture';
export * from './inspection/PhotoGallery';
