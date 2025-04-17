
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Check, Info, Loader2, Settings, File, Bell, User } from "lucide-react";
import { MobileAccordion, MobileAccordionItem } from "@/components/ui/mobile-accordion";

export const ComponentShowcase = () => {
  const mobileAccordionItems: MobileAccordionItem[] = [
    {
      id: "profile",
      icon: User,
      title: "Profil",
      content: (
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="name">Namn</Label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="john.doe@example.com" />
          </div>
        </div>
      )
    },
    {
      id: "notifications",
      icon: Bell,
      title: "Aviseringar",
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email aviseringar</Label>
            <Switch id="email-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications">Push aviseringar</Label>
            <Switch id="push-notifications" />
          </div>
        </div>
      )
    },
    {
      id: "settings",
      icon: Settings,
      title: "Inställningar",
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Mörkt läge</Label>
            <Switch id="dark-mode" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="autoplay">Autouppspelning</Label>
            <Switch id="autoplay" />
          </div>
        </div>
      )
    },
    {
      id: "documents",
      icon: File,
      title: "Dokument",
      content: (
        <div className="space-y-2">
          <p>Inga dokument tillgängliga</p>
          <Button size="sm" variant="outline">Ladda upp dokument</Button>
        </div>
      ),
      disabled: true
    },
  ];

  return (
    <div className="space-y-8">
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

      <Card>
        <CardHeader>
          <CardTitle>Form Controls</CardTitle>
          <CardDescription>Input elements used in forms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="example-input">Default Input</Label>
              <Input id="example-input" placeholder="Enter text..." />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="disabled-input">Disabled Input</Label>
              <Input id="disabled-input" disabled placeholder="Disabled input" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="with-icon" className="flex items-center gap-2">
                <Info className="h-4 w-4" /> Input with Icon
              </Label>
              <div className="relative">
                <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="with-icon" className="pl-9" placeholder="Input with icon..." />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Switch Example</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mobile Accordion</CardTitle>
          <CardDescription>Collapsible accordion component optimized for mobile views</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-md mx-auto">
            <MobileAccordion 
              items={mobileAccordionItems} 
              defaultOpen={["profile"]}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cards</CardTitle>
          <CardDescription>Card components for displaying content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Example Card</CardTitle>
                <CardDescription>This is a description of the card content</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Main content goes here. The quick brown fox jumps over the lazy dog.</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost">Cancel</Button>
                <Button>Submit</Button>
              </CardFooter>
            </Card>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
              
              <Tabs defaultValue="tab1" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="p-4 border rounded-md mt-2">
                  Tab 1 content
                </TabsContent>
                <TabsContent value="tab2" className="p-4 border rounded-md mt-2">
                  Tab 2 content
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
