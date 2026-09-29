import type { Note } from "@/shared/common/Notes/types";

/**
 * Exempelnoteringar för historiska bostadsannonser (read-only).
 * Nycklas per annons-id; annonser utan egen uppsättning får standarduppsättningen.
 */
const notesByListing: Record<string, Note[]> = {
  "234-234-234-9001": [
    {
      id: "hn-9001-1",
      content:
        "Sökande tackade ja till erbjudandet 2024-07-10. Kontrakt påskrivet digitalt 2024-07-18 av Lina Sjöberg.",
      createdAt: "2024-07-18T10:24:00",
      createdBy: "Johan Wallin (uthyrning)",
      isPinned: true,
      category: "Uthyrning",
    },
    {
      id: "hn-9001-2",
      content:
        "Visning genomförd 2024-06-14. Hyresgästen visade lägenheten, 5 sökande deltog.",
      createdAt: "2024-06-14T15:05:00",
      createdBy: "Sara Ekman (kundcenter)",
      isPinned: false,
      category: "Uthyrning",
    },
    {
      id: "hn-9001-3",
      content:
        "Boendereferens och kreditupplysning godkända för tilldelad sökande. Ingen betalningsanmärkning.",
      createdAt: "2024-07-08T09:41:00",
      createdBy: "Sara Ekman (kundcenter)",
      isPinned: false,
      category: "Uthyrning",
    },
    {
      id: "hn-9001-4",
      content:
        "Besiktning vid utflyttning klar. Lägenheten lämnad i gott skick, ingen kostnadsansvar registrerad.",
      createdAt: "2024-08-05T13:12:00",
      createdBy: "Anna Bergström (kvartersvärd)",
      isPinned: false,
      category: "Underhåll",
    },
  ],
  "234-234-234-9003": [
    {
      id: "hn-9003-1",
      content:
        "Kontrakt kopplat till Eva Lindqvist efter genomförd erbjudandeomgång 2. Påskrivet 2024-09-12.",
      createdAt: "2024-09-12T14:32:00",
      createdBy: "Johan Wallin (uthyrning)",
      isPinned: true,
      category: "Uthyrning",
    },
    {
      id: "hn-9003-2",
      content:
        "Omgång 1: 5 erbjudanden skickade, 2 tackade ja men drog sig ur innan visning. Omgång 2 påbörjad 2024-08-26.",
      createdAt: "2024-08-26T08:57:00",
      createdBy: "Sara Ekman (kundcenter)",
      isPinned: false,
      category: "Allmänt",
    },
    {
      id: "hn-9003-3",
      content:
        "Notering från intresserad: önskar inflyttning tidigast 2024-10-15 pga uppsägningstid.",
      createdAt: "2024-08-11T16:20:00",
      createdBy: "Sara Ekman (kundcenter)",
      isPinned: false,
      category: "Klagomål",
    },
  ],
};

const defaultHistoryNotes: Note[] = [
  {
    id: "hn-default-1",
    content:
      "Sökande tackade ja till erbjudandet och kontraktet har påskrivits. Annonsen avpublicerad.",
    createdAt: "2024-09-20T10:15:00",
    createdBy: "Johan Wallin (uthyrning)",
    isPinned: true,
    category: "Uthyrning",
  },
  {
    id: "hn-default-2",
    content:
      "Visning genomförd med hyresgästen som visare. 6 sökande bokade, 4 deltog.",
    createdAt: "2024-09-05T14:48:00",
    createdBy: "Sara Ekman (kundcenter)",
    isPinned: false,
    category: "Uthyrning",
  },
  {
    id: "hn-default-3",
    content:
      "Kontroller godkända: boendereferens, kreditupplysning och betalningshistorik utan anmärkning.",
    createdAt: "2024-09-12T09:03:00",
    createdBy: "Sara Ekman (kundcenter)",
    isPinned: false,
    category: "Uthyrning",
  },
];

export function getHistoryNotes(listingId: string): Note[] {
  return notesByListing[listingId] ?? defaultHistoryNotes;
}
