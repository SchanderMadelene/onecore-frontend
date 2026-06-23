## Mål
På intresselistan i poängfri-detaljvyn: visa samma tre informationskolumner som standardflödet har för en sökande – **Boendereferens**, **Kreditupplysning** och **Betalningshistorik** – med samma badge-utseende och datum under.

## Var
- `src/features/rentals/types/poangfri.ts` – utöka `PoangfriInterest` med fälten.
- `src/features/rentals/data/poangfri-housing.ts` – fyll på mockdatan för befintliga sökande.
- `src/pages/rentals/PoangfriHousingDetailPage.tsx` – lägg till tre kolumner i `ResponsiveTable`.
- `src/pages/rentals/components/PoangfriInterestSheet.tsx` – visa samma tre status­raderna även i sökande-sheeten (header-sektionen), så informationen syns vid öppning.

## Vad

### 1. Typ-utökning (`poangfri.ts`)
Lägg till på `PoangfriInterest`:
```ts
housingReference: {
  status: "Godkänd" | "Ej godkänd" | "Kontaktad - ej svar" | "Referens krävs ej" | "Ej behandlad";
  date?: string; // YYYY-MM-DD
};
creditReport: {
  status: "Godkänd/låg risk" | "Förhöjd risk" | "Hög risk" | "Ingen uppgift tillgänglig";
  date?: string;
};
paymentHistory: {
  status: "Inga anmärkningar" | "Behöver kontrolleras";
  date?: string;
};
```
Återanvänd exakt samma statussträngar som standardflödet för konsekvent rendering.

### 2. Mockdata
Fyll på varje befintlig `PoangfriInterest` i `poangfri-housing.ts` med rimliga, varierade värden (anonymiserade, svenska datum). Blanda godkända/varningar för att spegla verkliga handläggningsbehov.

### 3. Tabellkolumner (poängfri detaljvy)
Lägg till tre kolumner mellan "Anmäld" och "Status" i `columns`-arrayen i `PoangfriHousingDetailPage.tsx`:
- `housingReference` – badge + litet datum
- `creditReport` – badge ("Inga anm." / "Anmärkningar")
- `paymentHistory` – badge + datum

Markera `hideOnMobile: true` (samma mönster som övriga sekundärfält i listan) eftersom mobilkortet redan blir tätt och statusarna visas i sheeten där.

Återanvänd Badge-varianter direkt – inga nya komponenter:
- `success` / `warning` / `destructive` / `muted` enligt mappningen i standardflödet.

### 4. Sheet (`PoangfriInterestSheet.tsx`)
Direkt under header-blocket (efter "Anmäld …", före åtgärdsknapparna), rendera en kompakt sektion med tre rader:

```
Boendereferens         [badge]   datum
Kreditupplysning       [badge]   datum
Betalningshistorik     [badge]   datum
```

Layout: `space-y-2`, etikett i `text-xs text-muted-foreground` till vänster, badge + datum till höger – matchar tonen i resten av sheeten (label-värde-mönster).

## Tekniska detaljer
- Skapa en liten lokal helper `getStatusBadge` i sheet- och tabellfilen som speglar standardflödets mappning ordagrant (samma etiketter och varianter). Inga delade extraktioner just nu – undviker att röra standardflödets fil.
- Inga ändringar i datalager utöver mock; inga API/RLS-ändringar.
- `ResponsiveTable` mobilkort: kolumnerna är `hideOnMobile`, så ingen ändring av mobilkortet behövs – sheeten täcker mobilanvändaren.

## Påverkade filer
- `src/features/rentals/types/poangfri.ts`
- `src/features/rentals/data/poangfri-housing.ts`
- `src/pages/rentals/PoangfriHousingDetailPage.tsx`
- `src/pages/rentals/components/PoangfriInterestSheet.tsx`
