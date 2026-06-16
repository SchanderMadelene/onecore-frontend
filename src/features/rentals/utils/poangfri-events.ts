// Genererar händelseloggsposter från poängfri uthyrning för en specifik kund.
// Matchar både sökandens kundnummer/personnummer och avflyttande hyresgästs personnummer.
import { poangfriListings } from "@/features/rentals/data/poangfri-housing";
import {
  COMMUNICATION_TYPE_LABELS,
  POANGFRI_INTEREST_STATUS_LABELS,
  PoangfriInterest,
  PoangfriListing,
} from "@/features/rentals/types/poangfri";

export interface PoangfriEvent {
  id: string;
  timestamp: string;
  type: "rentals";
  title: string;
  description: string;
  user?: string;
  metadata?: Record<string, any>;
}

const matchesApplicant = (interest: PoangfriInterest, personalNumber: string) =>
  interest.personalNumber === personalNumber ||
  interest.customerNumber === personalNumber;

const matchesOutgoing = (listing: PoangfriListing, personalNumber: string) =>
  listing.outgoingTenantPersonalNumber === personalNumber;

export function getPoangfriEvents(personalNumber: string): PoangfriEvent[] {
  const events: PoangfriEvent[] = [];

  for (const listing of poangfriListings) {
    // Avflyttande hyresgäst: annonsen konverterades till poängfri
    if (matchesOutgoing(listing, personalNumber)) {
      events.push({
        id: `pf-conv-${listing.id}`,
        timestamp: listing.publishedAt,
        type: "rentals",
        title: "Annons konverterad till poängfri uthyrning",
        description: `Annonsen för ${listing.address} gick igenom standardflödet utan kontrakt och konverterades till poängfri uthyrning.`,
        metadata: {
          objectId: listing.rentalObjectId,
          address: listing.address,
          convertedFromAdId: listing.convertedFromAdId,
        },
      });
      if (listing.status === "contract_created") {
        events.push({
          id: `pf-done-${listing.id}`,
          timestamp: listing.publishedAt,
          type: "rentals",
          title: "Kontrakt skapat till ny hyresgäst",
          description: `Den poängfria annonsen för ${listing.address} har resulterat i ett nytt kontrakt.`,
          metadata: {
            objectId: listing.rentalObjectId,
            address: listing.address,
          },
        });
      } else if (listing.status === "unpublished") {
        events.push({
          id: `pf-unp-${listing.id}`,
          timestamp: listing.publishedAt,
          type: "rentals",
          title: "Poängfri annons avpublicerad",
          description: `Den poängfria annonsen för ${listing.address} avpublicerades utan kontrakt.`,
          metadata: { objectId: listing.rentalObjectId, address: listing.address },
        });
      }
    }

    // Sökandes händelser
    for (const interest of listing.interests) {
      if (!matchesApplicant(interest, personalNumber)) continue;

      events.push({
        id: `pf-reg-${interest.id}`,
        timestamp: interest.registeredAt,
        type: "rentals",
        title: "Intresseanmälan på poängfri bostad",
        description: `Anmälan registrerad på ${listing.address} (${listing.rentalObjectId}).`,
        metadata: {
          address: listing.address,
          objectId: listing.rentalObjectId,
          desiredMoveIn: interest.desiredMoveInDate,
        },
      });

      if (interest.acknowledgedAt) {
        events.push({
          id: `pf-ack-${interest.id}`,
          timestamp: interest.acknowledgedAt,
          type: "rentals",
          title: "Intresseanmälan kvitterad",
          description: `Handläggare har kvitterat intresseanmälan för ${listing.address}.`,
          user: interest.acknowledgedBy,
          metadata: { address: listing.address, objectId: listing.rentalObjectId },
        });
      }

      if (interest.viewingBookedAt) {
        events.push({
          id: `pf-view-${interest.id}`,
          timestamp: interest.viewingBookedAt,
          type: "rentals",
          title: "Visning bokad",
          description: `Visning bokad för ${listing.address}.`,
          metadata: { address: listing.address, objectId: listing.rentalObjectId },
        });
      }

      for (const c of interest.communications) {
        events.push({
          id: `pf-comm-${interest.id}-${c.id}`,
          timestamp: c.date,
          type: "rentals",
          title: `Kontakt loggad – ${COMMUNICATION_TYPE_LABELS[c.type]}`,
          description: c.summary,
          user: c.author,
          metadata: { address: listing.address, objectId: listing.rentalObjectId },
        });
      }

      if (
        interest.status === "accepted" ||
        interest.status === "declined" ||
        interest.status === "not_assigned"
      ) {
        events.push({
          id: `pf-status-${interest.id}`,
          timestamp: interest.registeredAt,
          type: "rentals",
          title: `Status: ${POANGFRI_INTEREST_STATUS_LABELS[interest.status]}`,
          description: `Status uppdaterad på poängfri annons ${listing.address}.`,
          metadata: { address: listing.address, objectId: listing.rentalObjectId },
        });
      }
    }
  }

  return events;
}
