
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockProperties } from "@/data/properties";
import type { Property } from "@/types/api";

const AllPropertiesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "bostad" | "kontor">("all");

  const { data: properties } = useQuery<Property[]>({
    queryKey: ['properties'],
    queryFn: () => Promise.resolve(mockProperties)
  });

  const filteredProperties = properties?.filter(property => {
    const matchesSearch = (
      property.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const matchesFilter = 
      filter === "all" || 
      (filter === "bostad" && property.purpose === "Bostad") || 
      (filter === "kontor" && property.purpose === "Kontor");
    
    return matchesSearch && matchesFilter;
  });

  // Helper function to get the correct path for a property
  const getPropertyPath = (property: Property): string => {
    if (property.id === "1") return "/properties/vasteras/lundby/odenplan-5";
    if (property.id === "2") return "/properties/vasteras/backby/gotgatan-15";
    if (property.id === "3") return "/properties/vasteras/domkyrkan/sveavagen-10";
    
    // Default path for other properties
    const area = property.purpose === 'Bostad' ? 'backby' : 'domkyrkan';
    const street = property.purpose === 'Bostad' ? 'gotgatan-15' : 'sveavagen-10';
    return `/properties/vasteras/${area}/${street}`;
  };

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
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Input
                  placeholder="Sök på beteckning eller kod..."
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

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Beteckning</TableHead>
                    <TableHead>Typ</TableHead>
                    <TableHead>Användning</TableHead>
                    <TableHead>Byggnader</TableHead>
                    <TableHead className="text-right">Åtgärd</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProperties?.map((property) => (
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
                      <TableCell>
                        <div>
                          <span>{property.buildingCount || 0}</span>
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
                  ))}
                  {(!filteredProperties || filteredProperties.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        Inga fastigheter hittades med angivna sökkriterier
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AllPropertiesPage;
