
export interface EditHousingFormData {
  housingObjectType: string;
  moveIn: string;
  moveInDate: string;
  availableFrom: string;
  eventuallyAvailableFrom: string;
  queue: string;
  standardNote: string;
  // Detailed description fields
  mainHeading: string;
  sellingPoint: string;
  webNote: string;
  subHeading: string;
  description: string;
  dishwasher: boolean;
  frontLoadingWasher: boolean;
  individualKitchenMeasurement: boolean;
  tvViaFiber: boolean;
  individualWaterHeaterMeasurement: boolean;
  accessToCommonRoom: boolean;
  combinedRefrigeratorFreezer: boolean;
  accessToOvernightRoom: boolean;
  microwave: boolean;
  handshower: boolean;
  pantry: boolean;
  smokeFreeHouse: boolean;
  tumbleDryer: boolean;
  propertyOwnerPaidApartmentInsurance: boolean;
  parkingInfo: string;
  visitorParkingInfo: string;
}
