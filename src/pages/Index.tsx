
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Building2, Users, Home } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Property, Company } from "@/types/api";
import { mockProperties } from "@/data/properties";
import { mockCompanies } from "@/data/companies";
import { mockOccupancyData } from "@/data/occupancy";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: properties } = useQuery({
    queryKey: ['properties'],
    queryFn: () => Promise.resolve(mockProperties)
  });

  const { data: companies } = useQuery({
    queryKey: ['companies'],
    queryFn: () => Promise.resolve(mockCompanies)
  });

  const occupancyRate = (mockOccupancyData.occupied / mockOccupancyData.total) * 100;

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <header className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-gradient">Översikt Fastighetsförvaltning</h1>
          <p className="text-muted-foreground">Aktuell status och statistik</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Fastigheter */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Fastigheter</CardTitle>
                <Building2 className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription>Översikt av fastighetsbestånd</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-3xl font-bold">{properties?.length || 0}</div>
                <div className="space-y-2">
                  {properties?.map(property => (
                    <div key={property.id} className="text-sm">
                      <div className="font-medium">{property.designation}</div>
                      <div className="text-muted-foreground">{property.municipality}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Företag */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Företag</CardTitle>
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription>Aktiva företag</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-3xl font-bold">{companies?.length || 0}</div>
                <div className="space-y-2">
                  {companies?.map(company => (
                    <div key={company.id} className="text-sm">
                      <div className="font-medium">{company.name}</div>
                      <div className="text-muted-foreground">{company.organizationNumber || 'Ingen org.nr'}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Beläggning */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Beläggning</CardTitle>
                <Home className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription>Aktuell beläggningsnivå</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-3xl font-bold">{occupancyRate.toFixed(1)}%</div>
                <div className="space-y-2">
                  <div className="w-full bg-secondary rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full transition-all"
                      style={{ width: `${occupancyRate}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 text-sm">
                    <div>
                      <div className="font-medium">Uthyrda</div>
                      <div className="text-muted-foreground">{mockOccupancyData.occupied} st</div>
                    </div>
                    <div>
                      <div className="font-medium">Lediga</div>
                      <div className="text-muted-foreground">{mockOccupancyData.available} st</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
