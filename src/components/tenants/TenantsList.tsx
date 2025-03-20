
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockTenant } from "@/data/tenants";

// Create an array of tenants for demo
const tenants = [
  { 
    ...mockTenant, 
    id: "19850101-1234", 
    firstName: "Anna", 
    lastName: "Andersson", 
    type: "private", 
    property: "Älgen 1" 
  },
  { 
    ...mockTenant, 
    id: "19760315-5678", 
    firstName: "Erik", 
    lastName: "Karlsson", 
    type: "private", 
    property: "Björnen 4" 
  },
  { 
    ...mockTenant, 
    id: "19911122-9012", 
    firstName: "Maria", 
    lastName: "Lindberg", 
    type: "private", 
    property: "Lindaren 2" 
  },
  { 
    ...mockTenant, 
    id: "5566778899", 
    firstName: "Svenssons", 
    lastName: "Bygg AB", 
    type: "company", 
    property: "Björnen 4" 
  },
  { 
    ...mockTenant, 
    id: "1122334455", 
    firstName: "Johanssons", 
    lastName: "Fastigheter KB", 
    type: "company", 
    property: "Älgen 1" 
  }
];

export function TenantsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "private" | "company">("all");
  
  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = (
      tenant.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.property.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const matchesFilter = 
      filter === "all" || 
      (filter === "private" && tenant.type === "private") || 
      (filter === "company" && tenant.type === "company");
    
    return matchesSearch && matchesFilter;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kundlista</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Input
              placeholder="Sök på namn, ID eller fastighet..."
              className="pl-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              onClick={() => setFilter("all")}
            >
              <span className="sm:inline">Alla</span>
            </Button>
            <Button 
              variant={filter === "private" ? "default" : "outline"} 
              onClick={() => setFilter("private")}
            >
              <span className="sm:inline">Privat</span>
            </Button>
            <Button 
              variant={filter === "company" ? "default" : "outline"} 
              onClick={() => setFilter("company")}
            >
              <span className="sm:inline">Företag</span>
            </Button>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Namn</TableHead>
                <TableHead>ID-nummer</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead>Fastighet</TableHead>
                <TableHead className="text-right">Åtgärd</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell className="font-medium">
                    {tenant.firstName} {tenant.lastName}
                  </TableCell>
                  <TableCell>{tenant.id}</TableCell>
                  <TableCell>
                    {tenant.type === "private" ? "Privat" : "Företag"}
                  </TableCell>
                  <TableCell>{tenant.property}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="link" size="sm">
                      <Link to={`/tenants/detail/${tenant.id}`}>
                        Visa detaljer
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredTenants.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Inga kunder hittades med angivna sökkriterier
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
