import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParkingSpaceListings } from "@/hooks/useParkingSpaceListings";
import type { ParkingSpaceForPublishing } from "@/hooks/useParkingSpaceListings";

interface ParkingSpaceSearchProps {
  selectedParkingSpace: ParkingSpaceForPublishing | null;
  onParkingSpaceSelect: (parkingSpace: ParkingSpaceForPublishing) => void;
}

export const ParkingSpaceSearch = ({ 
  selectedParkingSpace, 
  onParkingSpaceSelect 
}: ParkingSpaceSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [areaFilter, setAreaFilter] = useState<string>("");
  const [maxRentFilter, setMaxRentFilter] = useState<string>("");
  
  const { data: parkingSpaces = [], isLoading } = useParkingSpaceListings('published');

  // Filter parking spaces based on search criteria
  const filteredSpaces = parkingSpaces.filter(space => {
    const matchesSearch = !searchQuery || 
      space.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesArea = !areaFilter || space.area === areaFilter;
    
    const matchesRent = !maxRentFilter || 
      parseInt(space.rentIncl.replace(/\D/g, '')) <= parseInt(maxRentFilter);
    
    return matchesSearch && matchesArea && matchesRent;
  });

  // Get unique areas for filter
  const areas = [...new Set(parkingSpaces.map(space => space.area))];

  if (selectedParkingSpace) {
    return (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Vald bilplats</h3>
        <Card>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Adress</Label>
                <p className="font-medium">{selectedParkingSpace.address}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Objekts-ID</Label>
                <p className="font-medium">{selectedParkingSpace.id}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Område</Label>
                <p className="font-medium">{selectedParkingSpace.area}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Bilplatstyp</Label>
                <p className="font-medium">{selectedParkingSpace.type}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Hyra</Label>
                <p className="font-medium text-green-600">{selectedParkingSpace.rentIncl}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Kötyp</Label>
                <div className="flex gap-1 mt-1">
                  {selectedParkingSpace.queueTypes.intern && (
                    <Badge variant="secondary">Intern</Badge>
                  )}
                  {selectedParkingSpace.queueTypes.external && (
                    <Badge variant="secondary">Extern</Badge>
                  )}
                  {selectedParkingSpace.queueTypes.poangfri && (
                    <Badge variant="secondary">Poängfri</Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => onParkingSpaceSelect(null as any)}
                className="text-sm text-primary hover:underline"
              >
                Välj annan bilplats
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Sök bilplats</h3>
      
      {/* Search and filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Sök på adress, område eller typ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex gap-3">
          <div className="flex-1">
            <Select value={areaFilter} onValueChange={setAreaFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Alla områden" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Alla områden</SelectItem>
                {areas.map(area => (
                  <SelectItem key={area} value={area}>{area}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <Select value={maxRentFilter} onValueChange={setMaxRentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Max hyra" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Ingen gräns</SelectItem>
                <SelectItem value="400">Max 400 kr</SelectItem>
                <SelectItem value="500">Max 500 kr</SelectItem>
                <SelectItem value="600">Max 600 kr</SelectItem>
                <SelectItem value="700">Max 700 kr</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {isLoading ? (
          <p className="text-muted-foreground">Laddar bilplatser...</p>
        ) : filteredSpaces.length === 0 ? (
          <p className="text-muted-foreground">
            {searchQuery || areaFilter || maxRentFilter 
              ? "Inga bilplatser matchade dina sökkriterier"
              : "Inga bilplatser tillgängliga"
            }
          </p>
        ) : (
          filteredSpaces.map((space) => (
            <Card 
              key={space.id} 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => onParkingSpaceSelect(space)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium">{space.address}</h4>
                    <p className="text-sm text-muted-foreground">
                      {space.area} • {space.type}
                    </p>
                    <div className="flex gap-1 mt-2">
                      {space.queueTypes.intern && (
                        <Badge variant="secondary" className="text-xs">Intern</Badge>
                      )}
                      {space.queueTypes.external && (
                        <Badge variant="secondary" className="text-xs">Extern</Badge>
                      )}
                      {space.queueTypes.poangfri && (
                        <Badge variant="secondary" className="text-xs">Poängfri</Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">{space.rentIncl}</p>
                    <p className="text-xs text-muted-foreground">{space.publications} publicerad</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};