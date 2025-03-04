
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Color swatch component
const ColorSwatch = ({ color, name, value }: { color: string; name: string; value: string }) => (
  <div className="flex flex-col items-start">
    <div
      className="h-24 w-full rounded-md mb-2 shadow-sm"
      style={{ backgroundColor: value }}
    />
    <div className="space-y-1">
      <p className="font-medium text-sm">{name}</p>
      <p className="text-xs text-muted-foreground">{value}</p>
    </div>
  </div>
);

export const ColorPalette = () => {
  // Primary colors
  const primaryColors = [
    { name: "Primary", value: "hsl(var(--primary))", color: "primary" },
    { name: "Primary Foreground", value: "hsl(var(--primary-foreground))", color: "primary-foreground" },
    { name: "Secondary", value: "hsl(var(--secondary))", color: "secondary" },
    { name: "Secondary Foreground", value: "hsl(var(--secondary-foreground))", color: "secondary-foreground" },
    { name: "Accent", value: "hsl(var(--accent))", color: "accent" },
    { name: "Accent Foreground", value: "hsl(var(--accent-foreground))", color: "accent-foreground" },
  ];

  // UI colors
  const uiColors = [
    { name: "Background", value: "hsl(var(--background))", color: "background" },
    { name: "Foreground", value: "hsl(var(--foreground))", color: "foreground" },
    { name: "Card", value: "hsl(var(--card))", color: "card" },
    { name: "Card Foreground", value: "hsl(var(--card-foreground))", color: "card-foreground" },
    { name: "Muted", value: "hsl(var(--muted))", color: "muted" },
    { name: "Muted Foreground", value: "hsl(var(--muted-foreground))", color: "muted-foreground" },
  ];

  // Status colors
  const statusColors = [
    { name: "Destructive", value: "hsl(var(--destructive))", color: "destructive" },
    { name: "Destructive Foreground", value: "hsl(var(--destructive-foreground))", color: "destructive-foreground" },
    { name: "Border", value: "hsl(var(--border))", color: "border" },
    { name: "Input", value: "hsl(var(--input))", color: "input" },
    { name: "Ring", value: "hsl(var(--ring))", color: "ring" },
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Primary Colors</CardTitle>
          <CardDescription>Main colors used across the application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {primaryColors.map((color) => (
              <ColorSwatch key={color.name} {...color} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>UI Colors</CardTitle>
          <CardDescription>Colors for various UI elements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {uiColors.map((color) => (
              <ColorSwatch key={color.name} {...color} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status & Utility Colors</CardTitle>
          <CardDescription>Colors for status indicators and utilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {statusColors.map((color) => (
              <ColorSwatch key={color.name} {...color} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
