import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

export type RoundStatus = 'Active' | 'AllDeclined' | 'Cancelled' | 'Accepted';

export interface RoundResponse {
  applicantId: number;
  response: 'accepted' | 'declined';
  respondedAt: string;
}

export interface HousingOfferRound {
  id: string;
  roundNumber: number;
  status: RoundStatus;
  selectedApplicants: number[];
  sentAt: string;
  expiresAt?: string;
  responses: RoundResponse[];
}

/** Bakåtkompatibel "platt" representation — deriveras från sista aktiva omgången per listing. */
export interface HousingOffer {
  listingId: string;
  selectedApplicants: number[];
  sentAt: string;
  status: 'active' | 'completed';
  responses?: RoundResponse[];
}

interface HousingOffersContextType {
  offers: HousingOffer[];
  /** @deprecated — använd startNewRound */
  createOffer: (listingId: string, selectedApplicants: number[]) => void;
  startNewRound: (listingId: string, selectedApplicants: number[], expiresAt?: string) => void;
  cancelRound: (listingId: string, roundId: string) => void;
  getRoundsForListing: (listingId: string) => HousingOfferRound[];
  canStartNewRound: (listingId: string) => boolean;
  getOfferForListing: (listingId: string) => HousingOffer | undefined;
  isListingOffered: (listingId: string) => boolean;
  markEarlyUnpublished: (listingId: string) => void;
  isEarlyUnpublished: (listingId: string) => boolean;
  linkContract: (listingId: string, applicantId: number) => void;
  unlinkContract: (listingId: string) => void;
  getLinkedContract: (listingId: string) => number | undefined;
}

const HousingOffersContext = createContext<HousingOffersContextType | undefined>(undefined);

const MOCK_ROUNDS: Record<string, HousingOfferRound[]> = {
  "234-234-234-1011": [
    {
      id: "r-1011-1",
      roundNumber: 1,
      status: 'Active',
      selectedApplicants: [4, 8, 11, 14, 1, 6, 10, 15, 5, 2],
      sentAt: "2026-04-15T09:30:00.000Z",
      expiresAt: "2026-04-22T09:30:00.000Z",
      responses: [
        { applicantId: 4, response: "accepted", respondedAt: "2026-04-16T10:12:00.000Z" },
        { applicantId: 8, response: "declined", respondedAt: "2026-04-16T14:05:00.000Z" },
      ],
    },
  ],
  "234-234-234-1013": [
    {
      id: "r-1013-1",
      roundNumber: 1,
      status: 'Active',
      selectedApplicants: [11, 4, 8, 14, 6, 1, 15, 10, 5, 12],
      sentAt: "2026-04-12T08:00:00.000Z",
      expiresAt: "2026-04-19T08:00:00.000Z",
      responses: [
        { applicantId: 11, response: "declined", respondedAt: "2026-04-13T09:00:00.000Z" },
        { applicantId: 4, response: "declined", respondedAt: "2026-04-13T11:20:00.000Z" },
        { applicantId: 6, response: "declined", respondedAt: "2026-04-14T16:45:00.000Z" },
      ],
    },
    {
      id: "r-1013-2",
      roundNumber: 2,
      status: 'Active',
      selectedApplicants: [2, 7, 9, 13, 16],
      sentAt: "2026-04-20T10:00:00.000Z",
      expiresAt: "2026-04-27T10:00:00.000Z",
      responses: [],
    },
  ],
  "234-234-234-1015": [
    {
      id: "r-1015-1",
      roundNumber: 1,
      status: 'Active',
      selectedApplicants: [8, 11, 4, 14, 1, 6, 15, 10, 12, 5],
      sentAt: "2026-04-18T13:15:00.000Z",
      expiresAt: "2026-04-25T13:15:00.000Z",
      responses: [],
    },
  ],
};

function deriveOffer(listingId: string, rounds: HousingOfferRound[]): HousingOffer | undefined {
  if (!rounds || rounds.length === 0) return undefined;
  // Slå ihop alla aktiva omgångars selectedApplicants för bakåtkompatibilitet.
  const activeRounds = rounds.filter(r => r.status === 'Active' || r.status === 'Accepted');
  const source = activeRounds.length > 0 ? activeRounds : rounds;
  const allSelected = Array.from(new Set(source.flatMap(r => r.selectedApplicants)));
  const allResponses = source.flatMap(r => r.responses);
  const sentAt = source[0].sentAt;
  const status: 'active' | 'completed' =
    rounds.some(r => r.status === 'Accepted') ? 'completed' : 'active';
  return { listingId, selectedApplicants: allSelected, sentAt, status, responses: allResponses };
}

export function HousingOffersProvider({ children }: { children: ReactNode }) {
  const [roundsByListing, setRoundsByListing] = useState<Record<string, HousingOfferRound[]>>(MOCK_ROUNDS);
  const [earlyUnpublished, setEarlyUnpublished] = useState<Set<string>>(new Set());
  const [linkedContracts, setLinkedContracts] = useState<Record<string, number>>({});

  const offers = useMemo<HousingOffer[]>(() => {
    return Object.entries(roundsByListing)
      .map(([id, rounds]) => deriveOffer(id, rounds))
      .filter((o): o is HousingOffer => !!o);
  }, [roundsByListing]);

  const startNewRound = (listingId: string, selectedApplicants: number[], expiresAt?: string) => {
    setRoundsByListing(prev => {
      const existing = prev[listingId] ?? [];
      const nextNumber = existing.length + 1;
      const newRound: HousingOfferRound = {
        id: `r-${listingId}-${nextNumber}-${Date.now()}`,
        roundNumber: nextNumber,
        status: 'Active',
        selectedApplicants,
        sentAt: new Date().toISOString(),
        expiresAt,
        responses: [],
      };
      return { ...prev, [listingId]: [...existing, newRound] };
    });
  };

  const cancelRound = (listingId: string, roundId: string) => {
    setRoundsByListing(prev => {
      const existing = prev[listingId];
      if (!existing) return prev;
      return {
        ...prev,
        [listingId]: existing.map(r => r.id === roundId ? { ...r, status: 'Cancelled' as RoundStatus } : r),
      };
    });
  };

  const getRoundsForListing = (listingId: string) => roundsByListing[listingId] ?? [];

  const canStartNewRound = (listingId: string) => {
    const rounds = roundsByListing[listingId] ?? [];
    if (rounds.length === 0) return false;
    return !rounds.some(r => r.status === 'Accepted');
  };

  const createOffer = (listingId: string, selectedApplicants: number[]) =>
    startNewRound(listingId, selectedApplicants);

  const getOfferForListing = (listingId: string) => offers.find(o => o.listingId === listingId);
  const isListingOffered = (listingId: string) => (roundsByListing[listingId]?.length ?? 0) > 0;

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
      startNewRound,
      cancelRound,
      getRoundsForListing,
      canStartNewRound,
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
