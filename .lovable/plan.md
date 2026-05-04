
# Steg 1 — En enda källa för status (A)

Mål: göra `useHousingStatus` till **den enda** routern för vilken flik en bostadsannons hamnar på. Inga egna filter i tabellerna. Detta löser problemen "samma annons på flera flikar" och "kontrakt-fliken är en egen ö" — utan att röra rondlogik, tilldelning eller historik-overlays (det blir steg 2 & 3).

## Ny lifecycle-status

```text
HousingLifecycleStatus =
  | 'unpublished'        // Behov av publicering (UnpublishedHousingSpace)
  | 'published'          // publishedTo > idag, inga rondar, inte early-unpublished
  | 'ready_for_offer'    // early-unpublished ELLER publishedTo passerat,
                         //   OCH inga rondar
  | 'offered'            // minst en rond finns OCH ingen är Accepted
  | 'contract'           // någon rond är Accepted, ej signerad/historik
  | 'history'            // listing.history finns (mock) — signering kommer i steg 2
```

> Notera: `'assigned'` slås ihop med `'contract'` i steg 1 — vi behöver inte särskilja kopplat/icke-kopplat kontrakt på fliknivå (det är fortfarande "Kontrakt"-fliken). `linkContract` påverkar inte fliktillhörighet.

## Beteende per flik (efter steg 1)

| Flik | Källa | Filter |
|---|---|---|
| Behov av publicering | `unpublishedHousingSpaces` | (oförändrat) |
| Publicerade | `publishedHousingSpaces` | status === `'published'` |
| Klara för erbjudande | `publishedHousingSpaces` | status === `'ready_for_offer'` |
| Erbjudna | `publishedHousingSpaces` | status === `'offered'` |
| Kontrakt | `publishedHousingSpaces` | status === `'contract'` |
| Historik | `historyHousingSpaces` (oförändrad mock) | (oförändrat — sammanfogning med riktig signering kommer i steg 2) |

Eftersom ingen rond i mockdatan har status `Accepted` idag kommer "Kontrakt"-fliken att vara **tom** efter steg 1 — det är korrekt, för i steg 2 lägger vi till `acceptOffer` som markerar rondar Accepted, vilket flyttar in listings i den fliken.

## Filer som ändras

```text
src/features/rentals/hooks/useHousingStatus.ts
  - Byter HousingStatus till HousingLifecycleStatus enligt ovan
  - Tar bort 'assigned' (slås ihop med 'contract')
  - 'offered' kräver minst en rond (rounds.length > 0), inget Accepted
  - 'contract' = någon rond Accepted (förbereder steg 2; kommer initialt vara false)
  - 'history' = !!listing.history
  - Behåller filterHousingByStatus-API:t (samma signatur)

src/features/rentals/components/PublishedHousingTable.tsx
  - Oförändrad (använder redan filterHousingByStatus('published'))

src/features/rentals/components/ReadyForOfferHousingTable.tsx
  - Oförändrad (använder redan filterHousingByStatus('ready_for_offer'))

src/features/rentals/components/OfferedHousingTable.tsx
  - Oförändrad logik, men nu garanterat disjunkt mot 'contract'

src/features/rentals/components/ContractHousingTable.tsx
  - TAR BORT egen filter (publishedTo < today)
  - Använder filterHousingByStatus('contract')

src/features/rentals/components/HistoryHousingTable.tsx
  - Oförändrad i steg 1 (egen mock-källa behålls)

src/pages/rentals/utils/housingOfferUtils.ts
  - getListingOfferStatus uppdateras till att returnera samma terminologi
    ('no_offers' | 'offering' | 'assigned' kvar tills vidare; mappas internt)
```

## Påverkan på detaljsidan

`HousingDetailPage` läser status via `getHousingStatus(listing)` redan idag. Den enda förändringen i steg 1 är att `'assigned'`-grenen i mappningen till `offerStatus`-badge kan tas bort eller mappas till "Kontrakt". `kontrakt`/`historik`-läge styrs fortfarande av `location.state.activeHousingTab` — den routing-städningen kommer i steg 3 (D).

## Verifiering

- "Publicerade" innehåller bara annonser där `publishedTo > idag` OCH inga rondar OCH inte early-unpublished.
- "Klara för erbjudande" innehåller annonser med passerat datum eller early-unpublished, **utan** rondar.
- "Erbjudna" innehåller annonser med minst en rond, oavsett publishedTo.
- "Kontrakt" är tom efter steg 1 (förväntat).
- Inga annonser dyker upp i två flikar samtidigt.
- Befintliga rondar i mockdatan (`1011`, `1013`, `1015`) hamnar fortfarande under "Erbjudna".

## Out of scope för detta steg

- `acceptOffer` / `declineOffer` / `signContract` — kommer i steg 2.
- Derivering av rond-status från `expiresAt` / responses — steg 2.
- Faktiska "tackat ja"-räkningar i `OfferedHousingTable` — steg 2 (E).
- Ny tab i `HousingActionTab` (`"kontrakt"`) — steg 2 (C).
- Detaljsidans vy-routing via status — steg 3 (D).
- Historik-overlay — steg 2.

Säg till om något i scope-avgränsningen ska justeras.
