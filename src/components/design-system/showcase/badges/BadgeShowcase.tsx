import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const BadgeShowcase = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Badges</CardTitle>
        <CardDescription>Various badge styles used throughout the application</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3">Standard Variants</h3>
          <div className="flex flex-wrap gap-4">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="success">Success</Badge>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-3">Use Cases</h3>
          <div className="flex flex-wrap gap-4">
            <Badge variant="success">Aktiv</Badge>
            <Badge variant="destructive">Avslagen</Badge>
            <Badge variant="secondary">Väntande</Badge>
            <Badge variant="outline">Utkast</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
