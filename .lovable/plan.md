
Målet är att göra previewn robust igen när Lovables dev-preview tappar synk med Vites dynamiska route-importer.

1. Bekräftad rotorsak
- Koden för appen verkar inte vara trasig i sig.
- Både preview-URL:n och published-URL:n renderar korrekt när de hämtas externt.
- Felet i din inbäddade preview är istället ett runtime-fel för lazy-loaded routes:
  - `Failed to fetch dynamically imported module: .../src/pages/Index.tsx`
  - `Failed to fetch dynamically imported module: .../src/pages/properties/AllPropertiesPage.tsx`
- Det pekar på ett dev/HMR-cache-problem i `.lovableproject.com`-previewn, inte på att startsidan eller fastighetssidan är logiskt trasiga.

2. Föreslagen implementation
- Behåll lazy loading, men gör route-laddning mer självläkande.
- Uppdatera `lazyWithRetry` i `src/App.tsx` så att den känner igen just dynamic-import chunk-fel och gör en kontrollerad engångs-reload istället för att fastna i permanent felskärm.
- Lägg till enkel guard via `sessionStorage` så att sidan inte kan hamna i reload-loop.
- Om reload redan har testats en gång och importen fortfarande misslyckas, visa befintlig felvy.

3. Konkreta kodändringar
- `src/App.tsx`
  - förbättra `lazyWithRetry(...)`
  - identifiera feltyper som:
    - “Failed to fetch dynamically imported module”
    - eventuellt chunk/script-laddningsfel
  - trigga `window.location.reload()` endast en gång per session för route-load recovery
- eventuellt även:
  - återställ reload-flaggan när en import lyckas, så framtida riktiga uppdateringar kan återhämta sig normalt

4. Varför detta är rätt nivå
- Jag ser inget i `Index.tsx` eller `AllPropertiesPage.tsx` som förklarar att hela previewn skulle bli vit.
- Samma UI laddar korrekt via extern fetch/screenshot.
- Därför bör vi inte börja refaktorera sidorna, utan stärka route-laddningen i appskalet.

5. Förväntat resultat efter implementation
- Previewn återhämtar sig automatiskt från tillfälliga Vite/HMR-importfel.
- Den vita/felaktiga previewn ska i praktiken försvinna i de flesta sådana lägen.
- Om felet ändå kvarstår visas fallbacken som idag, men utan att användaren fastnar lika lätt.

6. Tekniska detaljer
```text
Nuvarande flöde:
Route lazy import misslyckas
-> Suspense bryts
-> ErrorBoundary visar "Ett tillfälligt laddningsfel uppstod"

Planerat flöde:
Route lazy import misslyckas
-> lazyWithRetry testar om
-> om typiskt stale dev-chunk-fel:
   -> kontrollera sessionStorage-flagga
   -> reload EN gång
-> om samma fel kvarstår efter reload:
   -> kasta vidare
   -> ErrorBoundary visar fallback
```

7. Verifiering efteråt
- Testa `/`
- Testa `/properties`
- Testa att navigera mellan startsidan och fastigheter flera gånger
- Kontrollera att preview inte fastnar i reload-loop
- Kontrollera att vanlig routing fortfarande fungerar i desktop och mobil
