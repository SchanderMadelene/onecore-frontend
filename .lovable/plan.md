

# Förbättrad komponentvisning i besiktningsprotokoll

## Sammanfattning
Alla komponenter i ett rum visas i en lista där varje komponent är expanderbar. Komponenter med anmärkningar (Acceptabel/Skadad) är default expanderade, medan godkända komponenter (Bra) är ihopfällda. "Hanterat"-badge tas bort från rumsheadern.

---

## Ny design

### Rumsheader (förenklad)

```text
┌─────────────────────────────────────────────────────────┐
│ 🔴 Kök                               4 anmärkningar   ∨ │
└─────────────────────────────────────────────────────────┘
```

Notera: Ingen "Hanterat"-badge – allt i ett protokoll är per definition hanterat.

### Komponentlista (expanderat rum)

Varje komponent är en egen expanderbar rad. Anmärkningar expanderas automatiskt:

```text
┌─────────────────────────────────────────────────────────┐
│ Kök                                   4 anmärkningar  ∧ │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ 🔴 Vägg 2                                       ∧ │  │
│  │                                                   │  │
│  │ Skadad · Hyresgästens ansvar                     │  │
│  │                                                   │  │
│  │ Stora sprickor vid fönster, troligen fuktskada.  │  │
│  │                                                   │  │
│  │ Åtgärder: Målning · Spackling                    │  │
│  │                                                   │  │
│  │ 📷 Visa 2 foton                                   │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ 🟡 Golv                                         ∧ │  │
│  │                                                   │  │
│  │ Acceptabel · Hyresgästens ansvar                 │  │
│  │                                                   │  │
│  │ Repor vid diskbänk.                              │  │
│  │                                                   │  │
│  │ Åtgärder: Slipning                               │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ 🟢 Vägg 1                                       ∨ │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ 🟢 Tak                                          ∨ │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ 🟢 Detaljer                                     ∨ │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Designprinciper

### 1. Default-expandering baserat på skick
| Skick | Default | Logik |
|-------|---------|-------|
| Skadad | Expanderad | Viktig info som kräver uppmärksamhet |
| Acceptabel | Expanderad | Har anmärkning som bör granskas |
| Bra | Kollapsad | Inget att se, minskar brus |

### 2. Kompakt header för godkända
Godkända komponenter visar bara namn + grön ikon – inget mer behövs.

### 3. Färgkodning
- 🟢 `text-green-600` = Bra
- 🟡 `text-amber-500` = Acceptabel
- 🔴 `text-destructive` = Skadad

### 4. Svenska komponentnamn

```typescript
const COMPONENT_LABELS: Record<string, string> = {
  wall1: 'Vägg 1',
  wall2: 'Vägg 2',
  wall3: 'Vägg 3',
  wall4: 'Vägg 4',
  floor: 'Golv',
  ceiling: 'Tak',
  details: 'Detaljer',
};
```

---

## Tekniska ändringar

### Fil: InspectionReadOnly.tsx

**1. Lägg till konstanter och hjälpfunktioner:**

```typescript
const COMPONENT_LABELS: Record<string, string> = { ... };

const getConditionColor = (condition: string) => { ... };
const getConditionIcon = (condition: string) => { ... };
const hasRemark = (condition: string) => condition === 'Acceptabel' || condition === 'Skadad';
```

**2. Beräkna default-expanderade komponenter:**

```typescript
// Hitta alla komponenter med anmärkningar för att auto-expandera
const getDefaultExpandedComponents = (rooms: Record<string, InspectionRoom>) => {
  const expanded: string[] = [];
  Object.entries(rooms).forEach(([roomId, room]) => {
    Object.entries(room.conditions).forEach(([component, condition]) => {
      if (hasRemark(condition)) {
        expanded.push(`${roomId}-${component}`);
      }
    });
  });
  return expanded;
};
```

**3. Nytt state för expanderade komponenter:**

```typescript
const [expandedComponents, setExpandedComponents] = useState<string[]>(
  () => getDefaultExpandedComponents(inspection.rooms)
);
```

**4. Uppdaterad renderRooms():**
- Ta bort "Hanterat"-badge
- Använd `roomNames` för svenska rumsnamn
- Visa anmärkningsräknare i header
- Visa statusfärg baserat på värsta skicket i rummet

**5. Ny renderComponentAccordion():**
- Varje komponent som AccordionItem
- Använd `type="multiple"` för att tillåta flera öppna samtidigt
- Header visar: Ikon + svenskt namn + chevron
- Innehåll (när expanderad): Skick, ansvar, åtgärder, anteckningar, foton

---

## Komponenter som används
- `Accordion` med `type="multiple"` (istället för `Collapsible`) för komponenterna
- Befintlig `Accordion` behålls för rum
- Befintlig `Collapsible` behålls för foton

---

## Sammanfattning av ändringar

| Ändring | Före | Efter |
|---------|------|-------|
| "Hanterat"-badge | Visas | Borttagen |
| Komponentnamn | "wall1" | "Vägg 1" |
| Rumsnamn | "Rum kitchen" | "Kök" |
| Komponentlayout | Grid med kort | Expanderbar lista |
| Anmärkningar | Samma som godkända | Auto-expanderade |
| Godkända | Samma som anmärkningar | Kollapsade, minimal header |
| "Inga åtgärder" | Visas alltid | Döljs |
| Statusfärg | Saknas | Ikon + färg i header |

---

## Filer som påverkas

| Fil | Ändring |
|-----|---------|
| `InspectionReadOnly.tsx` | Omstrukturering av renderRooms med ny expanderbar komponentlista |

