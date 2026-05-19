Ändra `ComponentInspectionCard.tsx` så att "Kostnadsansvar"-sektionen endast visas när skicket är `Skadad`, inte längre när det är `Acceptabel` (OK).

Ändring:
- `src/features/residences/components/inspection/ComponentInspectionCard.tsx`: ändra `const showCostResponsibility = condition === "Skadad" || condition === "Acceptabel";` → `const showCostResponsibility = condition === "Skadad";`

Ingen annan logik, data eller mock påverkas.