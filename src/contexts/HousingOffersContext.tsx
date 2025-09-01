import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface HousingOffer {
  listingId: string;
  selectedApplicants: number[];
  sentAt: string;
  status: 'active' | 'completed';
  responses?: Array<{
    applicantId: number;
    response: 'accepted' | 'declined';
    respondedAt: string;
  }>;
}

interface HousingOffersContextType {
  offers: HousingOffer[];
  createOffer: (listingId: string, selectedApplicants: number[]) => void;
  getOfferForListing: (listingId: string) => HousingOffer | undefined;
  isListingOffered: (listingId: string) => boolean;
}

const HousingOffersContext = createContext<HousingOffersContextType | undefined>(undefined);

export function HousingOffersProvider({ children }: { children: ReactNode }) {
  const [offers, setOffers] = useState<HousingOffer[]>([]);

  const createOffer = (listingId: string, selectedApplicants: number[]) => {
    const newOffer: HousingOffer = {
      listingId,
      selectedApplicants,
      sentAt: new Date().toISOString(),
      status: 'active'
    };
    
    setOffers(prev => [...prev, newOffer]);
  };

  const getOfferForListing = (listingId: string) => {
    return offers.find(offer => offer.listingId === listingId);
  };

  const isListingOffered = (listingId: string) => {
    return offers.some(offer => offer.listingId === listingId);
  };

  return (
    <HousingOffersContext.Provider value={{
      offers,
      createOffer,
      getOfferForListing,
      isListingOffered
    }}>
      {children}
    </HousingOffersContext.Provider>
  );
}

export function useHousingOffers() {
  const context = useContext(HousingOffersContext);
  if (context === undefined) {
    throw new Error('useHousingOffers must be used within a HousingOffersProvider');
  }
  return context;
}