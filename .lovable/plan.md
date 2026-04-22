

## Plan: Byt tillbaka URL-segmenten till engelska

Återställer `/rentals/housing`, `/rentals/parking`, `/rentals/storage` som URL-segment. Visningsetiketter i sidomenyn förblir på svenska (Bostad/Bilplats/Förråd).

### Ändringar

**1. `src/widgets/navigation/treeview/data/navigation.ts`**
Uppdatera path för underposterna:
- `/rentals/bostad` → `/rentals/housing`
- `/rentals/bilplats` → `/rentals/parking`
- `/rentals/forrad` → `/rentals/storage`

Etiketter (`label: "Bostad"` etc.) lämnas oförändrade.

**2. `src/pages/rentals/RentalsPage.tsx`**
Byt `RentalType`-union och `TYPE_META`-nycklar:
- `"bostad"` → `"housing"`
- `"bilplats"` → `"parking"`
- `"forrad"` → `"storage"`

`meta.title` behåller svenska visningsnamn.

**3. Routes i `App.tsx`**
Verifiera och uppdatera ev. route-definitioner som matchar `/rentals/:type` så att de fungerar mot de nya segmenten. Om routern använder en wildcard/`:type`-param krävs ingen ändring; om explicita paths finns för bostad/bilplats/forrad byts de till engelska.

**4. Genomsökning av referenser**
Sök efter strängar `"/rentals/bostad"`, `"/rentals/bilplats"`, `"/rentals/forrad"` och `?tab=bostad`/`?tab=bilplats`/`?tab=forrad` i hela `src/` och uppdatera alla träffar (t.ex. `CreateHousingAdPage` `navigate('/rentals?tab=bostad')`, ev. breadcrumb-mappningar, favoriter, länkar från overview-kortet).

### Tekniska detaljer
- Endast URL-segment ändras — visningstext förblir svensk per befintligt mönster
- Detaljsidor (`/rentals/parking/:id`, `/rentals/housing/:id`) påverkas inte (redan engelska)
- Inga sparade favoriter migreras automatiskt; gamla länkar med svenska segment kommer att 404:a (acceptabelt — mock-state)

### Filer som ändras
- `src/widgets/navigation/treeview/data/navigation.ts`
- `src/pages/rentals/RentalsPage.tsx`
- `src/App.tsx` (vid behov)
- `src/pages/rentals/CreateHousingAdPage.tsx` och andra filer som länkar till `/rentals/{svenskt-segment}` (identifieras vid implementation)

### Out of scope
- Översättning av visningsetiketter
- Migrering av sparade favoriter

