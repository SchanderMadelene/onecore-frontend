import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const BadgeShowcase = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Badges</CardTitle>
        <CardDescription>Alla badge-varianter som används i systemet</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3">Grundvarianter</h3>
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
          <h3 className="text-sm font-medium mb-3">Status</h3>
          <div className="flex flex-wrap gap-4">
            <Badge variant="status-neutral">Ej påbörjad</Badge>
            <Badge variant="status-info">Bokad</Badge>
            <Badge variant="status-warning">Omkontroll</Badge>
            <Badge variant="status-success">Godkänd</Badge>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-3">Prioritet</h3>
          <div className="flex flex-wrap gap-4">
            <Badge variant="priority-low">Låg</Badge>
            <Badge variant="priority-medium">Medium</Badge>
            <Badge variant="priority-high">Hög</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
