
## Mål
Byt menyetiketten "Avpublicera" → "Avbryt uthyrning" på bilplatsannonser. Om annonsen har ≥1 intresseanmälan ska användaren först få en dialog som föreslår att kontakta de sökande, med val för kanal (SMS/e-post) och fritextmeddelande.

## Flöde

```text
[⋯ → Avbryt uthyrning]
        │
        ▼
 Har annonsen sökande?
   ├─ Nej → ConfirmDialog "Avbryt uthyrning" → bekräfta → klar
   └─ Ja  → CancelRentalDialog
                 │
                 ├─ [Avbryt uthyrning och skicka]  (primär, destruktiv)
                 ├─ [Avbryt utan att meddela]      (ghost-länk)
                 └─ [Stäng]
```

## Ny dialog: `CancelRentalDialog`
Plats: `src/features/rentals/components/CancelRentalDialog.tsx`

Innehåll uppifrån och ned:
1. **Rubrik:** "Avbryt uthyrning"
2. **Beskrivning:** "Annonsen för {adress} har {N} intresseanmälningar. Vi rekommenderar att du meddelar de sökande att uthyrningen avbryts."
3. **Mottagarsammanfattning** (read-only kort):
   - "{N} sökande" + liten lista (max 5 namn + "…och X till")
   - Två badges: antal med telefon resp. e-post
4. **Kanal** (`RadioGroup`, default = SMS):
   - SMS ({n med telefon})
   - E-post ({n med e-post})
   - Båda
5. **Meddelande** (`Textarea`, fritext, förifyllt med en kort default-text):
   - SMS-fält när SMS/Båda valt
   - Ämne + brödtext när E-post/Båda valt
   - Variabler `{namn}`, `{adress}`, `{annonsid}` ersätts live i förhandsgranskning
6. **Footer:**
   - Ghost-länk: "Avbryt utan att meddela sökande"
   - Primär destruktiv: "Avbryt uthyrning och skicka" (pending: "Skickar till N sökande…")
   - Cancel: "Stäng"

Vid bekräftelse: stänger annonsen + två toasts (uthyrning avbruten / meddelanden köade till N sökande). Vid "utan att meddela": endast stänger annonsen.

> Inga nya mallar skapas i `messageTemplates.ts`. Default-texten ligger som konstant i `CancelRentalDialog.tsx`.

## Ändringar i `ParkingRowActions.tsx`
- Menyetikett `"Avpublicera"` → `"Avbryt uthyrning"`
- `parkingSpace.seekers > 0` → öppna `CancelRentalDialog`
- `seekers === 0` → behåll `ConfirmDialog` med texterna "Avbryt uthyrning" / "Avbryter…" / toast "Uthyrning avbruten"
- `confirmClose` (för `behovAvPublicering`) får samma etikettbyte för konsekvens

## Mock-data
Ny helper `src/features/rentals/data/mockParkingApplicants.ts` som returnerar anonymiserade svenska namn + telefon/e-post baserat på `parkingSpace.id` och `seekers`.

## Designregler som följs
- Standard `Dialog`-layout (flex-col, sticky footer)
- Inga ikoner i text-CTA
- Destruktiv primär: `variant="destructive"`
- All mockdata anonymiserad

## Filer
- Ny: `src/features/rentals/components/CancelRentalDialog.tsx`
- Ny: `src/features/rentals/data/mockParkingApplicants.ts`
- Ändrad: `src/features/rentals/components/ParkingRowActions.tsx`
