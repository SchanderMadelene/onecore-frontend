

## Plan: Lägg till Uppgångar som egen nod i trädstrukturen

### Bakgrund
Idag går trädstrukturen: Fastighet → Byggnad → Lägenhet. Vi lägger till en mellannivå: Fastighet → Byggnad → **Uppgång** → Lägenhet. Uppgångar får en egen sida och styrs av en ny feature toggle `showEntrances`.

### Ny hierarki

```text
Fastigheter
└── Älgen 1
    └── Bellmansgatan 1A - 2C
        ├── Uppgång A          ← NY NOD (icon: "door-open")
        │   ├── LGH-001
        │   ├── LGH-002
        │   └── LGH-003
        ├── Uppgång B
        │   ├── LGH-004
        │   └── ...
```

### Ändringar

**1. Feature toggle** (`FeatureTogglesContext.tsx`)
- Lägg till `showEntrances: boolean` i `FeatureToggles` (default: `false`)
- Koppla till `showBuildings` (stängs av om buildings stängs av)

**2. Beta-inställningar** (`BetaSettings.tsx`)
- Ny ToggleItem "Uppgångar" under Byggnader-sektionen, med description "Visa uppgångar som egen nivå i trädvyn"

**3. Uppdatera trädnoderna** (alla filer i `src/widgets/navigation/treeview/data/properties/`)
- Lägg till uppgångsnoder mellan byggnad och lägenheter
- Varje uppgång får `icon: "door-open"` och path `/properties/{property}/{building}/{entrance}`
- Lägenheter flyttas ner som barn till uppgångarna
- Exempel för Älgen 1: Bellmansgatan får "Uppgång 1A", "Uppgång 1B", etc.

**4. TreeView-filtrering** (`TreeView.tsx` + `types.ts`)
- Lägg till `showEntrances` i `TreeViewProps`
- I filtreringslogiken: om `showEntrances` är true, visa uppgångsnoder; annars platta ut och visa lägenheter direkt under byggnad (nuvarande beteende)

**5. Ny rutt och sida**
- Ny rutt: `/properties/:property/:building/:entrance` i `App.tsx`
- Flytta nuvarande residence-rutt till `/properties/:property/:building/:entrance/:id`
- Ny sidkomponent `EntranceDetailPage.tsx` i `src/pages/properties/`
- Sidan visar uppgångens namn, adress och listar tillhörande lägenheter

**6. EntranceDetailPage-komponent**
- Återanvänder befintliga mönster (TabLayout, Card)
- Visar lista på lägenheter med klickbara kort som navigerar till respektive lägenhet
- Responsiv med `useIsMobile()`

**7. TreeItem-ikon**
- Lägg till stöd för `"door-open"` ikon i TreeItem-komponenten (mappar till lucide `DoorOpen`)

### Filer som ändras/skapas
- `src/shared/contexts/FeatureTogglesContext.tsx` — ny toggle
- `src/features/settings/components/BetaSettings.tsx` — ny toggle-rad
- `src/widgets/navigation/treeview/types.ts` — ny prop
- `src/widgets/navigation/treeview/TreeView.tsx` — filtreringslogik
- `src/widgets/navigation/treeview/TreeItem.tsx` — ny ikon
- `src/widgets/navigation/treeview/data/properties/algen1.ts` — uppgångsnoder
- `src/widgets/navigation/treeview/data/properties/lindaren2.ts` — uppgångsnoder
- `src/widgets/navigation/treeview/data/properties/bjornen4.ts` — uppgångsnoder
- `src/widgets/navigation/treeview/data/properties/otherProperties.ts` — uppgångsnoder
- `src/widgets/navigation/NavigationBar.tsx` — skicka showEntrances
- `src/App.tsx` — nya rutter
- **Ny:** `src/pages/properties/EntranceDetailPage.tsx`

