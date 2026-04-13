

## Plan: Enhetlig ikon for noteringsknappen

Byt ut `StickyNote`-ikonen i `TurnoverRowNoteButton` till `Pencil` -- samma ikon som används för redigering på rader med hyresgäst. Detta ger ett enhetligt utseende i hela tabellen.

### Ändring

**`src/features/turnover/components/TurnoverRowNoteButton.tsx`**
- Byt import från `StickyNote` till `Pencil` från `lucide-react`
- Ersätt `<StickyNote className="h-4 w-4" />` med `<Pencil className="h-4 w-4" />` (två ställen)

