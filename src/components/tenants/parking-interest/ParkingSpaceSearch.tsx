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
  selectedParkingSpaces: ParkingSpaceForPublishing[];
  onParkingSpaceSelect: (parkingSpaces: ParkingSpaceForPublishing[]) => void;
}

export const ParkingSpaceSearch = ({ 
  selectedParkingSpaces, 
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
    
    const matchesArea = !areaFilter || areaFilter === "all" || space.area === areaFilter;
    
    const matchesRent = !maxRentFilter || isNaN(parseInt(maxRentFilter)) || 
      parseInt(space.rentIncl.replace(/\D/g, '')) <= parseInt(maxRentFilter);
    
    return matchesSearch && matchesArea && matchesRent;
  });

  // Get unique areas for filter
  const areas = [...new Set(parkingSpaces.map(space => space.area))];

  const handleSpaceToggle = (space: ParkingSpaceForPublishing) => {
    console.log("Toggle called for space:", space.id);
    console.log("Current selected spaces:", selectedParkingSpaces.map(s => s.id));
    
    const isSelected = selectedParkingSpaces.some(s => s.id === space.id);
    console.log("Is selected:", isSelected);
    
    if (isSelected) {
      const newSpaces = selectedParkingSpaces.filter(s => s.id !== space.id);
      console.log("Removing space, new array:", newSpaces.map(s => s.id));
      onParkingSpaceSelect(newSpaces);
    } else {
      const newSpaces = [...selectedParkingSpaces, space];
      console.log("Adding space, new array:", newSpaces.map(s => s.id));
      onParkingSpaceSelect(newSpaces);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Sök bilplats</h3>
      
      {/* Show selected spaces if any */}
      {selectedParkingSpaces.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-md font-medium">Valda bilplatser ({selectedParkingSpaces.length})</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {selectedParkingSpaces.map((space) => (
              <Card key={space.id} className="relative bg-primary/10 border-primary">
                <CardContent className="pt-4 pb-3">
                  <button
                    type="button"
                    onClick={() => handleSpaceToggle(space)}
                    className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                  >
                    ✕
                  </button>
                  <div className="grid grid-cols-2 gap-4 pr-8">
                    <div>
                      <Label className="text-sm text-muted-foreground">Adress</Label>
                      <p className="font-medium">{space.address}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Hyra</Label>
                      <p className="font-medium text-green-600">{space.rentIncl}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onParkingSpaceSelect([])}
            className="text-sm text-primary hover:underline"
          >
            Rensa alla val
          </button>
        </div>
      )}
      
      {/* Search and filters - always visible */}
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
                <SelectItem value="all">Alla områden</SelectItem>
                {areas.map(area => (
                  <SelectItem key={area} value={area}>{area}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <Input
              type="number"
              placeholder="Max hyra (kr)"
              value={maxRentFilter}
              onChange={(e) => setMaxRentFilter(e.target.value)}
              min="0"
              step="50"
            />
          </div>
        </div>
      </div>

      {/* Results - always visible */}
      <h4 className="text-md font-medium">Alla tillgängliga bilplatser</h4>
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
          filteredSpaces.map((space) => {
            const isSelected = selectedParkingSpaces.some(s => s.id === space.id);
            return (
              <Card 
                key={space.id} 
                className={`transition-colors ${
                  isSelected 
                    ? 'bg-primary/10 border-primary' 
                    : 'hover:bg-muted/50'
                }`}
              >
                <CardContent className="p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSpaceToggle(space)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <div className="flex justify-between items-start flex-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{space.address}</h4>
                          {isSelected && (
                            <Badge variant="default" className="text-xs">Vald</Badge>
                          )}
                        </div>
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
                  </label>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};