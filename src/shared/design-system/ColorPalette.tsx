
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ColorSwatch {
  name: string;
  description: string;
  cssVar: string;
  className: string;
  foregroundVar?: string;
}

const ColorSection = ({ title, description, colors }: { 
  title: string; 
  description: string;
  colors: ColorSwatch[];
}) => (
  <div className="space-y-4">
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
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
            <div className="text-xs font-mono text-muted-foreground">
              --{color.cssVar}
            </div>
            {color.foregroundVar && (
              <div className="text-xs font-mono text-muted-foreground">
                --{color.foregroundVar}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const ColorPalette = () => {
  const baseColors: ColorSwatch[] = [
    {
      name: "Background",
      description: "Huvudsaklig bakgrundsfärg",
      cssVar: "background",
      className: "bg-background text-foreground border",
    },
    {
      name: "Foreground",
      description: "Huvudsaklig textfärg",
      cssVar: "foreground",
      className: "bg-foreground text-background",
    },
    {
      name: "Card",
      description: "Kortbakgrunder",
      cssVar: "card",
      foregroundVar: "card-foreground",
      className: "bg-card text-card-foreground border",
    },
    {
      name: "Popover",
      description: "Popover- och dropdown-bakgrunder",
      cssVar: "popover",
      foregroundVar: "popover-foreground",
      className: "bg-popover text-popover-foreground border",
    },
  ];

  const semanticColors: ColorSwatch[] = [
    {
      name: "Primary",
      description: "Huvudsaklig varumärkesfärg",
      cssVar: "primary",
      foregroundVar: "primary-foreground",
      className: "bg-primary text-primary-foreground",
    },
    {
      name: "Secondary",
      description: "Sekundära bakgrunder och element",
      cssVar: "secondary",
      foregroundVar: "secondary-foreground",
      className: "bg-secondary text-secondary-foreground border",
    },
    {
      name: "Accent",
      description: "Accentfärg för framhävningar",
      cssVar: "accent",
      foregroundVar: "accent-foreground",
      className: "bg-accent text-accent-foreground",
    },
    {
      name: "Muted",
      description: "Dämpade bakgrunder och text",
      cssVar: "muted",
      foregroundVar: "muted-foreground",
      className: "bg-muted text-muted-foreground border",
    },
  ];

  const statusColors: ColorSwatch[] = [
    {
      name: "Destructive",
      description: "Fel- och varningsstatus",
      cssVar: "destructive",
      foregroundVar: "destructive-foreground",
      className: "bg-destructive text-destructive-foreground",
    },
    {
      name: "Success",
      description: "Lyckad status",
      cssVar: "success",
      foregroundVar: "success-foreground",
      className: "bg-success text-success-foreground",
    },
    {
      name: "Warning",
      description: "Varningsstatus",
      cssVar: "warning",
      foregroundVar: "warning-foreground",
      className: "bg-warning text-warning-foreground",
    },
  ];

  const uiColors: ColorSwatch[] = [
    {
      name: "Border",
      description: "Standardkantlinje",
      cssVar: "border",
      className: "bg-border h-16",
    },
    {
      name: "Input",
      description: "Inmatningsfältskanter",
      cssVar: "input",
      className: "bg-input h-16",
    },
    {
      name: "Ring",
      description: "Fokusring",
      cssVar: "ring",
      className: "bg-ring h-16",
    },
  ];

  const opacityLevels = [100, 70, 50, 30, 10];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Färgpalett</CardTitle>
        <CardDescription>
          Komplett färgsystem med HSL-värden definierade i index.css och refererade via CSS-variabler i tailwind.config.ts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-10">
        {/* Base Colors */}
        <ColorSection
          title="Basfärger"
          description="Grundläggande bakgrunds- och textfärger"
          colors={baseColors}
        />

        {/* Semantic Colors */}
        <ColorSection
          title="Semantiska färger"
          description="Färger med specifik betydelse i gränssnittet"
          colors={semanticColors}
        />

        {/* Status Colors */}
        <ColorSection
          title="Statusfärger"
          description="Färger för att indikera status och resultat"
          colors={statusColors}
        />

        {/* UI Colors */}
        <ColorSection
          title="Gränssnittsfärger"
          description="Färger för UI-element som kanter och fokusringar"
          colors={uiColors}
        />

        {/* Opacity Examples */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Opacity-modifierare</h3>
            <p className="text-sm text-muted-foreground">
              Använd Tailwinds opacity-modifierare för att skapa variationer. Syntax: <code className="bg-muted px-1 rounded">text-primary/70</code> eller <code className="bg-muted px-1 rounded">bg-primary/50</code>
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Primary med opacity</h4>
              <div className="flex gap-2 flex-wrap">
                {opacityLevels.map((opacity) => (
                  <div
                    key={opacity}
                    className={`w-16 h-16 rounded-md flex items-center justify-center text-xs font-medium bg-primary/${opacity} ${opacity >= 50 ? 'text-primary-foreground' : 'text-primary'}`}
                  >
                    {opacity}%
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Accent med opacity</h4>
              <div className="flex gap-2 flex-wrap">
                {opacityLevels.map((opacity) => (
                  <div
                    key={opacity}
                    className={`w-16 h-16 rounded-md flex items-center justify-center text-xs font-medium bg-accent/${opacity} ${opacity >= 50 ? 'text-accent-foreground' : 'text-accent'}`}
                  >
                    {opacity}%
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Text med opacity (på mörk bakgrund)</h4>
              <div className="flex gap-2 flex-wrap bg-primary p-4 rounded-md">
                {opacityLevels.map((opacity) => (
                  <div
                    key={opacity}
                    className={`px-3 py-2 text-sm font-medium text-primary-foreground/${opacity}`}
                  >
                    {opacity}%
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Användningsexempel</h3>
            <p className="text-sm text-muted-foreground">
              Exempel på hur färgerna används i olika UI-kontexter
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium">Knappar</h4>
              <div className="flex gap-2 flex-wrap">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                  Primary
                </button>
                <button className="px-4 py-2 bg-secondary text-secondary-foreground border rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors">
                  Secondary
                </button>
                <button className="px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm font-medium hover:bg-accent/90 transition-colors">
                  Accent
                </button>
                <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md text-sm font-medium hover:bg-destructive/90 transition-colors">
                  Destructive
                </button>
                <button className="px-4 py-2 bg-success text-success-foreground rounded-md text-sm font-medium hover:bg-success/90 transition-colors">
                  Success
                </button>
                <button className="px-4 py-2 bg-warning text-warning-foreground rounded-md text-sm font-medium hover:bg-warning/90 transition-colors">
                  Warning
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Textfärger</h4>
              <div className="space-y-1">
                <p className="text-foreground">Primär text (foreground)</p>
                <p className="text-muted-foreground">Dämpat text (muted-foreground)</p>
                <p className="text-primary">Primärfärg text</p>
                <p className="text-accent">Accentfärg text</p>
                <p className="text-destructive">Destruktiv text</p>
                <p className="text-success">Lyckad text</p>
                <p className="text-warning">Varningstext</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Kort och paneler</h4>
              <div className="flex gap-2 flex-wrap">
                <div className="p-4 bg-card border rounded-md">
                  <div className="text-card-foreground font-medium">Card</div>
                  <div className="text-muted-foreground text-sm">Kortinnehåll</div>
                </div>
                <div className="p-4 bg-muted rounded-md">
                  <div className="text-muted-foreground font-medium">Muted</div>
                  <div className="text-muted-foreground text-sm">Dämpat innehåll</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Badges</h4>
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                  Primary
                </span>
                <span className="px-2 py-1 bg-secondary text-secondary-foreground border rounded-full text-xs font-medium">
                  Secondary
                </span>
                <span className="px-2 py-1 bg-destructive text-destructive-foreground rounded-full text-xs font-medium">
                  Destructive
                </span>
                <span className="px-2 py-1 bg-success text-success-foreground rounded-full text-xs font-medium">
                  Success
                </span>
                <span className="px-2 py-1 bg-warning text-warning-foreground rounded-full text-xs font-medium">
                  Warning
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* HSL Values Reference */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">HSL-värdesreferens</h3>
            <p className="text-sm text-muted-foreground">
              Alla färger definieras i HSL-format utan <code className="bg-muted px-1 rounded">hsl()</code>-wrapping i index.css
            </p>
          </div>
          
          <div className="bg-muted p-4 rounded-md overflow-x-auto">
            <pre className="text-xs font-mono">
{`/* Basfärger */
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;

/* Primärfärger */
--primary: 222 47% 11%;
--primary-foreground: 210 40% 98%;

/* Sekundärfärger */
--secondary: 210 40% 96%;
--secondary-foreground: 222 47% 11%;

/* Accentfärger */
--accent: 215 30% 60%;
--accent-foreground: 0 0% 100%;

/* Dämpade färger */
--muted: 210 40% 96%;
--muted-foreground: 215 16% 47%;

/* Statusfärger */
--destructive: 0 84% 60%;
--success: 142 76% 36%;
--warning: 38 92% 50%;

/* Gränssnittsfärger */
--border: 214 32% 91%;
--input: 214 32% 91%;
--ring: 222 84% 4.9%;`}
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
