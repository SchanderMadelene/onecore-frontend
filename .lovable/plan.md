

## Plan: Förenkla Detaljer-sektionen (ta bort kostnad)

Kostnader ska istället fyllas i på en sammanfattningssida i ett senare steg. Nu tar vi bara bort kostnadsinput från detaljerna.

### Ändringar

**1. `CustomComponentsSection.tsx`** — Förenkla tabellen:
- Ta bort `onCostChange` från props
- Ändra grid från 3 kolumner (`[1fr_120px_36px]`) till 2 kolumner (`[1fr_36px]`)
- Ta bort kostnad-kolumnheader, kostnad-input och totalraden

**2. `types.ts`** — Ta bort `cost` från `CustomInspectionComponent`:
- Ta bort `cost: number | null`

**3. `RoomInspectionMobile.tsx`** — Ta bort `handleCostChange` och sluta skicka `onCostChange`-prop

**4. Mockdata** (`inspections.ts`, `OrdersShowcase.tsx`) — Ta bort `cost`-fält från eventuella customComponents

