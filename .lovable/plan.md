

# Slutfor FSD-migreringen: Widgets och Layouts

## Sammanfattning

Flytta NavigationBar, TreeView (med hela treeview-mappen) och DetailTabs fysiskt till `src/widgets/`. Rensa `src/layouts/` sa att den bara innehaller `main-layout.tsx`. Uppdatera alla importer och behall re-exports for bakatkompatibilitet.

---

## Steg 1: Flytta Navigation till widgets/

**Flytta filer fysiskt:**
- `src/layouts/NavigationBar.tsx` -> `src/widgets/navigation/NavigationBar.tsx`
- `src/layouts/TreeView.tsx` -> `src/widgets/navigation/TreeView.tsx`
- `src/layouts/treeview/` (hela mappen) -> `src/widgets/navigation/treeview/`
  - `TreeItem.tsx`, `TreeView.tsx`, `treeData.ts`, `treeViewUtils.tsx`, `types.ts`, `index.ts`
  - `data/navigation.ts`, `data/properties/` (alla filer)

**Uppdatera `src/widgets/navigation/index.ts`:**
```typescript
export { NavigationBar } from './NavigationBar';
export { TreeView } from './TreeView';
export type { TreeNode, TreeItemProps, TreeViewProps } from './treeview/types';
```

**Uppdatera interna importer i flyttade filer:**
- `NavigationBar.tsx`: Inga andringar behovs (importerar fran `@/components/ui`, `@/features/search`, etc.)
- `TreeView.tsx` (wrapper): Uppdatera fran `./treeview` (samma relativa sokvag, fungerar)
- `treeview/TreeView.tsx`: Uppdatera import av `treeData` och `types` (relativa sokvagar, fungerar)
- Alla interna treeview-filer anvander relativa importer, sa de fungerar utan andring

## Steg 2: Flytta DetailTabs till widgets/

**Property DetailTabs:**
- `src/features/properties/components/PropertyDetailTabs.tsx` -> `src/widgets/property-detail/PropertyDetailTabs.tsx`
- `src/features/properties/components/PropertyDetailTabsMobile.tsx` -> `src/widgets/property-detail/PropertyDetailTabsMobile.tsx`

**Building DetailTabs:**
- `src/features/buildings/components/BuildingDetailTabs.tsx` -> `src/widgets/building-detail/BuildingDetailTabs.tsx`
- `src/features/buildings/components/BuildingDetailTabsMobile.tsx` -> `src/widgets/building-detail/BuildingDetailTabsMobile.tsx`

**Uppdatera widget index-filer:**
```typescript
// widgets/property-detail/index.ts
export { PropertyDetailTabs } from './PropertyDetailTabs';
export { PropertyDetailTabsMobile } from './PropertyDetailTabsMobile';

// widgets/building-detail/index.ts
export { BuildingDetailTabs } from './BuildingDetailTabs';
export { BuildingDetailTabsMobile } from './BuildingDetailTabsMobile';
```

**Uppdatera importer i de flyttade filerna:**
- `PropertyDetailTabs.tsx`: Andrar importerna av tab-komponenter fran `./tabs/` till `@/features/properties/components/tabs/`
- `PropertyDetailTabsMobile.tsx`: Samma andring
- `BuildingDetailTabs.tsx`: Andrar tab-imports fran `./` till `@/features/buildings/components/`
- `BuildingDetailTabsMobile.tsx`: Samma andring

## Steg 3: Uppdatera konsumenter

**`src/layouts/main-layout.tsx`** (2 importer):
- Andrar `import { NavigationBar } from "@/layouts/NavigationBar"` -> `from "@/widgets/navigation"`
- Andrar `import { TreeView } from "@/layouts/TreeView"` -> `from "@/widgets/navigation"`

**`src/features/search/data/search.ts`** (1 import):
- Andrar `import { TreeNode } from "@/layouts/treeview/types"` -> `from "@/widgets/navigation"`

**`src/features/properties/components/index.ts`:**
- Andrar exporten av `PropertyDetailTabs` och `PropertyDetailTabsMobile` till re-exports fran `@/widgets/property-detail`

**`src/features/buildings/components/index.ts`:**
- Andrar exporten av `BuildingDetailTabs` och `BuildingDetailTabsMobile` till re-exports fran `@/widgets/building-detail`

## Steg 4: Re-exports for bakatkompatibilitet

**`src/layouts/index.ts`** behalls men uppdateras:
```typescript
export { PageLayout } from './main-layout';
// Re-exports for backward compatibility
export { NavigationBar, TreeView } from '@/widgets/navigation';
export type { TreeNode, TreeItemProps, TreeViewProps } from '@/widgets/navigation';
```

**`src/layouts/NavigationBar.tsx`** och **`src/layouts/TreeView.tsx`** tas bort (kallkoden flyttas).

**`src/layouts/treeview/`** mappen tas bort helt.

## Steg 5: Rensa dubbletter i features/

Kontrollera om `entities/`-lagrets data- och UI-filer ar fysiskt kopierade (inte bara re-exports). Om det finns dubbletter i `features/*/data/` som nu ocksa finns i `entities/*/data/`, ersatt features-filerna med re-exports fran entities.

---

## Filer som skapas (nya)
- `src/widgets/navigation/NavigationBar.tsx`
- `src/widgets/navigation/TreeView.tsx`
- `src/widgets/navigation/treeview/` (hela strukturen)
- `src/widgets/property-detail/PropertyDetailTabs.tsx`
- `src/widgets/property-detail/PropertyDetailTabsMobile.tsx`
- `src/widgets/building-detail/BuildingDetailTabs.tsx`
- `src/widgets/building-detail/BuildingDetailTabsMobile.tsx`

## Filer som tas bort
- `src/layouts/NavigationBar.tsx`
- `src/layouts/TreeView.tsx`
- `src/layouts/treeview/` (hela mappen)

## Filer som uppdateras
- `src/layouts/index.ts` (re-exports)
- `src/layouts/main-layout.tsx` (importer)
- `src/features/search/data/search.ts` (import)
- `src/features/properties/components/index.ts` (re-export)
- `src/features/buildings/components/index.ts` (re-export)
- `src/widgets/navigation/index.ts`
- `src/widgets/property-detail/index.ts`
- `src/widgets/building-detail/index.ts`

