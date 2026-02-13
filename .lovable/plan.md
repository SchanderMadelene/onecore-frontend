
# Migrera TenantContracts och TenantKeys till ResponsiveTable

## Bakgrund
Projektstandarden ar att alla tabeller ska anvanda `ResponsiveTable`-komponenten, som automatiskt visar kort-layout pa mobil istallet for horisontellt scrollande tabeller. Tva komponenter pa hyresgastsidan bryter mot detta: **TenantContracts** och **TenantKeys**.

## Andringar

### 1. `src/features/tenants/components/TenantContracts.tsx`
- Byt fran ra `Table`-import till `ResponsiveTable`
- Definiera kolumner med `ResponsiveTableColumn[]` (Typ, Kontraktsnummer, Objekt, Startdatum, Slutdatum, Manadshyra, Kontrakttyp, Status, Atgard)
- Lagg till en `mobileCardRenderer` som visar kontraktets viktigaste info: typ + objektnamn som rubrik, kontraktsnummer, hyra, status-badge och "Visa kontrakt"-knapp
- Dolja mindre viktiga kolumner pa mobil via `hideOnMobile` (Slutdatum, Kontrakttyp)
- Behall `compact`-prop: nar `compact=true`, rendera bara ResponsiveTable utan Card-wrapper; nar `compact=false`, wrappa i Card med rubrik

### 2. `src/features/tenants/components/TenantKeys.tsx`
- Byt fran ra `Table`-import till `ResponsiveTable`
- Definiera kolumner (Nyckeltyp, Nyckelnamn, Flexnummer, Tillhor hyresobjekt, Nyckelsystem, Lopnummer, Utlaningsdatum)
- Lagg till en `mobileCardRenderer` som visar nyckelnamn + typ som rubrik, hyresobjekt, flexnummer och utlaningsdatum
- Dolja mindre viktiga kolumner pa mobil via `hideOnMobile` (Nyckelsystem, Lopnummer)
- Lagg till `compact`-prop for konsistens med ovriga tab-komponenter

### Mobilkortens layout
Korten foljer samma monster som befintliga ResponsiveTable-implementationer (t.ex. OrdersTable, BarriersTable):
- Rubrikrad med fet text (objektnamn/nyckelnamn)
- Kompletterande info i `text-sm text-muted-foreground`
- Eventuella badges och knappar langst ner

### Ingen paverkan pa desktop
Desktop-vyn forblir identisk — ResponsiveTable renderar samma tabellstruktur som tidigare.
