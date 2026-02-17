import { useState, useCallback } from "react";
import { PageLayout } from "@/layouts";
import { useMoveInList } from "@/features/turnover";
import { MoveInListFilters } from "@/features/turnover/components/MoveInListFilters";
import { CombinedTurnoverTable } from "@/features/turnover/components/CombinedTurnoverTable";
import { TurnoverHeader } from "./components/TurnoverHeader";
import { Card, CardContent } from "@/components/ui/card";
import { FavoriteParameters } from "@/features/favorites/types/favorite";

export default function TurnoverPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedKvvArea,
    setSelectedKvvArea,
    selectedDistrict,
    setSelectedDistrict,
    combinedEntries,
    updateChecklist,
    availableKvvAreas,
    availableDistricts,
  } = useMoveInList();

  const getActiveFilters = useCallback((): FavoriteParameters => {
    const params: FavoriteParameters = {};
    params.startDate = startDate.toISOString();
    params.endDate = endDate.toISOString();
    if (selectedKvvArea !== 'all') params.kvvArea = selectedKvvArea;
    if (selectedDistrict !== 'all') params.district = selectedDistrict;
    return params;
  }, [startDate, endDate, selectedKvvArea, selectedDistrict]);

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <TurnoverHeader getActiveFilters={getActiveFilters} />

        <Card>
          <CardContent className="pt-6">
            <MoveInListFilters
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              kvvAreas={availableKvvAreas}
              selectedKvvArea={selectedKvvArea}
              onKvvAreaChange={setSelectedKvvArea}
              districts={availableDistricts}
              selectedDistrict={selectedDistrict}
              onDistrictChange={setSelectedDistrict}
            />
          </CardContent>
        </Card>

        <CombinedTurnoverTable entries={combinedEntries} onChecklistChange={updateChecklist} />
      </div>
    </PageLayout>
  );
}
