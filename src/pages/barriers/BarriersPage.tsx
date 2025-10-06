import React, { useState, useMemo } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { ShieldX, Home, Car, Plus, Search, X, Check, ChevronsUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BarriersTable } from "@/components/barriers/BarriersTable";
import { getAllBarriers, getBarriersByType, Barrier } from "@/data/barriers";
import { BarriersHeader } from "./components/BarriersHeader";
import { cn } from "@/lib/utils";

const BarriersPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showHistorical, setShowHistorical] = useState(false);
  const [selectedObject, setSelectedObject] = useState<string>('');
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [selectedProperty, setSelectedProperty] = useState<string>('');
  const [openObjectDropdown, setOpenObjectDropdown] = useState(false);
  const [openAddressDropdown, setOpenAddressDropdown] = useState(false);
  const [openPropertyDropdown, setOpenPropertyDropdown] = useState(false);

  const allBarriersData = getAllBarriers();

  // Extract unique values for dropdowns
  const uniqueObjects = useMemo(() => {
    const objects = new Set(allBarriersData.map(b => b.object));
    return Array.from(objects).sort();
  }, [allBarriersData]);

  const uniqueAddresses = useMemo(() => {
    const addresses = new Set(allBarriersData.map(b => b.address));
    return Array.from(addresses).sort();
  }, [allBarriersData]);

  const uniqueProperties = useMemo(() => {
    const properties = new Set(allBarriersData.map(b => {
      // Extract property name from address (before comma)
      return b.address.split(',')[0].trim();
    }));
    return Array.from(properties).sort();
  }, [allBarriersData]);
  
  const filterBarriers = (barriers: Barrier[]) => {
    const active = barriers.filter(b => b.status === 'active' || b.status === 'inactive');
    const historical = barriers.filter(b => b.status === 'expired');
    
    let filtered = showHistorical ? [...active, ...historical] : active;
    
    // Apply filters
    if (selectedObject) {
      filtered = filtered.filter(b => b.object === selectedObject);
    }
    if (selectedAddress) {
      filtered = filtered.filter(b => b.address === selectedAddress);
    }
    if (selectedProperty) {
      filtered = filtered.filter(b => b.address.startsWith(selectedProperty));
    }
    
    return filtered;
  };

  const allBarriers = filterBarriers(getAllBarriers());
  const housingBarriers = filterBarriers(getBarriersByType('housing'));
  const parkingBarriers = filterBarriers(getBarriersByType('parking'));
  const storageBarriers = filterBarriers(getBarriersByType('storage'));
  const commercialBarriers = filterBarriers(getBarriersByType('commercial'));

  const handleBarrierCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  const clearFilters = () => {
    setSelectedObject('');
    setSelectedAddress('');
    setSelectedProperty('');
  };

  const hasActiveFilters = selectedObject || selectedAddress || selectedProperty;

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <BarriersHeader onBarrierCreated={handleBarrierCreated} />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Object Filter */}
            <Popover open={openObjectDropdown} onOpenChange={setOpenObjectDropdown}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openObjectDropdown}
                  className="w-full sm:w-[250px] justify-between"
                >
                  {selectedObject ? selectedObject : "Välj objekt..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0 bg-background z-50" align="start">
                <Command>
                  <CommandInput placeholder="Sök på objektsnummer, lägenhet, bilplats..." />
                  <CommandList>
                    <CommandEmpty>Inget objekt hittades.</CommandEmpty>
                    <CommandGroup>
                      {uniqueObjects.map((object) => (
                        <CommandItem
                          key={object}
                          value={object}
                          keywords={[object.toLowerCase()]}
                          onSelect={() => {
                            setSelectedObject(selectedObject === object ? '' : object);
                            setOpenObjectDropdown(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedObject === object ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {object}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Address Filter */}
            <Popover open={openAddressDropdown} onOpenChange={setOpenAddressDropdown}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openAddressDropdown}
                  className="w-full sm:w-[250px] justify-between"
                >
                  {selectedAddress ? selectedAddress : "Välj adress..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0 bg-background z-50" align="start">
                <Command>
                  <CommandInput placeholder="Sök adress..." />
                  <CommandList>
                    <CommandEmpty>Ingen adress hittades.</CommandEmpty>
                    <CommandGroup>
                      {uniqueAddresses.map((address) => (
                        <CommandItem
                          key={address}
                          value={address}
                          onSelect={() => {
                            setSelectedAddress(selectedAddress === address ? '' : address);
                            setOpenAddressDropdown(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedAddress === address ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {address}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Property/Area Filter */}
            <Popover open={openPropertyDropdown} onOpenChange={setOpenPropertyDropdown}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openPropertyDropdown}
                  className="w-full sm:w-[250px] justify-between"
                >
                  {selectedProperty ? selectedProperty : "Välj fastighet..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0 bg-background z-50" align="start">
                <Command>
                  <CommandInput placeholder="Sök fastighet..." />
                  <CommandList>
                    <CommandEmpty>Ingen fastighet hittades.</CommandEmpty>
                    <CommandGroup>
                      {uniqueProperties.map((property) => (
                        <CommandItem
                          key={property}
                          value={property}
                          onSelect={() => {
                            setSelectedProperty(selectedProperty === property ? '' : property);
                            setOpenPropertyDropdown(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedProperty === property ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {property}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Rensa filter
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Switch 
              id="show-historical" 
              checked={showHistorical}
              onCheckedChange={setShowHistorical}
            />
            <Label htmlFor="show-historical" className="cursor-pointer">
              Visa historiska spärrar
            </Label>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">Alla spärrar</TabsTrigger>
            <TabsTrigger value="housing">Bostäder</TabsTrigger>
            <TabsTrigger value="parking">Bilplatser</TabsTrigger>
            <TabsTrigger value="storage">Förråd</TabsTrigger>
            <TabsTrigger value="commercial">Lokaler</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <BarriersTable 
              barriers={allBarriers} 
              onBarrierUpdated={handleBarrierCreated}
            />
          </TabsContent>

          <TabsContent value="housing" className="mt-8">
            <BarriersTable 
              barriers={housingBarriers} 
              onBarrierUpdated={handleBarrierCreated}
            />
          </TabsContent>

          <TabsContent value="parking" className="mt-8">
            <BarriersTable 
              barriers={parkingBarriers} 
              onBarrierUpdated={handleBarrierCreated}
            />
          </TabsContent>

          <TabsContent value="storage" className="mt-8">
            <BarriersTable 
              barriers={storageBarriers} 
              onBarrierUpdated={handleBarrierCreated}
            />
          </TabsContent>

          <TabsContent value="commercial" className="mt-8">
            <BarriersTable 
              barriers={commercialBarriers} 
              onBarrierUpdated={handleBarrierCreated}
            />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default BarriersPage;