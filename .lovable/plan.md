

## Fixa disabled-knapp + förtydliga Anteckningar

### Problem
1. **"Lägg till"-knappen är disabled** för giltiga sökande i `CreateHousingApplicationDialog` eftersom valideringen kräver att kunden har ett kontrakt i distriktet — vilket strider mot vår regel att bostadsanmälningar inte ska ha det kravet.
2. **"Anteckningar (valfritt)"** är otydligt — användaren vet inte om det syns för sökanden eller är internt.

### Ändringar

**1. `src/features/rentals/components/CreateHousingApplicationDialog.tsx`**
Förenkla `canSubmit` så att enbart vald kund + ingen pågående mutation krävs:
```ts
const canSubmit = selectedCustomer && !createApplication.isPending;
```
Ta bort `tenantHasValidContractForTheDistrict()`-helpern (oanvänd efter ändringen).

**2. `src/features/rentals/components/housing-application/ValidationAlerts.tsx`**
Granska och säkerställ att eventuella varningar visas som informativa (inte blockerande) — om de redan är det, ingen ändring.

**3. `src/features/rentals/components/interest-application/NotesSection.tsx`**
Förtydliga fältet:
- Label: `"Interna anteckningar (valfritt)"`
- Hjälptext under label (eller som `text-xs text-muted-foreground`): `"Syns endast internt för uthyrningspersonal, inte för den sökande."`
- Behåll placeholder.

### Påverkan
- Endast bostadsflödet ändras. Bilplats-dialogen (`CreateInterestApplicationDialog`) behåller sin striktare validering eftersom distriktskravet gäller där.
- `NotesSection` används i båda flödena, så förtydligandet kommer båda till del — vilket är korrekt eftersom semantiken är densamma.

