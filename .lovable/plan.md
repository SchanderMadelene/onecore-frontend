# "Publicera från" i redigera annons

## Varför den är låst

Fältet är hårdkodat låst i redigeringsformuläret för bostadsannonser. Det är ingen regel eller status som styr det – datumväljaren är helt enkelt satt till "inaktiverad" i koden, till skillnad från "Publicera till" som bara låses när "Publicera tillsvidare" är ikryssad.

## Förslag

Lås upp "Publicera från" så att den fungerar som övriga datumfält:

- Redan publicerad annons: startdatumet är passerat och ska fortsatt visas låst, men med en kort förklaring under fältet ("Annonsen är redan publicerad").
- Annons som inte är publicerad (Utkast / Behöver granskning / Redo att publicera): fältet går att ändra.

## Tekniskt

`src/features/rentals/components/edit-housing/EditableFormSection.tsx`: byt `disabled` på `publishFrom`-DatePicker mot en prop, t.ex. `isPublished`, som skickas in från `EditHousingDialog.tsx` utifrån annonsens status. Visa hjälptexten endast när fältet är låst.
