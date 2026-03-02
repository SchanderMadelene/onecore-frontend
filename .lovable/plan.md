

## Kontaktflöde för utflyttande hyresgäst

### Bakgrund
När kvartervärden ringer en utflyttande hyresgäst finns två utfall:
1. **Besök bokat** -- man kommer överens om ett datum
2. **Ej nådd** -- ingen svarade

### Design

Flödet byggs som en ny komponent `ContactStatusCell` som följer exakt samma mönster som `CleaningCheckCell`: en statusbadge (pill/Select) med valfri datumväljare.

**Statusar:**

| Status | Badge-stil | Extra |
|--------|-----------|-------|
| `not_contacted` | Grå (muted) | Ingen extra info |
| `not_reached` | Amber | Visar antal försök (autoräknas upp) |
| `visit_booked` | Emerald | Datumväljare för besöksdatum |

**Flöde i tabellen:**
- Ny kolumn "Kontakt" placeras efter utflyttskolumnen (datum), bredvid städkontroll
- Ringknappen behålls som den är -- den är separat från statusregistreringen
- Kvartervärden ringer, sen väljer status i dropdown

```text
| Hyresgäst (ut) | Datum | Kontakt          | Städkontr.     | ...
| Pettersson Eva  | 2 mar | [Ej nådd 2x]    | [Bokad] 12 mar | ...
| Svensson Kalle  | 5 mar | [Besök] 14 mar   | [Ej utförd]   | ...
```

### Tekniska ändringar

**1. Utöka typer** (`move-in-list-types.ts`)
- Ny typ `ContactStatus = 'not_contacted' | 'not_reached' | 'visit_booked'`
- Lägg till i `MoveInListChecklist`: `contactStatus`, `contactAttempts`, `visitBookedDate`

**2. Ny komponent** (`ContactStatusCell.tsx`)
- Samma struktur som `CleaningCheckCell`: Select med pill-styling + datumväljare vid `visit_booked`
- Vid val av `not_reached` räknas `contactAttempts` upp automatiskt (+1)
- Badge visar "Ej nådd 2x" om flera försök

**3. Uppdatera `CombinedTurnoverTable.tsx`**
- Ny kolumn "Kontakt" i desktop-tabellen efter "Sista deb."
- Nya callback-props: `onContactStatusChange`, `onVisitBookedDateChange`
- Mobilvy: Kontaktstatus visas i utflytts-sektionen

**4. Uppdatera `MoveInListPage`/container**
- Koppla nya callbacks till state-hantering (samma mönster som cleaning)
- Initiera nya fält i mockdata

