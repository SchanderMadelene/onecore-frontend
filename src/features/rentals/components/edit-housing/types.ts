
export type MediaItemType = 'image' | 'video';

export interface MediaItem {
  id: string;
  type: MediaItemType;
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  fileName?: string;
}

export interface EditHousingFormData {
  media: MediaItem[];
  housingObjectType: string;
  moveIn: string;
  moveInDate?: Date;
  availableFrom?: Date;
  eventuallyAvailableFrom?: Date;
  // Publication period
  publishFrom?: Date;
  publishTo?: Date;
  publishUntilFurtherNotice: boolean;
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
