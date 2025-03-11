
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import type { PropertyDetail } from "@/types/api";

interface PropertyBasicInfoProps {
  property: PropertyDetail;
}

export const PropertyBasicInfo = ({ property }: PropertyBasicInfoProps) => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="border-b bg-muted/20">
          <CardTitle>Fastighet</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="propertyCode">Fastighetsnr:</Label>
              <Input id="propertyCode" value={property.code} readOnly />
            </div>
            
            <div className="space-y-1.5 lg:col-span-2">
              <Label htmlFor="designation">Fastighetsbeteckning:</Label>
              <Input id="designation" value={property.designation} readOnly />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="municipality">Kommun:</Label>
              <div className="flex gap-1">
                <Input id="municipality" value={property.municipality} readOnly className="flex-1" />
                <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                  <span className="sr-only">Sök kommun</span>
                  <span>...</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="parish">Trakt:</Label>
              <div className="flex gap-1">
                <Input id="parish" value={property.parish} readOnly className="flex-1" />
                <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                  <span className="sr-only">Sök trakt</span>
                  <span>...</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="block">Block:</Label>
              <Input id="block" value={property.propertyNumber.split(' ')[0]} readOnly />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="parish-group">Församling:</Label>
              <div className="flex gap-1">
                <Input id="parish-group" value="DOMKYRKOFÖRSAMLING" readOnly className="flex-1" />
                <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                  <span className="sr-only">Sök församling</span>
                  <span>...</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="rentNumber">Hyresid:</Label>
              <Input id="rentNumber" value={property.code} readOnly />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="rentObjectType">Hyresobjekttyp:</Label>
              <div className="flex gap-1">
                <Input id="rentObjectType" value="STD" readOnly className="flex-1" />
                <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                  <span className="sr-only">Välj hyresobjekttyp</span>
                  <span>...</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Standard hyresobjekttyp</p>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="ownership">Ägan/Inhyrd:</Label>
              <Select disabled>
                <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2">
                  <span>Egen</span>
                  <span>▼</span>
                </div>
              </Select>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="propertyOwner">Fastighetsägare:</Label>
              <div className="flex gap-1">
                <Input id="propertyOwner" readOnly className="flex-1" />
                <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                  <span className="sr-only">Sök fastighetsägare</span>
                  <span>...</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="fromDate">Från datum:</Label>
              <div className="relative">
                <Input id="fromDate" readOnly />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0 h-full px-3"
                >
                  <Calendar className="h-4 w-4" />
                  <span className="sr-only">Välj datum</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="toDate">Till datum:</Label>
              <div className="relative">
                <Input id="toDate" readOnly />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0 h-full px-3"
                >
                  <Calendar className="h-4 w-4" />
                  <span className="sr-only">Välj datum</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="registrationDate">Inskrivningsdatum:</Label>
              <div className="relative">
                <Input id="registrationDate" readOnly />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0 h-full px-3"
                >
                  <Calendar className="h-4 w-4" />
                  <span className="sr-only">Välj datum</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="acquisitionDate">Fångesdatum:</Label>
              <div className="relative">
                <Input id="acquisitionDate" readOnly />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0 h-full px-3"
                >
                  <Calendar className="h-4 w-4" />
                  <span className="sr-only">Välj datum</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="summaryNumber">Sammanföringsnr:</Label>
              <Input id="summaryNumber" readOnly />
            </div>
            
            <div className="space-y-1.5 lg:col-span-2">
              <Label htmlFor="valueArea">Värdeområde:</Label>
              <div className="flex gap-1">
                <Input id="valueArea" readOnly className="flex-1" />
                <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                  <span className="sr-only">Sök värdeområde</span>
                  <span>...</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="stretchCodeType">Typ av sträckkod:</Label>
              <Select disabled>
                <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2">
                  <span>(Ej angivet)</span>
                  <span>▼</span>
                </div>
              </Select>
            </div>
            
            <div className="space-y-1.5 lg:col-span-2">
              <Label htmlFor="stretchCode">Sträckkod:</Label>
              <Input id="stretchCode" readOnly />
            </div>
            
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-wrap gap-6 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="ownTaxationUnit" />
                <Label htmlFor="ownTaxationUnit" className="font-normal">Egen taxeringsenhet</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="isBuilt" defaultChecked />
                <Label htmlFor="isBuilt" className="font-normal">Bebyggd</Label>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="marketArea">Marknadsområde:</Label>
              <div className="flex gap-1">
                <Input id="marketArea" value="CEN" readOnly className="w-20" />
                <Input value="Centrum" readOnly className="flex-1" />
                <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                  <span className="sr-only">Sök marknadsområde</span>
                  <span>...</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-1.5 lg:col-span-2">
              <Label htmlFor="cityArea">Stadsdel:</Label>
              <div className="flex gap-1">
                <Input id="cityArea" value="CEN" readOnly className="w-20" />
                <Input value="Centrum" readOnly className="flex-1" />
                <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                  <span className="sr-only">Sök stadsdel</span>
                  <span>...</span>
                </Button>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="propertyNumber">Fastighetsnummer:</Label>
              <div className="flex gap-1">
                <Input id="propertyNumber" value={property.code} readOnly className="w-20" />
                <Input value={property.designation} readOnly className="flex-1" />
                <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                  <span className="sr-only">Sök fastighetsnummer</span>
                  <span>...</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="border-b bg-muted/20">
          <CardTitle>Tomträtt</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <Checkbox id="isLeasehold" />
            <Label htmlFor="isLeasehold" className="font-normal">Fastigheten är en tomträtt</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

