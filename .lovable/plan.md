

## Tabellanalys: Regler och avvikelser i systemet

### Identifierade tabeller

Systemet innehåller **~20 tabeller** fördelade på två kategorier:

**Använder `ResponsiveTable` (standard):** PropertiesTable, SearchResultsTable, BarriersTable, OrdersTable, TenantContracts, TenantKeys, LeaseContractsPage, AllInspectionsPage, MoveOutSection, MoveInSection

**Använder rå `<Table>` direkt:** TenantsList, UnpublishedHousingTable, PublishedHousingTable, ReadyForOfferHousingTable, OfferedHousingTable, HistoryTab, OfferedTab, ReadyForOfferTab, PropertyAreasTable, InspectionsList (inline), InspectionHistory, VluFluTransitionsTable, RenovationTrackingTable, ParkingSpaceDetail (2 st), HousingApplicantsTable, ApplicantsTable, HousingSpaceDetail

---

### Etablerade regler (från de tabeller som följer standarden)

| Regel | Standard |
|-------|----------|
| **Komponent** | `ResponsiveTable` med `mobileCardRenderer` |
| **Wrapper** | `rounded-md border` (hanteras av ResponsiveTable) |
| **Åtgärdsknappar** | `variant="outline"` |
| **Tom-vy** | `emptyMessage`-prop eller centrerad text |
| **Selektion** | `selectable` + `selectedKeys` + `onSelectionChange` |
| **Mobilvy** | Kort-layout via `mobileCardRenderer`, sekundära kolumner via `hideOnMobile` |
| **Header-stil** | Standardstil (ingen bakgrund, ingen extra klass) |

---

### Avvikelser hittade

#### 1. Rå `<Table>` utan mobilstöd (allvarligast — 18 tabeller)
Alla rental-tabeller (PublishedHousingTable, OfferedHousingTable, HistoryTab, OfferedTab, ReadyForOfferTab, etc.), TenantsList, PropertyAreasTable, InspectionsList/InspectionHistory, VluFluTransitionsTable, RenovationTrackingTable, ParkingSpaceDetail, HousingApplicantsTable, ApplicantsTable, HousingSpaceDetail.

**Problem:** Ingen mobilanpassning — horisontell scrollning på mobil.

#### 2. Header-stil: `bg-secondary` på vissa, inte andra
Rental-tabellerna (PublishedHousingTable, OfferedHousingTable, ReadyForOfferHousingTable, ApplicantsTable, HousingApplicantsTable, ParkingSpaceDetail) använder `hover:bg-transparent bg-secondary` + `whitespace-nowrap font-semibold` på TableHead.

Övriga tabeller (TenantsList, UnpublishedHousingTable, InspectionsList, PropertyAreasTable) har **ingen** extra header-styling.

`ResponsiveTable` själv har **ingen** header-bakgrund.

#### 3. Åtgärdsknappar: `ghost` vs `outline`
- **`variant="ghost"`**: BarriersTable, UnpublishedHousingTable, HousingApplicantsTable
- **`variant="outline"`**: Rental-tabs (HistoryTab, OfferedTab etc.)
- **`variant="link"`**: TenantsList
- **Inga knappar / bara text**: InspectionsList ("Visa detaljer" som ghost Button)

Standard enligt minne: **`variant="outline"`** för alla ikon-baserade tabellknappar.

#### 4. Wrapper-klasser inkonsistenta
- `rounded-md border` — ResponsiveTable, UnpublishedHousingTable, PropertyAreasTable
- `rounded-md border bg-card` — HistoryTab, OfferedTab, ReadyForOfferTab
- `rounded-lg border border-slate-200 bg-white overflow-hidden` — InspectionsList
- `border rounded-lg overflow-hidden` — InspectionHistory, rental housing-tabeller
- Ingen wrapper (inuti Card) — VluFluTransitionsTable, RenovationTrackingTable

#### 5. Tom-vy inkonsistent
- Centrerad text i `<TableCell colSpan>` — TenantsList
- Separat div med ikon — HistoryTab, OfferedTab
- `emptyMessage`-prop — ResponsiveTable-användare
- `text-center py-8 bg-muted/30 rounded-lg border` — InspectionHistory

---

### Rekommenderad åtgärdsplan

**Fas 1 — Migrera rå tabeller till ResponsiveTable (prioriterat)**
Konvertera de 18 tabellerna som använder rå `<Table>` till `ResponsiveTable` med `mobileCardRenderer`. Börja med de mest använda:
1. TenantsList
2. Rental-tabeller (Published/Offered/ReadyForOffer HousingTable)
3. Parking-tabs (HistoryTab, OfferedTab, ReadyForOfferTab)
4. InspectionsList + InspectionHistory
5. HousingApplicantsTable, ApplicantsTable
6. PropertyAreasTable (komplex — har expanderbara rader, kan behöva utöka ResponsiveTable)

**Fas 2 — Standardisera styling**
- Ta bort `bg-secondary` från headers (eller lägg till det i `ResponsiveTable` som opt-in prop)
- Enhetlig wrapper: `rounded-md border` (hanteras automatiskt av ResponsiveTable)
- Byt alla `variant="ghost"` och `variant="link"` i tabeller till `variant="outline"`

**Fas 3 — Standardisera tom-vy**
- Använd `emptyMessage`-prop i ResponsiveTable konsekvent
- Ta bort ikon-baserade tom-vyer eller skapa en `EmptyState`-komponent som kan skickas som prop

Vill du att jag börjar med en specifik fas eller tabell?

