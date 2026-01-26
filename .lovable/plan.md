
# Städa upp duplicerade filer i src/components/rentals/

## Bakgrund
Migreringen av rentals-komponenter till `src/features/rentals/components/` är klar, men de ursprungliga filerna finns fortfarande kvar i `src/components/rentals/`. Detta skapar dubbletter som behöver tas bort.

## Nuvarande status
- **index.ts** har redan korrekt re-export: `export * from "@/features/rentals/components"`
- Alla komponenter finns redan migrerade i `src/features/rentals/components/`
- **54 duplicerade filer** kvarstår att ta bort

## Filer att ta bort

### Rotfiler (21 st)
- ApplicantActions.tsx
- ApplicantProfileModal.tsx
- CreateHousingApplicationDialog.tsx
- CreateInterestApplicationDialog.tsx
- CustomerInfoLoading.tsx
- DeleteListingDialog.tsx
- EditHousingDialog.tsx
- FilterableTableHead.tsx
- HousingApplicationDialog.tsx
- HousingSpaceDetail.tsx
- HousingSpacesTable.tsx
- OfferActions.tsx
- OfferedHousingTable.tsx
- ParkingApplicationDialog.tsx
- ParkingSpaceDetail.tsx
- ParkingSpacesTable.tsx
- PublishParkingSpacesDialog.tsx
- PublishedHousingTable.tsx
- ReadyForOfferHousingTable.tsx
- SubHeadingsSection.tsx
- SyncParkingSpacesDialog.tsx
- UnpublishedHousingTable.tsx

### Undermappar att ta bort

**edit-housing/** (5 filer)
- BasicInfoSection.tsx
- DetailedDescriptionTab.tsx
- EditableFormSection.tsx
- PlanritningTab.tsx
- types.ts

**housing-application/** (2 filer)
- HousingObjectInformation.tsx
- ValidationAlerts.tsx

**interest-application/** (7 filer)
- ApplicationTypeSelection.tsx
- CustomerInformation.tsx
- CustomerSearch.tsx
- NotesSection.tsx
- ObjectInformation.tsx
- ValidationAlerts.tsx
- types.ts

**publish-dialog/** (3 filer)
- DialogContentHeader.tsx
- ParkingSpacesTable.tsx
- QueueTypeCheckboxes.tsx

**residence-profile/** (7 filer + 2 undermappar)
- CompactProfileForm.tsx
- ContactSearch.tsx
- ProfileForm.tsx
- types.ts
- form/CustomerInfo.tsx
- form/CustomerReference.tsx
- form/HousingReferenceComment.tsx
- form/HousingTypeSection.tsx
- form/ReviewStatusSection.tsx
- model/conditional.ts

**tabs/** (5 filer)
- HistoryTab.tsx
- NeedsRepublishTab.tsx
- OfferedTab.tsx
- PublishedParkingTab.tsx
- ReadyForOfferTab.tsx

**types/** (3 filer)
- housing.ts
- parking.ts
- unpublished-housing.ts

## Fil att behålla
- **index.ts** - behålls för bakåtkompatibilitet med re-export

## Resultat efter städning
```text
src/components/rentals/
└── index.ts  ← Endast denna fil kvar (re-export)
```

## Teknisk information
- Inga importändringar behövs då index.ts redan pekar på rätt plats
- Bakåtkompatibilitet bibehålls för eventuella externa importer
