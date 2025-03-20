
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyDetail } from "@/types/api";

// Mock statistics data that would normally come from the API
// In a real application, this would be part of the PropertyDetail type
const getPropertyStats = (propertyId: string) => {
  return {
    BOA: "8 506,0 m²",
    BRA: "9 102,0 m²",
    LOA: "596,0 m²",
    lokaler: "8 st",
    bostader: "137 st",
    hus: "4 241,5 m²",
    uteplats: "0,0 m²",
    gronaMimer: "0,0 m²",
    NTA: "7 486,8 m²",
    antalBilar: "74 st",
    garageyta: "0,0 m²",
    ATemp: "14 079,0 m²",
    ovrigtHyresobjekt: "0 st",
    BIA: "0,0 m²",
  };
};

interface PropertyStatisticsSummaryProps {
  property: PropertyDetail;
}

export const PropertyStatisticsSummary = ({ property }: PropertyStatisticsSummaryProps) => {
  const stats = getPropertyStats(property.id);
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="border-b bg-muted/20">
          <CardTitle>Fastighetssammanställning</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="h-40 flex items-center justify-center rounded-md bg-teal-200 dark:bg-teal-800">
                <p className="text-center text-lg font-medium p-4">Samlad bild av hus fastigheten ser ut</p>
              </div>
              
              <div className="h-40 flex items-center justify-center rounded-md bg-teal-200 dark:bg-teal-800">
                <p className="text-center text-lg font-medium p-4">Driftnetto per/kvm</p>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="rounded-md border">
                <div className="grid grid-cols-3 border-b bg-muted/50 px-4 py-2">
                  <div className="font-medium">Mängdtyp</div>
                  <div className="font-medium text-right">Mängd</div>
                  <div className="font-medium text-right">Enhet</div>
                </div>
                
                <div className="divide-y">
                  {Object.entries({
                    BOA: stats.BOA,
                    BRA: stats.BRA, 
                    LOA: stats.LOA,
                    Lokaler: stats.lokaler,
                    Bostäder: stats.bostader,
                    Hus: stats.hus,
                    Uteplats: stats.uteplats,
                    "Gröna Mimer": stats.gronaMimer,
                    NTA: stats.NTA,
                    "Antal bilar": stats.antalBilar,
                    Garageyta: stats.garageyta,
                    "A-temp": stats.ATemp,
                    "Övrigt hyresobjekt": stats.ovrigtHyresobjekt,
                    BIA: stats.BIA
                  }).map(([label, value]) => {
                    // Split the value into the number and unit
                    const isSquareMeters = value.includes("m²");
                    const isCount = value.includes("st");
                    
                    let amount = value;
                    let unit = "";
                    
                    if (isSquareMeters) {
                      [amount, unit] = value.split(" ");
                    } else if (isCount) {
                      [amount, unit] = value.split(" ");
                    }
                    
                    return (
                      <div 
                        key={label} 
                        className="grid grid-cols-3 px-4 py-2 hover:bg-muted/30 transition-colors"
                      >
                        <div>{label}</div>
                        <div className="text-right">{amount}</div>
                        <div className="text-right">{unit}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
