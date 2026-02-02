
# Implementeringsplan: PDF-export av besiktningsprotokoll

## Sammanfattning
Lägger till möjlighet att skapa och skicka besiktningsprotokollet som PDF till antingen avflyttande eller inflyttande hyresgäst. För avflyttande hyresgäst kan man välja vilka anmärkningar som ska visas som kostnadsposter. För inflyttande hyresgäst visas protokollet utan kostnadsinformation.

---

## Användarupplevelse

### Flöde
1. Användaren klickar på "Skicka som PDF" i protokollvyn
2. En dialog öppnas med två flikar: **Avflyttande** och **Inflyttande**
3. **Avflyttande-fliken:**
   - Visar lista över alla anmärkningar med kostnadsansvar = "Hyresgäst"
   - Checkboxar för att välja vilka som ska inkluderas
   - Förhandsvisning av totalt antal valda poster
   - Knapp "Ladda ner PDF" / "Skicka via e-post"
4. **Inflyttande-fliken:**
   - Enklare vy utan kostnadsval
   - Knapp "Ladda ner PDF" / "Skicka via e-post"

### Visuell skiss

```text
┌─────────────────────────────────────────────────────┐
│ Skicka besiktningsprotokoll                      ✕ │
├─────────────────────────────────────────────────────┤
│  [Avflyttande hyresgäst]  [Inflyttande hyresgäst]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Mottagare: Erik Eriksson                           │
│  E-post: erik@example.com                           │
│                                                     │
│  ─────────────────────────────────────────────────  │
│                                                     │
│  Välj kostnadsanmärkningar att inkludera:           │
│                                                     │
│  ☑ Kök - Vägg 2: Skadad                             │
│      Åtgärd: Målning, Spackling                     │
│      Ansvar: Hyresgästen                            │
│                                                     │
│  ☐ Sovrum - Golv: Acceptabel                        │
│      Åtgärd: Slipning                               │
│      Ansvar: Hyresgästen                            │
│                                                     │
│  ☑ Badrum - Detaljer: Skadad                        │
│      Åtgärd: Byte                                   │
│      Ansvar: Hyresgästen                            │
│                                                     │
│  ─────────────────────────────────────────────────  │
│                                                     │
│  3 av 4 anmärkningar valda                          │
│                                                     │
├─────────────────────────────────────────────────────┤
│              [Ladda ner PDF]   [Skicka via e-post]  │
└─────────────────────────────────────────────────────┘
```

---

## Teknisk plan

### Steg 1: Installera PDF-bibliotek

**Nytt beroende:**
```bash
npm install jspdf
```

jsPDF är ett lättviktigt bibliotek för att generera PDF-filer i webbläsaren utan serverkomponent.

### Steg 2: Skapa PDF-generator utility

**Ny fil:** `src/features/residences/components/inspection/pdf/generateInspectionPdf.ts`

```typescript
interface PdfOptions {
  inspection: Inspection;
  recipient: 'outgoing' | 'incoming';
  selectedCostItems?: string[]; // Array av component-IDs att inkludera
}

export function generateInspectionPdf(options: PdfOptions): jsPDF {
  // Skapar PDF med:
  // - Header med Mimer-logo och besiktningsinfo
  // - Objektinformation (adress, storlek, etc)
  // - Hyresgästinfo
  // - Rum-för-rum genomgång av anmärkningar
  // - För avflyttande: Kostnadsposter-tabell (endast valda)
  // - Footer med datum och signaturrad
}
```

### Steg 3: Skapa typ för kostnadspost

**Uppdatera fil:** `src/features/residences/components/inspection/types.ts`

```typescript
// Ny typ för filtrerbara kostnadsanmärkningar
export interface CostItem {
  id: string;           // Unik identifierare (roomId-component)
  roomName: string;
  component: string;
  condition: string;
  actions: string[];
  note?: string;
  responsibility: 'tenant' | 'landlord';
}

// Funktion för att extrahera alla kostnadsanmärkningar från en besiktning
export function extractCostItems(inspection: Inspection): CostItem[];
```

### Steg 4: Skapa SendPdfDialog-komponent

**Ny fil:** `src/features/residences/components/inspection/pdf/SendPdfDialog.tsx`

```typescript
interface SendPdfDialogProps {
  inspection: Inspection;
  outgoingTenant?: TenantSnapshot;
  incomingTenant?: { name: string; email?: string };
  isOpen: boolean;
  onClose: () => void;
}
```

**Innehåll:**
- Tabs för att välja mottagare (Avflyttande/Inflyttande)
- Lista med checkboxar för kostnadsanmärkningar (endast för avflyttande)
- Knappar för nedladdning och e-postutskick (e-post = placeholder tills backend finns)

### Steg 5: Uppdatera InspectionReadOnly

**Fil:** `src/features/residences/components/inspection/InspectionReadOnly.tsx`

**Ändringar:**
- Lägg till "Skicka som PDF"-knapp i headern
- Importera och rendera SendPdfDialog
- Skicka in hyresgästdata till dialogen

### Steg 6: Uppdatera DesktopInspectionForm (steg efter slutförande)

**Fil:** `src/features/residences/components/inspection/desktop/DesktopInspectionForm.tsx`

**Ändringar:**
- Efter "Slutför besiktning" visas bekräftelse med "Skicka som PDF"-länk
- Alternativt: Lägg till knappen i success-toast

### Steg 7: Skapa index-fil för pdf-mappen

**Ny fil:** `src/features/residences/components/inspection/pdf/index.ts`

Exporterar alla PDF-relaterade funktioner och komponenter.

---

## Filstruktur efter implementation

```text
src/features/residences/components/inspection/
├── pdf/
│   ├── index.ts
│   ├── generateInspectionPdf.ts    // PDF-generering
│   ├── SendPdfDialog.tsx           // Huvuddialog
│   ├── CostItemSelector.tsx        // Checkboxlista för kostnader
│   └── types.ts                    // PDF-specifika typer
├── InspectionReadOnly.tsx          // Uppdaterad med PDF-knapp
├── ...
```

---

## PDF-innehåll per mottagartyp

| Sektion | Avflyttande | Inflyttande |
|---------|-------------|-------------|
| Besiktningsinfo | ✓ | ✓ |
| Objektinfo | ✓ | ✓ |
| Hyresgästinfo | ✓ (deras info) | ✓ (deras info) |
| Rum-genomgång | ✓ | ✓ |
| Skickbedömning | ✓ | ✓ |
| Åtgärder | ✓ | ✓ |
| Kostnadsansvar | ✓ (valda poster) | ✗ (dold) |
| Kostnadssammanställning | ✓ (om poster valda) | ✗ |

---

## Filer som påverkas

| Fil | Ändring |
|-----|---------|
| `package.json` | Lägg till jspdf |
| `pdf/generateInspectionPdf.ts` | **Ny** - PDF-generering |
| `pdf/SendPdfDialog.tsx` | **Ny** - Huvuddialog |
| `pdf/CostItemSelector.tsx` | **Ny** - Urvalslista |
| `pdf/types.ts` | **Ny** - Typer |
| `pdf/index.ts` | **Ny** - Exports |
| `types.ts` | Lägg till CostItem och extractCostItems |
| `InspectionReadOnly.tsx` | Lägg till PDF-knapp |

---

## Framtida utbyggnad

- **E-postutskick**: Kräver backend/Supabase Edge Function för att skicka e-post med PDF-bilaga
- **Digitala signaturer**: Möjlighet för hyresgäst att signera digitalt
- **Mallhantering**: Anpassningsbara PDF-mallar per fastighetsägare

---

## Tidsuppskattning
~45-60 minuter implementation

