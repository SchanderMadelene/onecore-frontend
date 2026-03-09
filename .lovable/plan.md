

## Nuläge: Kvarvarande avvikelser

Migreringen har gjort mycket men systemet har **inte** full konsekvens ännu. Här är en sammanfattning:

### Tabeller som redan använder `ResponsiveTable` (21 st) — OK
PropertiesTable, SearchResultsTable, BarriersTable, OrdersTable, TenantContracts, TenantKeys, LeaseContractsPage, AllInspectionsPage, MoveOutSection, MoveInSection, TenantsList, PublishedHousingTable, ReadyForOfferHousingTable, OfferedHousingTable, UnpublishedHousingTable, InspectionHistory, InspectionsList, VluFluTransitionsTable, RenovationTrackingTable, AllTenantsPage, ResponsiveShowcase.

### Tabeller som FORTFARANDE använder rå `<Table>` (8 st)

| Fil | Anledning / Komplexitet |
|-----|------------------------|
| **PublishedParkingTab** | `FilterableTableHead` (kolumnfilter) |
| **ReadyForOfferTab** | `FilterableTableHead` |
| **OfferedTab** | Rå tabell, inga speciella behov |
| **HistoryTab** | Rå tabell, inga speciella behov |
| **NeedsRepublishTab** | Rå tabell, inga speciella behov |
| **ParkingSpaceDetail** | Sökande-tabeller inuti Sheet (2 st), `font-semibold` headers |
| **HousingSpaceDetail** | Sökande-tabell inuti Sheet |
| **ApplicantsTable** | `font-semibold` headers |
| **HousingApplicantsTable** | Expanderbara rader, komplex |
| **PropertyAreasTable** | Expanderbara rader |
| **StudentTurnoverTable** | Eget mobilläge med MobileAccordion, komplex layout med border-delning |
| **CombinedTurnoverTable** | Eget mobilläge med MobileAccordion, komplex layout |
| **ParkingSpacesTable (publish-dialog)** | Selektionstabellen i publiceringsdialogrutan |

### Kvarvarande stilavvikelser

1. **`font-semibold` på TableHead** — ParkingSpaceDetail, ApplicantsTable, HousingApplicantsTable (standard: ingen extra font-weight)
2. **`hover:bg-secondary/50` på TableRow** — ApplicantsTable, HousingApplicantsTable, ParkingSpaceDetail, HousingSpaceDetail (standard: hanteras av ResponsiveTable)
3. **`variant="ghost"` knappar** — FilterableTableHead (intern, OK), PropertyDocumentsTab, BuildingDocumentsTab (dokument-knappar, ej tabell-kontext i strikt mening)

### Vad som behöver göras för full konsekvens

**Grupp 1 — Enkla migreringar** (HistoryTab, OfferedTab, NeedsRepublishTab — inga speciella features):
- Byt till `ResponsiveTable` med `mobileCardRenderer`

**Grupp 2 — FilterableTableHead-tabeller** (PublishedParkingTab, ReadyForOfferTab):
- Kräver att `ResponsiveTable` utökas med stöd för custom header-rendering (t.ex. en `headerRender`-prop per kolumn), ELLER att filtreringen flyttas utanför tabellen
- Alternativ: behåll rå `<Table>` men standardisera wrapper/header-stil

**Grupp 3 — Detail-sheets** (ParkingSpaceDetail, HousingSpaceDetail):
- Ta bort `font-semibold` från headers
- Migrera till `ResponsiveTable` eller åtminstone standardisera stil

**Grupp 4 — Expanderbara tabeller** (HousingApplicantsTable, PropertyAreasTable):
- Kräver att `ResponsiveTable` utökas med stöd för expanderbara rader, ELLER behåll rå `<Table>` men standardisera stil

**Grupp 5 — Turnover-tabeller** (StudentTurnoverTable, CombinedTurnoverTable):
- Dessa har medvetet en specialdesign med ut/in-kolumner separerade av border. De hanterar redan mobilläge via `MobileAccordion`. Rekommendation: undanta dessa från `ResponsiveTable`-migrering men standardisera header-stil.

**Grupp 6 — Stilstädning** (alla kvarvarande):
- Ta bort `font-semibold` från TableHead överallt
- Ta bort `hover:bg-transparent` från TableRow i headers (standardbeteende)
- Säkerställ `bg-card` på wrapper

### Rekommendation

Genomför i denna ordning:
1. **Grupp 1** — Enkla migreringar (3 filer, snabbt)
2. **Grupp 6** — Stilstädning i alla kvarvarande rå-tabeller (ta bort font-semibold, standardisera wrappers)
3. **Grupp 3** — Detail-sheet-tabeller
4. **Grupp 2** — Utöka `ResponsiveTable` med `headerRender`-prop för FilterableTableHead-stöd
5. **Grupp 4+5** — Komplex migrering (expanderbara rader, turnover) — kan skjutas upp

