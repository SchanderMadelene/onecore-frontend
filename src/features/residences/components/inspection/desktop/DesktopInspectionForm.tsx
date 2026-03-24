import { Button } from "@/components/ui/button";
import { RoomInspectionMobile } from "../mobile/RoomInspectionMobile";
import { InspectorSelectionCard } from "../mobile/InspectorSelectionCard";
import { useInspectionForm } from "@/features/residences/hooks/useInspectionForm";
import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType, InspectionSubmitData, TenantSnapshot, Inspection } from "../types";
import { CheckCircle2, ClipboardList, ChevronLeft } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { InspectionSummary } from "../InspectionSummary";
import { FloorplanOverlay } from "../FloorplanOverlay";

interface DesktopInspectionFormProps {
  rooms: Room[];
  onSave: (
    inspectorName: string, 
    rooms: Record<string, InspectionRoomType>, 
    status: 'draft' | 'completed',
    additionalData: InspectionSubmitData
  ) => void;
  onCancel: () => void;
  tenant?: any;
  existingInspection?: Inspection;
  floorplanImage?: string;
}

const currentUser = "Anna Andersson";

export function DesktopInspectionForm({ 
  rooms, 
  onSave, 
  onCancel, 
  tenant,
  existingInspection,
  floorplanImage
}: DesktopInspectionFormProps) {
  const {
    inspectorName,
    setInspectorName,
    inspectionTime,
    setInspectionTime,
    needsMasterKey,
    setNeedsMasterKey,
    inspectionData,
    handleConditionUpdate,
    handleActionUpdate,
    handleComponentNoteUpdate,
    handleComponentPhotoAdd,
    handleComponentPhotoRemove,
    handleCostResponsibilityUpdate,
    handleCustomComponentsUpdate,
    handleCostUpdate
  } = useInspectionForm(rooms, existingInspection);

  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (!inspectorName && currentUser && !existingInspection) {
      setInspectorName(currentUser);
    }
  }, [inspectorName, setInspectorName, existingInspection]);

  const completedRooms = Object.values(inspectionData).filter(
    room => room.isHandled
  ).length;

  const canComplete = inspectorName && completedRooms === rooms.length;

  const createTenantSnapshot = (): TenantSnapshot | undefined => {
    if (!tenant) return undefined;
    return {
      name: `${tenant.firstName || ''} ${tenant.lastName || ''}`.trim() || tenant.name || '',
      personalNumber: tenant.personalNumber || '',
      phone: tenant.phone,
      email: tenant.email
    };
  };

  const handleSubmit = () => {
    if (canComplete) {
      onSave(inspectorName, inspectionData, 'completed', {
        needsMasterKey,
        isFurnished,
        tenant: createTenantSnapshot()
      });
    }
  };

  const handleSaveDraft = () => {
    if (inspectorName.trim()) {
      onSave(inspectorName, inspectionData, 'draft', {
        needsMasterKey,
        tenant: createTenantSnapshot()
      });
    }
  };

  return (
    <div className="flex flex-col min-w-0 min-h-0 flex-1 overflow-hidden relative">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto min-h-0 space-y-6 pr-1">
        {showSummary ? (
          <>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setShowSummary(false)}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Tillbaka till rum
              </Button>
            </div>
            <InspectionSummary
              rooms={rooms}
              inspectionData={inspectionData}
              onCostUpdate={handleCostUpdate}
            />
          </>
        ) : (
          <>
            {/* Reuse the same card component with horizontal layout for desktop */}
            <InspectorSelectionCard
              inspectorName={inspectorName}
              setInspectorName={setInspectorName}
              inspectionTime={inspectionTime}
              setInspectionTime={setInspectionTime}
              needsMasterKey={needsMasterKey}
              setNeedsMasterKey={setNeedsMasterKey}
              tenant={tenant}
              layout="horizontal"
            />

            {/* Progress counter */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">Besiktningsframsteg</span>
              <span className="text-sm text-muted-foreground">
                {completedRooms}/{rooms.length} rum klara
              </span>
            </div>

            {/* Room accordion */}
            <Accordion type="multiple" className="space-y-2">
              {rooms.map(room => {
                const roomData = inspectionData[room.id];
                const isCompleted = roomData?.isHandled;
                
                return (
                  <AccordionItem 
                    key={room.id} 
                    value={room.id}
                    className="border rounded-lg"
                  >
                    <AccordionTrigger className="hover:no-underline sticky top-0 bg-background z-10">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{room.name}</span>
                          <span className="text-sm text-muted-foreground">{room.size}</span>
                        </div>
                        {isCompleted && (
                          <Badge variant="default" className="gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Klar
                          </Badge>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pr-4 min-w-0">
                      <RoomInspectionMobile
                        room={room}
                        inspectionData={roomData}
                        onConditionUpdate={(field, value) => 
                          handleConditionUpdate(room.id, field, value)
                        }
                        onActionUpdate={(field, action) => 
                          handleActionUpdate(room.id, field, action)
                        }
                        onComponentNoteUpdate={(field, note) => 
                          handleComponentNoteUpdate(room.id, field, note)
                        }
                        onComponentPhotoAdd={(field, photoDataUrl) => 
                          handleComponentPhotoAdd(room.id, field, photoDataUrl)
                        }
                        onComponentPhotoRemove={(field, index) => 
                          handleComponentPhotoRemove(room.id, field, index)
                        }
                        onCostResponsibilityUpdate={(field, value) =>
                          handleCostResponsibilityUpdate(room.id, field, value)
                        }
                        onCustomComponentsUpdate={(components) =>
                          handleCustomComponentsUpdate(room.id, components)
                        }
                      />
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </>
        )}
      </div>

      {/* Footer buttons - sticky at bottom */}
      <div className="flex gap-3 justify-end pt-4 border-t mt-4 shrink-0">
        <FloorplanOverlay floorplanImage={floorplanImage} />
        <div className="flex-1" />
        <Button variant="outline" onClick={onCancel}>
          Avbryt
        </Button>
        <Button 
          variant="secondary"
          onClick={handleSaveDraft}
          disabled={!inspectorName.trim()}
        >
          Spara utkast
        </Button>
        {showSummary ? (
          <Button onClick={handleSubmit} disabled={!canComplete}>
            Slutför besiktning
          </Button>
        ) : (
          <Button onClick={() => setShowSummary(true)}>
            <ClipboardList className="h-4 w-4 mr-1" />
            Sammanställning
          </Button>
        )}
      </div>
    </div>
  );
}
