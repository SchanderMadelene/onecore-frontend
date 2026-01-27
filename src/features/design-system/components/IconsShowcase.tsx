
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import * as Icons from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Type for the Icons object
type IconsType = typeof Icons;

// Interface for categorized icons
interface IconCategory {
  title: string;
  description: string;
  icons: {
    name: string;
    Icon: React.ComponentType<any>;
    usage: string;
  }[];
}

// Component to display a single icon
const IconDisplay = ({ 
  name, 
  Icon, 
  usage 
}: { 
  name: string; 
  Icon: React.ComponentType<any>;
  usage: string;
}) => (
  <div className="flex flex-col items-center text-center p-4 border rounded-md hover:bg-accent/10 transition-colors">
    <Icon className="h-8 w-8 mb-2" />
    <span className="font-medium text-sm">{name}</span>
    <span className="text-xs text-muted-foreground mt-1">{usage}</span>
  </div>
);

export const IconsShowcase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Define icon categories and their usage
  const iconCategories: IconCategory[] = [
    {
      title: "Navigation & UI",
      description: "Icons used for navigation and user interface elements",
      icons: [
        { name: "ChevronDown", Icon: Icons.ChevronDown, usage: "Expandable elements, dropdowns" },
        { name: "ChevronUp", Icon: Icons.ChevronUp, usage: "Collapsible elements" },
        { name: "ChevronRight", Icon: Icons.ChevronRight, usage: "Tree navigation, submenu indicators" },
        { name: "Check", Icon: Icons.Check, usage: "Completed tasks, approvals" },
        { name: "CheckCircle", Icon: Icons.CheckCircle, usage: "Handled items status" },
        { name: "Search", Icon: Icons.Search, usage: "Search functionality" },
        { name: "Menu", Icon: Icons.Menu, usage: "Mobile menu toggle" },
        { name: "X", Icon: Icons.X, usage: "Close dialogs, dismiss notifications" }
      ]
    },
    {
      title: "Property Management",
      description: "Icons related to properties, buildings and apartments",
      icons: [
        { name: "Building", Icon: Icons.Building, usage: "Buildings, property structures" },
        { name: "Building2", Icon: Icons.Building2, usage: "Property overview, buildings list" },
        { name: "Home", Icon: Icons.Home, usage: "Apartments, residences" },
        { name: "MapPin", Icon: Icons.MapPin, usage: "Locations, addresses, map views" },
        { name: "DoorOpen", Icon: Icons.DoorOpen, usage: "Entrances, openings" },
        { name: "Key", Icon: Icons.Key, usage: "Access, apartments" },
        { name: "LayoutGrid", Icon: Icons.LayoutGrid, usage: "Property layouts" }
      ]
    },
    {
      title: "User & Tenant Management",
      description: "Icons related to users, tenants, and contacts",
      icons: [
        { name: "User", Icon: Icons.User, usage: "Individual users, tenant profiles" },
        { name: "Users", Icon: Icons.Users, usage: "Multiple users, companies" },
        { name: "Phone", Icon: Icons.Phone, usage: "Call tenant functionality" },
        { name: "Mail", Icon: Icons.Mail, usage: "Email functionality" },
        { name: "MessageSquare", Icon: Icons.MessageSquare, usage: "Send SMS functionality" }
      ]
    },
    {
      title: "Content & Documentation",
      description: "Icons related to documents and content",
      icons: [
        { name: "FileText", Icon: Icons.FileText, usage: "Documents, contracts" },
        { name: "Tag", Icon: Icons.Tag, usage: "Categories, labels, areas" },
        { name: "Calendar", Icon: Icons.Calendar, usage: "Dates, scheduling, planning" },
        { name: "CalendarDays", Icon: Icons.CalendarDays, usage: "Multiple day planning" }
      ]
    },
    {
      title: "Inspection & Maintenance",
      description: "Icons used in inspection and maintenance workflows",
      icons: [
        { name: "Paintbrush", Icon: Icons.Paintbrush, usage: "Painting actions" },
        { name: "Wrench", Icon: Icons.Wrench, usage: "Repairs, maintenance" },
        { name: "Hammer", Icon: Icons.Hammer, usage: "Replacements, construction" },
        { name: "Camera", Icon: Icons.Camera, usage: "Photo documentation" },
        { name: "PieChart", Icon: Icons.PieChart, usage: "Statistics, data visualization" },
        { name: "Loader2", Icon: Icons.Loader2, usage: "Loading states" }
      ]
    },
    {
      title: "Design System",
      description: "Icons used in the design system",
      icons: [
        { name: "Palette", Icon: Icons.Palette, usage: "Color palettes, themes" },
        { name: "Type", Icon: Icons.Type, usage: "Typography, fonts" },
        { name: "Component", Icon: Icons.Component, usage: "UI components" },
        { name: "Grid", Icon: Icons.Grid, usage: "Layout grids" },
        { name: "LibraryIcon", Icon: Icons.LibraryIcon, usage: "Icon libraries" },
        { name: "Info", Icon: Icons.Info, usage: "Information messages" },
        { name: "AlertCircle", Icon: Icons.AlertCircle, usage: "Warnings, alerts" }
      ]
    }
  ];

  // Function to filter icons based on search term
  const filterIcons = (icons: IconCategory[]) => {
    if (!searchTerm) return icons;
    
    return icons.map(category => ({
      ...category,
      icons: category.icons.filter(icon => 
        icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        icon.usage.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(category => category.icons.length > 0);
  };

  const filteredCategories = filterIcons(iconCategories);
  
  // Count total icons across all categories for display purposes
  const totalIcons = iconCategories.reduce((sum, category) => sum + category.icons.length, 0);
  const filteredIconsCount = filteredCategories.reduce((sum, category) => sum + category.icons.length, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ikoner</CardTitle>
          <CardDescription>
            Översikt av {totalIcons} ikoner som används i applikationen
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="max-w-md">
            <Input
              placeholder="Sök ikoner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-6"
            />
          </div>
          
          {searchTerm && (
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="px-2 py-1">
                Visar {filteredIconsCount} av {totalIcons} ikoner
              </Badge>
              {filteredIconsCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSearchTerm("")}
                  className="h-7 px-2 text-xs"
                >
                  Rensa sökning
                </Button>
              )}
            </div>
          )}

          {filteredIconsCount === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Inga ikoner matchade söktermen "{searchTerm}"
            </div>
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-6">
                <TabsTrigger value="all">Alla ikoner</TabsTrigger>
                <TabsTrigger value="categorized">Efter kategori</TabsTrigger>
                <TabsTrigger value="alphabetical">Alfabetiskt</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredCategories.flatMap(category => 
                    category.icons.map(icon => (
                      <IconDisplay 
                        key={icon.name} 
                        name={icon.name} 
                        Icon={icon.Icon} 
                        usage={icon.usage} 
                      />
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="categorized">
                <div className="space-y-8">
                  {filteredCategories.map(category => (
                    <div key={category.title} className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">{category.title}</h3>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {category.icons.map(icon => (
                          <IconDisplay 
                            key={icon.name} 
                            name={icon.name} 
                            Icon={icon.Icon} 
                            usage={icon.usage} 
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="alphabetical">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredCategories
                    .flatMap(category => category.icons)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(icon => (
                      <IconDisplay 
                        key={icon.name} 
                        name={icon.name} 
                        Icon={icon.Icon} 
                        usage={icon.usage} 
                      />
                    ))
                  }
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
