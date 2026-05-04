/**
 * Typ för förråd. Speglar ParkingSpace fullt ut så att samma komponenter kan
 * användas för båda. Fältet `type` håller förrådstyp ("Källarförråd" osv).
 */
export interface StorageSpace {
  id: string;
  address: string;
  area: string;
  type: string;
  queueType: string;
  rent: string;
  seekers: number;
  publishedFrom: string;
  publishedTo: string;
}
