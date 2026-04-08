import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, User, ClipboardList } from "lucide-react";
import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType, InspectionSubmitData, TenantSnapshot, Inspection } from "../types";
import { useInspectionForm } from "@/features/residences/hooks/useInspectionForm";
import { InspectionProgressIndicator } from "./InspectionProgressIndicator";
import { RoomInspectionMobile } from "./RoomInspectionMobile";
import { InspectorSelectionCard } from "./InspectorSelectionCard";
import { InspectionSummary } from "../InspectionSummary";
import { FloorplanOverlay } from "../FloorplanOverlay";

interface MobileInspectionFormProps {
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

export function MobileInspectionForm({
  rooms,
  onSave,
  onCancel,
  tenant,
  existingInspection,
  floorplanImage
}: MobileInspectionFormProps) {
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  // If we have existing inspection data, skip inspector selection
  const [showInspectorSelection, setShowInspectorSelection] = useState(!existingInspection);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const {
    inspectorName,
    setInspectorName,
    inspectionTime,
    setInspectionTime,
    needsMasterKey,
    setNeedsMasterKey,
    inspectionType,
    setInspectionType,
    isFurnished,
    setIsFurnished,
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

  const currentRoom = rooms[currentRoomIndex];
  const completedRooms = rooms.filter(room => inspectionData[room.id]?.isHandled).length;

  // Create tenant snapshot for saving
  const createTenantSnapshot = (): TenantSnapshot | undefined => {
    if (!tenant) return undefined;
    return {
      name: `${tenant.firstName || ''} ${tenant.lastName || ''}`.trim() || tenant.name || '',
      personalNumber: tenant.personalNumber || '',
      phone: tenant.phone,
      email: tenant.email
    };
  };

  const handleNext = () => {
    if (currentRoomIndex < rooms.length - 1) {
      setCurrentRoomIndex(currentRoomIndex + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handlePrevious = () => {
    if (showSummary) {
      setShowSummary(false);
    } else if (currentRoomIndex > 0) {
      setCurrentRoomIndex(currentRoomIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (canComplete) {
      onSave(inspectorName, inspectionData, 'completed', {
        needsMasterKey,
        isFurnished,
        inspectionType,
        tenant: createTenantSnapshot()
      });
    }
  };

  const handleSaveDraft = () => {
    if (inspectorName.trim()) {
      onSave(inspectorName, inspectionData, 'draft', {
        needsMasterKey,
        isFurnished,
        inspectionType,
        tenant: createTenantSnapshot()
      });
    }
  };

  const canComplete = inspectorName && inspectionTime && completedRooms === rooms.length;

  // Reset scroll position when room or view changes
  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = 0;
      }
    }
  }, [currentRoomIndex, showSummary]);

  if (showInspectorSelection) {
    return (
      <div className="h-full bg-background flex flex-col">
        <div className="sticky top-0 z-10 bg-background border-b px-4 pt-8 pb-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={onCancel}>
              Avbryt
            </Button>
            <h1 className="text-lg font-semibold">Ny besiktning</h1>
            <div className="w-16" />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            <InspectorSelectionCard 
              inspectorName={inspectorName} 
              setInspectorName={setInspectorName} 
              inspectionTime={inspectionTime} 
              setInspectionTime={setInspectionTime} 
              needsMasterKey={needsMasterKey} 
              setNeedsMasterKey={setNeedsMasterKey} 
              tenant={tenant} 
            />

            <div className="pt-4 pb-20">
              <Button 
                onClick={() => setShowInspectorSelection(false)} 
                disabled={!inspectorName} 
                className="w-full" 
                size="lg"
              >
                Börja besiktning ({rooms.length} rum)
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="h-full bg-background flex flex-col">
      {/* Sticky Header with Room Navigation */}
      <div className="sticky top-0 z-10 bg-background shadow-sm">
        <div className="border-b">
          {showSummary ? (
            <div className="px-4 pt-8 pb-[34px]">
              <span className="font-medium text-sm">Sammanställning</span>
            </div>
          ) : (
            <InspectionProgressIndicator 
              current={completedRooms} 
              total={rooms.length} 
              currentRoomName={currentRoom.name} 
            />
          )}
          
          <div className="flex items-center justify-between px-4 py-[7px]">
            <Button variant="ghost" size="sm" onClick={() => {
              if (showSummary) {
                setShowSummary(false);
              } else {
                setShowInspectorSelection(true);
              }
            }}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Tillbaka
            </Button>
          </div>
        </div>

        {/* Room Navigation Cards - hide on summary */}
        {!showSummary && (
          <div className="px-4 py-2">
            <div 
              className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" 
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {rooms.map((room, index) => {
                const isCompleted = inspectionData[room.id]?.isHandled;
                const isCurrent = index === currentRoomIndex;
                return (
                  <Card 
                    key={room.id} 
                    className={`min-w-[140px] cursor-pointer transition-all ${
                      isCurrent 
                        ? 'ring-2 ring-inset ring-primary bg-primary/5' 
                        : 'hover:ring-1 hover:ring-border'
                    }`} 
                    onClick={() => { setShowSummary(false); setCurrentRoomIndex(index); }}
                  >
                    <CardContent className="p-4 text-center space-y-2">
                      <div className="text-sm font-medium leading-tight">{room.name}</div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs px-3 py-1 ${
                          isCompleted 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : 'bg-orange-50 text-orange-700 border-orange-200'
                        }`}
                      >
                        {isCompleted ? "✓ Klar" : "Väntar"}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0">
        <ScrollArea ref={scrollAreaRef} className="h-full">
          <div className="px-4 pb-4 pt-4">
            {showSummary ? (
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm font-medium mb-2">Är bostaden möblerad vid besiktningstillfället?</p>
                    <RadioGroup
                      value={isFurnished ? "yes" : "no"}
                      onValueChange={(v) => setIsFurnished(v === "yes")}
                      className="flex gap-4"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="no" id="furnished-no-mobile" />
                        <Label htmlFor="furnished-no-mobile" className="text-sm">Nej</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="yes" id="furnished-yes-mobile" />
                        <Label htmlFor="furnished-yes-mobile" className="text-sm">Ja</Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
                <InspectionSummary
                  rooms={rooms}
                  inspectionData={inspectionData}
                  onCostUpdate={handleCostUpdate}
                />
              </div>
            ) : (
              <RoomInspectionMobile 
                room={currentRoom} 
                inspectionData={inspectionData[currentRoom.id]} 
                onConditionUpdate={(field, value) => handleConditionUpdate(currentRoom.id, field, value)} 
                onActionUpdate={(field, action) => handleActionUpdate(currentRoom.id, field, action)} 
                onComponentNoteUpdate={(field, note) => handleComponentNoteUpdate(currentRoom.id, field, note)} 
                onComponentPhotoAdd={(field, photoDataUrl) => handleComponentPhotoAdd(currentRoom.id, field, photoDataUrl)} 
                onComponentPhotoRemove={(field, index) => handleComponentPhotoRemove(currentRoom.id, field, index)}
                onCostResponsibilityUpdate={(field, value) => handleCostResponsibilityUpdate(currentRoom.id, field, value)}
                onCustomComponentsUpdate={(components) => handleCustomComponentsUpdate(currentRoom.id, components)}
              />
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 bg-background border-t p-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handlePrevious} 
              disabled={currentRoomIndex === 0 && !showSummary} 
              className="flex-1"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Föregående
            </Button>
            
            {showSummary ? (
              <Button onClick={handleSubmit} disabled={!canComplete} className="flex-1">
                Slutför besiktning
              </Button>
            ) : currentRoomIndex === rooms.length - 1 ? (
              <Button onClick={() => setShowSummary(true)} className="flex-1">
                <ClipboardList className="h-4 w-4 mr-1" />
                Sammanställning
              </Button>
            ) : (
              <Button onClick={handleNext} className="flex-1">
                Nästa
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <FloorplanOverlay floorplanImage={floorplanImage} />
            <Button 
              variant="secondary" 
              onClick={handleSaveDraft} 
              disabled={!inspectorName.trim()} 
              className="flex-1"
            >
              Spara utkast
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
