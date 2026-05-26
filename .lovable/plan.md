# Sidopanel för sökanderader i standardflödet

Idag expanderas en rad i `HousingApplicantsTable` inline och visar `CompactProfileForm` (Nuvarande boende, Referenshistorik, Kommentarer) som ett block under raden. Vi byter ut det mot en sidopanel (Sheet) som glider in från höger – samma mönster som po­äng­fri-panelen, men med innehåll anpassat efter standardflödets profil-/referensbehov.

Detta ger:
- Konsekvent interaktion mellan po­äng­fri och standard
- Mindre vertikal "hoppighet" i listan när man jämför flera sökande snabbt
- Plats för djupare info utan att stjäla bredd från tabellen

## Räckvidd

Påverkar alla flikar i standardflödet (Publicera, Publicerat nu, Erbjud visning, Visning, Erbjud kontrakt, Historik) eftersom samma tabellkomponent används överallt.

## UX-beteende

- Chevron-ikonen i radens första kolumn blir öppna-/stäng-trigger för panelen
- Klick på själva raden (utanför actions/checkbox) öppnar också panelen
- Endast en sökande i taget i panelen; ny rad ersätter
- Panelen stängs med X, Esc eller klick utanför
- Selection-checkbox, dropdown-actions, "Koppla kontrakt"-knappen m.m. ligger kvar i raden – panelen är komplement, inte ersättning

## Panelens struktur

**Bredd:** `sm:max-w-xl` (något bredare än po­äng­fri-panelen eftersom formuläret är tätare). Flex-column med scrollbar body och sticky border-t footer.

**Header (sticky top, border-b):**
- Liten meta-rad: ev. statusbadges för erbjudande/visning (när relevant per flik), kö­poäng som muted text
- Titel: sökandens namn
- Sub-meta: kundnummer · telefon · mejl
- Länk "Öppna kundkort" (ExternalLink) – samma som befintlig kolumn

**Body (scrollbar):**
Återanvänder existerande sektioner från `residence-profile/form/`:
- `HousingTypeSection` – Nuvarande boende
- `CustomerReference` – Referenshistorik
- `ReviewStatusSection` – Granskningsstatus
- `HousingReferenceComment` – Kommentar
- Notes-block för intern­noteringar (om aktuellt – återanvänd `Notes`-komponenten med `entityType="housing-applicant"`)

**Footer (sticky bottom, border-t):**
- "Avbryt" (variant outline) – stänger panelen
- "Uppdatera profil" (primär) – sparar formuläret

## Visuell konsekvens med po­äng­fri-panelen

Samma rytm: header med badge ovanför titel, meta som muted text under, body med tydliga sektionsrubriker (`text-sm font-semibold mb-3`), sticky footer. Vi extraherar inte en delad komponent – panelernas innehåll är olika – men de följer samma layout-recept så de upplevs som syskon.

## Tekniska ändringar

1. **Ny komponent:** `src/pages/rentals/components/HousingApplicantPanel.tsx`
   - Sheet med ovanstående struktur
   - Wrappar `HousingTypeSection`, `CustomerReference`, `ReviewStatusSection`, `HousingReferenceComment` i ett gemensamt `useForm`
   - Tar emot `applicant`, `open`, `onOpenChange`, ev. flik-kontext för relevanta statusbadges

2. **Refaktor av `HousingApplicantsTable.tsx`:**
   - Ersätt `expandedApplicant`-state-driven inline-rendering (raderna 535-543) med Sheet-state: `panelApplicantId`
   - Chevron-knappen togglar nu panelen i stället för inline-blocket
   - `onRowClick` (utanför action-zonen) öppnar panelen
   - Ta bort import av `CompactProfileForm` här (komponenten bevaras tills vidare för ev. andra användningar)

3. **Po­äng­fri-panelen:** Inga ändringar. Vi justerar bara så att den nya standardpanelen följer samma header-/footer-recept.

## Vad som inte ingår

- Vi byter inte ut formulärlogiken eller fältens innehåll
- Vi rör inte vilka kolumner som visas i tabellen
- Inga ändringar i po­äng­fri-flödet
- Mobilbeteende: Sheet glider in över hela skärmen som idag (default Sheet-beteende) – ingen separat MobileAccordion behövs här eftersom tabellen redan har eget mobilläge i `ResponsiveTable`-mönstret (men `HousingApplicantsTable` använder ren `Table`, så vi behåller dagens mobilfallback oförändrad i denna omgång)
