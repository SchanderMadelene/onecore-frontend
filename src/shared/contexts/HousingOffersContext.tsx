import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react';

export type HousingOfferRoundStatus =
  | 'Active'
  | 'AllDeclined'
  | 'Expired'
  | 'Cancelled'
  | 'Accepted';

export interface HousingOfferRoundResponse {
  applicantId: number;
  response: 'accepted' | 'declined';
  respondedAt: string;
}

export interface HousingOfferRound {
  id: number;
  listingId: string;
  roundNumber: number;
  selectedApplicants: number[];
  sentAt: string;
  expiresAt: string;
  status: HousingOfferRoundStatus;
  responses: HousingOfferRoundResponse[];
}

/**
 * Bakåtkompatibel "platt" representation. Behålls för komponenter (t.ex.
 * OfferedHousingTable) som listar alla erbjudanden tvärs alla annonser.
 * En post per omgång.
 */
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
  /** Platt lista av alla rounds (bakåtkompatibel) */
  offers: HousingOffer[];

  /** Manuella omgångar per listing */
  getRoundsForListing: (listingId: string) => HousingOfferRound[];
  getActiveRound: (listingId: string) => HousingOfferRound | undefined;
  getLatestRound: (listingId: string) => HousingOfferRound | undefined;
  canStartNewRound: (listingId: string) => boolean;
  startNewRound: (listingId: string, selectedApplicants: number[]) => void;
  cancelActiveRound: (listingId: string) => void;
  /** Sökande som fått minst ett erbjudande (för markering i tabellen) */
  getApplicantsWhoReceivedOffer: (listingId: string) => Set<number>;
  /** Hämta vilken omgång en sökande senast fick erbjudande i */
  getRoundNumberForApplicant: (listingId: string, applicantId: number) => number | undefined;

  /** Bakåtkompatibel API som anropar startNewRound */
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

/**
 * Mockdata: olika scenarier för att visa upp omgångar.
 * - 1011: omgång 1 aktiv, två svar
 * - 1013: omgång 1 alla nekade, omgång 2 aktiv (ett ja-svar)
 * - 1015: omgång 1 aktiv, inga svar än
 * - 1017: omgång 1 avbruten, omgång 2 aktiv
 */
const MOCK_ROUNDS: Record<string, HousingOfferRound[]> = {
  '234-234-234-1011': [
    {
      id: 1011_1,
      listingId: '234-234-234-1011',
      roundNumber: 1,
      selectedApplicants: [4, 8, 11, 14, 1, 6, 10, 15, 5, 2],
      sentAt: '2026-04-15T09:30:00.000Z',
      expiresAt: '2026-04-22T09:30:00.000Z',
      status: 'Active',
      responses: [
        { applicantId: 4, response: 'accepted', respondedAt: '2026-04-16T10:12:00.000Z' },
        { applicantId: 8, response: 'declined', respondedAt: '2026-04-16T14:05:00.000Z' },
      ],
    },
  ],
  '234-234-234-1013': [
    {
      id: 1013_1,
      listingId: '234-234-234-1013',
      roundNumber: 1,
      selectedApplicants: [11, 4, 8, 14, 6, 1, 15, 10, 5, 12],
      sentAt: '2026-04-05T08:00:00.000Z',
      expiresAt: '2026-04-12T08:00:00.000Z',
      status: 'AllDeclined',
      responses: [
        { applicantId: 11, response: 'declined', respondedAt: '2026-04-06T09:00:00.000Z' },
        { applicantId: 4, response: 'declined', respondedAt: '2026-04-07T11:20:00.000Z' },
        { applicantId: 6, response: 'declined', respondedAt: '2026-04-08T16:45:00.000Z' },
      ],
    },
    {
      id: 1013_2,
      listingId: '234-234-234-1013',
      roundNumber: 2,
      selectedApplicants: [9, 13, 7, 3, 12],
      sentAt: '2026-04-15T08:00:00.000Z',
      expiresAt: '2026-04-22T08:00:00.000Z',
      status: 'Active',
      responses: [
        { applicantId: 9, response: 'accepted', respondedAt: '2026-04-16T12:00:00.000Z' },
      ],
    },
  ],
  '234-234-234-1015': [
    {
      id: 1015_1,
      listingId: '234-234-234-1015',
      roundNumber: 1,
      selectedApplicants: [8, 11, 4, 14, 1, 6, 15, 10, 12, 5],
      sentAt: '2026-04-18T13:15:00.000Z',
      expiresAt: '2026-04-25T13:15:00.000Z',
      status: 'Active',
      responses: [],
    },
  ],
};

const ROUND_DURATION_DAYS = 7;

function flattenRounds(byListing: Record<string, HousingOfferRound[]>): HousingOffer[] {
  const out: HousingOffer[] = [];
  for (const rounds of Object.values(byListing)) {
    for (const r of rounds) {
      out.push({
        listingId: r.listingId,
        selectedApplicants: r.selectedApplicants,
        sentAt: r.sentAt,
        status: r.status === 'Active' ? 'active' : 'completed',
        responses: r.responses,
      });
    }
  }
  return out;
}

export function HousingOffersProvider({ children }: { children: ReactNode }) {
  const [roundsByListing, setRoundsByListing] = useState<Record<string, HousingOfferRound[]>>(MOCK_ROUNDS);
  const [earlyUnpublished, setEarlyUnpublished] = useState<Set<string>>(new Set());
  const [linkedContracts, setLinkedContracts] = useState<Record<string, number>>({});

  const offers = useMemo(() => flattenRounds(roundsByListing), [roundsByListing]);

  const getRoundsForListing = (listingId: string) => roundsByListing[listingId] ?? [];

  const getActiveRound = (listingId: string) =>
    (roundsByListing[listingId] ?? []).find(r => r.status === 'Active');

  const getLatestRound = (listingId: string) => {
    const rounds = roundsByListing[listingId] ?? [];
    return rounds.length ? rounds[rounds.length - 1] : undefined;
  };

  const canStartNewRound = (listingId: string) => {
    const rounds = roundsByListing[listingId] ?? [];
    if (rounds.length === 0) return true;
    // Får inte starta om aktiv eller accepterad omgång finns
    return !rounds.some(r => r.status === 'Active' || r.status === 'Accepted');
  };

  const startNewRound = (listingId: string, selectedApplicants: number[]) => {
    setRoundsByListing(prev => {
      const existing = prev[listingId] ?? [];
      const nextRoundNumber = existing.length + 1;
      const now = new Date();
      const expires = new Date(now.getTime() + ROUND_DURATION_DAYS * 24 * 3600 * 1000);
      const newRound: HousingOfferRound = {
        id: Date.now(),
        listingId,
        roundNumber: nextRoundNumber,
        selectedApplicants,
        sentAt: now.toISOString(),
        expiresAt: expires.toISOString(),
        status: 'Active',
        responses: [],
      };
      return { ...prev, [listingId]: [...existing, newRound] };
    });
  };

  const cancelActiveRound = (listingId: string) => {
    setRoundsByListing(prev => {
      const existing = prev[listingId];
      if (!existing) return prev;
      return {
        ...prev,
        [listingId]: existing.map(r =>
          r.status === 'Active' ? { ...r, status: 'Cancelled' as const } : r,
        ),
      };
    });
  };

  const getApplicantsWhoReceivedOffer = (listingId: string) => {
    const rounds = roundsByListing[listingId] ?? [];
    const set = new Set<number>();
    for (const r of rounds) for (const id of r.selectedApplicants) set.add(id);
    return set;
  };

  const getRoundNumberForApplicant = (listingId: string, applicantId: number) => {
    const rounds = roundsByListing[listingId] ?? [];
    for (let i = rounds.length - 1; i >= 0; i--) {
      if (rounds[i].selectedApplicants.includes(applicantId)) return rounds[i].roundNumber;
    }
    return undefined;
  };

  // Bakåtkompatibel API
  const createOffer = (listingId: string, selectedApplicants: number[]) =>
    startNewRound(listingId, selectedApplicants);

  const getOfferForListing = (listingId: string): HousingOffer | undefined => {
    const active = getActiveRound(listingId) ?? getLatestRound(listingId);
    if (!active) return undefined;
    return {
      listingId: active.listingId,
      selectedApplicants: active.selectedApplicants,
      sentAt: active.sentAt,
      status: active.status === 'Active' ? 'active' : 'completed',
      responses: active.responses,
    };
  };

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
    <HousingOffersContext.Provider
      value={{
        offers,
        getRoundsForListing,
        getActiveRound,
        getLatestRound,
        canStartNewRound,
        startNewRound,
        cancelActiveRound,
        getApplicantsWhoReceivedOffer,
        getRoundNumberForApplicant,
        createOffer,
        getOfferForListing,
        isListingOffered,
        markEarlyUnpublished,
        isEarlyUnpublished,
        linkContract,
        unlinkContract,
        getLinkedContract,
      }}
    >
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
