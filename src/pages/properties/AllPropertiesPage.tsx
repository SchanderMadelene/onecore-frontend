
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Building2, MapPin } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockProperties } from "@/data/properties";
import type { Property } from "@/types/api";

const AllPropertiesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: properties } = useQuery<Property[]>({
    queryKey: ['properties'],
    queryFn: () => Promise.resolve(mockProperties)
  });

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Fastigheter</h1>
            <p className="text-muted-foreground">
              Översikt över alla fastigheter
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties?.map((property) => (
            <Link 
              key={property.id} 
              to={`/properties/vasteras/${property.purpose === 'Bostad' ? 'backby' : 'domkyrkan'}/${property.purpose === 'Bostad' ? 'gotgatan-15' : 'sveavagen-10'}`}
              className="block"
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{property.designation}</h3>
                      <div className="flex items-center text-muted-foreground text-sm gap-1">
                        <MapPin className="h-4 w-4" />
                        {property.municipality}
                      </div>
                    </div>
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-slate-100">
                      {property.purpose}
                    </Badge>
                    <Badge variant="outline" className="bg-slate-100">
                      {property.buildingType}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default AllPropertiesPage;
