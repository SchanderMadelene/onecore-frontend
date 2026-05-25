# Redigerbar kostnad med motivering

## Beteende

- Kostnadsbeloppet i sammanställningen blir ett inline-redigerbart fält (ser ut som text, blir input vid fokus, höger-alignat, tabular-nums).
- När användaren ändrar beloppet och lämnar fältet (blur / Enter): om värdet skiljer sig från senast sparade öppnas en liten dialog `AdjustCostReasonDialog` som kräver en motivering (fri text, min ~10 tecken).
  - **Spara**: justeringen lagras tillsammans med motivering, tidsstämpel och användare.
  - **Avbryt**: värdet återställs till föregående.
- En justerad rad markeras med en diskret `StickyNote`-ikon bredvid beloppet. Klick/hover öppnar en `Popover` som visar:
  - Originalbelopp (schablon)
  - Justerat belopp
  - Motivering
  - Tidsstämpel
  - Knapp **"Återställ till schablon"** (rensar justeringen utan att kräva motivering).
- Totaler (rum, hyresgäst, hyresvärd, totalt) räknas på justerat värde när det finns, annars schablon.

## Datamodell

Utöka `InspectionRoom` (`types.ts`):
```ts
costAdjustments: Record<string, {
  amount: number;
  reason: string;
  adjustedAt: string; // ISO
}>;
```

Initieras till `{}` i `initialData.ts`.

## Filer

**Ny:**
- `src/features/residences/components/inspection/AdjustCostReasonDialog.tsx` — Dialog enligt vår standard (flex-col, max-h-[90vh], scrollable body, sticky border-t footer). Visar schablon, nytt belopp (readonly i dialogen — sätts inline), textarea för motivering, validering på min-längd.

**Ändras:**
- `src/features/residences/components/inspection/types.ts` — lägg till `costAdjustments`.
- `src/features/residences/components/inspection/form/initialData.ts` — initiera `costAdjustments: {}`.
- `src/features/residences/hooks/useInspectionForm.ts` — nya callbacks:
  - `handleCostAdjust(roomId, costKey, amount, reason)`
  - `handleCostAdjustClear(roomId, costKey)`
- `src/features/residences/components/inspection/InspectionSummary.tsx`:
  - Ersätt statisk kostnadstext med inline-input (delad komponent inom filen).
  - Lägg till `StickyNote` + `Popover` för justerade rader.
  - Använd justerat belopp i alla summor (rum, totalt, hyresgäst/hyresvärd).
- `src/features/residences/components/inspection/desktop/DesktopInspectionForm.tsx` och `mobile/MobileInspectionForm.tsx` — skicka in de nya callbacks till `InspectionSummary`.
- `src/features/residences/components/inspection/pdf/generateInspectionPdf.ts` + `pdf/types.ts` — visa justerat belopp i sammanställningen med motivering som fotnot/sub-rad, så att protokollet är spårbart.

## UX-detaljer

- Inline-input: ingen ram i viloläge, subtil border på hover/focus, höger-alignerad, suffix " kr" visas som text efter input.
- Mobil: samma mönster — tap på beloppet aktiverar input, numerisk tangentbord (`inputMode="numeric"`).
- `StickyNote`-ikon: `h-3.5 w-3.5 text-muted-foreground` bredvid beloppet, blir `text-highlight` när popover är öppen.
- Popover-knappen "Återställ till schablon" använder `variant="outline"` (vår standard för ikon-/sekundärknappar i tabellkontext).

## Ej i scope

- Persistens mot backend (sparas bara i klient-state som resten av besiktningen).
- Audit-logg av vem som ändrade (vi sparar fält men kopplar inte mot inloggad användare än).
