
# Standardisering av sök- och filterlayout för samlingssidor

## Målbild
Etablera ett enhetligt mönster för alla samlingssidor med:
- Sökinput som fyller hela sidans bredd på sin egen rad
- Filter nedanför sökningen (ej i Collapsible)
- Behålla befintliga filter per sida
- "Rensa filter"-knapp synlig när filter är aktiva

## Sidor som ska uppdateras

### 1. BarriersPage
**Nuvarande:** Sök och filter på samma rad
**Ändring:** Bryt ut sökinputen till en egen rad ovanför filtren

### 2. TurnoverPage  
**Nuvarande:** Sök och filter på samma rad
**Ändring:** Bryt ut sökinputen till en egen rad ovanför filtren

### 3. AllInspectionsPage
**Nuvarande:** Begränsad bredd (`max-w-md`) på sök, filter i egen rad
**Ändring:** Ta bort `max-w-md` så sök fyller hela bredden. Fixa `onChange`-funktionalitet

### 4. AllTenantsPage
**Nuvarande:** Filter i Collapsible-komponent inuti Card
**Ändring:** Ta bort Collapsible, visa filter direkt under sökinputen

### 5. AllPropertiesPage
**Nuvarande:** Filter i Collapsible-komponent inuti Card
**Ändring:** Ta bort Collapsible, visa filter direkt under sökinputen

### 6. LeaseContractsPage
**Nuvarande:** Redan korrekt struktur med sök på egen rad och filter nedanför
**Ändring:** Ingen ändring behövs (referenssida)

## Implementation

### Steg 1: BarriersPage
```text
Före:
┌─────────────────────────────────────────────────────┐
│ [Sök............] [Typ ▼] [Status ▼] [Rensa]        │
└─────────────────────────────────────────────────────┘

Efter:
┌─────────────────────────────────────────────────────┐
│ [Sök................................................] │
├─────────────────────────────────────────────────────┤
│ [Typ ▼] [Status ▼] [Rensa filter]                   │
└─────────────────────────────────────────────────────┘
```

### Steg 2: TurnoverPage
```text
Före:
┌─────────────────────────────────────────────────────┐
│ [Sök............] [Status ▼] [Prioritet ▼] [Rensa]  │
└─────────────────────────────────────────────────────┘

Efter:
┌─────────────────────────────────────────────────────┐
│ [Sök................................................] │
├─────────────────────────────────────────────────────┤
│ [Status ▼] [Prioritet ▼] [Rensa filter]             │
└─────────────────────────────────────────────────────┘
```

### Steg 3: AllInspectionsPage
```text
Före:
┌─────────────────────────────────────────────────────┐
│ [Sök..........] (max-w-md, saknar onChange)         │
├─────────────────────────────────────────────────────┤
│ [Besiktningsman ▼] [Adress ▼] [Distrikt ▼] ...      │
└─────────────────────────────────────────────────────┘

Efter:
┌─────────────────────────────────────────────────────┐
│ [Sök................................................] │
├─────────────────────────────────────────────────────┤
│ [Besiktningsman ▼] [Adress ▼] [Distrikt ▼] ...      │
└─────────────────────────────────────────────────────┘
+ Fungerande söklogik
```

### Steg 4: AllTenantsPage
```text
Före:
┌─────────────────────────────────────────────────────┐
│ [Sök................................................] │
├─ Collapsible ───────────────────────────────────────┤
│ ▶ Filter (3)                           [Rensa alla] │
│   ┌───────────────────────────────────────────────┐ │
│   │ [Kontraktsstatus] [Kontraktstyp] [Kundtyp]    │ │
│   │ [Fastighet] [Byggnad] [Distrikt]              │ │
│   └───────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘

Efter:
┌─────────────────────────────────────────────────────┐
│ [Sök................................................] │
├─────────────────────────────────────────────────────┤
│ [Kontraktsstatus ▼] [Kontraktstyp ▼] [Kundtyp ▼]    │
│ [Fastighet ▼] [Byggnad ▼] [Distrikt ▼] [Rensa]      │
└─────────────────────────────────────────────────────┘
```

### Steg 5: AllPropertiesPage
```text
Före:
┌─────────────────────────────────────────────────────┐
│ [PropertyTypeFilters]                               │
│ [Sök................................................] │
├─ Collapsible ───────────────────────────────────────┤
│ ▶ Filter (2)                           [Rensa alla] │
│   ┌───────────────────────────────────────────────┐ │
│   │ [Diverse filter beroende på typ]              │ │
│   └───────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘

Efter:
┌─────────────────────────────────────────────────────┐
│ [PropertyTypeFilters]                               │
│ [Sök................................................] │
├─────────────────────────────────────────────────────┤
│ [Beteckning ▼] [Kvartersvärd ▼] [Marknadsområde ▼]  │
│ [Fastighetsnr ▼] [Distrikt ▼] [Område ▼] [Rensa]    │
└─────────────────────────────────────────────────────┘
(PropertyTypeFilters behålls ovanför sök)
```

---

## Tekniska detaljer

### Filer som behöver ändras

| Fil | Ändringstyp |
|-----|-------------|
| `src/pages/barriers/BarriersPage.tsx` | Ändra layout till två rader |
| `src/pages/turnover/TurnoverPage.tsx` | Ändra layout till två rader |
| `src/pages/inspections/AllInspectionsPage.tsx` | Ta bort `max-w-md`, lägg till söklogik |
| `src/pages/tenants/AllTenantsPage.tsx` | Ta bort Collapsible, visa filter inline |
| `src/pages/properties/AllPropertiesPage.tsx` | Ta bort Collapsible, visa filter inline |

### Gemensam struktur för alla sidor
```tsx
<div className="space-y-4">
  {/* Sökfält - full bredd */}
  <div className="relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    <Input
      placeholder="Sök..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="pl-10"
    />
  </div>

  {/* Filter - egen rad */}
  <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
    {/* Filter-komponenter */}
    {hasActiveFilters && (
      <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
        <X className="h-4 w-4" />
        Rensa filter
      </Button>
    )}
  </div>
</div>
```

### Konsekvenser
- Alla filter synliga direkt utan extra klick
- Enhetligt utseende över hela applikationen
- Bättre UX då användare inte behöver öppna Collapsible för att se filter
- Mobilanpassning med `flex-wrap` för att stapla filter på smala skärmar
