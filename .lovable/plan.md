

## Plan: Visa noteringar i redigeringsdialoger med toggling av viktig-flagga

### Bakgrund
Idag kan man markera en notering som viktig när den skapas, men det går inte att ändra efteråt. Noteringar visas bara i hovercarden (TurnoverNoteIndicator), inte i redigeringsmodalerna.

### Lösning
Visa befintliga noteringar i alla redigeringsdialoger (MoveOut, MoveIn, Student) och i TurnoverRowNoteButton. Varje notering får en klickbar viktig-toggling direkt i listan.

### Ändringar

**1. `useTurnoverNotes.ts` — Lägg till `toggleImportant`**
- Ny funktion `toggleImportant(noteId: string)` som flippar `isImportant` på en specifik notering.

**2. Alla edit-dialoger — Visa noteringar + toggle**
- Skicka in `notes: TurnoverNote[]` och `onToggleImportant: (noteId: string) => void` som props till `MoveOutEditDialog`, `MoveInEditDialog`, `StudentEditDialog`.
- I noteringssektionen, lista befintliga noteringar ovanför inmatningsfältet (samma stil som i TurnoverRowNoteButton/TurnoverNoteIndicator).
- Varje notering får en liten klickbar "Viktig"-toggle (t.ex. en kryssruta eller klickbar etikett) som anropar `onToggleImportant`.

**3. `TurnoverRowNoteButton.tsx` — Samma toggle**
- Lägg till `onToggleImportant` som prop och visa toggle per notering i den befintliga noteringslistan.

**4. `TurnoverRowActions.tsx` / tabellkomponenter — Koppla ihop**
- Skicka `notes` och `toggleImportant` vidare till dialogerna.

### Visuell design
- Befintliga noteringar visas med samma stil som idag (röd border-left + "Viktig"-etikett för viktiga).
- En liten klickbar text/checkbox per notering: "Viktig" som kan togglas av/på direkt.
- Ändringen sker omedelbart (ingen separat spara-knapp för detta).

