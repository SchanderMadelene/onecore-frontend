

## Plan: Åtgärda konsekvensbrister #3, #4, #6

### #3 — Semantisk badge i OfferedHousingTable (mobil)
**Fil:** `src/features/rentals/components/OfferedHousingTable.tsx`

Byt ut den hårdkodade Tailwind-färgade badgen mot semantisk variant.

```tsx
// Före
<Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
  Väntar på svar
</Badge>

// Efter
<Badge variant="warning">Väntar</Badge>
```

(Använder också den förkortade texten "Väntar" för konsekvens med tidigare badge-förkortningar.)

### #4 — Semantisk status-badge i HousingHeader
**Fil:** `src/pages/rentals/components/HousingHeader.tsx`

Ersätt ad-hoc styling med semantisk variant.

```tsx
// Före
<Badge variant="outline" className="bg-primary/10 text-primary font-normal">
  {offerStatus}
</Badge>

// Efter
<Badge variant="info">{offerStatus}</Badge>
```

### #6 — Extrahera duplicerad toolbar i HousingSpacesTable
**Fil:** `src/features/rentals/components/HousingSpacesTable.tsx`

Skapa en intern komponent `HousingTabToolbar` som tar `placeholder` som prop. Eliminerar ~80 rader duplicering över sex flikar.

```tsx
function HousingTabToolbar({ placeholder, onCreateHousingAd }: {
  placeholder: string;
  onCreateHousingAd: () => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder={placeholder} className="pl-9 w-full sm:w-[300px]" />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onCreateHousingAd}>
          Ny bostadsannons
        </Button>
        <ApplicantProfileModal />
      </div>
    </div>
  );
}
```

Notera: `UserPlus`-ikonen tas bort från "Ny bostadsannons" eftersom primära/sekundära textknappar inte ska ha ikoner (Core-regel).

Varje flik blir då:
```tsx
{
  value: "publicerade",
  label: "Publicerade",
  content: (
    <div className="flex flex-col space-y-4">
      <HousingTabToolbar placeholder="Sök publicerad bostad..." onCreateHousingAd={handleCreateHousingAd} />
      <PublishedHousingTable />
    </div>
  )
}
```

### Påverkan
- 3 filer ändras
- Ingen funktionsförändring — endast visuell konsekvens och kodrensning
- Inga nya delade komponenter (`HousingTabToolbar` lever lokalt i `HousingSpacesTable.tsx` enligt återanvändningsprincipen)

