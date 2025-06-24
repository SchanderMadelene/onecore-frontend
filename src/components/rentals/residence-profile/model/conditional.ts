
export const housingFieldMatrix = {
  RENTAL: ['landlord', 'housingReference.phone', 'housingReference.email', 'numAdults', 'numChildren'],
  SUB_RENTAL: ['landlord', 'housingReference.phone', 'housingReference.email', 'numAdults', 'numChildren'],
  LIVES_WITH_FAMILY: ['housingTypeDescription', 'numAdults', 'numChildren'],
  LODGER: ['landlord', 'housingReference.phone', 'housingReference.email', 'numAdults', 'numChildren'],
  OWNS_HOUSE: ['numAdults', 'numChildren'],
  OWNS_FLAT: ['numAdults', 'numChildren'],
  OWNS_ROW_HOUSE: ['numAdults', 'numChildren'],
  OTHER: ['housingTypeDescription', 'numAdults', 'numChildren'],
} as const;
