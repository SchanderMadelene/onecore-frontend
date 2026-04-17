

## Sammanfattning av gapet

Branchen `uthyrning` (PR #128) innehåller **5 nya filer** och en mängd ändringar i befintliga filer. Genom att jämföra mot nuvarande `main` + memories vet jag följande:

### Redan implementerat i main (skippa)
- `EditHousingDialog` + `edit-housing/`-mapp → finns
- `SendHousingOfferDialog` → finns enligt memory
- `housing-application/`, `interest-application/`, `publish-dialog/` → finns
- Refaktorerade dialoger (`CreateHousingApplicationDialog` m.fl.) → troligen ersatta

### Saknas i main (värt att återskapa)
1. **`HistoricalHousingTable.tsx`** + `data/historical-housing.ts` — Tabell över historiska/avslutade uthyrningar (en flik som idag saknas i bostadsvyn)
2. **`CreateContractDialog.tsx`** — Dialog för att skapa hyreskontrakt direkt från en bostad/applicant
3. **`publish-action-bar.tsx`** — Sticky bottom action-bar för publiceringsflödet
4. **Primär publicera-knapp + dropdown på `UnpublishedHousingTable`** — Nuvarande version har 3 separata ikon-knappar (Eye, Edit, Trash). Enligt memory `table-action-layout-pattern` ska det vara `[Primär textknapp] [⋯ More options] [▸ Chevron]`

## Plan: Återskapa de 4 sakerna

### 1. HistoricalHousingTable + mockdata
- Skapa `src/features/rentals/data/historical-housing.ts` med 6-8 anonymiserade poster (svenska adresser/namn, slutdatum, hyresgäst, hyrestid)
- Skapa `src/features/rentals/components/HistoricalHousingTable.tsx` baserat på mönstret från `PublishedHousingTable` (ResponsiveTable, mobileCardRenderer, navigation)
- Lägg till flik "Historik" i bostadsvyn (i `RentalsTabs` eller motsvarande)
- Exportera via `index.ts`

### 2. CreateContractDialog
- Skapa `src/features/rentals/components/CreateContractDialog.tsx` — dialog som tar `applicant` + `housingSpace` som props
- Fält: kontraktstyp, startdatum, hyra (förifyllt), villkor, signeringsmetod
- Följer `dialog-form-layout-standard` (flex-col, max-h-[90vh], sticky footer)
- Trigger: knapp på rader i `HousingApplicantsTable` när applicant är vald för erbjudande

### 3. PublishActionBar (shared/ui)
- Skapa `src/shared/ui/publish-action-bar.tsx` — sticky bottom bar med primär CTA + sekundära actions
- Generisk: tar `primaryAction`, `secondaryActions[]`, `status` som props
- Används initialt på `CreateHousingAdPage` för publiceringsflödet

### 4. UnpublishedHousingTable — primär knapp + dropdown
Refaktorera enligt `table-action-layout-pattern`:
- Ersätt 3 ikon-knappar med: `[Publicera]` (primär text) + `[⋯]` (dropdown med Visa/Redigera/Ta bort) + `[›]` (chevron för navigation)
- Behåll mobile-layouten anpassad efter samma mönster
- Status-badge visar fortfarande "Utkast" / "Behöver granskning" / "Redo att publicera"

## Tekniska filer som skapas/ändras

**Nya:**
- `src/features/rentals/data/historical-housing.ts`
- `src/features/rentals/components/HistoricalHousingTable.tsx`
- `src/features/rentals/components/CreateContractDialog.tsx`
- `src/shared/ui/publish-action-bar.tsx`

**Ändrade:**
- `src/features/rentals/components/UnpublishedHousingTable.tsx` (åtgärdsmönster)
- `src/features/rentals/components/index.ts` (nya exports)
- `src/pages/rentals/RentalsPage.tsx` eller motsvarande tabs-fil (lägg till Historik-flik)
- `src/pages/rentals/components/HousingApplicantsTable.tsx` (CreateContract-trigger på vald applicant)

## Vad vi medvetet skippar
- `SendHousingOfferDialog`, `EditHousingDialog`-refactor → finns redan
- `main-layout.tsx`-ändring → vet inte vad det gällde, för risky att gissa
- `PublishedParkingTab`-tweaks → låg prioritet, kan göras vid behov
- Övriga små ändringar i `HousingHeader`, `HousingApplicantsTable` etc. → bygger vi organiskt vid behov

## Säker att fortsätta?
Efter approve gör jag punkterna 1-4 i ordning och du kan stänga PR #128 i GitHub utan merge.

