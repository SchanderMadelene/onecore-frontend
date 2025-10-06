export interface Barrier {
  id: string;
  type: 'housing' | 'parking' | 'storage' | 'commercial';
  object: string;
  address: string;
  reason: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'inactive' | 'expired';
  createdBy: string;
  createdDate: string;
  notes?: string;
}

export const mockBarriers: Barrier[] = [
  // Housing barriers
  {
    id: 'H001',
    type: 'housing',
    object: 'Algen 1, Lgh 1201 (123-456-01-1201)',
    address: 'Algengatan 12, 1tr',
    reason: 'Vattenskada - renovering pågår',
    startDate: '2024-01-15',
    endDate: '2024-03-30',
    status: 'active',
    createdBy: 'Anna Svensson',
    createdDate: '2024-01-10',
    notes: 'Omfattande renovering efter rörbrott'
  },
  {
    id: 'H002',
    type: 'housing',
    object: 'Lindaren 2, Lgh 0304 (234-567-02-0304)',
    address: 'Lindarens väg 8, 3tr',
    reason: 'Brandskada',
    startDate: '2024-02-10',
    status: 'active',
    createdBy: 'Per Eriksson',
    createdDate: '2024-02-08'
  },
  {
    id: 'H003',
    type: 'housing',
    object: 'Björnen 4, Lgh 0801 (345-678-03-0801)',
    address: 'Björkgatan 15, 8tr',
    reason: 'Asbetsanering',
    startDate: '2023-12-01',
    endDate: '2024-01-31',
    status: 'expired',
    createdBy: 'Maria Johansson',
    createdDate: '2023-11-20'
  },
  {
    id: 'H004',
    type: 'housing',
    object: 'Algen 1, Lgh 0502 (123-456-01-0502)',
    address: 'Algengatan 12, 5tr',
    reason: 'Fuktsanering',
    startDate: '2024-03-01',
    status: 'active',
    createdBy: 'Lars Nilsson',
    createdDate: '2024-02-25'
  },

  // Parking barriers
  {
    id: 'P001',
    type: 'parking',
    object: 'Bilplats 45A (FAST-001-P045A)',
    address: 'Algengatan 12, garage',
    reason: 'Markarbeten - schakt för fiber',
    startDate: '2024-02-20',
    endDate: '2024-04-15',
    status: 'active',
    createdBy: 'Anna Svensson',
    createdDate: '2024-02-15'
  },
  {
    id: 'P002',
    type: 'parking',
    object: 'Bilplats 67B (FAST-002-P067B)',
    address: 'Lindarens väg 8, utomhus',
    reason: 'Asfaltskador',
    startDate: '2024-01-30',
    endDate: '2024-03-01',
    status: 'expired',
    createdBy: 'Per Eriksson',
    createdDate: '2024-01-28'
  },
  {
    id: 'P003',
    type: 'parking',
    object: 'Bilplats 23C (FAST-003-P023C)',
    address: 'Björkgatan 15, garage',
    reason: 'Takläckage - reparation',
    startDate: '2024-03-10',
    status: 'active',
    createdBy: 'Maria Johansson',
    createdDate: '2024-03-08',
    notes: 'Väntar på entreprenör'
  },
  {
    id: 'P004',
    type: 'parking',
    object: 'Bilplats 89A (FAST-001-P089A)',
    address: 'Algengatan 12, utomhus',
    reason: 'Elkabel - underhåll',
    startDate: '2024-02-15',
    endDate: '2024-02-28',
    status: 'expired',
    createdBy: 'Lars Nilsson',
    createdDate: '2024-02-10'
  },
  {
    id: 'P005',
    type: 'parking',
    object: 'Bilplats 12D (FAST-002-P012D)',
    address: 'Lindarens väg 8, garage',
    reason: 'Ventilation - service',
    startDate: '2024-03-05',
    status: 'active',
    createdBy: 'Anna Svensson',
    createdDate: '2024-03-01'
  },
  
  // Storage barriers
  {
    id: 'S001',
    type: 'storage',
    object: 'Förråd 15A (FAST-001-F015A)',
    address: 'Algengatan 12, källare',
    reason: 'Fuktskada - sanering',
    startDate: '2024-02-01',
    endDate: '2024-04-01',
    status: 'active',
    createdBy: 'Per Eriksson',
    createdDate: '2024-01-25'
  },
  {
    id: 'S002',
    type: 'storage',
    object: 'Förråd 27B (FAST-002-F027B)',
    address: 'Lindarens väg 8, källare',
    reason: 'Dörr behöver bytas',
    startDate: '2024-01-10',
    endDate: '2024-02-28',
    status: 'expired',
    createdBy: 'Maria Johansson',
    createdDate: '2024-01-05'
  },
  {
    id: 'S003',
    type: 'storage',
    object: 'Förråd 8C (FAST-003-F008C)',
    address: 'Björkgatan 15, vind',
    reason: 'Elinstallation',
    startDate: '2024-03-15',
    status: 'active',
    createdBy: 'Lars Nilsson',
    createdDate: '2024-03-12'
  },
  
  // Commercial barriers
  {
    id: 'C001',
    type: 'commercial',
    object: 'Lokal 1 (FAST-001-L001)',
    address: 'Algengatan 12, bottenvåning',
    reason: 'Ombyggnad - nya hyresgästen',
    startDate: '2024-01-20',
    endDate: '2024-05-01',
    status: 'active',
    createdBy: 'Anna Svensson',
    createdDate: '2024-01-10'
  },
  {
    id: 'C002',
    type: 'commercial',
    object: 'Lokal 3 (FAST-002-L003)',
    address: 'Lindarens väg 8, bottenvåning',
    reason: 'Ventilationsarbeten',
    startDate: '2023-11-15',
    endDate: '2024-01-15',
    status: 'expired',
    createdBy: 'Per Eriksson',
    createdDate: '2023-11-01'
  },
  {
    id: 'C003',
    type: 'commercial',
    object: 'Lokal 5 (FAST-003-L005)',
    address: 'Björkgatan 15, bottenvåning',
    reason: 'Brandskyddskontroll',
    startDate: '2024-03-01',
    status: 'active',
    createdBy: 'Maria Johansson',
    createdDate: '2024-02-20'
  }
];

export const getBarriersByType = (type: 'housing' | 'parking' | 'storage' | 'commercial') => {
  return mockBarriers.filter(barrier => barrier.type === type);
};

export const getActiveBarriers = () => {
  return mockBarriers.filter(barrier => barrier.status === 'active');
};

export const getAllBarriers = () => {
  return mockBarriers;
};

// Available objects for creating barriers
export interface AvailableHousing {
  id: string;
  name: string;
  address: string;
  rent: number;
  size?: number;
  code: string;
}

export interface AvailableParkingSpace {
  id: string;
  name: string;
  address: string;
  rent: number;
  type: 'garage' | 'utomhus' | 'carport';
  area: string;
}

export interface AvailableStorage {
  id: string;
  name: string;
  address: string;
  rent: number;
  size: number;
  location: 'källare' | 'vind' | 'utomhus';
}

export interface AvailableCommercial {
  id: string;
  name: string;
  address: string;
  rent: number;
  size: number;
  type: 'kontor' | 'butik' | 'lager';
}

// Mock available housing (residences not currently blocked)
export const getAvailableHousing = (): AvailableHousing[] => {
  const blockedHousingIds = mockBarriers
    .filter(barrier => barrier.type === 'housing' && barrier.status === 'active')
    .map(barrier => barrier.object);

  return [
    { id: 'lgh-1001', name: 'Lgh 1001', address: 'Algengatan 12, 10tr', rent: 8500, size: 56, code: '123-456-01-1001' },
    { id: 'lgh-1002', name: 'Lgh 1002', address: 'Algengatan 12, 10tr', rent: 9200, size: 72, code: '123-456-01-1002' },
    { id: 'lgh-1003', name: 'Lgh 1003', address: 'Algengatan 12, 10tr', rent: 7800, size: 45, code: '123-456-01-1003' },
    { id: 'lgh-2001', name: 'Lgh 2001', address: 'Lindarens väg 8, 2tr', rent: 8300, size: 65, code: '234-567-02-2001' },
    { id: 'lgh-2002', name: 'Lgh 2002', address: 'Lindarens väg 8, 2tr', rent: 9000, size: 58, code: '234-567-02-2002' },
    { id: 'lgh-3001', name: 'Lgh 3001', address: 'Björkgatan 15, 3tr', rent: 9500, size: 82, code: '345-678-03-3001' },
    { id: 'lgh-3002', name: 'Lgh 3002', address: 'Björkgatan 15, 3tr', rent: 8700, size: 67, code: '345-678-03-3002' },
    { id: 'lgh-3003', name: 'Lgh 3003', address: 'Björkgatan 15, 3tr', rent: 10200, size: 91, code: '345-678-03-3003' }
  ].filter(housing => !blockedHousingIds.includes(`${housing.address.split(',')[0]}, ${housing.name}`));
};

// Mock available parking spaces (not currently blocked)
export const getAvailableParkingSpaces = (): AvailableParkingSpace[] => {
  const blockedParkingIds = mockBarriers
    .filter(barrier => barrier.type === 'parking' && barrier.status === 'active')
    .map(barrier => barrier.object);

  return [
    { id: 'p-001', name: 'Bilplats 1A', address: 'Algengatan 12, garage', rent: 850, type: 'garage' as const, area: 'Centrum' },
    { id: 'p-002', name: 'Bilplats 2B', address: 'Algengatan 12, garage', rent: 850, type: 'garage' as const, area: 'Centrum' },
    { id: 'p-003', name: 'Bilplats 3C', address: 'Algengatan 12, utomhus', rent: 650, type: 'utomhus' as const, area: 'Centrum' },
    { id: 'p-004', name: 'Bilplats 4A', address: 'Lindarens väg 8, garage', rent: 900, type: 'garage' as const, area: 'Väst' },
    { id: 'p-005', name: 'Bilplats 5B', address: 'Lindarens väg 8, utomhus', rent: 700, type: 'utomhus' as const, area: 'Väst' },
    { id: 'p-006', name: 'Bilplats 6C', address: 'Björkgatan 15, garage', rent: 800, type: 'garage' as const, area: 'Nord' },
    { id: 'p-007', name: 'Bilplats 7A', address: 'Björkgatan 15, carport', rent: 750, type: 'carport' as const, area: 'Nord' },
    { id: 'p-008', name: 'Bilplats 8B', address: 'Björkgatan 15, utomhus', rent: 600, type: 'utomhus' as const, area: 'Nord' }
  ].filter(parking => !blockedParkingIds.includes(parking.name));
};

// Mock available storage spaces (not currently blocked)
export const getAvailableStorage = (): AvailableStorage[] => {
  const blockedStorageIds = mockBarriers
    .filter(barrier => barrier.type === 'storage' && barrier.status === 'active')
    .map(barrier => barrier.object);

  return [
    { id: 'st-001', name: 'Förråd 1A', address: 'Algengatan 12, källare', rent: 350, size: 5, location: 'källare' as const },
    { id: 'st-002', name: 'Förråd 2B', address: 'Algengatan 12, källare', rent: 450, size: 8, location: 'källare' as const },
    { id: 'st-003', name: 'Förråd 3C', address: 'Algengatan 12, vind', rent: 300, size: 4, location: 'vind' as const },
    { id: 'st-004', name: 'Förråd 4A', address: 'Lindarens väg 8, källare', rent: 400, size: 6, location: 'källare' as const },
    { id: 'st-005', name: 'Förråd 5B', address: 'Lindarens väg 8, vind', rent: 350, size: 5, location: 'vind' as const },
    { id: 'st-006', name: 'Förråd 6C', address: 'Björkgatan 15, källare', rent: 500, size: 10, location: 'källare' as const },
    { id: 'st-007', name: 'Förråd 7A', address: 'Björkgatan 15, vind', rent: 300, size: 4, location: 'vind' as const },
    { id: 'st-008', name: 'Förråd 8B', address: 'Björkgatan 15, utomhus', rent: 250, size: 3, location: 'utomhus' as const }
  ].filter(storage => !blockedStorageIds.includes(storage.name));
};

// Mock available commercial spaces (not currently blocked)
export const getAvailableCommercial = (): AvailableCommercial[] => {
  const blockedCommercialIds = mockBarriers
    .filter(barrier => barrier.type === 'commercial' && barrier.status === 'active')
    .map(barrier => barrier.object);

  return [
    { id: 'com-001', name: 'Lokal 2', address: 'Algengatan 12, bottenvåning', rent: 15000, size: 85, type: 'butik' as const },
    { id: 'com-002', name: 'Lokal 4', address: 'Lindarens väg 8, bottenvåning', rent: 12000, size: 65, type: 'kontor' as const },
    { id: 'com-003', name: 'Lokal 6', address: 'Björkgatan 15, bottenvåning', rent: 18000, size: 120, type: 'butik' as const },
    { id: 'com-004', name: 'Lokal 7', address: 'Algengatan 12, källare', rent: 8000, size: 45, type: 'lager' as const },
    { id: 'com-005', name: 'Lokal 8', address: 'Lindarens väg 8, plan 2', rent: 10000, size: 55, type: 'kontor' as const }
  ].filter(commercial => !blockedCommercialIds.includes(commercial.name));
};

// Create new barrier
export const createBarrier = (barrierData: Omit<Barrier, 'id' | 'createdBy' | 'createdDate'>) => {
  const newBarrier: Barrier = {
    ...barrierData,
    id: `${barrierData.type.toUpperCase().charAt(0)}${String(Date.now()).slice(-3)}`,
    createdBy: 'Nuvarande användare', // In real app, this would be the current user
    createdDate: new Date().toISOString().split('T')[0] // Current date
  };
  
  mockBarriers.unshift(newBarrier);
  return newBarrier;
};