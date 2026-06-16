# Poängfri bostad – tre regelförändringar

## 1. Auto-konvertering: standardannons → poängfri

**Regel:** En bostadsannons som gått igenom standardflödet (publicerad → klar för erbjudande → erbjudande skickat → alla tackat nej / inget kontrakt skapat) byter automatiskt uthyrningsprocess till **poängfri**.

**Var:**
- `useHousingStatus` får en ny härledd status `converted_to_poangfri` när:
  - alla aktiva offer-rounds har status `AllDeclined` eller `Cancelled`, **eller**
  - publiceringen löpt ut + inget kontrakt kopplat efter en viss tid (mockas via flagga).
- När detta inträffar speglas annonsen i `poangfriListings` (mock) med `convertedFromAdId` satt och `status: "published"`.
- I `HousingDetailPage` visas en Badge **"Konverterad till poängfri"** + länk till poängfri-detaljsidan; raden försvinner från "Klara för erbjudande"-fliken och dyker upp i poängfri-listan.

Inga riktiga jobb/cron behövs – konverteringen sker via en helper som kallas när användaren besöker listorna (mockflöde).

## 2. Sökandestatus "Ny" → "Obehandlad" + manuell kvittering

**Det är sökanden, inte annonsen, som ska kvitteras.**

**Datamodell (`features/rentals/types/poangfri.ts`):**
- Byt `PoangfriInterestStatus` `"new"` → `"unhandled"` (etikett **"Obehandlad"**, variant `warning` istället för `info` så den sticker ut).
- Lägg till `acknowledgedAt?: string` och `acknowledgedBy?: string` på `PoangfriInterest`.
- Ny härledd status `"acknowledged"` (etikett **"Kvitterad"**) som sätts när handläggare kvitterar; därefter kan status flyttas vidare till `contacted` / `accepted` / `declined` som idag.

**UI (`PoangfriHousingDetailPage` + `PoangfriInterestSheet`):**
- Intresselistan: obehandlade rader får en svagt highlight-bakgrund och en inline-knapp **"Kvittera"** längst till höger (variant `outline`, ingen ikon – följer button-icon-regeln). Klick → bekräftelse via `ConfirmDialog` → sätter `acknowledgedAt` + nuvarande användare, byter status till `acknowledged`, loggar händelse.
- Räknare i sidhuvudet: **"X obehandlade"** Badge (warning).
- Sortering: obehandlade sökande hamnar överst tills de är kvitterade.
- `PoangfriInterestSheet`: knappen syns även där om sökanden öppnas innan kvittering.

**Ingen bulk-kvittering** i denna iteration – varje sökande kräver aktiv handling.

## 3. Händelselogg på kundkortet

Använder befintlig `TenantEvent`-modell (`src/entities/tenant/types/tenant.ts` + `src/entities/tenant/data/tenant-events.ts`). Ny event-typ behövs inte – återanvänd `'rentals'` om den finns, annars lägg till `'rentals'` som tillåten `type`.

**A. Sökandes kundkort** (matchas via `customerNumber` på `PoangfriInterest`):
- `Intresseanmälan registrerad` – när anmälan kommer in på Mimer.nu.
- `Kvitterad av handläggare` – när handläggaren kvitterar (visar handläggarnamn).
- `Kontakt loggad` – återanvänder befintligt flöde i `PoangfriLogContactDialog`.
- `Visning bokad`, `Tackat ja/nej`, `Ej tilldelad`.

**B. Avflyttande hyresgästs kundkort** (matchas via kontraktets nuvarande hyresgäst på `rentalObjectId`):
- `Annons konverterad till poängfri uthyrning` – när auto-konverteringen sker.
- `Poängfri annons avpublicerad` / `Kontrakt skapat till ny hyresgäst`.

Eventen genereras dynamiskt i `getTenantEvents(personalNumber)` genom en ny helper `getPoangfriEvents(personalNumber)` som läser `poangfriListings` (mock), så ingen separat sync-logik behövs.

## Tekniska detaljer

```text
features/rentals/
  types/poangfri.ts           → status rename + acknowledged-fält
  data/poangfri-housing.ts    → uppdatera mock (några "unhandled", några "acknowledged")
  hooks/useHousingStatus.ts   → härled converted_to_poangfri
  utils/poangfri-events.ts    → NY: mappa listings/interests → TenantEvent[]

pages/rentals/
  PoangfriHousingPage.tsx     → ny statusetikett, räknare "Obehandlade"
  PoangfriHousingDetailPage.tsx → "Kvittera"-knapp per rad, ConfirmDialog
  components/PoangfriInterestSheet.tsx → "Kvittera"-knapp i header

entities/tenant/
  data/tenant-events.ts       → inkludera getPoangfriEvents() i getTenantEvents()
  types/tenant.ts             → utöka TenantEvent.type vid behov
```

**Återanvänder:** `Badge` (warning-variant), `ConfirmDialog`, `ResponsiveTable`, befintlig `TenantEventLog`-vy, befintlig kontaktloggning.

**Designprinciper följda:** ingen ikon på primärknapp, `variant="outline"` för tabell-actions, semantisk Badge för status, all mockdata anonymiserad.

## Out of scope
- Bulk-kvittering av flera sökande samtidigt.
- Riktig backend/cron för auto-konvertering – sker via mock-helper.
- Notifikation/mejl till sökande vid kvittering.
