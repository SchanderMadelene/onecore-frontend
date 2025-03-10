
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import * as Icons from "lucide-react";

// Type for the Icons object
type IconsType = typeof Icons;

// Component to display a single icon
const IconDisplay = ({ name, Icon }: { name: string; Icon: React.ComponentType<any> }) => (
  <div className="flex flex-col items-center text-center p-4 border rounded-md hover:bg-accent/10 transition-colors">
    <Icon className="h-8 w-8 mb-2" />
    <span className="text-xs text-muted-foreground">{name}</span>
  </div>
);

export const IconsShowcase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter icons based on search term
  const filteredIcons = Object.entries(Icons)
    .filter(([name]) => 
      // Filter out non-icon exports and match search term
      name !== "createLucideIcon" && 
      name !== "default" && 
      !name.startsWith("create") &&
      name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 120); // Limit to first 120 icons to avoid performance issues
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lucide Icons</CardTitle>
          <CardDescription>Icons used throughout the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="max-w-md">
            <Input
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-6"
            />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredIcons.map(([name, Icon]) => (
              <IconDisplay key={name} name={name} Icon={Icon as React.ComponentType<any>} />
            ))}
          </div>
          
          {filteredIcons.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No icons found matching "{searchTerm}"
            </div>
          )}
          
          {filteredIcons.length === 120 && (
            <div className="text-center pt-4 text-sm text-muted-foreground">
              Showing first 120 results. Refine your search to see more specific icons.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
