
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary p-8">
      <div className="max-w-6xl mx-auto space-y-8 fade-in">
        <header className="text-center space-y-4">
          <span className="text-sm text-accent font-medium">FASTIGHETSFÖRVALTNING</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gradient">
            OneCore Design System
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ett elegant och användarvänligt system för modern fastighetsförvaltning
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="glassmorphism hover-transform">
            <CardHeader>
              <CardTitle>Färger</CardTitle>
              <CardDescription>Vårt färgschema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="h-12 bg-primary rounded-md"></div>
                <p className="text-sm text-muted-foreground">Primary</p>
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-accent rounded-md"></div>
                <p className="text-sm text-muted-foreground">Accent</p>
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-secondary rounded-md"></div>
                <p className="text-sm text-muted-foreground">Secondary</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphism hover-transform">
            <CardHeader>
              <CardTitle>Typografi</CardTitle>
              <CardDescription>Text och rubriker</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold">Rubrik 1</h1>
                <h2 className="text-2xl font-semibold">Rubrik 2</h2>
                <h3 className="text-xl font-medium">Rubrik 3</h3>
                <p className="text-base">Brödtext</p>
                <p className="text-sm text-muted-foreground">Sekundär text</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphism hover-transform">
            <CardHeader>
              <CardTitle>Knappar</CardTitle>
              <CardDescription>Interaktiva element</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Button className="w-full">Primär knapp</Button>
                <Button variant="secondary" className="w-full">Sekundär knapp</Button>
                <Button variant="outline" className="w-full">Outline knapp</Button>
                <Button variant="ghost" className="w-full">Ghost knapp</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
