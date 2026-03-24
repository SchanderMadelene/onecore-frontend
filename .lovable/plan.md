

## Plan: Planritning i besiktningsformuläret

### Koncept
En liten flytande knapp (FAB-stil) med en planritnings-ikon som alltid syns under besiktningen. Vid klick öppnas planritningen i en dialog (desktop) eller bottom sheet (mobil) som enkelt stängs med klick utanför eller stäng-knapp. Snabb att öppna, snabb att stänga — stör inte arbetsflödet.

### Ändringar

**1. Ny komponent `FloorplanOverlay.tsx`**
- En knapp med `FileImage`-ikon, positionerad som flytande element (fixed/absolute)
- Öppnar en `Dialog` med planritningsbilden (eller placeholder om ingen finns)
- Stödjer både mobil och desktop

**2. `MobileInspectionForm.tsx`**
- Lägg till `FloorplanOverlay` i formuläret, placerad ovanför bottom navigation (t.ex. `bottom-24 right-4`)

**3. `DesktopInspectionForm.tsx`**
- Lägg till `FloorplanOverlay` i formuläret, placerad i nedre högra hörnet av scrollområdet

**4. Props**
- Komponenten tar emot en valfri `floorplanImage?: string` (URL) — om ingen finns visas en placeholder
- Besiktningsformulären behöver ta emot denna prop från förälder (kan vara `undefined` initialt och byggas ut senare)

### UX-detaljer
- Knappen är semi-transparent, rundad, med tooltip "Planritning"
- Dialogen har ingen extra chrome — bara bilden och en stäng-knapp
- Klick utanför stänger automatiskt

