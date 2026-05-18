Byt ut etiketten "Acceptabel" mot "OK" på skickknapparna i `ComponentInspectionCard.tsx`. Värdet i datat (`"Acceptabel"`) behålls oförändrat så att ingen logik, historik eller mock-data påverkas — bara den synliga labeln ändras.

Ändring:
- `src/features/residences/components/inspection/ComponentInspectionCard.tsx`: i `CONDITION_OPTIONS`, ändra `label: "Acceptabel"` → `label: "OK"` för objektet med `value: "Acceptabel"`.