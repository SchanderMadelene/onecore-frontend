import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import logoFullBlack from "@/assets/logos/full/onecore_logo_black.svg";
import logoFullColor from "@/assets/logos/full/onecore_logo_color.svg";
import logoFullWhite from "@/assets/logos/full/onecore_logo_white.svg";
import logoSimpleBlack from "@/assets/logos/simple/onecore_simple_black.svg";
import logoSimpleColor from "@/assets/logos/simple/onecore_simple_color.svg";
import logoSimpleWhite from "@/assets/logos/simple/onecore_simple_white.svg";

interface LogoVariant {
  name: string;
  src: string;
  bgClass: string;
  useCases: string[];
}

export const LogosShowcase = () => {
  const fullLogos: LogoVariant[] = [
    {
      name: "Svart",
      src: logoFullBlack,
      bgClass: "bg-white",
      useCases: ["Ljusa bakgrunder", "Standardanvändning", "Utskrifter"]
    },
    {
      name: "Färg (Blå)",
      src: logoFullColor,
      bgClass: "bg-white",
      useCases: ["Accent-användning", "Splash screens", "Hero sections"]
    },
    {
      name: "Vit",
      src: logoFullWhite,
      bgClass: "bg-slate-800",
      useCases: ["Mörka bakgrunder", "Dark mode", "Footer"]
    }
  ];

  const simpleLogos: LogoVariant[] = [
    {
      name: "Svart",
      src: logoSimpleBlack,
      bgClass: "bg-white",
      useCases: ["Navigation bar", "Kompakta ytor", "UI-element"]
    },
    {
      name: "Färg (Blå)",
      src: logoSimpleColor,
      bgClass: "bg-white",
      useCases: ["App-ikoner", "Favicons", "Notifications"]
    },
    {
      name: "Vit",
      src: logoSimpleWhite,
      bgClass: "bg-slate-800",
      useCases: ["Dark mode navigation", "Kompakt dark mode"]
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Logotyper</h2>
        <p className="text-muted-foreground">
          OneCore har två huvudvarianter av logotypen - fullständig och enkel symbol. 
          Välj rätt variant baserat på kontext och tillgängligt utrymme.
        </p>
      </div>

      {/* Användningsriktlinjer */}
      <Card>
        <CardHeader>
          <CardTitle>Användningsriktlinjer</CardTitle>
          <CardDescription>Viktiga principer för logotypanvändning</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                ✅ Gör detta
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Använd fullständig logo på startsidor och landing pages</li>
                <li>Använd enkel symbol i navigation och kompakta ytor</li>
                <li>Ge logotypen tillräckligt med andrum</li>
                <li>Behåll logotypens proportioner</li>
                <li>Använd svart på ljusa bakgrunder, vit på mörka</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                ❌ Undvik detta
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Förvrida eller ändra proportionerna</li>
                <li>Byta färger eller lägga till effekter</li>
                <li>Placera på komplexa bakgrunder utan kontrast</li>
                <li>Använda för liten storlek (minst 24px höjd)</li>
                <li>Kombinera olika varianter på samma yta</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fullständiga logotyper */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-1">Fullständiga logotyper</h3>
          <p className="text-sm text-muted-foreground">
            Symbol + text "ONECore". Används när utrymme finns och logotypen är i fokus.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {fullLogos.map((logo) => (
            <Card key={`full-${logo.name}`}>
              <CardHeader>
                <CardTitle className="text-base">{logo.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`${logo.bgClass} rounded-lg p-8 flex items-center justify-center min-h-[120px] border`}>
                  <img 
                    src={logo.src} 
                    alt={`OneCore logo ${logo.name}`} 
                    className="h-12"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold mb-2">Användningsområden:</p>
                  <div className="flex flex-wrap gap-1">
                    {logo.useCases.map((useCase) => (
                      <Badge key={useCase} variant="secondary" className="text-xs">
                        {useCase}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Enkla symboler */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-1">Enkla symboler</h3>
          <p className="text-sm text-muted-foreground">
            Endast symbol utan text. Används i kompakta ytor och där varumärket redan är etablerat.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {simpleLogos.map((logo) => (
            <Card key={`simple-${logo.name}`}>
              <CardHeader>
                <CardTitle className="text-base">{logo.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`${logo.bgClass} rounded-lg p-8 flex items-center justify-center min-h-[120px] border`}>
                  <img 
                    src={logo.src} 
                    alt={`OneCore symbol ${logo.name}`} 
                    className="h-10"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold mb-2">Användningsområden:</p>
                  <div className="flex flex-wrap gap-1">
                    {logo.useCases.map((useCase) => (
                      <Badge key={useCase} variant="secondary" className="text-xs">
                        {useCase}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Storlekar */}
      <Card>
        <CardHeader>
          <CardTitle>Rekommenderade storlekar</CardTitle>
          <CardDescription>Minimistorlekar för optimal läsbarhet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="font-medium">Fullständig logo</span>
                <span className="text-sm text-muted-foreground">Minimum höjd</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Digital</p>
                  <p className="font-mono">32px / 2rem</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Print</p>
                  <p className="font-mono">15mm</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="font-medium">Enkel symbol</span>
                <span className="text-sm text-muted-foreground">Minimum höjd</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Digital</p>
                  <p className="font-mono">24px / 1.5rem</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Print</p>
                  <p className="font-mono">10mm</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kodsexempel */}
      <Card>
        <CardHeader>
          <CardTitle>Kodexempel</CardTitle>
          <CardDescription>Så importerar och använder du logotyperna i React</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold mb-2">Import:</p>
              <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                <code>{`import logoFull from "@/assets/logos/full/onecore_logo_black.svg";
import logoSimple from "@/assets/logos/simple/onecore_simple_black.svg";`}</code>
              </pre>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2">Användning:</p>
              <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                <code>{`// Fullständig logo (startsida, hero)
<img src={logoFull} alt="OneCore" className="h-12 md:h-16" />

// Enkel symbol (navigation)
<img src={logoSimple} alt="OneCore" className="h-6" />`}</code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};