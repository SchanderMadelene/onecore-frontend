## Mål

Återanvänd samma bulk-funktion som finns på standardflödet för bostad (`HousingDetailPage.tsx`) på poängfritt-detaljsidan, så att handläggaren kan markera flera sökande i intresselistan och skicka SMS eller mejl.

## Vad som redan finns att återanvända

- `BulkActionBar` (`src/shared/ui/bulk-action-bar`) – flytande bar längst ner med antal valda + knappar för SMS/Mejl/Rensa.
- `BulkSmsModal` och `BulkEmailModal` från `@/features/communication`.
- `ResponsiveTable` har redan inbyggt selection-stöd via `selectable`, `selectedKeys`, `onSelectionChange`.

## Ändringar (endast `src/pages/rentals/PoangfriHousingDetailPage.tsx`)

1. Ny state: `selectedInterestIds: string[]`, `smsOpen`, `emailOpen`.
2. Skicka `selectable`, `selectedKeys={selectedInterestIds}`, `onSelectionChange={setSelectedInterestIds}` till `ResponsiveTable`. Dölj selection när annonsen är stängd (`isClosed`) – då finns ingen poäng med att kontakta.
3. Bygg `bulkRecipients` av valda sökande (`{ id, name, phone, email }`) från `listing.interests`.
4. Rendera `<BulkActionBar>` (när inte `isClosed`) med `onSendSms`, `onSendEmail`, `onClear`.
5. Rendera `<BulkSmsModal>` och `<BulkEmailModal>` med samma toast-bekräftelser som standardflödet ("SMS skickat till X sökande" / "Mejl skickat till X sökande").
6. Rad-klick (`onRowClick`) behålls för att öppna sheet – checkbox-kolumnen från `ResponsiveTable` hanterar markering separat.

## Inga andra filer ändras

Standardflödet, delade komponenter och datamodellen rörs inte.
