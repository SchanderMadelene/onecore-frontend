
# Enhetlig tabellstil för alla samlingssidor

## Nuläge

Tabellerna på samlingssidorna har inkonsekvent styling:

| Sida | Wrapper | Rubrik | Resultaträknare |
|------|---------|--------|-----------------|
| BarriersPage | Ingen | Nej | Nej |
| TurnoverPage (Lista) | Ingen (men TurnoverList har egen rubrik) | Ja | Ja |
| AllInspectionsPage | `space-y-4` div | Nej | Nej |
| LeaseContractsPage | Ingen | Nej | Nej |
| AllTenantsPage | Ingen | Nej | Nej |
| AllPropertiesPage | PropertyFilteredResults | Ja | Ja |

## Standardmönster

Baserat på `PropertyFilteredResults` och `ResponsiveTable` etablerar vi följande standard:

```text
┌─────────────────────────────────────────────────────┐
│ Rubrik                          Visar X av Y resultat │
├─────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────┐ │
│ │               ResponsiveTable                    │ │
│ │           (rounded-md border)                    │ │
│ └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

Mönstret innehåller:
1. En yttre wrapper med `space-y-4`
2. En rubrikrad med titel till vänster och resultaträknare till höger
3. Tabellen med sin inbyggda `rounded-md border` styling

## Filer som ändras

### 1. BarriersPage.tsx
Lägg till rubrik och resultaträknare ovanför `BarriersTable`:
```tsx
<div className="space-y-4">
  <div className="flex items-center justify-between">
    <h2 className="text-lg font-semibold">Spärrar</h2>
    <span className="text-sm text-muted-foreground">
      Visar {filteredBarriers.length} av {allBarriers.length} spärrar
    </span>
  </div>
  <BarriersTable ... />
</div>
```

### 2. AllInspectionsPage.tsx
Uppdatera `renderInspectionTable` för att inkludera rubrik och räknare:
```tsx
<div className="space-y-4">
  <div className="flex items-center justify-between">
    <h2 className="text-lg font-semibold">{title}</h2>
    <span className="text-sm text-muted-foreground">
      Visar {data.length} besiktningar
    </span>
  </div>
  <ResponsiveTable ... />
</div>
```

### 3. LeaseContractsPage.tsx
Lägg till rubrik och resultaträknare:
```tsx
<div className="space-y-4">
  <div className="flex items-center justify-between">
    <h2 className="text-lg font-semibold">Hyreskontrakt</h2>
    <span className="text-sm text-muted-foreground">
      Visar {paginatedContracts.length} av {filteredContracts.length} kontrakt
    </span>
  </div>
  <ResponsiveTable ... />
  {totalPages > 1 && <LeaseContractsPagination ... />}
</div>
```

### 4. AllTenantsPage.tsx
Lägg till rubrik och resultaträknare:
```tsx
<div className="space-y-4">
  <div className="flex items-center justify-between">
    <h2 className="text-lg font-semibold">Kunder</h2>
    <span className="text-sm text-muted-foreground">
      Visar {filteredCustomers.length} av {customers.length} kunder
    </span>
  </div>
  <ResponsiveTable ... />
</div>
```

### 5. TurnoverList.tsx
Behåll befintlig struktur då den redan följer mönstret, men verifiera konsistens i textformatering.

### 6. AllPropertiesPage.tsx
Redan korrekt via `PropertyFilteredResults` - ingen ändring behövs.

## Tekniska detaljer

### Gemensam wrapper-struktur
```tsx
<div className="space-y-4">
  <div className="flex items-center justify-between">
    <h2 className="text-lg font-semibold">{titel}</h2>
    <span className="text-sm text-muted-foreground">
      Visar {visade} av {totalt} {enhet}
    </span>
  </div>
  {/* Tabell eller tom state */}
</div>
```

### Stilregler
- Wrapper: `space-y-4`
- Rubrik: `text-lg font-semibold`
- Resultaträknare: `text-sm text-muted-foreground`
- Header-rad: `flex items-center justify-between`
- Tabellens border kommer från `ResponsiveTable`: `rounded-md border`

### Tom-tillstånd
När data är tom visas centrerad text utan wrapper:
```tsx
<div className="text-center py-8 text-muted-foreground">
  {emptyMessage}
</div>
```

## Sammanfattning

Ändringarna säkerställer att alla samlingssidor har:
- Konsekvent visuell hierarki med rubrik och räknare
- Enhetlig spacing (`space-y-4`)
- Samma typografi för rubriker och metadata
- `ResponsiveTable` med sin inbyggda `rounded-md border`
