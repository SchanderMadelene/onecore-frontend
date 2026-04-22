import { ReactNode } from "react";
import { HousingOffersProvider } from "@/contexts/HousingOffersContext";

/**
 * Layout wrapper that scopes the HousingOffersProvider to the rentals routes
 * so unrelated pages don't pay the cost of initializing rentals state.
 */
export function RentalsLayout({ children }: { children: ReactNode }) {
  return <HousingOffersProvider>{children}</HousingOffersProvider>;
}
