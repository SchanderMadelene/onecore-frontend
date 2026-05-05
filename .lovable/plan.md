## Svar

Ja, det stämmer. Idag finns det två näst intill identiska dialoger:

- `CreateHousingApplicationDialog` (bostad)
- `CreateInterestApplicationDialog` (bilplats — och samma komponent används även för förråd via `ParkingRowActions`)

Båda har samma struktur (Dialog → Header → FormWrapper → Object info + CustomerSearch + CustomerInformation + ValidationAlerts + (ev. ApplicationTypeSelection) + NotesSection + footer). Skillnaderna är bara objekt-typ, ev. `ApplicationTypeSelection` (parking-only) och submit-mutation.

Då ska layouten lyftas till en delad komponent så att stilförändringar (sticky footer, scrollbar body, etc.) appliceras på alla tre flöden (bostad, bilplats, förråd) samtidigt.

## Plan

### 1. Skapa shared shell
Ny fil: `src/features/rentals/components/interest-application/ApplicationDialogShell.tsx`

En presentational komponent som äger dialog-layouten (matchar projektets dialog-form-mönster: `flex-col`, `max-h-[90vh]`, scrollbar body, sticky `border-t` footer).

Props:
- `open`, `onOpenChange`, `hideTrigger`, `triggerLabel`
- `title: string`
- `objectInfo: ReactNode` (rendereras överst)
- `extraSections?: ReactNode` (t.ex. `ApplicationTypeSelection` för parking)
- `onSubmit`, `isSubmitting`, `canSubmit`
- `submitLabel`, `submittingLabel`

Strukturen:
```
<Dialog>
  <DialogContent class="max-w-2xl max-h-[90vh] p-0 flex flex-col gap-0">
    <DialogHeader class="p-6 pb-4 border-b shrink-0"> {title} </DialogHeader>
    <form class="flex flex-1 flex-col min-h-0">
      <div class="flex-1 overflow-y-auto p-6 space-y-6"> {body} </div>
      <div class="border-t p-6 flex justify-between gap-4 shrink-0"> Avbryt + Lägg till </div>
    </form>
  </DialogContent>
</Dialog>
```

Shellet hanterar även gemensam state: `searchQuery`, `selectedCustomer`, `notes`, `resetForm`, `tenantValidation`, samt rendering av `CustomerSearch`, `CustomerInformation`, `ValidationAlerts`, `NotesSection`. Caller skickar in objekt-specifik info via `objectInfo` och eventuellt `extraSections` (render-prop som får `selectedCustomer` och `tenantValidation`).

### 2. Refaktorera de två existerande dialogerna
- `CreateHousingApplicationDialog`: blir en tunn wrapper som skickar in `<HousingObjectInformation />` och anropar `useCreateHousingApplication` i `onSubmit`.
- `CreateInterestApplicationDialog`: skickar in `<ObjectInformation parkingSpace={...} />` och `extraSections={<ApplicationTypeSelection ... />}`, anropar `useCreateInterestApplication`.

Ingen logikförändring för förråd — det går automatiskt via parking-vägen som det redan gör.

### 3. Rensa
Ta bort den gamla `FormWrapper`-användningen i de två dialogerna (FormWrapper finns kvar för andra användare).

### Effekt
- En och samma layout-källa för alla tre rental-objekt (bostad, bilplats, förråd).
- Sticky footer, fast header, scrollbar mittyta — matchar minnet `Dialog Form Layout`.
- Framtida ändringar (knapporder, paddings, validation-placering) görs på ett ställe.