
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";

export const ButtonShowcase = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Buttons</CardTitle>
        <CardDescription>Various button styles used throughout the application</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        
        <Separator />
        
        <div className="flex flex-wrap gap-4">
          <Button size="default">Default Size</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <Check className="h-4 w-4" />
          </Button>
        </div>
        
        <Separator />
        
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>Disabled Outline</Button>
          <Button>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading
          </Button>
          <Button>
            <Check className="mr-2 h-4 w-4" /> 
            Success
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
