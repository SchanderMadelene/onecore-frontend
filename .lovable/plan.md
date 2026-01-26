
# Korrigering: Flytta pages tillbaka till root-strukturen

## Korrekt målstruktur enligt 2025-rekommendationerna

```text
/src
├── /features                    # Domänspecifik LOGIK och komponenter
│   └── /barriers
│       ├── components/          # UI-komponenter specifika för barriers
│       ├── hooks/               # Hooks för barriers
│       ├── data/                # Mockdata för barriers
│       ├── types/               # TypeScript-typer för barriers
│       └── index.ts             # Barrel export
│
├── /pages                       # ALLA sidkomponenter (route-komponenter)
│   └── /barriers
│       └── BarriersPage.tsx     # Importerar från @/features/barriers
│
└── ... (övriga root-mappar)
```

## Åtgärder för Barriers

### Steg 1: Flytta BarriersPage.tsx tillbaka till /pages
- Flytta `src/features/barriers/pages/BarriersPage.tsx` → `src/pages/barriers/BarriersPage.tsx`
- Ta bort `src/features/barriers/pages/`-katalogen

### Steg 2: Uppdatera importer i BarriersPage
BarriersPage ska importera komponenter från features:
```tsx
import { BarriersTable, BarriersHeader, CreateBarrierDialog } from "@/features/barriers/components";
import { mockBarriers } from "@/features/barriers/data";
import type { Barrier } from "@/features/barriers/types";
```

### Steg 3: Uppdatera App.tsx
```tsx
import BarriersPage from "@/pages/barriers/BarriersPage";
```

### Steg 4: Uppdatera features/barriers/index.ts
Ta bort export av pages (eftersom de inte längre finns där)

## Uppdaterad struktur efter korrigering

```text
/src
├── /features
│   └── /barriers
│       ├── components/
│       │   ├── BarriersTable.tsx
│       │   ├── BarriersHeader.tsx
│       │   ├── CreateBarrierDialog.tsx
│       │   ├── DeleteBarrierDialog.tsx
│       │   ├── EditBarrierDialog.tsx
│       │   └── index.ts
│       ├── data/
│       │   └── index.ts
│       ├── types/
│       │   └── index.ts
│       └── index.ts
│
├── /pages
│   └── /barriers
│       └── BarriersPage.tsx
```

## Princip för framtida features

| Typ | Placering |
|-----|-----------|
| Sidkomponenter (routes) | `/pages/{feature}/` |
| UI-komponenter | `/features/{feature}/components/` |
| Hooks | `/features/{feature}/hooks/` |
| Data/mock | `/features/{feature}/data/` |
| Typer | `/features/{feature}/types/` |

Detta följer separation of concerns där `/pages` hanterar routing/layout och `/features` hanterar domänlogik.
