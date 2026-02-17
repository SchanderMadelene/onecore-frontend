import { useState } from "react";
import { PageLayout } from "@/layouts";
import { useMoveInList } from "@/features/turnover";
import { MoveInListFilters } from "@/features/turnover/components/MoveInListFilters";
import { CombinedTurnoverTable } from "@/features/turnover/components/CombinedTurnoverTable";
import { TurnoverHeader } from "./components/TurnoverHeader";
import { Card, CardContent } from "@/components/ui/card";

export default function TurnoverPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedKvvArea,
    setSelectedKvvArea,
    combinedEntries,
    updateChecklist,
    availableKvvAreas,
  } = useMoveInList();

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <TurnoverHeader />

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
            />
          </CardContent>
        </Card>

        <CombinedTurnoverTable entries={combinedEntries} onChecklistChange={updateChecklist} />
      </div>
    </PageLayout>
  );
}
