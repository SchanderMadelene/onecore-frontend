

# Fas 3: VLU/FLU Statistik och Rapportvyer

## Vad ska byggas

En ny statistik-tab/vy pa sparrsidan (`/barriers`) som ger forvaltare och kvartersvardar overblick over:
- Fordelning av sparrar per orsakkategori (VLU, FLU, renovering, skada, etc.)
- Manadsvis utveckling av sparrar over tid
- Uppfoljning av renoveringar (innan/efter inflytt)
- VLU-till-FLU-overganger

Statistikvyn laggs till som en tab/sektion pa befintliga `/barriers`-sidan -- inte som en ny route -- for att halla det samlat.

## Oversikt

Sidan `/barriers` far en tab-struktur med tva flikar:
1. **Sparrar** (befintlig listvy, default)
2. **Statistik / VLU/FLU** (ny vy med diagram och nyckeltal)

## Vad som ingår i statistikvyn

### Sammanfattningskort (overst)
- Totalt antal aktiva sparrar
- Antal VLU (aktiva)
- Antal FLU (aktiva)
- Antal renoveringar (innan + efter inflytt)

### Diagram 1: Sparrar per orsakkategori (Pie/Bar chart)
Visar fordelning av alla sparrar per `reasonCategory` (VLU, FLU, renovation_before, renovation_after, damage, maintenance, other).

### Diagram 2: Manadsvis utveckling (Line/Bar chart)
Visar antal sparrar som skapats per manad under senaste 12 manaderna, uppdelat pa VLU/FLU/renovering/ovrigt.

### Tabell: VLU till FLU-overgångar
Lista over sparrar som har `reasonCategory = 'VLU'` och status `expired` (dvs genomforda overganger), med start- och slutdatum for att se ledtider.

### Tabell: Renoveringar -- uppfoljning
Lista over sparrar med `reasonCategory = 'renovation_before'` eller `'renovation_after'`, filtrerad pa aktiva, med dagar sedan start.

## Feature toggle
En ny toggle `showBarrierStatistics` laggs till for att styra synligheten av statistik-tabben. Tabben syns aven nar toggled av (enligt reglerna), men innehallet doljs.

## Tekniska detaljer

### Nya filer

| Fil | Beskrivning |
|-----|-------------|
| `src/features/barriers/components/BarrierStatisticsView.tsx` | Huvudkomponent for statistikvyn med sammanfattningskort och diagram |
| `src/features/barriers/components/BarrierCategoryChart.tsx` | Cirkel- eller stapeldiagram for fordelning per orsakkategori (Recharts) |
| `src/features/barriers/components/BarrierMonthlyTrendChart.tsx` | Linjesjagram for manadsvis utveckling (Recharts) |
| `src/features/barriers/components/VluFluTransitionsTable.tsx` | Tabell med VLU-till-FLU-overganger |
| `src/features/barriers/components/RenovationTrackingTable.tsx` | Tabell for uppfoljning av renoveringar |
| `src/features/barriers/hooks/useBarrierStatistics.ts` | Hook som beraknar statistik fran mockBarriers-data |

### Andrade filer

| Fil | Andring |
|-----|---------|
| `src/pages/barriers/BarriersPage.tsx` | Lagg till Tabs-komponent med "Sparrar" och "Statistik" flikar |
| `src/shared/contexts/FeatureTogglesContext.tsx` | Lagg till `showBarrierStatistics: boolean` |
| `src/features/settings/components/BetaSettings.tsx` | Lagg till toggle for `showBarrierStatistics` under Sparrar-sektionen |
| `src/features/barriers/data/barriers.ts` | Utoka mockdata med fler VLU/FLU-poster och varierade datum for bra statistik |

### Anvanda bibliotek
- **Recharts** (redan installerat) for diagram
- **shadcn Tabs** for fliknavigering pa sparrsidan
- Befintliga UI-komponenter: Card, CardContent, CardHeader

### Hooks-logik (`useBarrierStatistics`)
Hooken tar in `Barrier[]` och returnerar:
- `summary`: { total, activeVlu, activeFlu, activeRenovations }
- `categoryDistribution`: Array med { category, label, count }
- `monthlyTrend`: Array med { month, vlu, flu, renovation, other }
- `vluToFluTransitions`: Filtrerade sparrar (VLU + expired)
- `activeRenovations`: Filtrerade sparrar (renovation_before/after + active)

### Responsivitet
- Pa mobil staplas sammanfattningskorten 2x2
- Diagram skalas automatiskt via Recharts ResponsiveContainer
- Tabeller anvander befintligt responsivt monster

