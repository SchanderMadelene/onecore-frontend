import React from 'react';
import { MobileAccordion, MobileAccordionItem } from '@/components/ui/mobile-accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight } from 'lucide-react';
import { StewardInfo, PropertyForAdmin } from '../../types/admin-types';
import { getBuildingTypeName } from '../../data';

interface StewardAdminMobileProps {
  stewards: StewardInfo[];
  propertiesBySteward: Map<string, PropertyForAdmin[]>;
  onMoveProperty: (propertyId: string, toStewardRefNr: string) => void;
}

export function StewardAdminMobile({ 
  stewards, 
  propertiesBySteward,
  onMoveProperty 
}: StewardAdminMobileProps) {
  const [selectedMoves, setSelectedMoves] = React.useState<Map<string, string>>(new Map());

  const handleSelectSteward = (propertyId: string, stewardRefNr: string) => {
    setSelectedMoves(prev => {
      const newMap = new Map(prev);
      newMap.set(propertyId, stewardRefNr);
      return newMap;
    });
  };

  const handleConfirmMove = (propertyId: string) => {
    const toStewardRefNr = selectedMoves.get(propertyId);
    if (toStewardRefNr) {
      onMoveProperty(propertyId, toStewardRefNr);
      setSelectedMoves(prev => {
        const newMap = new Map(prev);
        newMap.delete(propertyId);
        return newMap;
      });
    }
  };

  const accordionItems: MobileAccordionItem[] = stewards.map(steward => {
    const properties = propertiesBySteward.get(steward.refNr) || [];
    
    return {
      id: steward.refNr,
      title: `${steward.name} (${properties.length})`,
      content: (
        <div className="space-y-3">
          {steward.phone && (
            <div className="text-sm text-muted-foreground px-2">
              {steward.refNr} • {steward.phone}
            </div>
          )}
          
          {properties.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground text-sm">
              Inga fastigheter
            </div>
          ) : (
            properties.map(property => {
              const selectedSteward = selectedMoves.get(property.id);
              const otherStewards = stewards.filter(s => s.refNr !== steward.refNr);
              
              return (
                <div 
                  key={property.id}
                  className="p-3 rounded-md border bg-card space-y-2"
                >
                  <div>
                    <div className="font-medium text-sm">{property.propertyName}</div>
                    <div className="text-xs text-muted-foreground">{property.address}</div>
                    {property.buildingType && (
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {getBuildingTypeName(property.buildingType)}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Select
                      value={selectedSteward || ''}
                      onValueChange={(value) => handleSelectSteward(property.id, value)}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Flytta till..." />
                      </SelectTrigger>
                      <SelectContent>
                        {otherStewards.map(s => (
                          <SelectItem key={s.refNr} value={s.refNr}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {selectedSteward && (
                      <Button
                        size="sm"
                        onClick={() => handleConfirmMove(property.id)}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )
    };
  });

  return (
    <MobileAccordion 
      items={accordionItems} 
      defaultOpen={stewards.length > 0 ? [stewards[0].refNr] : []}
    />
  );
}
