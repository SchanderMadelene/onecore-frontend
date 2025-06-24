
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const ColorPalette = () => {
  const colors = [
    {
      name: "Primary",
      description: "Main brand color",
      value: "#1A1F2C",
      className: "bg-primary text-primary-foreground",
    },
    {
      name: "Secondary", 
      description: "Secondary backgrounds",
      value: "#F6F7F9",
      className: "bg-secondary text-secondary-foreground border",
    },
    {
      name: "Accent",
      description: "Accent color for highlights",
      value: "#6B7280",
      className: "bg-accent text-accent-foreground",
    },
    {
      name: "Muted",
      description: "Subtle backgrounds and text",
      value: "#F0F1F3",
      className: "bg-muted text-muted-foreground border",
    },
    {
      name: "Card",
      description: "Card backgrounds",
      value: "hsl(var(--card))",
      className: "bg-card text-card-foreground border",
    },
    {
      name: "Destructive",
      description: "Error and danger states",
      value: "hsl(var(--destructive))",
      className: "bg-destructive text-destructive-foreground",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Palette</CardTitle>
        <CardDescription>
          The color system used throughout the application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {colors.map((color) => (
            <div key={color.name} className="space-y-2">
              <div
                className={`h-16 w-full rounded-md flex items-center justify-center text-sm font-medium ${color.className}`}
              >
                {color.name}
              </div>
              <div className="space-y-1">
                <div className="font-medium text-sm">{color.name}</div>
                <div className="text-xs text-muted-foreground">{color.description}</div>
                <div className="text-xs font-mono text-muted-foreground">{color.value}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Color Usage Examples</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium">Buttons</h4>
              <div className="flex gap-2 flex-wrap">
                <button className="px-3 py-2 bg-primary text-primary-foreground rounded text-sm">Primary</button>
                <button className="px-3 py-2 bg-secondary text-secondary-foreground border rounded text-sm">Secondary</button>
                <button className="px-3 py-2 bg-accent text-accent-foreground rounded text-sm">Accent</button>
                <button className="px-3 py-2 bg-destructive text-destructive-foreground rounded text-sm">Destructive</button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Text Colors</h4>
              <div className="space-y-1">
                <p className="text-foreground">Primary text (foreground)</p>
                <p className="text-muted-foreground">Muted text</p>
                <p className="text-accent">Accent text</p>
                <p className="text-destructive">Destructive text</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
