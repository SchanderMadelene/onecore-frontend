import { useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { PageLayout } from "@/layouts";
import { useMoveInList, useStudentTurnover } from "@/features/turnover";
import { useTurnoverNotes } from "@/features/turnover/hooks/useTurnoverNotes";
import { MoveInListFilters } from "@/features/turnover/components/MoveInListFilters";
import { CombinedTurnoverTable } from "@/features/turnover/components/CombinedTurnoverTable";
import { StudentTurnoverFilters } from "@/features/turnover/components/StudentTurnoverFilters";
import { StudentTurnoverTable } from "@/features/turnover/components/StudentTurnoverTable";
import { TurnoverHeader } from "./components/TurnoverHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/ui/tabs";
import { FavoriteParameters } from "@/features/favorites/types/favorite";

export default function TurnoverPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'turnover';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleTabChange = (value: string) => {
    setSearchParams(value === 'turnover' ? {} : { tab: value });
  };

  // --- Standard turnover ---
  const [searchQuery, setSearchQuery] = useState('');
  const {
    startDate, setStartDate, endDate, setEndDate,
    selectedKvvArea, setSelectedKvvArea,
    selectedDistrict, setSelectedDistrict,
    combinedEntries, updateChecklist, updateCleaningStatus,
    updateCleaningCount, updateCleaningBookedDate,
    updateWelcomeHome, updateContactStatus,
    updateContactAttempts, updateVisitBookedDate,
    updateQuickMoveIn, availableKvvAreas, availableDistricts,
  } = useMoveInList();

  const getActiveFilters = useCallback((): FavoriteParameters => {
    const params: FavoriteParameters = {};
    params.startDate = startDate.toISOString();
    params.endDate = endDate.toISOString();
    if (selectedKvvArea !== 'all') params.kvvArea = selectedKvvArea;
    if (selectedDistrict !== 'all') params.district = selectedDistrict;
    return params;
  }, [startDate, endDate, selectedKvvArea, selectedDistrict]);

  const filteredEntries = useMemo(() => {
    if (!searchQuery.trim()) return combinedEntries;
    const q = searchQuery.toLowerCase();
    return combinedEntries.filter(row => {
      const fields = [
        row.address, row.residenceCode, row.kvvArea, row.apartmentType,
        row.moveOut?.tenantName, row.moveOut?.contractNumber, row.moveOut?.tenantPhone,
        row.moveIn?.tenantName, row.moveIn?.contractNumber, row.moveIn?.tenantPhone,
      ];
      return fields.some(f => f?.toLowerCase().includes(q));
    });
  }, [combinedEntries, searchQuery]);

  // --- Student turnover ---
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const studentNotes = useTurnoverNotes();
  const student = useStudentTurnover();

  const filteredStudentEntries = useMemo(() => {
    if (!studentSearchQuery.trim()) return student.combinedEntries;
    const q = studentSearchQuery.toLowerCase();
    return student.combinedEntries.filter(row => {
      const fields = [
        row.roomCode, row.propertyName,
        row.moveOut?.studentName, row.moveOut?.email,
        row.moveIn?.studentName, row.moveIn?.email,
      ];
      return fields.some(f => f?.toLowerCase().includes(q));
    });
  }, [student.combinedEntries, studentSearchQuery]);

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <TurnoverHeader getActiveFilters={getActiveFilters} />

        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="turnover">Ut- & inflytt</TabsTrigger>
            <TabsTrigger value="students">Studentboenden</TabsTrigger>
          </TabsList>

          <TabsContent value="turnover" className="mt-4 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <MoveInListFilters
                  searchQuery={searchQuery}
                  onSearchQueryChange={setSearchQuery}
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

            <CombinedTurnoverTable
              entries={filteredEntries}
              onChecklistChange={updateChecklist}
              onCleaningStatusChange={updateCleaningStatus}
              onCleaningCountChange={updateCleaningCount}
              onCleaningBookedDateChange={updateCleaningBookedDate}
              onWelcomeHomeChange={updateWelcomeHome}
              onContactStatusChange={updateContactStatus}
              onContactAttemptsChange={updateContactAttempts}
              onVisitBookedDateChange={updateVisitBookedDate}
              onQuickMoveInChange={updateQuickMoveIn}
            />
          </TabsContent>

          <TabsContent value="students" className="mt-4 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <StudentTurnoverFilters
                  searchQuery={studentSearchQuery}
                  onSearchQueryChange={setStudentSearchQuery}
                  startDate={student.startDate}
                  endDate={student.endDate}
                  onStartDateChange={student.setStartDate}
                  onEndDateChange={student.setEndDate}
                  properties={student.availableProperties}
                  selectedProperty={student.selectedProperty}
                  onPropertyChange={student.setSelectedProperty}
                />
              </CardContent>
            </Card>

            <StudentTurnoverTable
              entries={filteredStudentEntries}
              onCleaningStatusChange={student.updateCleaningStatus}
              onCleaningBookedDateChange={student.updateCleaningBookedDate}
              onAddNote={studentNotes.addNote}
              onToggleImportant={studentNotes.toggleImportant}
              getNotesForEntry={studentNotes.getNotesForEntry}
            />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
