import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { format } from "date-fns";
import type { Inspection } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Home, User, Phone, Mail } from "lucide-react";
import { PdfDropdownMenu } from "./pdf";
import {
  getComponentLabel,
  getConditionLabel,
  hasRemark,
  getCostResponsibilityLabel,
  getDefaultExpandedComponents,
  countRemarks,
} from "./inspection-utils";

interface InspectionReadOnlyProps {
  inspection: Inspection;
  onClose?: () => void;
  isOpen?: boolean;
  roomNames?: Record<string, string>;
}

export function InspectionReadOnly({ 
  inspection, 
  onClose, 
  isOpen,
  roomNames 
}: InspectionReadOnlyProps) {
  const [expandedComponents, setExpandedComponents] = useState<string[]>(
    () => getDefaultExpandedComponents(inspection.rooms)
  );
  const [photoDialog, setPhotoDialog] = useState<{
    photos: string[];
    label: string;
    currentIndex: number;
  } | null>(null);

  const getRoomName = (roomId: string): string => {
    return roomNames?.[roomId] || `Rum ${roomId}`;
  };

  const renderHeader = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Besiktningsinfo */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Home className="h-4 w-4" />
            Besiktningsinformation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Besiktningsnr</span>
            <span>{inspection.inspectionNumber || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Datum</span>
            <span>{format(new Date(inspection.date), "yyyy-MM-dd HH:mm")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Besiktigad av</span>
            <span>{inspection.inspectedBy}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status</span>
            <Badge variant={inspection.status === 'completed' ? 'default' : 'secondary'}>
              {inspection.status === 'completed' ? 'Slutförd' : inspection.status === 'draft' ? 'Utkast' : 'Pågående'}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Huvudnyckel</span>
            <span>{inspection.needsMasterKey ? 'Ja' : 'Nej'}</span>
          </div>
        </CardContent>
      </Card>

      {/* Objektinfo */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Objekt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {inspection.residence ? (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Objektnummer</span>
                <span>{inspection.residence.objectNumber || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Adress</span>
                <span>{inspection.residence.address || '-'}</span>
              </div>
              {inspection.residence.apartmentType && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lägenhetstyp</span>
                  <span>{inspection.residence.apartmentType}</span>
                </div>
              )}
              {inspection.residence.size && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Storlek</span>
                  <span>{inspection.residence.size} kvm</span>
                </div>
              )}
            </>
          ) : (
            <p className="text-muted-foreground italic">Ingen objektinformation tillgänglig</p>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderTenantSnapshot = () => {
    if (!inspection.tenant) return null;

    return (
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4" />
            Hyresgäst vid besiktningstillfället
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground block">Namn</span>
              <span className="font-medium">{inspection.tenant.name || '-'}</span>
            </div>
            <div>
              <span className="text-muted-foreground block">Personnummer</span>
              <span>{inspection.tenant.personalNumber || '-'}</span>
            </div>
            {inspection.tenant.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3 text-muted-foreground" />
                <span>{inspection.tenant.phone}</span>
              </div>
            )}
            {inspection.tenant.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3 text-muted-foreground" />
                <span>{inspection.tenant.email}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderComponentContent = (roomId: string, component: string, room: typeof inspection.rooms[string]) => {
    const condition = room.conditions[component];
    const costResp = room.costResponsibility?.[component as keyof typeof room.costResponsibility];
    const actions = room.actions[component as keyof typeof room.actions] || [];
    const notes = room.componentNotes[component as keyof typeof room.componentNotes];
    const photos = room.componentPhotos?.[component as keyof typeof room.componentPhotos] || [];
    const hasPhotos = photos.length > 0;

    return (
      <div className="space-y-3 pt-2">
        {/* Skick och kostnadsansvar */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium">
            {getConditionLabel(condition)}
          </span>
          {costResp && (
            <>
              <span className="text-muted-foreground">·</span>
              <Badge variant={costResp === 'tenant' ? 'destructive' : 'secondary'} className="text-xs">
                {getCostResponsibilityLabel(costResp)}
              </Badge>
            </>
          )}
        </div>

        {/* Anteckningar */}
        {notes && (
          <p className="text-sm text-muted-foreground">{notes}</p>
        )}

        {/* Åtgärder - endast om det finns några */}
        {actions.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-sm text-muted-foreground">Åtgärder:</span>
            {actions.map((action, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {action}
              </Badge>
            ))}
          </div>
        )}

        {/* Fotoknapp i botten, högerställd */}
        {hasPhotos && (
          <div className="flex justify-end pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPhotoDialog({
                photos,
                label: getComponentLabel(component),
                currentIndex: 0
              })}
              className="gap-2"
            >
              <Camera className="h-4 w-4" />
              Visa foton ({photos.length})
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderRooms = () => (
    <div className="space-y-4">
      <h3 className="font-medium">Rum ({Object.keys(inspection.rooms).length})</h3>
      <Accordion type="single" collapsible className="space-y-2">
        {Object.entries(inspection.rooms).map(([roomId, room]) => {
          const remarkCount = countRemarks(room);

          return (
            <AccordionItem 
              key={roomId} 
              value={roomId}
              className="rounded-lg border bg-card"
            >
              <AccordionTrigger className="px-3 sm:px-4 py-3 hover:bg-muted/50">
                <div className="flex items-center justify-between w-full pr-2">
                  <span className="text-lg font-medium">{getRoomName(roomId)}</span>
                  {remarkCount > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {remarkCount} anmärkning{remarkCount > 1 ? 'ar' : ''}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-0 pb-0">
                <div className="px-2 sm:px-3 pb-3">
                  <Accordion 
                    type="multiple" 
                    value={expandedComponents}
                    onValueChange={setExpandedComponents}
                    className="space-y-2"
                  >
                    {Object.entries(room.conditions).map(([component, condition]) => {
                      const componentKey = `${roomId}-${component}`;
                      const isRemark = hasRemark(condition);

                      return (
                        <AccordionItem 
                          key={componentKey}
                          value={componentKey}
                          className="rounded-md border bg-muted/20"
                        >
                          <AccordionTrigger className="px-3 py-2.5 hover:bg-muted/50 text-sm">
                            <span className={`font-medium ${isRemark ? '' : 'text-muted-foreground'}`}>
                              {getComponentLabel(component)}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="px-3 pb-3">
                            {renderComponentContent(roomId, component, room)}
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );

  const renderPhotoDialog = () => {
    if (!photoDialog) return null;
    
    return (
      <Dialog open={!!photoDialog} onOpenChange={() => setPhotoDialog(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0">
          <div className="relative">
            <img
              src={photoDialog.photos[photoDialog.currentIndex]}
              alt={`${photoDialog.label} foto ${photoDialog.currentIndex + 1}`}
              className="w-full h-full object-contain"
            />
            {photoDialog.photos.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {photoDialog.photos.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === photoDialog.currentIndex ? 'bg-primary' : 'bg-muted'
                    }`}
                    onClick={() => setPhotoDialog({ ...photoDialog, currentIndex: idx })}
                  />
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const renderContent = () => (
    <div className="space-y-6">
      {/* PDF action dropdown */}
      <div className="flex justify-end">
        <PdfDropdownMenu inspection={inspection} roomNames={roomNames} />
      </div>
      
      {renderHeader()}
      {renderTenantSnapshot()}
      {renderRooms()}
      {renderPhotoDialog()}
    </div>
  );

  if (isOpen !== undefined) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose!}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Besiktningsprotokoll</DialogTitle>
          </DialogHeader>
          {renderContent()}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {renderContent()}
      </CardContent>
    </Card>
  );
}
