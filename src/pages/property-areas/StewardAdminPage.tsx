import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, closestCenter, pointerWithin } from '@dnd-kit/core';
import { PageLayout } from '@/layouts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ArrowLeft, Save, X } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  getUniqueCostCenters, 
  getCostCenterName 
} from '@/features/property-areas';
import { useStewardAdmin } from '@/features/property-areas/hooks/useStewardAdmin';
import { 
  StewardColumn, 
  PendingChangesPanel, 
  StewardAdminMobile,
  PropertyCard
} from '@/features/property-areas/components/admin';
import { PropertyForAdmin } from '@/features/property-areas/types/admin-types';

const StewardAdminPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const costCenters = getUniqueCostCenters();
  const [selectedCostCenter, setSelectedCostCenter] = useState(costCenters[0] || 'all');
  
  const {
    stewardsInCostCenter,
    propertiesBySteward,
    pendingChanges,
    isDirty,
    moveProperty,
    undoChange,
    cancelAllChanges,
    saveChanges
  } = useStewardAdmin(selectedCostCenter);
  
  const [activeProperty, setActiveProperty] = useState<PropertyForAdmin | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const property = active.data.current?.property as PropertyForAdmin | undefined;
    if (property) {
      setActiveProperty(property);
    }
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveProperty(null);
    
    if (!over) return;
    
    const propertyId = active.id as string;
    const toStewardRefNr = over.id as string;
    
    // Verify it's a steward drop zone
    if (over.data.current?.type === 'steward') {
      moveProperty(propertyId, toStewardRefNr);
    }
  };
  
  const handleBack = () => {
    if (isDirty) {
      setShowCancelDialog(true);
    } else {
      navigate('/property-areas');
    }
  };
  
  const handleCancel = () => {
    if (isDirty) {
      setShowCancelDialog(true);
    } else {
      navigate('/property-areas');
    }
  };
  
  const handleConfirmCancel = () => {
    cancelAllChanges();
    setShowCancelDialog(false);
    navigate('/property-areas');
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
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Administrera förvaltningsområden</h1>
              <p className="text-muted-foreground text-sm">
                Dra och släpp fastigheter mellan kvartersvärdar
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
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
          </CardContent>
        </Card>
        
        {/* Pending changes panel */}
        <PendingChangesPanel changes={pendingChanges} onUndo={undoChange} />
        
        {/* Main content */}
        {isMobile ? (
          <StewardAdminMobile
            stewards={stewardsInCostCenter}
            propertiesBySteward={propertiesBySteward}
            onMoveProperty={moveProperty}
          />
        ) : (
          <DndContext
            collisionDetection={pointerWithin}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex-1 min-h-0">
              <ScrollArea className="h-full w-full">
                <div className="flex gap-4 p-1 min-h-[500px]">
                  {stewardsInCostCenter.map(steward => (
                    <StewardColumn
                      key={steward.refNr}
                      steward={steward}
                      properties={propertiesBySteward.get(steward.refNr) || []}
                      activePropertyId={activeProperty?.id}
                    />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
            
            <DragOverlay>
              {activeProperty && (
                <div className="opacity-90">
                  <PropertyCard property={activeProperty} />
                </div>
              )}
            </DragOverlay>
          </DndContext>
        )}
      </div>
      
      {/* Cancel confirmation dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Avbryta ändringar?</AlertDialogTitle>
            <AlertDialogDescription>
              Du har {pendingChanges.length} osparade {pendingChanges.length === 1 ? 'ändring' : 'ändringar'}. 
              Är du säker på att du vill avbryta?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Fortsätt redigera</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmCancel}>
              Ja, avbryt
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Save confirmation dialog */}
      <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Spara ändringar?</AlertDialogTitle>
            <AlertDialogDescription>
              Du är på väg att spara {pendingChanges.length} {pendingChanges.length === 1 ? 'ändring' : 'ändringar'}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Avbryt</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSave}>
              Spara
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  );
};

export default StewardAdminPage;
