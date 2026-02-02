

# Förenklad PDF-export med dropdown-meny

## Sammanfattning
Ersätter nuvarande "Skicka som PDF"-knapp + dialog med en enkel dropdown-meny. Tre direkta alternativ utan mellansteg – snabbare och smidigare för användaren.

---

## Ny design

### Visuellt

```text
┌─────────────────────────┐
│  📄 Protokoll ▾         │  ← Knappen i headern
└─────────────────────────┘
          │
          ▼
┌─────────────────────────────────────┐
│  ↓ Ladda ner PDF                    │
│─────────────────────────────────────│
│  📧 Skicka till avflyttande         │
│  📧 Skicka till inflyttande         │
└─────────────────────────────────────┘
```

### Alternativ (mer kompakt)

```text
┌─────────────────────────────────────┐
│  ↓ Ladda ner                        │
│─────────────────────────────────────│
│  📧 Till avflyttande hyresgäst      │
│     Inkl. kostnadsansvar            │
│                                     │
│  📧 Till inflyttande hyresgäst      │
│     Utan kostnadsinformation        │
└─────────────────────────────────────┘
```

### Beteende
- **Ladda ner**: Genererar PDF med fullständig information (som avflyttande-versionen) och laddar ner direkt
- **Skicka till avflyttande**: Visar toast "E-postfunktion kommer snart" (placeholder tills backend finns)
- **Skicka till inflyttande**: Visar toast "E-postfunktion kommer snart" (placeholder tills backend finns)

---

## Tekniska ändringar

### 1. Ta bort SendPdfDialog.tsx och CostItemSelector.tsx
Dessa komponenter behövs inte längre.

### 2. Skapa PdfDropdownMenu.tsx
**Ny fil:** `src/features/residences/components/inspection/pdf/PdfDropdownMenu.tsx`

```typescript
interface PdfDropdownMenuProps {
  inspection: Inspection;
  roomNames?: Record<string, string>;
}
```

Använder:
- `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSeparator`
- Ikoner: `Download`, `Mail`, `FileText`
- `toast` för bekräftelse/placeholder

### 3. Uppdatera InspectionReadOnly.tsx
- Ta bort `useState(showPdfDialog)`
- Ta bort `SendPdfDialog`-import och rendering
- Ersätt "Skicka som PDF"-knappen med `PdfDropdownMenu`

### 4. Uppdatera generateInspectionPdf.ts
- Ta bort `selectedCostItems`-logik (alla anmärkningar inkluderas alltid)
- Förenkla parametrar till bara `recipient: 'outgoing' | 'incoming'`

### 5. Uppdatera pdf/index.ts
- Ta bort export av `SendPdfDialog` och `CostItemSelector`
- Lägg till export av `PdfDropdownMenu`

---

## Filer som påverkas

| Fil | Ändring |
|-----|---------|
| `pdf/PdfDropdownMenu.tsx` | **Ny** – Dropdown-meny med tre alternativ |
| `pdf/SendPdfDialog.tsx` | **Raderas** |
| `pdf/CostItemSelector.tsx` | **Raderas** |
| `pdf/generateInspectionPdf.ts` | **Uppdatering** – Förenkla utan selectedCostItems |
| `pdf/types.ts` | **Uppdatering** – Ta bort selectedCostItems från PdfOptions |
| `pdf/index.ts` | **Uppdatering** – Ny export |
| `InspectionReadOnly.tsx` | **Uppdatering** – Ersätt knapp med dropdown |

---

## Detaljerad komponentstruktur

```tsx
// PdfDropdownMenu.tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" size="sm" className="gap-2">
      <FileText className="h-4 w-4" />
      Protokoll
      <ChevronDown className="h-3 w-3" />
    </Button>
  </DropdownMenuTrigger>
  
  <DropdownMenuContent align="end">
    <DropdownMenuItem onClick={handleDownload}>
      <Download className="h-4 w-4 mr-2" />
      Ladda ner PDF
    </DropdownMenuItem>
    
    <DropdownMenuSeparator />
    
    <DropdownMenuItem onClick={handleSendToOutgoing}>
      <Mail className="h-4 w-4 mr-2" />
      <div className="flex flex-col">
        <span>Skicka till avflyttande</span>
        <span className="text-xs text-muted-foreground">Inkl. kostnadsansvar</span>
      </div>
    </DropdownMenuItem>
    
    <DropdownMenuItem onClick={handleSendToIncoming}>
      <Mail className="h-4 w-4 mr-2" />
      <div className="flex flex-col">
        <span>Skicka till inflyttande</span>
        <span className="text-xs text-muted-foreground">Utan kostnadsinformation</span>
      </div>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

## Tidsuppskattning
~15-20 minuter (förenkling jämfört med nuvarande implementation)

