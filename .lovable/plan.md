

# Sparade sökningar / Favoriter -- Analys och plan

## Sammanfattning av feedbacken

Feedbacken beskriver **tre huvudområden** där användare behöver kunna spara filterinställningar som favoriter. Nedan kartlägger jag varje punkt mot var i systemet den hör hemma och vilka filter/parametrar som behövs.

---

## 1. Favoriter kopplade till Hyreskontrakt

**Sida:** `/lease-contracts` (LeaseContractsPage)

### 1A. In- och avflytt (Kundcenter och Kvartersvärdar)

| Behov | Filterparametrar som behövs | Finns idag? |
|-------|---------------------------|-------------|
| Alla kommande kontrakt till ett visst datum/period | `status = 0 (Kommande)` + `fromDateStart/fromDateEnd` | Ja, status + datumfilter finns |
| Alla uppsagda kontrakt till ett visst datum/period | `status = 2 (Uppsagt)` + `lastDebitDateStart/lastDebitDateEnd` | Ja, status + datumfilter finns |
| Alla lgh som blir vakanta efter ett visst datum | `status = 2 (Uppsagt)` + `terminationDate`-filter | **Nej** -- saknar filter pa terminationDate/preferredMoveOutDate |
| Filtrering per distrikt / KVV-omrade / kostnadsställe | `district`-filter finns, men **KVV-omrade** och **kostnadsställe** saknas | **Delvis** |

### 1B. Uthyrningsflödet (dagligen av uthyrningen)

| Behov | Filterparametrar | Finns idag? |
|-------|-----------------|-------------|
| Kontrakt som väntar pa signatur | Ny status eller filteralternativ | **Nej** -- behöver "Väntar pa signatur"-status eller flagga |
| Kontrakt med pabarjad uppsägning | `status = 2 (Uppsagt)` + eventuellt noticeDate-filter | **Delvis** -- status finns men noticeDate-filter saknas |

### 1C. Utskick av mejl/sms

| Behov | Filterparametrar | Finns idag? |
|-------|-----------------|-------------|
| Kontraktsstatus | `status` | Ja |
| Kvartersvärdsomrade | KVV-filter | **Nej** |
| Marknadsomrade | Marknadsomrade-filter | **Nej** |
| Adress | `searchQuery` (söker pa adress) | Ja |
| Kontraktstyp | `type` | Ja |
| Fastighet | `property` | Ja |

### 1D. Andrahandsuthyrningar och korttidskontrakt

| Behov | Filterparametrar | Finns idag? |
|-------|-----------------|-------------|
| Se alla andrahandsuthyrningar | Ny kontraktstyp eller flagga | **Nej** |
| Se alla korttidskontrakt | Ny kontraktstyp eller flagga | **Nej** |

---

## 2. Favoriter kopplade till Hyresobjekt (Spärrar)

**Sida:** `/barriers` (BarriersPage)

### 2A. Spärrade objekt

| Behov | Filterparametrar | Finns idag? |
|-------|-----------------|-------------|
| Typ av spärr | `typeFilter` | Ja (men med generiska typer, ej VLU/FLU) |
| Distrikt | Distrikt-filter | **Nej** |
| Fastighet | Fastighet-filter | **Nej** |
| Kostnadsställe | Kostnadsställe-filter | **Nej** |

### 2B. VLU till FLU

| Behov | Filterparametrar | Finns idag? |
|-------|-----------------|-------------|
| Spärranledning VLU/FLU | Specifika spärrorsaker | **Nej** -- `reason` är fritext, behöver kategoriserade orsaker (VLU, FLU) |

### 2C. Statistik/Uppföljning (FLU-rapporter)

| Behov | Filterparametrar | Finns idag? |
|-------|-----------------|-------------|
| FLU Renoveras innan inflytt | Spärr-typ + renoverings-flagga | **Nej** |
| FLU Renoveras efter inflytt | Spärr-typ + renoverings-flagga | **Nej** |
| VLU till FLU-statistik | Historisk statusändring | **Nej** |
| Renoveras efter inflytt (spärr ej släppt) | Status aktiv + specifik typ | **Nej** |

---

## 3. Favoriter kopplade till Hyresrad

| Behov | Filterparametrar | Finns idag? |
|-------|-----------------|-------------|
| Alla gällande kontrakt med en viss hyresrad | Hyresrad-filter pa lease-contracts | **Nej** -- hyresrad finns ej som begrepp i systemet |

---

## Implementationsplan

Arbetet delas upp i **fas 1** (snabba vinster med befintliga filter) och **fas 2** (nya filter och datamodell).

### Fas 1: Koppla befintliga filter till favoritsystemet

Det viktigaste problemet: **SaveAsFavoriteButton fångar inte upp aktuella filterparametrar** fran sidan. Den sparar bara kategori och sidtitel, inte de aktiva filtren.

**Steg 1.1 -- Utöka SaveAsFavoriteButton med filterparametrar**
- Lägg till en `getActiveFilters` callback-prop som samlar ihop aktuella filter fran sidan
- Nar användaren klickar "Spara" samlas alla aktiva filter in automatiskt som `parameters` pa favoriten

**Steg 1.2 -- Koppla LeaseContractsPage till favoritsystemet**
- Skicka med aktuella filter (status, typ, distrikt, fastighet, byggnad, datumintervall) som parametrar till SaveAsFavoriteButton
- Nar en favorit öppnas: läs parameters och sätter filtren via URL-parametrar eller direkt state

**Steg 1.3 -- Koppla BarriersPage till favoritsystemet**
- Samma mönster: skicka med typeFilter, statusFilter, searchQuery

**Steg 1.4 -- Koppla TurnoverPage till favoritsystemet**
- Skicka med startDate, endDate, selectedKvvArea, selectedDistrict

### Fas 2: Lägg till saknade filter

**Steg 2.1 -- LeaseContractsPage nya filter**
- KVV-omrade / kostnadsställe-filter (kräver att datan utökas med kvvArea)
- Marknadsomrade-filter
- TerminationDate / preferredMoveOutDate-filter (för vakanta lgh)
- NoticeDate-filter (för paborjad uppsägning)

**Steg 2.2 -- BarriersPage nya filter**
- Distrikt-filter
- Fastighet-filter
- Kostnadsställe-filter
- Kategoriserade spärrorsaker (VLU, FLU, etc.) istället för enbart fritext

**Steg 2.3 -- Nya kontraktstyper/flaggor**
- Andrahandsuthyrning som kontraktstyp eller flagga
- Korttidskontrakt som kontraktstyp eller flagga
- "Väntar pa signatur"-status/flagga

**Steg 2.4 -- Hyresrad-koncept**
- Definiera vad en "hyresrad" är i datamodellen
- Lägg till hyresrad-filter pa lease-contracts-sidan

### Fas 3: Statistik/rapport-favoriter (VLU/FLU)

Dessa kräver mer avancerad funktionalitet (aggregeringar, historik, manadsvis statistik) och bör planeras som en separat feature.

---

## Tekniska detaljer

### Ändrade filer (Fas 1)

| Fil | Ändring |
|-----|---------|
| `src/shared/common/SaveAsFavoriteButton.tsx` | Ny prop `getActiveFilters: () => FavoriteParameters` som fångar aktuella filter |
| `src/features/favorites/hooks/useFavorites.ts` | Uppdatera `createFavorite` att ta emot parameters fran den aktiva sidan |
| `src/pages/lease-contracts/LeaseContractsPage.tsx` | Skicka filterstate till SaveAsFavoriteButton |
| `src/pages/barriers/BarriersPage.tsx` | Samma mönster |
| `src/pages/turnover/TurnoverPage.tsx` | Samma mönster |
| `src/features/favorites/services/favoritesService.ts` | Redan stödjer parameters -- ingen ändring |

### Mönster för att applicera sparade filter

Nar en favorit öppnas navigerar vi till `targetUrl` med parameters som URL-query-parametrar. Varje sida läser query-parametrar vid mount och sätter sina filter.

### Nya filter (Fas 2)

| Fil | Nya filter |
|-----|-----------|
| `src/pages/lease-contracts/types/leaseContract.ts` | Utöka LeaseContract med `kvvArea`, `marketArea`, `contractSubType` |
| `src/pages/lease-contracts/hooks/useLeaseContractFilters.ts` | Nya filter: kvvArea, marketArea, terminationDate, noticeDate |
| `src/pages/lease-contracts/components/LeaseContractsFilters.tsx` | Nya Select-komponenter |
| `src/features/barriers/types/barrier.ts` | Utöka Barrier med `district`, `propertyId`, `costCenter`, `reasonCategory` |
| `src/pages/barriers/BarriersPage.tsx` | Nya filter: distrikt, fastighet, kostnadsställe, orsakkategori |

