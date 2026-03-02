
## Noteringar med more-meny i turnover-tabellen

### Oversikt
Lagg till en "more"-knapp (tre prickar) pa varje rad i turnover-tabellen som oppnar en dropdown-meny. Forsta menyalternativet blir "Lagg till notering". Nar man klickar oppnas en dialog for att skriva en notering. Om en rad har noteringar visas en liten ikon som man kan hovra over for att lasa dem.

### Nya filer

**`src/features/turnover/types/turnover-note-types.ts`**
- Typ `TurnoverNote` med `id`, `entryId`, `content`, `createdAt`, `createdBy`

**`src/features/turnover/hooks/useTurnoverNotes.ts`**
- Hook som hanterar state for noteringar (lagg till, hamta per entry)
- Lagrar noteringar i lokal state (mock, redo for API)

**`src/features/turnover/components/TurnoverRowActions.tsx`**
- `DropdownMenu` med `MoreHorizontal`-ikon (samma monster som `OfferActions.tsx` och `ApplicantActions.tsx`)
- Menyalternativ: "Lagg till notering"
- Klick oppnar en `Dialog` med en `Textarea` och Spara/Avbryt-knappar (inspirerat av `Notes.tsx`)

**`src/features/turnover/components/TurnoverNoteIndicator.tsx`**
- Liten ikon (`MessageSquare` eller `StickyNote`) som visas om det finns noteringar for en rad
- Wrappas i `HoverCard` (redan finns i projektet) som visar noteringarna nar man hovrar

### Andringar i befintliga filer

**`src/features/turnover/components/CombinedTurnoverTable.tsx`**
- Desktop: Lagg till en ny kolumn langst till hoger med rubrik tom (eller "")
  - Innehaller `TurnoverRowActions` (more-menyn)
  - Bredvid: `TurnoverNoteIndicator` om det finns noteringar
- Mobil: Lagg till more-menyn och noteringsindikator i varje accordion-items content-sektion

### Tekniska detaljer

More-menyn foljer exakt samma monster som i systemet:
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="bg-background border shadow-md">
    <DropdownMenuItem onClick={openNoteDialog}>
      Lagg till notering
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

Noteringsindikatorn med hover:
```tsx
<HoverCard>
  <HoverCardTrigger>
    <StickyNote className="h-4 w-4 text-amber-500" />
  </HoverCardTrigger>
  <HoverCardContent>
    {/* Lista med noteringar */}
  </HoverCardContent>
</HoverCard>
```

Dialogen for att skriva notering:
```tsx
<Dialog>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Notering - {tenantName}</DialogTitle>
    </DialogHeader>
    <Textarea placeholder="Skriv din notering har..." />
    <DialogFooter>
      <Button variant="outline">Avbryt</Button>
      <Button><Save /> Spara</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

Noteringarna kopplas till ett `entryId` (move-in eller move-out entry) sa att varje hyresgast pa raden kan ha sina egna noteringar. More-menyn placeras pa radniva, och i dialogen kan man valja om noteringen galler utflytt eller inflytt (om bada finns).
