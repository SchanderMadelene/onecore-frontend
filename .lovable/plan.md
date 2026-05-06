## Mål
Återinföra manuella erbjudandeomgångar för bostad enligt tidigare spec (`mem://features/rentals/housing-offer-rounds` + chatt 2026-04-27). Idag finns ingen omgångs-logik kvar i koden — bara den enkla "Skicka erbjudande"-flödet.

## Flöde (bekräftat tidigare)
1. **Omgång 1** skapas manuellt från **"Erbjud visning"**: handläggaren markerar sökande (top 10 förvaljs) och klickar **"Skicka erbjudande"** → annonsen flyttas till **"Visning"** (= omgång 1 är aktiv).
2. **Omgång 2+** initieras manuellt från **"Visning"** via knappen **"Starta ny erbjudandeomgång"** i headern. Avbryter inte tidigare omgångar — kör parallellt.
3. **Förval i ny omgång**: top 5 efter köpoäng som varken har aktivt erbjudande eller tidigare tackat nej.
4. **Tilldelad** (någon tackat ja → status `Accepted`) blockerar nya omgångar.
5. Varje omgång kan avbrytas individuellt utan att påverka andra parallella.

## Tekniska ändringar

### Datamodell — `src/shared/contexts/HousingOffersContext.tsx`
- Byt single-offer mot `roundsByListing: Record<string, HousingOfferRound[]>`.
- `HousingOfferRound`: `{ id, roundNumber, status: 'Active' | 'AllDeclined' | 'Expired' | 'Cancelled' | 'Accepted', selectedApplicants: number[], sentAt, expiresAt, responses }`.
- Nya metoder: `startNewRound(listingId, applicantIds)`, `cancelRound(listingId, roundId)`, `getRoundsForListing(listingId)`, `canStartNewRound(listingId)`.
- Behåll en deriverad platt `offers`-array för bakåtkompatibilitet (`OfferedHousingTable` m.fl.).

### Header — `src/pages/rentals/components/HousingHeader.tsx`
- På fliken "Visning": visa knapp **"Starta ny erbjudandeomgång"** när `canStartNewRound` är sant och man inte redan är i urvalsläge.
- I urvalsläge: dölj den, visa **"Skicka erbjudande"** (disabled tills minst en sökande är vald) + **"Avbryt urval"**.
- Chip i rubriken: "Omgång N" eller "N omgångar aktiva".

### Detaljsida — `src/pages/rentals/HousingDetailPage.tsx`
- State: `isSelectingForNewRound`, `activeRoundTab`.
- Tabs över sökandelistan: en flik per omgång (`Omgång 1`, `Omgång 2`…) + extra `Ny omgång (urval)` när urvalsläge är aktivt.
- Per omgångs-tab: `HousingApplicantsTable` med `offeredApplicantIds={round.selectedApplicants}` och dim-information för sökande från tidigare omgångar.

### Ny komponent — `src/pages/rentals/components/RoundSummaryBar.tsx`
Sammanfattningsrad ovanför tabellen i varje omgång-tab:
- Statusbadge (Pågår / Accepterad / Alla nekade / Avbruten).
- Skickat-/utgångsdatum med relativ tid.
- Svar-räkning: "X ja · Y nej · Z väntar".
- Knapp **"Avbryt denna omgång"** (med ConfirmDialog) för aktiva omgångar.

### Tabell — `src/pages/rentals/components/HousingApplicantsTable.tsx`
- Nya props: `previousRoundByApplicant`, `activeRoundByApplicant`, `declinedInPreviousRoundIds`, `autoSelectCount`.
- Smart förval i urvalsläge för omgång 2+: top N efter köpoäng som varken har aktivt erbjudande, redan är i denna omgång eller tackat nej tidigare.
- Sökande som var med i tidigare omgång (men inte nuvarande) dimmas; sökande som är med i båda dimmas inte.

### Bekräftelsedialog — `src/features/rentals/components/SendHousingOfferDialog.tsx`
- Nya props: `roundNumber`, `parallelActiveRounds`.
- Titel: "Skicka erbjudande för omgång N".
- Varning när `parallelActiveRounds > 0`: "Omgång X är fortfarande aktiv parallellt — sökande där påverkas inte."

### Mockdata
Lägg in 1–2 annonser i "Visning"-fliken som har omgång 1 + parallell omgång 2 så funktionen är synlig direkt (motsvarande `1013` som vi hade tidigare).

## Out of scope
- Tooltips på disabled checkboxes och förbättrade filter (#3, #5 från förra omgången).
- Förläng-utgångsdatum-knapp (#6).
- Acceptance-banner (#7) och informativa tab-labels med progress (#8).