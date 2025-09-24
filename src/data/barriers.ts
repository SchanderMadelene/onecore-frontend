export interface Barrier {
  id: string;
  type: 'housing' | 'parking';
  object: string;
  address: string;
  reason: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'inactive' | 'expired';
  createdBy: string;
  notes?: string;
}

export const mockBarriers: Barrier[] = [
  // Housing barriers
  {
    id: 'H001',
    type: 'housing',
    object: 'Algen 1, Lgh 1201',
    address: 'Algengatan 12, 1tr',
    reason: 'Vattenskada - renovering pågår',
    startDate: '2024-01-15',
    endDate: '2024-03-30',
    status: 'active',
    createdBy: 'Anna Svensson',
    notes: 'Omfattande renovering efter rörbrott'
  },
  {
    id: 'H002',
    type: 'housing',
    object: 'Lindaren 2, Lgh 0304',
    address: 'Lindarens väg 8, 3tr',
    reason: 'Brandskada',
    startDate: '2024-02-10',
    status: 'active',
    createdBy: 'Per Eriksson'
  },
  {
    id: 'H003',
    type: 'housing',
    object: 'Björnen 4, Lgh 0801',
    address: 'Björkgatan 15, 8tr',
    reason: 'Asbetsanering',
    startDate: '2023-12-01',
    endDate: '2024-01-31',
    status: 'expired',
    createdBy: 'Maria Johansson'
  },
  {
    id: 'H004',
    type: 'housing',
    object: 'Algen 1, Lgh 0502',
    address: 'Algengatan 12, 5tr',
    reason: 'Fuktsanering',
    startDate: '2024-03-01',
    status: 'active',
    createdBy: 'Lars Nilsson'
  },

  // Parking barriers
  {
    id: 'P001',
    type: 'parking',
    object: 'Bilplats 45A',
    address: 'Algengatan 12, garage',
    reason: 'Markarbeten - schakt för fiber',
    startDate: '2024-02-20',
    endDate: '2024-04-15',
    status: 'active',
    createdBy: 'Anna Svensson'
  },
  {
    id: 'P002',
    type: 'parking',
    object: 'Bilplats 67B',
    address: 'Lindarens väg 8, utomhus',
    reason: 'Asfaltskador',
    startDate: '2024-01-30',
    endDate: '2024-03-01',
    status: 'expired',
    createdBy: 'Per Eriksson'
  },
  {
    id: 'P003',
    type: 'parking',
    object: 'Bilplats 23C',
    address: 'Björkgatan 15, garage',
    reason: 'Takläckage - reparation',
    startDate: '2024-03-10',
    status: 'active',
    createdBy: 'Maria Johansson',
    notes: 'Väntar på entreprenör'
  },
  {
    id: 'P004',
    type: 'parking',
    object: 'Bilplats 89A',
    address: 'Algengatan 12, utomhus',
    reason: 'Elkabel - underhåll',
    startDate: '2024-02-15',
    endDate: '2024-02-28',
    status: 'expired',
    createdBy: 'Lars Nilsson'
  },
  {
    id: 'P005',
    type: 'parking',
    object: 'Bilplats 12D',
    address: 'Lindarens väg 8, garage',
    reason: 'Ventilation - service',
    startDate: '2024-03-05',
    status: 'active',
    createdBy: 'Anna Svensson'
  }
];

export const getBarriersByType = (type: 'housing' | 'parking') => {
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

// Create new barrier
export const createBarrier = (barrierData: Omit<Barrier, 'id' | 'createdBy'>) => {
  const newBarrier: Barrier = {
    ...barrierData,
    id: `${barrierData.type.toUpperCase().charAt(0)}${String(Date.now()).slice(-3)}`,
    createdBy: 'Nuvarande användare' // In real app, this would be the current user
  };
  
  mockBarriers.unshift(newBarrier);
  return newBarrier;
};