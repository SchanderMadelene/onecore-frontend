

## Plan: Ta bort besiktigarnamnet från navigationsheadern

**Vad**: Ta bort visningen av besiktigarens namn ("Erik Eriksson") och User-ikonen från headern i mobilformuläret.

**Ändring i en fil**:

**`src/features/residences/components/inspection/mobile/MobileInspectionForm.tsx`** (rad 196-200)
- Ta bort `<div>` med `User`-ikonen och `inspectorName`-texten som visas till höger om "Tillbaka"-knappen i navigationsraden.

