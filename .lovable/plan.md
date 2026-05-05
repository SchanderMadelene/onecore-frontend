## Mål
Alla knappar som öppnar intresseanmälningsdialog ska ha exakt copy **"Ny intresseanmälan"** – oavsett hyresobjektstyp (bostad, bilplats, förråd).

## Ändringar

1. `src/features/rentals/components/HousingRowActions.tsx` (rad 102)
   - `"Ny anmälan"` → `"Ny intresseanmälan"`

2. `src/features/rentals/components/interest-application/ApplicationDialogShell.tsx` (rad 32)
   - Default `triggerLabel = "Ny anmälan"` → `"Ny intresseanmälan"`

3. `src/features/tenants/components/TenantQueueSystem.tsx` (rad 111, 159)
   - `"Ny intresseanmälan bostad"` → `"Ny intresseanmälan"`
   - `"Ny intresseanmälan förråd"` → `"Ny intresseanmälan"`

4. `src/features/tenants/components/CreateParkingInterestDialog.tsx` (rad 99)
   - Trigger-knapp `"Ny intresseanmälan bilplats"` → `"Ny intresseanmälan"`
   - Dialogtitel (rad 105) lämnas som den är (innehåller kundnamn-kontext) – plan: behålls oförändrad om inte annat sägs.

## Inte i scope
- Dialogtitlar (`title={...}`) i `CreateHousingApplicationDialog` / `CreateInterestApplicationDialog` – de innehåller adress och är inte knappar.
- Övriga actions i row menus (Redigera annons, Skapa erbjudande etc.).
