

## Plan: Snabba upp laddningstiden

Tre steg, störst effekt först. Inga visuella ändringar.

### 1. Ta bort dubblerad mockdata under `src/entities/`
`src/entities/property/data/properties/` är en exakt kopia av `src/features/properties/data/properties/`. Vi raderar dubbletten och pekar om `src/entities/property/data/index.ts` att re-exportera från features-lagret (eller tar bort barrelen helt om inget importerar den). Samma genomgång för andra `src/entities/*/data/`-mappar som visar sig vara dubbletter.

### 2. Lazy-loada tung mockdata i React Query-hooks
Hooks som idag importerar mock på toppnivå konverteras till dynamisk import inuti `queryFn`:

```ts
// usePropertyDetail.ts (före → efter)
queryFn: async () => {
  const { mockPropertyDetails } = await import("../data");
  return mockPropertyDetails[id];
}
```

Gäller minst: `usePropertyDetail`, `useBuildingDetail`, samt motsvarande hooks för orders, invoices, lease-contracts, barriers och tenants. Barrel-exports (`index.ts`) som drar in alla mockfiler trimmas så att Vite inte traverserar hela trädet vid cold start.

### 3. Flytta `HousingOffersProvider` ur rot-trädet
Provider:n wrappar hela appen i `App.tsx` och initierar uthyrnings-state direkt. Vi flyttar den till uthyrnings-routerns layout (runt `/rentals/*`-routes) så att startsidan slipper kostnaden. Samma genomgång för andra rot-providers som inte används globalt.

### Tekniska detaljer

- Ingen ändring av API-signaturer på hooks — bara intern implementation
- Inga UI-ändringar
- React Query cachar resultatet, så dynamisk import sker en gång per session per nyckel
- Verifierar att inga andra moduler importerar de raderade `entities/*/data`-filerna innan borttagning

### Out of scope

- Routesplitring (redan på plats via `lazyWithRetry`)
- Ikon-tree-shaking (Vite hanterar redan)
- Backend-anrop (allt är mock idag)

