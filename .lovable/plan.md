
# Steg 2 — Tilldelningsflöde, svar och historik-overlay

Bygger den datalogik som krävs för att en bostadsannons ska kunna ta sig genom hela kedjan **Erbjudna → Kontrakt → Historik** baserat på faktiska händelser, inte slumpsimulering. Knappar och UI för admin-actions byggs i steg 3.

## Domänmodell (förtydligad)

Tre distinkta händelser:

1. **Svar från Mina sidor** — sökande tackar ja eller nej. Påverkar inte rondens status. Flera kan tacka ja.
2. **Tilldelning** — admin väljer **en** av dem som tackat ja (efter telefonkontakt). Detta flyttar annonsen till "Kontrakt".
3. **Kontraktskoppling** — admin kopplar kontraktet på Kontrakt-fliken. Samma handling = annonsen flyttas till "Historik". (Enligt beslut: koppla = signera = flytta.)

Konsekvenser av tilldelning: övriga aktiva parallella rondar för samma annons stängs (`Cancelled`).

## Datamodell

`HousingOfferRound` utökas:

```text
HousingOfferRound {
  id, roundNumber, sentAt, expiresAt
  selectedApplicants: number[]
  responses: [{ applicantId, response: 'accepted'|'declined', respondedAt, source }]
  awardedApplicantId?: number
  awardedAt?: string
  status: 'Active' | 'AllDeclined' | 'Expired' | 'Cancelled' | 'Awarded'
}
```

På listing-nivå (overlay i contexten):
```text
contractsByListing: Record<listingId, { applicantId, contractedTo, signedAt }>
```

## Lifecycle-status (uppdaterad i useHousingStatus)

```text
'history'         → contractsByListing[id] finns ELLER listing.history (mock)
'contract'        → någon rond är 'Awarded' OCH inget signerat kontrakt
'offered'         → minst en levande rond (Active eller med svar) OCH ingen Awarded
'ready_for_offer' → alla rondar är Cancelled/Expired/AllDeclined
                    ELLER (publishedTo passerat OCH inga rondar)
                    ELLER early-unpublished
'published'       → publishedTo > idag, inga rondar, inte early-unpublished
```

Disjunkt — varje annons hamnar på exakt en flik.

## Nya context-metoder

```ts
recordResponse(listingId, applicantId, response: 'accepted'|'declined', source: 'mina_sidor'|'admin'): void
awardOffer(listingId, roundId, applicantId): void
unawardOffer(listingId, roundId): void
signContract(listingId, applicantId, contractedTo): void   // ersätter linkContract
unsignContract(listingId): void                            // ersätter unlinkContract
```

**`recordResponse`**
- Hittar den aktiva ronden där applicantId ingår.
- Appendar response. Om samma applicant redan svarat: ersätt (admin kan ha registrerat fel).
- Om alla i `selectedApplicants` har nekat → rond-status `AllDeclined`.

**`awardOffer`**
- Sätter `awardedApplicantId` + `awardedAt` på ronden, status → `Awarded`.
- Stänger övriga aktiva rondar för listingen → `Cancelled`.

**`unawardOffer`**
- Rensar `awardedApplicantId/awardedAt`, status → tillbaka till `Active`.
- Övriga rondar förblir `Cancelled` (admin får starta nya manuellt).

**`signContract` / `unsignContract`**
- Sätter/rensar entry i `contractsByListing`.
- Bakåtkompatibel: `linkContract`/`unlinkContract`/`getLinkedContract` blir alias som mappar mot detta. (Befintliga anrop på Kontrakt-fliken fortsätter fungera men flyttar nu annonsen till Historik som en sidoeffekt — vilket är önskat enligt din spec.)

## Derivering av `Expired`

Read-time utility i contexten:

```ts
getDerivedRoundStatus(round): HousingRoundStatus
  if status !== 'Active' → return status
  if expiresAt <= now → 'Expired'
  else → 'Active'
```

Anropas av `getRoundsForListing`, `getActiveRounds` och i `useHousingStatus`. Ingen state-mutation — en rond som "går ut" syns korrekt vid nästa render utan timer.

## Fall-back när alla rondar är döda (F)

Hanteras direkt av lifecycle-reglerna ovan: om inga rondar har derived status `Active` eller `Awarded` → annonsen faller tillbaka till `'ready_for_offer'`. Handläggaren kan då starta en ny omgång.

## Mock-data

För att flikarna ska visa rimligt innehåll direkt:

| Listing | Scenario |
|---|---|
| 1011 | Omgång 1 aktiv, 2 sökande har tackat ja, ingen tilldelad. → "Erbjudna" + "Klar för tilldelning"-badge |
| 1013 | Omgång 1 AllDeclined, omgång 2 aktiv, 1 har tackat ja. → "Erbjudna" |
| 1015 | Omgång 1 aktiv, en sökande tilldelad (Awarded). → "Kontrakt" |
| (ny) | Listing med signerat kontrakt → "Historik" (visas via overlay i steg 5) |

## OfferedHousingTable — riktiga räkningar (E)

Tre nya kolumner/aggregat (sammanslaget över alla rondar för listingen):

- **Tackat ja**: antal `accepted`-responses
- **Tackat nej**: antal `declined`-responses  
- **Väntar**: `selectedApplicants.length − svarat`

Plus visuellt: `Badge variant="success"` "Klar för tilldelning" på rader där minst en har tackat ja men ingen är tilldelad. Det är signalen för admin att ringa.

## Filer som ändras

```text
src/shared/contexts/HousingOffersContext.tsx
  + recordResponse / awardOffer / unawardOffer
  + signContract / unsignContract (linkContract som alias)
  + getDerivedRoundStatus (intern utility, även exporterad)
  + contractsByListing-overlay
  ~ HousingOfferRound utökas: awardedApplicantId, awardedAt, 'Awarded'-status
  ~ getRoundsForListing/getActiveRounds använder derived status
  ~ MOCK_ROUNDS_BY_LISTING uppdateras enligt tabellen ovan

src/features/rentals/hooks/useHousingStatus.ts
  ~ Ny lifecycle: history > contract > offered > ready_for_offer > published
  ~ Använder getDerivedRoundStatus
  ~ contract = någon Awarded utan signerat kontrakt
  ~ history = signerat kontrakt eller listing.history

src/features/rentals/components/OfferedHousingTable.tsx
  ~ Tackat ja/nej/väntar från riktiga responses
  ~ "Klar för tilldelning"-badge när hasAccepted && !hasAwarded
```

## Verifiering efter steg 2

- `1011` ligger i "Erbjudna" med "Klar för tilldelning"-badge och "2 av X tackat ja".
- `1013` ligger i "Erbjudna" (omgång 2 aktiv, 1 har tackat ja).
- `1015` ligger i "Kontrakt" tack vare Awarded.
- "Klara för erbjudande" innehåller annonser från steg 1 + ev. en där alla rondar är döda.
- Kontrakt-flikens befintliga `getLinkedContract`-läsning fortsätter fungera (bakåtkompatibel).
- Inga UI-knappar för admin-actions ännu (det är steg 3).

## Vad som INTE byggs i steg 2

- Knappar för "Registrera ja/nej" (Mina sidor-mock från admin-vy) → steg 3.
- Knapp för "Tilldela kontrakt" på rondens sökanderad → steg 3.
- Kontrakt-flikens action-kolumn och rad-actions (`HousingActionTab "kontrakt"`) → steg 3.
- Detaljsidans "kontrakt"-läge med riktiga responses (slumplogiken `id % 5` lever kvar tills steg 3) → steg 3.
- Sammanslagning av `historyHousingSpaces` med signerade overlays i `HistoryHousingTable` → steg 5.
- Detaljsidans vy-routing via lifecycle-status → steg 4.

Säg till om något ska justeras innan jag implementerar.
