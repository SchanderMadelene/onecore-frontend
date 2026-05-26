export type CostResponsibility = 'tenant' | 'landlord' | null;

export type InspectionType = 'moveout_maintenance' | 'maintenance';

// Typer av tilläggskomponenter som kan läggas till under "Detaljer".
// Speglar dokumentet "Åtgärder_komponenter" — fasta komponenter (Vägg, Tak, Golv,
// Köksluckor, Kyl, Frys, Tvättmaskin, Torktumlare) ligger på sina egna platser
// per rum och finns INTE med i denna lista.
export const CUSTOM_COMPONENT_TYPES = [
  // Kök / vitvaror
  { value: 'fridgeFreezer', label: 'Kyl/frys' },
  { value: 'stove', label: 'Spis' },
  { value: 'cooktop', label: 'Häll' },
  { value: 'oven', label: 'Ugn' },
  { value: 'microwave', label: 'Micro' },
  { value: 'dishwasher', label: 'Diskmaskin' },
  { value: 'washerDryer', label: 'Kombimaskin' },
  // Kök / inredning
  { value: 'sink', label: 'Diskbänk' },
  { value: 'worktop', label: 'Arbetsbänk' },
  { value: 'cabinetFrame', label: 'Skåpstomme' },
  { value: 'kickPlate', label: 'Sparksockel' },
  { value: 'kitchenFaucet', label: 'Köksblandare' },
  { value: 'hood', label: 'Fläkt' },
  // Värme & el
  { value: 'radiator', label: 'Radiator' },
  { value: 'outlet', label: 'Eluttag' },
  { value: 'switch', label: 'Strömbrytare' },
  { value: 'lightFixture', label: 'Armatur' },
  { value: 'circuitDiagram', label: 'Elschema' },
  { value: 'smokeDetector', label: 'Brandvarnare' },
  // Fönster & dörrar
  { value: 'window', label: 'Fönster' },
  { value: 'interiorDoor', label: 'Innerdörr' },
  { value: 'apartmentDoor', label: 'Lägenhetsdörr' },
  // Badrum
  { value: 'bathroomCabinet', label: 'Badrumskåp' },
  { value: 'wallMirror', label: 'Väggspegel' },
  { value: 'toilet', label: 'Wc-stol' },
  { value: 'showerSet', label: 'Duschset' },
  { value: 'showerHose', label: 'Duschslang + munstycke' },
  { value: 'bathtub', label: 'Badkar' },
  { value: 'showerWall', label: 'Duschvägg' },
  { value: 'tiles', label: 'Kakel' },
  { value: 'washbasin', label: 'Tvättställ' },
  { value: 'waterTrap', label: 'Vattenlås' },
  { value: 'dryingRack', label: 'Torkreda' },
  { value: 'dryingHoist', label: 'Torkhiss' },
  { value: 'towelRail', label: 'Handdukshängare' },
  // Hall / övrigt
  { value: 'baseboard', label: 'Golvsockel' },
  { value: 'hatRack', label: 'Hatthylla' },
  { value: 'balconyDeck', label: 'Altantrall' },
] as const;

export type CustomComponentType = typeof CUSTOM_COMPONENT_TYPES[number]['value'];

export interface CustomInspectionComponent {
  id: string;
  type: CustomComponentType;
  label: string;
  condition?: string;
  actions?: string[];
  note?: string;
  photos?: string[];
  costResponsibility?: CostResponsibility;
}

export interface CostAdjustment {
  amount: number;
  reason: string;
  adjustedAt: string;
}

export interface InspectionRoom {
  roomId: string;
  conditions: Record<string, string>;
  actions: Record<string, string[]>;
  componentNotes: Record<string, string>;
  componentPhotos: Record<string, string[]>;
  costResponsibility: Record<string, CostResponsibility>;
  costs: Record<string, number | null>;
  costAdjustments?: Record<string, CostAdjustment>;
  customComponents: CustomInspectionComponent[];
  photos: string[];
  isApproved: boolean;
  isHandled: boolean;
}

export type InspectionStatus = 'draft' | 'in_progress' | 'completed';

// Snapshot av hyresgästinfo vid besiktningstillfället
export interface TenantSnapshot {
  name: string;
  personalNumber: string;
  phone?: string;
  email?: string;
}

// Auto-hämtad residence-info
export interface ResidenceInfo {
  id: string;
  objectNumber: string;   // code från residence
  address: string;        // name från residence  
  apartmentType?: string;
  size?: number;
}

export interface Inspection {
  id: string;
  inspectionNumber: string;
  date: string;
  inspectedBy: string;
  rooms: Record<string, InspectionRoom>;
  status: InspectionStatus;
  
  // Auto-hämtad residence-info
  residence: ResidenceInfo;
  
  // Snapshot av hyresgäst vid besiktningstillfället
  tenant?: TenantSnapshot;
  
  // Från formuläret
  needsMasterKey: boolean;
  inspectionType: InspectionType;
  
  isFurnished?: boolean;
  isCompleted?: boolean; // Deprecated, use status instead
}

// Data som skickas från formulär till sparfunktion
export interface InspectionSubmitData {
  needsMasterKey: boolean;
  isFurnished: boolean;
  inspectionType: InspectionType;
  tenant?: TenantSnapshot;
}
