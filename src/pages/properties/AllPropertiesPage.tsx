
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterChip } from "@/components/ui/filter-chip";
import { mockProperties } from "@/data/properties";
import { mockSearchResults, SearchResult } from "@/data/search";
import type { Property } from "@/types/api";
import { Building, Home, Layers } from "lucide-react";

/**
 * Helper function to generate property detail URL path
 */
const getPropertyPath = (property: Property) => {
  return `/properties/${property.id}`;
};

const AllPropertiesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "bostad" | "kontor">("all");
  const [districtFilter, setDistrictFilter] = useState<string>("all");
  const [areaFilter, setAreaFilter] = useState<string>("all");
  const [searchTypeFilter, setSearchTypeFilter] = useState<"all" | "property" | "building" | "apartment">("all");

  // Property data for the regular property list
  const { data: properties } = useQuery<Property[]>({
    queryKey: ['properties'],
    queryFn: () => Promise.resolve(mockProperties)
  });

  // Search results data for the enhanced search
  const { data: searchResults = [] } = useQuery<SearchResult[]>({
    queryKey: ['searchResults'],
    queryFn: () => Promise.resolve(mockSearchResults)
  });

  const allDistricts = [...new Set(properties?.map(p => p.district) || [])];
  const allAreas = [...new Set(properties?.map(p => p.propertyManagerArea) || [])];

  // Filter the search results by type if a specific type is selected
  const filteredSearchResults = searchResults.filter(item => {
    const matchesSearch = searchQuery.trim() !== "" && (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const matchesType = 
      searchTypeFilter === "all" || 
      item.type === searchTypeFilter;
    
    return matchesSearch && matchesType;
  });

  // Regular property filtering logic
  const filteredProperties = properties?.filter(property => {
    const matchesSearch = 
      searchQuery === "" || (
        property.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesFilter = 
      filter === "all" || 
      (filter === "bostad" && property.purpose === "Bostad") || 
      (filter === "kontor" && property.purpose === "Kontor");

    const matchesDistrict = 
      districtFilter === "all" || 
      property.district === districtFilter;

    const matchesArea = 
      areaFilter === "all" || 
      property.propertyManagerArea === areaFilter;
    
    return matchesSearch && matchesFilter && matchesDistrict && matchesArea;
  });

  // Use search results when there's a search query, otherwise use filtered properties
  const showSearchResults = searchQuery.trim() !== "";

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-2">Fastigheter</h1>
        <p className="text-muted-foreground mb-6">
          Översikt över alla fastigheter i systemet
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Fastighetslista</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Input
                    placeholder="Sök på beteckning, kod, byggnad, lägenhet..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={filter === "all" ? "default" : "outline"} 
                    onClick={() => setFilter("all")}
                  >
                    <span>Alla</span>
                  </Button>
                  <Button 
                    variant={filter === "bostad" ? "default" : "outline"} 
                    onClick={() => setFilter("bostad")}
                  >
                    <span>Bostad</span>
                  </Button>
                  <Button 
                    variant={filter === "kontor" ? "default" : "outline"} 
                    onClick={() => setFilter("kontor")}
                  >
                    <span>Kontor</span>
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="text-sm font-medium">Filter efter typ</div>
                <div className="flex flex-wrap gap-2">
                  <FilterChip
                    selected={searchTypeFilter === "all"}
                    onSelect={() => setSearchTypeFilter("all")}
                  >
                    <Layers className="h-4 w-4" />
                    <span>Alla typer</span>
                  </FilterChip>
                  <FilterChip
                    selected={searchTypeFilter === "property"}
                    onSelect={() => setSearchTypeFilter("property")}
                  >
                    <Building className="h-4 w-4" />
                    <span>Fastigheter</span>
                  </FilterChip>
                  <FilterChip
                    selected={searchTypeFilter === "building"}
                    onSelect={() => setSearchTypeFilter("building")}
                  >
                    <Building className="h-4 w-4" />
                    <span>Byggnader</span>
                  </FilterChip>
                  <FilterChip
                    selected={searchTypeFilter === "apartment"}
                    onSelect={() => setSearchTypeFilter("apartment")}
                  >
                    <Home className="h-4 w-4" />
                    <span>Lägenheter</span>
                  </FilterChip>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Select value={districtFilter} onValueChange={setDistrictFilter}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Välj distrikt" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alla distrikt</SelectItem>
                      {allDistricts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={areaFilter} onValueChange={setAreaFilter}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Välj kvartersvärdsområde" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alla områden</SelectItem>
                      {allAreas.map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {showSearchResults ? (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Namn</TableHead>
                      <TableHead>Typ</TableHead>
                      <TableHead>Adress</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Åtgärd</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSearchResults.length > 0 ? filteredSearchResults.map((result) => (
                      <TableRow key={`${result.type}-${result.id}`}>
                        <TableCell className="font-medium">
                          {result.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            result.type === "property" ? "bg-blue-100 text-blue-800" :
                            result.type === "building" ? "bg-purple-100 text-purple-800" : 
                            result.type === "apartment" ? "bg-green-100 text-green-800" :
                            "bg-slate-100"
                          }>
                            {result.type === "property" ? "Fastighet" : 
                             result.type === "building" ? "Byggnad" : 
                             result.type === "apartment" ? "Lägenhet" : 
                             result.type === "tenant" ? "Kund" : ""}
                          </Badge>
                        </TableCell>
                        <TableCell>{result.address}</TableCell>
                        <TableCell>
                          {result.type === "apartment" && (
                            <Badge variant="outline" className={
                              result.tenant ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }>
                              {result.tenant ? "Uthyrd" : "Vakant"}
                            </Badge>
                          )}
                          {result.type !== "apartment" && "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button asChild variant="link" size="sm">
                            <Link to={result.path}>
                              Visa detaljer
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          Inga resultat hittades med angivna sökkriterier
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Beteckning</TableHead>
                      <TableHead>Typ</TableHead>
                      <TableHead>Användning</TableHead>
                      <TableHead>Distrikt</TableHead>
                      <TableHead>Kvartersvärdsområde</TableHead>
                      <TableHead>Byggnader</TableHead>
                      <TableHead className="text-right">Åtgärd</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProperties?.length ? filteredProperties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="font-medium">
                          {property.designation}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-slate-100">
                            {property.buildingType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-slate-100">
                            {property.purpose}
                          </Badge>
                        </TableCell>
                        <TableCell>{property.district}</TableCell>
                        <TableCell>{property.propertyManagerArea}</TableCell>
                        <TableCell>
                          <div>
                            <span>{property.buildingCount}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button asChild variant="link" size="sm">
                            <Link to={getPropertyPath(property)}>
                              Visa detaljer
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          Inga fastigheter hittades med angivna sökkriterier
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AllPropertiesPage;
