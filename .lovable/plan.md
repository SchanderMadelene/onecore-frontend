
# Poängfri bostad – koncept & implementationsplan

Baserat på vår dialog: vi bygger om poängfri bostad från ett "annons-flöde" till en **enkel, manuell hanteringsyta** där handläggaren har full kontroll och systemet stöttar med struktur, statusar och loggning – inte med automatik.

## Kärnkoncept

1. **Förenklad annons** – ett objekt publiceras poängfritt med minimal data (objekt, hyra, infotext). Ingen utgångsdatum, ingen "typ"-dropdown, ingen omgångslogik.
2. **Intresselistan är aktiv i sig själv** – en anmälan på Mimer.nu räknas som ett aktivt intresse. Ingen "är du fortfarande intresserad?"-kedja behövs. Sökande kan själva ta bort sin anmälan på sajten.
3. **Manuell hantering, välstrukturerad** – handläggaren ringer/kontaktar uppifrån listan. Systemet håller reda på status, anteckningar och vem som fått vilken kommunikation.
4. **Topp 3-bekräftelsemejl (valbart)** – när någon når topp 3 kan systemet skicka ett mejl: *"Du ligger högt i kö för X. Avanmäl dig om du inte längre är intresserad."* Inte ett krav på svar, bara en städmekanism.
5. **Kontraktshändelsen är det enda automatiska** – när kontrakt skapas: avpublicera annons, skicka välkomstmejl, markera övriga som "ej tilldelad", arkivera.

## UI-struktur (förslag)

**Placering:** Egen undermeny under "Uthyrning" → "Bostad" → flik **"Poängfritt"** (parallellt med vanliga annonser, eftersom flödet är distinkt).

**Listvy (alla poängfria objekt):**
- Tabell med: objekt, adress, hyra, antal intresseanmälningar, status (Publicerad / Pågående kontakt / Kontrakt skapat), publiceringsdatum.
- Filter: status, område.

**Detaljvy (per objekt):**
- Header med objektinfo + status-badge + actions (Avpublicera, Skapa kontrakt).
- **Intresselista** sorterad efter anmälningsdatum. Per rad:
  - Namn, kundnummer, anmäld datum.
  - **Status-tag**: Ny / Topp 3 (bekräftelsemejl skickat) / Kontaktad / Tackat ja / Tackat nej / Ej tilldelad.
  - **Senaste kommunikation**: kort sammanfattning + tidsstämpel (t.ex. "SMS skickat 12 maj" eller "Ringt 14 maj").
  - Actions per rad: Logga kontakt, Markera tackat ja/nej, Skapa kontrakt, Anteckning.
- **Sidopanel (öppnas vid val av sökande)**: full kommunikationshistorik (kronologisk timeline: mejl, SMS, anteckningar, statusbyten), kundkortlänk, snabb-anteckning.

## Vad som byggs (etapper)

### Etapp 1 – Datamodell & mockdata
- Typer: `PoangfriListing`, `PoangfriInterest` (med status, anteckningar, kommunikationslogg).
- Mockdata med svenska, anonymiserade namn enligt projektets konvention.
- Context/hook: `usePoangfriListings`.

### Etapp 2 – Listvy
- Sida `/uthyrning/bostad/poangfritt` (eller integrerad som flik i `HousingSpacesTable`).
- ResponsiveTable enligt standard, filter enligt etablerat mönster.

### Etapp 3 – Detaljvy
- Header + intresselista (ResponsiveTable med inline-statusåtgärder).
- Sidopanel för kommunikationshistorik (återanvänd `TenantEventLog`-mönstret).
- Modaler: "Logga kontakt" (typ: telefon/SMS/mejl/möte + anteckning), "Skapa kontrakt" (bekräftelse + auto-effekter).

### Etapp 4 – Topp 3-bekräftelsemejl
- Knapp "Skicka bekräftelsemejl till topp 3" på objektsnivå (manuell trigger, inte automatisk).
- Logga mejlet i kommunikationshistoriken per sökande.

### Etapp 5 – Kontraktshändelsen
- "Skapa kontrakt"-flöde som visuellt visar vad som händer automatiskt (avpublicera, välkomstmejl, ej-tilldelad till övriga, arkivera).
- I detta steg: bara mockad effekt + tydlig UI-feedback, ingen riktig backend.

## Frågor innan vi bygger

**A. Placering bekräftas?** Egen flik "Poängfritt" parallellt med vanliga flikar i `HousingSpacesTable`, eller helt egen sida under sidomenyn?

**B. Topp 3-mejl** – ska det vara en **manuell knapp** ("Skicka bekräftelsemejl") eller ska systemet **föreslå** det när någon når topp 3 (notis, inte automatik)?

**C. Var ska "Skapa poängfri annons" startas från?** Från objektsidan (lägenheten) eller från en central "Skapa"-knapp i poängfri-vyn?

**D. Etappordning** – börja med Etapp 1+2 (datamodell + listvy) så vi snabbt får något att titta på och iterera vidare från, eller vill du att jag levererar Etapp 1–3 i ett första bygg?
