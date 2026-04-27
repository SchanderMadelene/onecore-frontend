import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { PageLayout } from '@/layouts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, X, List } from 'lucide-react';
import { ConfirmDialog } from '@/shared/common';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  getUniqueCostCenters, 
  getCostCenterName,
  getCostCenterManagers
} from '@/features/property-areas';
import { useStewardAdmin } from '@/features/property-areas/hooks/useStewardAdmin';
import { 
  StewardColumn, 
  PendingChangesPanel, 
  StewardAdminMobile,
  PropertyCard
} from '@/features/property-areas/components/admin';
import type { PropertyForAdmin } from '@/features/property-areas/types/admin-types';

const StewardAdminPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const costCenters = getUniqueCostCenters();
  const [selectedCostCenter, setSelectedCostCenter] = useState(costCenters[0] || 'all');
  
  const {
    kvvAreaList,
    propertiesByKvvArea,
    allStewards,
    pendingChanges,
    pendingPropertyMoves,
    isDirty,
    reassignArea,
    reassignProperty,
    undoChange,
    undoPropertyMove,
    cancelAllChanges,
    saveChanges
  } = useStewardAdmin(selectedCostCenter);
  
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );
  
  const [activeProperty, setActiveProperty] = useState<PropertyForAdmin | null>(null);
  
  const handleDragStart = (event: DragStartEvent) => {
    const id = event.active.id as string;
    for (const list of propertiesByKvvArea.values()) {
      const found = list.find(p => p.id === id);
      if (found) {
        setActiveProperty(found);
        return;
      }
    }
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveProperty(null);
    const { active, over } = event;
    if (!over) return;
    const targetKvv = over.data.current?.kvvArea as string | undefined;
    if (!targetKvv) return;
    reassignProperty(active.id as string, targetKvv);
  };
  
  const handleDragCancel = () => setActiveProperty(null);
  
  const handleBack = () => {
    if (isDirty) {
      setShowCancelDialog(true);
    } else {
      navigate('/property-areas/list');
    }
  };
  
  const handleCancel = () => {
    if (isDirty) {
      setShowCancelDialog(true);
    } else {
      navigate('/property-areas/list');
    }
  };
  
  const handleConfirmCancel = () => {
    cancelAllChanges();
    setShowCancelDialog(false);
    navigate('/property-areas/list');
  };
  
  const handleSave = () => {
    if (isDirty) {
      setShowSaveDialog(true);
    }
  };
  
  const handleConfirmSave = () => {
    saveChanges();
    setShowSaveDialog(false);
  };

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="flex flex-col h-full space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Förvaltningsområden</h1>
            <p className="text-muted-foreground text-sm">
              Byt ansvarig kvartersvärd för KVV-områden
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate('/property-areas/list')}>
              <List className="h-4 w-4 mr-2" />
              Visa lista
            </Button>
            <Button variant="outline" onClick={handleCancel} disabled={!isDirty}>
              <X className="h-4 w-4 mr-2" />
              Avbryt
            </Button>
            <Button onClick={handleSave} disabled={!isDirty}>
              <Save className="h-4 w-4 mr-2" />
              Spara
            </Button>
          </div>
        </div>
        
        {/* Cost center filter */}
        <Card>
          <CardContent className="py-4">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Kostnadställe:</span>
                <Select value={selectedCostCenter} onValueChange={setSelectedCostCenter}>
                  <SelectTrigger className="w-[240px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {costCenters.map(cc => (
                      <SelectItem key={cc} value={cc}>
                        {cc} - {getCostCenterName(cc)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {(() => {
                const managers = getCostCenterManagers(selectedCostCenter);
                if (!managers) return null;
                return (
                  <div className="flex flex-wrap gap-x-8 gap-y-3">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Distriktschef</span>
                      <span className="text-sm font-medium">{managers.districtManager}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Biträdande distriktschef</span>
                      <span className="text-sm font-medium">{managers.assistantDistrictManager}</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </CardContent>
        </Card>
        
        {/* Pending changes panel */}
        <PendingChangesPanel
          changes={pendingChanges}
          propertyMoves={pendingPropertyMoves}
          onUndo={undoChange}
          onUndoPropertyMove={undoPropertyMove}
        />
        
        {/* Main content */}
        {isMobile ? (
          <StewardAdminMobile
            kvvAreas={kvvAreaList}
            propertiesByKvvArea={propertiesByKvvArea}
            allStewards={allStewards}
            onReassignArea={reassignArea}
          />
        ) : (
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <div className="flex-1 min-h-0">
              <ScrollArea className="h-full w-full">
                <div className="flex gap-4 p-1 min-h-[500px]">
                  {kvvAreaList.map(kvvArea => (
                    <StewardColumn
                      key={kvvArea.kvvArea}
                      kvvArea={kvvArea}
                      properties={propertiesByKvvArea.get(kvvArea.kvvArea) || []}
                      allStewards={allStewards}
                      onReassignArea={reassignArea}
                    />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
            <DragOverlay dropAnimation={null}>
              {activeProperty ? (
                <div className="w-[248px] rotate-2 shadow-2xl ring-2 ring-primary rounded-md">
                  <PropertyCard property={activeProperty} draggable={false} />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        )}
      </div>
      
      <ConfirmDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        title="Avbryta ändringar?"
        description={`Du har ${pendingChanges.length} osparade ${pendingChanges.length === 1 ? 'ändring' : 'ändringar'}. Är du säker på att du vill avbryta?`}
        onConfirm={handleConfirmCancel}
        confirmLabel="Ja, avbryt"
        cancelLabel="Fortsätt redigera"
      />
      
      <ConfirmDialog
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        title="Spara ändringar?"
        description={`Du är på väg att spara ${pendingChanges.length} ${pendingChanges.length === 1 ? 'ändring' : 'ändringar'}.`}
        onConfirm={handleConfirmSave}
        confirmLabel="Spara"
      />
    </PageLayout>
  );
};

export default StewardAdminPage;
