# Manuell granskning av annonser inför publicering

## Bakgrund
Statuskolumnen finns redan i `UnpublishedHousingTable` med tre värden: `draft`, `needs_review`, `ready_to_publish`. Idag sätts statusen statiskt i mockdatan – det finns inget sätt för användaren att flytta en annons från "Behöver granskning" till "Redo att publicera".

## Mål
Default på alla nya annonser är **"Behöver granskning"**. En användare markerar manuellt en annons som granskad – antingen en i taget i `EditHousingDialog`, eller flera samtidigt via bulk-action i tabellen. Statusen `draft` lämnas oförändrad (det är ett tidigare stadie).

## Förändringar

### 1. EditHousingDialog – checkbox "Granskad och redo att publicera"
- Längst ner i dialogen (i sticky footer-området, vänster om Avbryt/Spara), läggs en `Checkbox` med label **"Granskad – redo att publicera"**.
- Ikryssad ⇒ status sätts till `ready_to_publish` vid spara.
- Tom ⇒ status sätts till `needs_review`.
- Default-state speglar nuvarande status på annonsen. För `draft` döljs checkboxen (utkast måste först färdigställas).
- Hjälptext under: "Annonsen flyttas till 'Redo att publicera' när den sparas."

### 2. UnpublishedHousingTable – bulk-action "Markera som granskade"
- Aktivera radvalet (`selectable`) i `ResponsiveTable`.
- När rader är valda visas `BulkActionBar` med en knapp **"Markera som granskade"**.
- Bara rader med status `needs_review` påverkas; valda `draft`/`ready_to_publish`-rader ignoreras tyst (eller visas räknat: "3 av 5 markerades som granskade").
- Bekräftelsedialog (ConfirmDialog) innan ändring: "Markera N annonser som granskade och redo att publicera?".
- Toast efter utförd action.

### 3. Statuskolumnens utseende
- Behåll befintlig kolumn men förtydliga semantiken via Badge-varianter (utan att lägga till ikoner):
  - `needs_review` → `variant="warning"` (gul/amber) – idag `outline` som syns dåligt.
  - `ready_to_publish` → `variant="success"` (grön).
  - `draft` → `variant="secondary"`.
- Texten oförändrad.

### 4. Filter (lätt tillägg)
- Lägg till en filter-dropdown ovanför tabellen: "Status: Alla / Utkast / Behöver granskning / Redo att publicera". Använd ResponsiveTables native filtering-API (memory: Native Filtering API). Default = Alla.

## Out of scope
- Ingen automatik som flyttar annonser tillbaka till `needs_review` vid ändringar (kan läggas till senare om användaren vill).
- Ingen roll-/behörighetshantering kring vem som får granska.
- Parking/förråd-motsvarigheterna lämnas orörda i denna iteration; samma mönster återanvänds när det är dags.

## Tekniska detaljer
- `unpublishedHousingSpaces` i `data/unpublished-housing.ts` får ett par fler `needs_review`-rader för att visa flödet i mockdatan.
- Eftersom mockdatan är statisk implementeras state lokalt med `useState` i `UnpublishedHousingTable` (kopia av arrayen) så att bulk-action och spara från dialogen visuellt uppdaterar listan inom sessionen. Ingen backend ändras.
- `BulkActionBar` finns redan som shared-komponent och följer mobil-mönstret enligt memory.
