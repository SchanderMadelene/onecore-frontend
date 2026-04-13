

## "Mer"-knapp i bottom navigation

Bra idé. Istället för att planritningsknappen och en ny "lägg till rum"-knapp tar var sin plats i footern, slår vi ihop dem i en enda knapp som öppnar en meny med alternativ.

### Upplägg

**Mobil:** Ersätt `FloorplanOverlay`-knappen i footern med en `MoreHorizontal`-ikon-knapp som öppnar ett `DropdownMenu` (uppåt, eftersom den sitter längst ner) med två val:
- **Se planritning** — öppnar planritnings-dialogen som idag
- **Lägg till rum/utrymme** — öppnar en enkel dialog med textfält för rumsnamn, lägger till rummet i inspektionsdatan

**Desktop:** Samma koncept i desktop-footern — en "Mer"-knapp med dropdown som ersätter den nuvarande `FloorplanOverlay`-knappen.

### Tekniska ändringar

1. **Ny komponent `InspectionMoreMenu`** — renderar `DropdownMenu` med `MoreHorizontal`-knapp, innehåller:
   - "Se planritning" (öppnar befintlig planritnings-dialog)
   - "Lägg till rum/utrymme" (öppnar en `Dialog` med input för rumsnamn + bekräfta-knapp)

2. **`MobileInspectionForm.tsx`** — ersätt `<FloorplanOverlay />` i bottom-nav med `<InspectionMoreMenu />`. Lägg till state och callback för att hantera nya rum (lägga till i `rooms`-listan och `inspectionData`).

3. **`DesktopInspectionForm.tsx`** — samma byte i footer-raden.

4. **`useInspectionForm.ts`** — lägg till `addCustomRoom(name: string)` som skapar ett nytt rum-objekt med genererat ID och tomma inspektionsdata.

5. **Ta bort / refaktorera `FloorplanOverlay.tsx`** — planritnings-dialogen bäddas in i den nya komponenten istället.

### Visuellt resultat (mobil footer)

```text
┌─────────────────────────────────────────┐
│  [Föregående]          [Nästa]          │
│  [⋯]              [Spara utkast]        │
└─────────────────────────────────────────┘
         ↑
    Dropdown uppåt:
    ┌──────────────────────┐
    │ Se planritning       │
    │ Lägg till rum        │
    └──────────────────────┘
```

