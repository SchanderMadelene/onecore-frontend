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