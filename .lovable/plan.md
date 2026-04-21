

## Förenklad förhandsgranskning – inline-modal istället för ny tab

### Mål
Ersätt den nuvarande "öppna ny tab"-lösningen med en modal som öppnas direkt i applikationen och visar förhandsgranskningen som en inramad "Mimer.nu"-vy.

### Förändringar

**1. Ny komponent: `PreviewHousingAdDialog.tsx`**
Plats: `src/features/rentals/components/PreviewHousingAdDialog.tsx`
- Stor `Dialog` (max-w-5xl, max-h-[90vh], scrollbar i body, sticky footer enligt vår dialog-standard).
- Header: "Förhandsgranskning – så här visas annonsen på Mimer.nu" + liten beskrivning.
- Body: en inramad "browser-chrome"-container (ljusgrå topplist med tre prickar + adressfält som visar `mimer.nu/lediga-objekt/...`) som ramar in själva annonsvyn — gör det visuellt tydligt att det är en extern webbplats-preview.
- Annonsvyn: återanvänder exakt samma JSX/markup som dagens `HousingAdPreviewPage`, men extraherad till en ren presentationskomponent `MimerAdPreview` (props: `housing`, `form`) så vi kan använda den både i modalen och (om vi vill) på den fristående sidan.
- Footer: en "Stäng"-knapp.

**2. Refaktorering: extrahera `MimerAdPreview`**
Plats: `src/features/rentals/components/preview/MimerAdPreview.tsx`
- Flytta all rendering (header, hero, fakta-dl, beskrivning, dokument, CTA, footer) från `HousingAdPreviewPage` hit.
- Tar emot `housing` och `form` som props istället för att läsa från `sessionStorage`.

**3. Uppdatera `EditHousingDialog.tsx`**
- Ta bort `handlePreview` med `window.open` och `sessionStorage`.
- Lägg till lokalt state `previewOpen`.
- "Förhandsgranska"-knappen sätter `previewOpen=true`.
- Rendera `<PreviewHousingAdDialog open={previewOpen} onOpenChange={setPreviewOpen} housingSpace={housingSpace} formValues={form.getValues()} />` (form-värden läses live när modalen öppnas).

**4. Städning**
- Ta bort routen `/rentals/housing/:housingId/preview` från `src/App.tsx`.
- Ta bort filen `src/pages/rentals/HousingAdPreviewPage.tsx` (innehållet lever vidare i `MimerAdPreview`).
- Behåll `src/assets/preview-housing-placeholder.jpg` — används i `MimerAdPreview`.

### Visuell detalj – "browser frame"
För att signalera att det är en extern sajt:
```text
┌─────────────────────────────────────────┐
│ ● ● ●   🔒 mimer.nu/lediga-objekt/...   │  ← ljusgrå topplist
├─────────────────────────────────────────┤
│                                         │
│         [ MimerAdPreview ]              │
│                                         │
└─────────────────────────────────────────┘
```
Topplisten: `bg-muted` med tre färgade prickar (röd/gul/grön) och ett pill-formad adressfält i `bg-background`.

### Påverkan
- Ingen routing eller ny tab — allt sker inline.
- Snabbare flöde för användaren, ingen popup-blockering, ingen sessionStorage-koppling.
- `MimerAdPreview` blir återanvändbar om vi senare vill visa förhandsgranskning från andra ställen (t.ex. publiceringsflödet).

