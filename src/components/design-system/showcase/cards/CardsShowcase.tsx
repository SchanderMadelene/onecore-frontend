
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const CardsShowcase = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cards</CardTitle>
        <CardDescription>Card components for displaying content</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
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
              <TabsList className="grid w-full grid-cols-2 bg-slate-100/70 p-1 rounded-lg">
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
  );
};
