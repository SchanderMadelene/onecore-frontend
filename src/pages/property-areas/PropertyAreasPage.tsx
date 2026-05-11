import React, { useState, useEffect } from "react";
import { PageLayout } from "@/layouts";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import {
  getUniqueCostCenters,
  getCostCenterName,
  getDistrictManagers,
} from "@/features/property-areas";
import { useStewardAdmin } from "@/features/property-areas/hooks/useStewardAdmin";
import {
  StewardColumn,
  StewardAdminMobile,
} from "@/features/property-areas/components/admin";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

const PropertyAreasPage = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const costCenters = getUniqueCostCenters();
  const [selectedCostCenter, setSelectedCostCenter] = useState<string>("all");
  const district = selectedCostCenter === "all" ? undefined : getDistrictManagers(selectedCostCenter);

  const {
    kvvAreaList,
    propertiesByKvvArea,
    allStewards,
    reassignArea,
  } = useStewardAdmin(selectedCostCenter);

  // Local order of KVV columns (per cost center)
  const [orderedIds, setOrderedIds] = useState<string[]>([]);
  useEffect(() => {
    setOrderedIds(kvvAreaList.map((k) => k.kvvArea));
  }, [kvvAreaList]);

  const orderedAreas = orderedIds
    .map((id) => kvvAreaList.find((k) => k.kvvArea === id))
    .filter(Boolean) as typeof kvvAreaList;

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setOrderedIds((items) => {
      const oldIndex = items.indexOf(String(active.id));
      const newIndex = items.indexOf(String(over.id));
      if (oldIndex < 0 || newIndex < 0) return items;
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const handleReassign = (kvvArea: string, toStewardRefNr: string) => {
    reassignArea(kvvArea, toStewardRefNr);
    const newSteward = allStewards.find((s) => s.refNr === toStewardRefNr);
    toast({
      title: "Ansvarig uppdaterad",
      description: `${kvvArea} tilldelades ${newSteward?.name ?? toStewardRefNr}.`,
    });
  };

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="flex flex-col h-full space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Förvaltningsområden</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Byt ansvarig kvartersvärd för KVV-områden
          </p>
        </div>

        {/* Cost center + district info */}
        <Card>
          <CardContent className="py-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Kostnadställe:</span>
                <Select value={selectedCostCenter} onValueChange={setSelectedCostCenter}>
                  <SelectTrigger className="w-[240px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alla kostnadsställen</SelectItem>
                    {costCenters.map((cc) => (
                      <SelectItem key={cc} value={cc}>
                        {cc} - {getCostCenterName(cc)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {district && (
                <>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Distriktschef</span>
                    <span className="text-sm font-medium">{district.districtManager}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Biträdande distriktschef</span>
                    <span className="text-sm font-medium">{district.deputyDistrictManager}</span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main content */}
        {isMobile ? (
          <StewardAdminMobile
            kvvAreas={orderedAreas}
            propertiesByKvvArea={propertiesByKvvArea}
            allStewards={allStewards}
            onReassignArea={handleReassign}
          />
        ) : (
          <div className="flex-1 min-h-0">
            <ScrollArea className="h-full w-full">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={orderedIds} strategy={horizontalListSortingStrategy}>
                  <div className="flex gap-4 p-1 min-h-[500px]">
                    {orderedAreas.map((kvvArea) => (
                      <StewardColumn
                        key={kvvArea.kvvArea}
                        kvvArea={kvvArea}
                        properties={propertiesByKvvArea.get(kvvArea.kvvArea) || []}
                        allStewards={allStewards}
                        onReassignArea={handleReassign}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default PropertyAreasPage;
