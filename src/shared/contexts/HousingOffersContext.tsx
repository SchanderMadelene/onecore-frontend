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
  markEarlyUnpublished: (listingId: string) => void;
  isEarlyUnpublished: (listingId: string) => boolean;
  linkContract: (listingId: string, applicantId: number) => void;
  unlinkContract: (listingId: string) => void;
  getLinkedContract: (listingId: string) => number | undefined;
}

const HousingOffersContext = createContext<HousingOffersContextType | undefined>(undefined);

const MOCK_OFFERS: HousingOffer[] = [
  {
    listingId: "234-234-234-1011",
    selectedApplicants: [4, 8, 11, 14, 1, 6, 10, 15, 5, 2],
    sentAt: "2026-04-15T09:30:00.000Z",
    status: "active",
    responses: [
      { applicantId: 4, response: "accepted", respondedAt: "2026-04-16T10:12:00.000Z" },
      { applicantId: 8, response: "declined", respondedAt: "2026-04-16T14:05:00.000Z" },
    ],
  },
  {
    listingId: "234-234-234-1013",
    selectedApplicants: [11, 4, 8, 14, 6, 1, 15, 10, 5, 12],
    sentAt: "2026-04-12T08:00:00.000Z",
    status: "active",
    responses: [
      { applicantId: 11, response: "accepted", respondedAt: "2026-04-13T09:00:00.000Z" },
      { applicantId: 4, response: "accepted", respondedAt: "2026-04-13T11:20:00.000Z" },
      { applicantId: 6, response: "declined", respondedAt: "2026-04-14T16:45:00.000Z" },
    ],
  },
  {
    listingId: "234-234-234-1015",
    selectedApplicants: [8, 11, 4, 14, 1, 6, 15, 10, 12, 5],
    sentAt: "2026-04-18T13:15:00.000Z",
    status: "active",
    responses: [],
  },
];

export function HousingOffersProvider({ children }: { children: ReactNode }) {
  const [offers, setOffers] = useState<HousingOffer[]>(MOCK_OFFERS);
  const [earlyUnpublished, setEarlyUnpublished] = useState<Set<string>>(new Set());
  const [linkedContracts, setLinkedContracts] = useState<Record<string, number>>({});

  const createOffer = (listingId: string, selectedApplicants: number[]) => {
    const newOffer: HousingOffer = {
      listingId,
      selectedApplicants,
      sentAt: new Date().toISOString(),
      status: 'active'
    };
    setOffers(prev => [...prev, newOffer]);
  };

  const getOfferForListing = (listingId: string) => offers.find(offer => offer.listingId === listingId);
  const isListingOffered = (listingId: string) => offers.some(offer => offer.listingId === listingId);

  const markEarlyUnpublished = (listingId: string) => {
    setEarlyUnpublished(prev => {
      const next = new Set(prev);
      next.add(listingId);
      return next;
    });
  };
  const isEarlyUnpublished = (listingId: string) => earlyUnpublished.has(listingId);

  const linkContract = (listingId: string, applicantId: number) => {
    setLinkedContracts(prev => ({ ...prev, [listingId]: applicantId }));
  };
  const unlinkContract = (listingId: string) => {
    setLinkedContracts(prev => {
      const next = { ...prev };
      delete next[listingId];
      return next;
    });
  };
  const getLinkedContract = (listingId: string) => linkedContracts[listingId];

  return (
    <HousingOffersContext.Provider value={{
      offers,
      createOffer,
      getOfferForListing,
      isListingOffered,
      markEarlyUnpublished,
      isEarlyUnpublished,
      linkContract,
      unlinkContract,
      getLinkedContract,
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