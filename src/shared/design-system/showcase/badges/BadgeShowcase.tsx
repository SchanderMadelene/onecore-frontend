import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Zap, AlertTriangle, Check, Info, Bell } from "lucide-react";

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
          <h3 className="text-sm font-medium mb-3">Statusfärger</h3>
          <div className="flex flex-wrap gap-4">
            <Badge variant="muted">Muted</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="purple">Purple</Badge>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium mb-3">Ikonbadges (size="icon")</h3>
          <p className="text-sm text-muted-foreground mb-3">Kompakta badges med enbart ikon — för statusar, flaggor och indikatorer i tabeller.</p>
          <div className="flex flex-wrap gap-4 items-center">
            <Badge variant="info" size="icon" title="Info"><Zap className="h-3 w-3" /></Badge>
            <Badge variant="warning" size="icon" title="Varning"><AlertTriangle className="h-3 w-3" /></Badge>
            <Badge variant="success" size="icon" title="Klar"><Check className="h-3 w-3" /></Badge>
            <Badge variant="muted" size="icon" title="Info"><Info className="h-3 w-3" /></Badge>
            <Badge variant="destructive" size="icon" title="Notis"><Bell className="h-3 w-3" /></Badge>
            <Badge variant="purple" size="icon" title="Lila"><Zap className="h-3 w-3" /></Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
