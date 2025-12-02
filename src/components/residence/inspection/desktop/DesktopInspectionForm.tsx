import { Button } from "@/components/ui/button";
import { RoomInspectionMobile } from "../mobile/RoomInspectionMobile";
import { useInspectionForm } from "@/hooks/useInspectionForm";
import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType, InspectionSubmitData, TenantSnapshot } from "../types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, CheckCircle2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

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
}

const inspectors = [
  "Anna Andersson",
  "Erik Eriksson", 
  "Maria Nilsson",
  "Johan Johansson"
];

const currentUser = "Anna Andersson";

export function DesktopInspectionForm({ 
  rooms, 
  onSave, 
  onCancel, 
  tenant 
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
    handleComponentPhotoRemove
  } = useInspectionForm(rooms);

  useEffect(() => {
    if (!inspectorName && currentUser) {
      setInspectorName(currentUser);
    }
  }, [inspectorName, setInspectorName]);

  const completedRooms = Object.values(inspectionData).filter(
    room => room.isHandled
  ).length;

  const canComplete = inspectorName && completedRooms === rooms.length;

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

  const handleSubmit = () => {
    if (canComplete) {
      onSave(inspectorName, inspectionData, 'completed', {
        needsMasterKey,
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
    <div className="space-y-6 min-w-0">
      {/* Inspector selection + Tenant info - single row */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-start">
        {/* Inspector Selection */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Besiktigare</Label>
            <Select value={inspectorName} onValueChange={setInspectorName}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Välj besiktigare">
                  {inspectorName && (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                          {inspectorName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span>{inspectorName}</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {inspectors.map((inspector) => (
                  <SelectItem key={inspector} value={inspector}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                          {inspector.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {inspector}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Klockslag
            </Label>
            <Select 
              value={inspectionTime || '09:00'} 
              onValueChange={setInspectionTime}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Välj tid" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 24 }, (_, hour) => 
                  ['00', '15', '30', '45'].map(minute => {
                    const time = `${hour.toString().padStart(2, '0')}:${minute}`;
                    return (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    );
                  })
                ).flat()}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px bg-border self-stretch" />

        {/* Tenant info - compact */}
        {tenant ? (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Hyresgäst</Label>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  {(tenant.name || `${tenant.firstName || ''} ${tenant.lastName || ''}`).split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">
                  {tenant.name || `${tenant.firstName || ''} ${tenant.lastName || ''}`.trim()}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {tenant.personalNumber || 'Personnummer saknas'}
                </p>
              </div>
              <Badge variant="outline" className="shrink-0 text-xs bg-orange-50 text-orange-700 border-orange-200">
                Uppsagt
              </Badge>
            </div>
            {tenant.moveOutDate && (
              <p className="text-xs text-muted-foreground">
                Utflyttning: {tenant.moveOutDate}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <Label className="text-sm font-medium text-muted-foreground">Hyresgäst</Label>
            <p className="text-sm text-muted-foreground">Ingen hyresgäst kopplad</p>
          </div>
        )}
      </div>

      {/* Progress counter */}
      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
        <span className="text-sm font-medium">Besiktningsframsteg</span>
        <span className="text-sm text-muted-foreground">
          {completedRooms}/{rooms.length} rum klara
        </span>
      </div>

      {/* Room accordion */}
      <div className="max-h-[70vh] overflow-y-auto pr-2 pb-24 min-w-0">
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
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      {/* Footer buttons */}
      <div className="flex gap-3 justify-end pt-4 border-t">
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
        <Button onClick={handleSubmit} disabled={!canComplete}>
          Slutför besiktning
        </Button>
      </div>
    </div>
  );
}
