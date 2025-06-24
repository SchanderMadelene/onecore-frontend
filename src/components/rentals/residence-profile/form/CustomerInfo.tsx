
import type { ContactSearchData } from "../types";
import { CustomerInformationCard } from "@/components/shared/CustomerInformationCard";

interface CustomerInfoProps {
  contact: ContactSearchData;
}

export function CustomerInfo({ contact }: CustomerInfoProps) {
  return (
    <CustomerInformationCard 
      customer={contact}
      displayMode="card-header"
      title="Kundinformation"
    />
  );
}
