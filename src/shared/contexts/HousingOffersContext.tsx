import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react';

export type HousingRoundStatus =
  | 'Active'
  | 'AllDeclined'
  | 'Expired'
  | 'Cancelled'
  | 'Awarded';

export type HousingResponseSource = 'mina_sidor' | 'admin';

export interface HousingOfferRoundResponse {
  applicantId: number;
  response: 'accepted' | 'declined';
  respondedAt: string;
  source?: HousingResponseSource;
}

export interface HousingOfferRound {
  id: number;
  roundNumber: number;
  status: HousingRoundStatus;
  selectedApplicants: number[];
  sentAt: string;
  expiresAt: string;
  responses: HousingOfferRoundResponse[];
  /** Set när admin tilldelat kontrakt till en sökande i denna rond. */
  awardedApplicantId?: number;
  awardedAt?: string;
}

/** Signerat kontrakt på listing-nivå (en per listing). */
export interface SignedContract {
  applicantId: number;
  contractedTo: string;
  signedAt: string;
}

/**
 * Bakåtkompatibel form av en "offer" så att äldre komponenter
 * (t.ex. OfferedHousingTable) kan fortsätta läsa `offers` som ett
 * platt array över alla rondar för alla listings.
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
  /** Bakåtkompatibel platt vy av alla rondar over alla listings */
  offers: HousingOffer[];

  /** Skapar en ny erbjudandeomgång för en bostadsannons */
  startNewRound: (listingId: string, applicantIds: number[]) => void;
  /** Avbryter en specifik omgång (sätter status Cancelled). */
  cancelRound: (listingId: string, roundId: number) => void;

  /** Registrera svar från sökande (Mina sidor eller admin). */
  recordResponse: (
    listingId: string,
    applicantId: number,
    response: 'accepted' | 'declined',
    source?: HousingResponseSource,
  ) => void;
  /** Admin tilldelar kontrakt till en sökande i en specifik rond. Stänger övriga aktiva rondar. */
  awardOffer: (listingId: string, roundId: number, applicantId: number) => void;
  /** Ångra tilldelning. */
  unawardOffer: (listingId: string, roundId: number) => void;

  /** Signera/koppla kontrakt — flyttar listingen till Historik. */
  signContract: (listingId: string, applicantId: number, contractedTo: string) => void;
  /** Ångra signering. */
  unsignContract: (listingId: string) => void;
  /** Hämta signerat kontrakt för en listing. */
  getSignedContract: (listingId: string) => SignedContract | undefined;

  /** Alla rondar för en listing (med derived status applicerad), sorterade. */
  getRoundsForListing: (listingId: string) => HousingOfferRound[];
  /** Aktiva rondar (derived) för en listing */
  getActiveRounds: (listingId: string) => HousingOfferRound[];
  /** Derived status för en rond — tar hänsyn till expiresAt. */
  getDerivedRoundStatus: (round: HousingOfferRound) => HousingRoundStatus;
  /** Senaste rondnumret som sökanden ingått i (för "Fick omgång N"-badge) */
  getRoundNumberForApplicant: (listingId: string, applicantId: number) => number | undefined;
  /** Map av applicantId → senaste rondnummer för rondar med roundNumber < beforeRound */
  getPreviousRoundsByApplicant: (listingId: string, beforeRound: number) => Record<number, number>;

  /** Sant om listingen har minst en rond */
  isListingOffered: (listingId: string) => boolean;
  /** Sant om listingen är tilldelad (någon rond är Awarded) */
  isListingAssigned: (listingId: string) => boolean;
  /** Sant om en ny omgång kan startas (ingen rond är Awarded, inget signerat kontrakt) */
  canStartNewRound: (listingId: string) => boolean;
  /** Hämta första rondens "offer-form" (bakåtkompatibilitet) */
  getOfferForListing: (listingId: string) => HousingOffer | undefined;

  markEarlyUnpublished: (listingId: string) => void;
  isEarlyUnpublished: (listingId: string) => boolean;

  /** @deprecated alias för signContract — flyttar listingen till Historik. */
  linkContract: (listingId: string, applicantId: number) => void;
  /** @deprecated alias för unsignContract */
  unlinkContract: (listingId: string) => void;
  /** @deprecated alias som returnerar applicantId från signerat kontrakt */
  getLinkedContract: (listingId: string) => number | undefined;
}

const HousingOffersContext = createContext<HousingOffersContextType | undefined>(undefined);

const DAY_MS = 24 * 60 * 60 * 1000;

const addDaysIso = (iso: string, days: number) =>
  new Date(new Date(iso).getTime() + days * DAY_MS).toISOString();

/**
 * Mock-data: visar olika scenarier direkt i UI:t.
 * - 1011: omgång 1 aktiv, 2 har tackat ja, ingen tilldelad → "Erbjudna" + "Klar för tilldelning"
 * - 1013: omgång 1 AllDeclined, omgång 2 aktiv med 1 ja → "Erbjudna"
 * - 1015: omgång 1 aktiv, en sökande Awarded → "Kontrakt"
 */
const MOCK_ROUNDS_BY_LISTING: Record<string, HousingOfferRound[]> = {
  "234-234-234-1011": [
    {
      id: 1011001,
      roundNumber: 1,
      status: "Active",
      selectedApplicants: [4, 8, 11, 14, 1, 6, 10, 15, 5, 2],
      sentAt: "2026-04-15T09:30:00.000Z",
      expiresAt: addDaysIso("2026-04-15T09:30:00.000Z", 30),
      responses: [
        { applicantId: 4, response: "accepted", respondedAt: "2026-04-16T10:12:00.000Z", source: "mina_sidor" },
        { applicantId: 11, response: "accepted", respondedAt: "2026-04-17T08:45:00.000Z", source: "mina_sidor" },
        { applicantId: 8, response: "declined", respondedAt: "2026-04-16T14:05:00.000Z", source: "mina_sidor" },
      ],
    },
  ],
  "234-234-234-1013": [
    {
      id: 1013001,
      roundNumber: 1,
      status: "AllDeclined",
      selectedApplicants: [11, 4, 8, 14, 6, 1, 15, 10, 5, 12],
      sentAt: "2026-04-08T08:00:00.000Z",
      expiresAt: addDaysIso("2026-04-08T08:00:00.000Z", 7),
      responses: [
        { applicantId: 11, response: "declined", respondedAt: "2026-04-09T09:00:00.000Z", source: "mina_sidor" },
        { applicantId: 4, response: "declined", respondedAt: "2026-04-09T11:20:00.000Z", source: "mina_sidor" },
        { applicantId: 6, response: "declined", respondedAt: "2026-04-10T16:45:00.000Z", source: "mina_sidor" },
      ],
    },
    {
      id: 1013002,
      roundNumber: 2,
      status: "Active",
      selectedApplicants: [3, 7, 9, 13, 16, 17, 18, 19, 20, 21],
      sentAt: "2026-04-18T10:00:00.000Z",
      expiresAt: addDaysIso("2026-04-18T10:00:00.000Z", 30),
      responses: [
        { applicantId: 3, response: "accepted", respondedAt: "2026-04-19T12:30:00.000Z", source: "mina_sidor" },
      ],
    },
  ],
  "234-234-234-1015": [
    {
      id: 1015001,
      roundNumber: 1,
      status: "Awarded",
      selectedApplicants: [8, 11, 4, 14, 1, 6, 15, 10, 12, 5],
      sentAt: "2026-04-18T13:15:00.000Z",
      expiresAt: addDaysIso("2026-04-18T13:15:00.000Z", 30),
      responses: [
        { applicantId: 8, response: "accepted", respondedAt: "2026-04-19T09:00:00.000Z", source: "mina_sidor" },
        { applicantId: 11, response: "accepted", respondedAt: "2026-04-19T10:15:00.000Z", source: "mina_sidor" },
      ],
      awardedApplicantId: 8,
      awardedAt: "2026-04-20T14:00:00.000Z",
    },
  ],
};

function deriveOffersArray(
  roundsByListing: Record<string, HousingOfferRound[]>
): HousingOffer[] {
  const offers: HousingOffer[] = [];
  for (const [listingId, rounds] of Object.entries(roundsByListing)) {
    for (const r of rounds) {
      offers.push({
        listingId,
        selectedApplicants: r.selectedApplicants,
        sentAt: r.sentAt,
        status: r.status === "Active" ? "active" : "completed",
        responses: r.responses,
      });
    }
  }
  return offers;
}

export function HousingOffersProvider({ children }: { children: ReactNode }) {
  const [roundsByListing, setRoundsByListing] = useState<Record<string, HousingOfferRound[]>>(
    MOCK_ROUNDS_BY_LISTING
  );
  const [earlyUnpublished, setEarlyUnpublished] = useState<Set<string>>(new Set());
  const [contractsByListing, setContractsByListing] = useState<Record<string, SignedContract>>({});

  const offers = useMemo(() => deriveOffersArray(roundsByListing), [roundsByListing]);

  const getDerivedRoundStatus = (round: HousingOfferRound): HousingRoundStatus => {
    if (round.status !== 'Active') return round.status;
    if (new Date(round.expiresAt).getTime() <= Date.now()) return 'Expired';
    return 'Active';
  };

  const applyDerived = (round: HousingOfferRound): HousingOfferRound => {
    const derived = getDerivedRoundStatus(round);
    return derived === round.status ? round : { ...round, status: derived };
  };

  const getRoundsForListing = (listingId: string): HousingOfferRound[] => {
    const rounds = roundsByListing[listingId] ?? [];
    return [...rounds]
      .map(applyDerived)
      .sort((a, b) => a.roundNumber - b.roundNumber);
  };

  const getActiveRounds = (listingId: string) =>
    getRoundsForListing(listingId).filter(r => r.status === "Active");

  const isListingOffered = (listingId: string) =>
    (roundsByListing[listingId]?.length ?? 0) > 0;

  const isListingAssigned = (listingId: string) =>
    (roundsByListing[listingId] ?? []).some(r => r.status === "Awarded");

  const canStartNewRound = (listingId: string) =>
    !isListingAssigned(listingId) && !contractsByListing[listingId];

  const startNewRound = (listingId: string, applicantIds: number[]) => {
    setRoundsByListing(prev => {
      const existing = prev[listingId] ?? [];
      const nextNumber = existing.reduce((m, r) => Math.max(m, r.roundNumber), 0) + 1;
      const sentAt = new Date().toISOString();
      const newRound: HousingOfferRound = {
        id: Date.now(),
        roundNumber: nextNumber,
        status: "Active",
        selectedApplicants: applicantIds,
        sentAt,
        expiresAt: addDaysIso(sentAt, 7),
        responses: [],
      };
      return { ...prev, [listingId]: [...existing, newRound] };
    });
  };

  const cancelRound = (listingId: string, roundId: number) => {
    setRoundsByListing(prev => {
      const list = prev[listingId];
      if (!list) return prev;
      return {
        ...prev,
        [listingId]: list.map(r =>
          r.id === roundId && r.status === "Active" ? { ...r, status: "Cancelled" } : r
        ),
      };
    });
  };

  const recordResponse = (
    listingId: string,
    applicantId: number,
    response: 'accepted' | 'declined',
    source: HousingResponseSource = 'mina_sidor',
  ) => {
    setRoundsByListing(prev => {
      const list = prev[listingId];
      if (!list) return prev;
      const respondedAt = new Date().toISOString();
      const updated = list.map(round => {
        if (round.status !== 'Active') return round;
        if (!round.selectedApplicants.includes(applicantId)) return round;

        // Ersätt eventuellt tidigare svar
        const newResponses = [
          ...round.responses.filter(r => r.applicantId !== applicantId),
          { applicantId, response, respondedAt, source },
        ];

        // Om alla i selectedApplicants nekat → AllDeclined
        const declinedIds = new Set(
          newResponses.filter(r => r.response === 'declined').map(r => r.applicantId)
        );
        const allDeclined =
          round.selectedApplicants.length > 0 &&
          round.selectedApplicants.every(id => declinedIds.has(id));

        return {
          ...round,
          responses: newResponses,
          status: allDeclined ? ('AllDeclined' as HousingRoundStatus) : round.status,
        };
      });
      return { ...prev, [listingId]: updated };
    });
  };

  const awardOffer = (listingId: string, roundId: number, applicantId: number) => {
    const awardedAt = new Date().toISOString();
    setRoundsByListing(prev => {
      const list = prev[listingId];
      if (!list) return prev;
      const updated = list.map(round => {
        if (round.id === roundId) {
          return {
            ...round,
            awardedApplicantId: applicantId,
            awardedAt,
            status: 'Awarded' as HousingRoundStatus,
          };
        }
        // Stäng övriga aktiva rondar för samma listing
        if (round.status === 'Active') {
          return { ...round, status: 'Cancelled' as HousingRoundStatus };
        }
        return round;
      });
      return { ...prev, [listingId]: updated };
    });
  };

  const unawardOffer = (listingId: string, roundId: number) => {
    setRoundsByListing(prev => {
      const list = prev[listingId];
      if (!list) return prev;
      return {
        ...prev,
        [listingId]: list.map(round =>
          round.id === roundId && round.status === 'Awarded'
            ? {
                ...round,
                awardedApplicantId: undefined,
                awardedAt: undefined,
                status: 'Active' as HousingRoundStatus,
              }
            : round
        ),
      };
    });
  };

  const signContract = (listingId: string, applicantId: number, contractedTo: string) => {
    setContractsByListing(prev => ({
      ...prev,
      [listingId]: { applicantId, contractedTo, signedAt: new Date().toISOString() },
    }));
  };

  const unsignContract = (listingId: string) => {
    setContractsByListing(prev => {
      const next = { ...prev };
      delete next[listingId];
      return next;
    });
  };

  const getSignedContract = (listingId: string): SignedContract | undefined =>
    contractsByListing[listingId];

  const getRoundNumberForApplicant = (listingId: string, applicantId: number) => {
    const rounds = roundsByListing[listingId] ?? [];
    let latest: number | undefined;
    for (const r of rounds) {
      if (r.selectedApplicants.includes(applicantId)) {
        if (latest === undefined || r.roundNumber > latest) latest = r.roundNumber;
      }
    }
    return latest;
  };

  const getPreviousRoundsByApplicant = (listingId: string, beforeRound: number) => {
    const rounds = roundsByListing[listingId] ?? [];
    const map: Record<number, number> = {};
    for (const r of rounds) {
      if (r.roundNumber >= beforeRound) continue;
      for (const id of r.selectedApplicants) {
        if (map[id] === undefined || r.roundNumber > map[id]) {
          map[id] = r.roundNumber;
        }
      }
    }
    return map;
  };

  const getOfferForListing = (listingId: string): HousingOffer | undefined => {
    const rounds = getRoundsForListing(listingId);
    if (rounds.length === 0) return undefined;
    const r = rounds[0];
    return {
      listingId,
      selectedApplicants: r.selectedApplicants,
      sentAt: r.sentAt,
      status: r.status === "Active" ? "active" : "completed",
      responses: r.responses,
    };
  };

  const markEarlyUnpublished = (listingId: string) => {
    setEarlyUnpublished(prev => {
      const next = new Set(prev);
      next.add(listingId);
      return next;
    });
  };
  const isEarlyUnpublished = (listingId: string) => earlyUnpublished.has(listingId);

  // Bakåtkompatibla aliases — koppling = signering = flytt till Historik
  const linkContract = (listingId: string, applicantId: number) => {
    // Härled namn från ev. tidigare signering eller använd generisk text;
    // riktigt namn sätts av callern via signContract i nya UI:t.
    signContract(listingId, applicantId, contractsByListing[listingId]?.contractedTo ?? '');
  };
  const unlinkContract = (listingId: string) => unsignContract(listingId);
  const getLinkedContract = (listingId: string) => contractsByListing[listingId]?.applicantId;

  return (
    <HousingOffersContext.Provider
      value={{
        offers,
        startNewRound,
        cancelRound,
        recordResponse,
        awardOffer,
        unawardOffer,
        signContract,
        unsignContract,
        getSignedContract,
        getRoundsForListing,
        getActiveRounds,
        getDerivedRoundStatus,
        getRoundNumberForApplicant,
        getPreviousRoundsByApplicant,
        isListingOffered,
        isListingAssigned,
        canStartNewRound,
        getOfferForListing,
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
