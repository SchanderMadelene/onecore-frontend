
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info, Wrench, ClipboardList, Users, Home, Grid3X3 } from "lucide-react";

export const AccordionShowcase = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accordions</CardTitle>
        <CardDescription>
          Konsekvent accordion-styling som används genom hela applikationen
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Accordion */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Grundläggande Accordion</h4>
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="item-1" className="rounded-lg border border-slate-200 bg-white">
              <AccordionTrigger className="px-4 py-3 hover:bg-accent/50">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Grundläggande accordion-item</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-4 pb-4 pt-1">
                  <p className="text-sm text-muted-foreground">
                    Detta är grundstylingen för alla accordions i systemet. 
                    Samma padding, border-radius och färgschema används överallt.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="rounded-lg border border-slate-200 bg-white">
              <AccordionTrigger className="px-4 py-3 hover:bg-accent/50">
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Accordion med ikon</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-4 pb-4 pt-1">
                  <p className="text-sm text-muted-foreground">
                    Ikoner används konsekvent för att identifiera olika typer av innehåll.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Property Maintenance Style */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Fastighetsunderhåll Stil</h4>
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="maintenance" className="rounded-lg border border-slate-200 bg-white">
              <AccordionTrigger className="px-3 sm:px-4 py-3 hover:bg-accent/50">
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Återvinning</span>
                    <span className="text-sm text-muted-foreground">(25 m²)</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Underhållsenhet för återvinning</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-3 sm:px-4 pb-4 pt-1 space-y-4">
                  <div className="border rounded-lg p-3 bg-background">
                    <h4 className="font-medium text-sm mb-2">Miljöbod</h4>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Subkomponent för återvinning</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Room Information Style */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Rumsinformation Stil</h4>
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="room" className="rounded-lg border border-slate-200 bg-white">
              <AccordionTrigger className="px-3 sm:px-4 py-3 hover:bg-accent/50">
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Kök</span>
                  <span className="text-sm text-muted-foreground">(12 m²)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-3 sm:px-4 pb-4 pt-1">
                  <div className="grid gap-3">
                    <div className="border rounded-lg p-3 bg-background">
                      <h4 className="font-medium text-sm mb-2">Diskmaskin</h4>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>Ekonomisk livslängd: 12 år</p>
                        <p>Teknisk livslängd: 15 år</p>
                        <p>År: 2019</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Inspection Style */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Besiktning Stil</h4>
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="inspection" className="rounded-lg border border-slate-200 bg-white">
              <AccordionTrigger className="px-4 py-3 hover:bg-accent/50">
                <div className="flex items-center gap-2.5">
                  <Grid3X3 className="h-4.5 w-4.5 text-slate-500" />
                  <span className="font-medium text-base">Golv</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-4 pb-4 pt-1 space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium capitalize">Golv</h4>
                    <p className="text-sm">Skick: Bra</p>
                    <div className="text-sm">
                      <p className="font-medium">Åtgärder:</p>
                      <p className="text-muted-foreground">Inga åtgärder registrerade</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Styling Notes */}
        <div className="mt-8 p-4 bg-slate-50 rounded-lg">
          <h4 className="font-medium mb-2">Styling Konsistens</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Alla accordions använder <code>rounded-lg border border-slate-200 bg-white</code></li>
            <li>• Triggers har <code>px-4 py-3 hover:bg-accent/50</code> (eller px-3 sm:px-4 för responsiv)</li>
            <li>• Content har <code>px-4 pb-4 pt-1</code> (eller px-3 sm:px-4 för responsiv)</li>
            <li>• Ikoner använder konsekvent <code>h-4 w-4 text-muted-foreground</code></li>
            <li>• Spacing mellan items: <code>space-y-2</code></li>
            <li>• Chevron-ikonen roterar automatiskt med <code>[&[data-state=open]&gt;svg]:rotate-180</code></li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
