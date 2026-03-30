

## Plan: Koppla erbjudande-flödet till kontraktsskapande

### Bakgrund
När en sökande accepterar ett erbjudande ("Erbjudande accepterat" / `OfferAccepted`) ska systemet visa en tydlig väg till att skapa ett hyreskontrakt. Eftersom Tenfast är ett externt system kan vi inte skapa kontraktet direkt — istället visar vi en "Koppla kontrakt"-åtgärd som i detta skede öppnar en bekräftelsedialog med relevant information, redo att i framtiden integreras mot Tenfast.

### Vad byggs

**1. Nytt steg i erbjudandeflödet: "Koppla kontrakt"**
- När en sökande har status `OfferAccepted` visas en knapp/åtgärd "Koppla kontrakt" i applicant-tabellen
- Knappen öppnar en dialog som sammanfattar: sökandes namn, personnummer, bostadsadress, hyra
- Dialogen har en "Skapa kontrakt i Tenfast"-knapp som i nuläget visar en toast med info om att kontraktet ska skapas i det externa systemet
- Efter bekräftelse uppdateras sökandes status till `Assigned`

**2. Ny komponent: `CreateContractDialog`**
- Placeras i `src/features/rentals/components/CreateContractDialog.tsx`
- Tar emot sökande-info och bostadsinfo som props
- Visar en sammanfattning av kontraktsuppgifterna
- Innehåller en informationsruta som förklarar att kontraktet skapas via Tenfast
- Bekräftelseknapp som triggar statusändring och visar toast

**3. Uppdatering av `HousingApplicantsTable`**
- Lägg till en kolumn/knapp "Åtgärd" som visar "Koppla kontrakt" för sökande med `OfferAccepted`-status (via `offerResponse.status === "Accepterat"`)
- Integrera `CreateContractDialog`

**4. Uppdatering av `HousingOffersContext`**
- Lägg till en `markApplicantAssigned`-funktion som uppdaterar status
- Spara kontraktskopplingen i context-state

### Filer som ändras/skapas
- **Ny:** `src/features/rentals/components/CreateContractDialog.tsx`
- **Ändras:** `src/pages/rentals/components/HousingApplicantsTable.tsx` — ny åtgärdskolumn
- **Ändras:** `src/shared/contexts/HousingOffersContext.tsx` — `markApplicantAssigned`
- **Ändras:** `src/features/rentals/index.ts` — export

### Avgränsning
- Ingen faktisk integration mot Tenfast — enbart UI-flöde med tydlig placeholder
- Informationstext i dialogen förklarar att "kontraktet skapas i Tenfast" som nästa steg

