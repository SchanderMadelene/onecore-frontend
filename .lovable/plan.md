

## Lägg till besiktningstyp i InspectorSelectionCard

### Bakgrund
Användaren vill kunna välja besiktningstyp ("Avflytt + underhåll" eller "Underhåll") på förstasidan i besiktningsformuläret, innan själva besiktningen startas. Alternativ 1 valdes: lägga till fältet direkt i "Info om besiktning"-kortet i `InspectorSelectionCard`.

### Ändringar

**1. Utöka typsystemet** (`src/features/residences/components/inspection/types.ts`)
- Lägg till `inspectionType: 'moveout_maintenance' | 'maintenance'` som ny typ.
- Lägg till fältet i `Inspection`-interfacet och `InspectionSubmitData`.

**2. Lägg till RadioGroup i InspectorSelectionCard** (`src/features/residences/components/inspection/mobile/InspectorSelectionCard.tsx`)
- Lägg till ny prop `inspectionType` + `setInspectionType`.
- Rendera en `RadioGroup` med två alternativ ("Avflytt + underhåll", "Underhåll") under klockslaget i "Info om besiktning"-kortet.
- Default: `'moveout_maintenance'`.

**3. Koppla state i useInspectionForm** (`src/features/residences/hooks/useInspectionForm.ts`)
- Lägg till `inspectionType` state med default `'moveout_maintenance'`.
- Exponera `inspectionType` och `setInspectionType`.

**4. Koppla ihop i Desktop- och Mobile-formulären**
- `DesktopInspectionForm.tsx`: Skicka `inspectionType`/`setInspectionType` till `InspectorSelectionCard` och inkludera i submit-data.
- `MobileInspectionForm.tsx` (eller motsvarande): Samma koppling.
- Inkludera `inspectionType` i `InspectionSubmitData` vid sparning.

### Visuell placering
Fältet placeras som sista element i "Info om besiktning"-kortet, under klockslaget, med en `Label` och `RadioGroup` i samma stil som övriga fält.

