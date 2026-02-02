
# Implementeringsplan: Kostnadsansvar med radioknappar

## Sammanfattning
Lägger till möjligheten att ange vem som ansvarar för kostnaden vid skador eller acceptabla avvikelser. Visas som radioknappar ("Hyresgäst" / "Hyresvärd") direkt under skickvalsknappar när status är "Skadad" eller "Acceptabel".

## Användarupplevelse

**Flöde:**
1. Inspektören väljer skick på en komponent (t.ex. "Skadad")
2. Under skicknknapparna visas två radioknappar: ○ Hyresgäst  ○ Hyresvärd
3. Inspektören trycker på rätt ansvarig – radioknappen markeras
4. Valet sparas automatiskt och visas i protokollet

**Visuell design:**
```text
┌─────────────────────────────────────────┐
│ Vägg 1                              📷 →│
├─────────────────────────────────────────┤
│  [God]   [Acceptabel]   [Skadad ✓]      │
│                                         │
│  Kostnadsansvar:                        │
│  ○ Hyresgäst    ○ Hyresvärd             │
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ Anteckning...                    📷 ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

---

## Teknisk plan

### Steg 1: Utöka datamodellen

**Fil:** `src/features/residences/components/inspection/types.ts`

Lägg till nytt fält `costResponsibility` i `InspectionRoom`:

```typescript
export type CostResponsibility = 'tenant' | 'landlord' | null;

export interface InspectionRoom {
  // ... befintliga fält
  costResponsibility: {
    wall1: CostResponsibility;
    wall2: CostResponsibility;
    wall3: CostResponsibility;
    wall4: CostResponsibility;
    floor: CostResponsibility;
    ceiling: CostResponsibility;
    details: CostResponsibility;
  };
}
```

### Steg 2: Uppdatera initialdata

**Fil:** `src/features/residences/components/inspection/form/initialData.ts`

Lägg till `costResponsibility` med alla fält satta till `null`.

### Steg 3: Lägg till handler i useInspectionForm

**Fil:** `src/features/residences/hooks/useInspectionForm.ts`

Ny funktion `handleCostResponsibilityUpdate` som uppdaterar rätt fält i inspektionsdatan.

### Steg 4: Uppdatera ComponentInspectionCard

**Fil:** `src/features/residences/components/inspection/ComponentInspectionCard.tsx`

**Ändringar:**
- Lägg till props: `costResponsibility` och `onCostResponsibilityChange`
- Visa RadioGroup villkorligt när `condition === "Skadad"` eller `condition === "Acceptabel"`
- Använd befintliga `RadioGroup` och `RadioGroupItem` komponenter

```tsx
{(condition === "Skadad" || condition === "Acceptabel") && (
  <div className="mb-3">
    <span className="text-sm text-muted-foreground mb-2 block">Kostnadsansvar</span>
    <RadioGroup 
      value={costResponsibility || ""} 
      onValueChange={onCostResponsibilityChange}
      className="flex gap-4"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="tenant" id={`${componentKey}-tenant`} />
        <Label htmlFor={`${componentKey}-tenant`}>Hyresgäst</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="landlord" id={`${componentKey}-landlord`} />
        <Label htmlFor={`${componentKey}-landlord`}>Hyresvärd</Label>
      </div>
    </RadioGroup>
  </div>
)}
```

### Steg 5: Uppdatera RoomInspectionMobile

**Fil:** `src/features/residences/components/inspection/mobile/RoomInspectionMobile.tsx`

- Lägg till props `onCostResponsibilityUpdate` 
- Skicka vidare till varje `ComponentInspectionCard`

### Steg 6: Uppdatera MobileInspectionForm & DesktopInspectionForm

Båda behöver:
- Hämta `handleCostResponsibilityUpdate` från `useInspectionForm`
- Skicka vidare till `RoomInspectionMobile`

### Steg 7: Visa i protokollet

**Fil:** `src/features/residences/components/inspection/InspectionReadOnly.tsx`

Visa kostnadsansvar per komponent där det är angivet:

```tsx
{costResponsibility && (
  <Badge variant={costResponsibility === 'tenant' ? 'destructive' : 'secondary'}>
    {costResponsibility === 'tenant' ? 'Hyresgästens ansvar' : 'Hyresvärdens ansvar'}
  </Badge>
)}
```

---

## Filer som påverkas

| Fil | Ändring |
|-----|---------|
| `types.ts` | Ny typ + nytt fält |
| `initialData.ts` | Initialisera costResponsibility |
| `useInspectionForm.ts` | Ny handler + returnera den |
| `ComponentInspectionCard.tsx` | Radioknappar med RadioGroup |
| `RoomInspectionMobile.tsx` | Prop-passning |
| `MobileInspectionForm.tsx` | Prop-passning |
| `DesktopInspectionForm.tsx` | Prop-passning |
| `InspectionReadOnly.tsx` | Visa i protokoll |

---

## Tidsuppskattning
~20 minuter implementation
