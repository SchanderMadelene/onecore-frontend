import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ComponentCard } from "@/components/shared/ComponentCard";
import { mockComponents } from "@/data/components";

export const ComponentShowcase = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Komponenter & Kategorier</CardTitle>
        <CardDescription>
          Visar hur komponenter och kategorier kan ligga bredvid varandra. 
          Kategorier har en chevron-ikon och visar antal komponenter som en badge.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockComponents.map((component) => (
            <ComponentCard key={component.id} component={component} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
