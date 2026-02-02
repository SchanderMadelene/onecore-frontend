import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Mail, User, ArrowRightLeft } from "lucide-react";
import { toast } from "sonner";
import type { Inspection, TenantSnapshot } from "../types";
import { extractCostItems, getTenantCostItems } from "./types";
import { CostItemSelector } from "./CostItemSelector";
import { downloadInspectionPdf } from "./generateInspectionPdf";

interface SendPdfDialogProps {
  inspection: Inspection;
  outgoingTenant?: TenantSnapshot;
  incomingTenant?: { name: string; email?: string };
  roomNames?: Record<string, string>;
  isOpen: boolean;
  onClose: () => void;
}

export function SendPdfDialog({
  inspection,
  outgoingTenant,
  incomingTenant,
  roomNames,
  isOpen,
  onClose,
}: SendPdfDialogProps) {
  const [activeTab, setActiveTab] = useState<"outgoing" | "incoming">("outgoing");
  
  // Extrahera kostnadsanmärkningar för hyresgästens ansvar
  const allCostItems = useMemo(
    () => extractCostItems(inspection, roomNames),
    [inspection, roomNames]
  );
  const tenantCostItems = useMemo(
    () => getTenantCostItems(allCostItems),
    [allCostItems]
  );

  // Alla kostnadsposter är valda som default
  const [selectedCostItems, setSelectedCostItems] = useState<string[]>(
    tenantCostItems.map((item) => item.id)
  );

  const handleDownload = (recipient: "outgoing" | "incoming") => {
    try {
      downloadInspectionPdf({
        inspection,
        recipient,
        selectedCostItems: recipient === "outgoing" ? selectedCostItems : undefined,
        roomNames,
      });
      toast.success("PDF har laddats ner");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Kunde inte generera PDF");
    }
  };

  const handleSendEmail = (recipient: "outgoing" | "incoming") => {
    // Placeholder - kräver backend
    toast.info("E-postutskick kräver backend-integration", {
      description: "Funktionen är inte implementerad ännu.",
    });
  };

  const currentTenant = activeTab === "outgoing" ? outgoingTenant : incomingTenant;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Skicka besiktningsprotokoll</DialogTitle>
          <DialogDescription>
            Välj mottagare och anpassa innehållet i PDF:en
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "outgoing" | "incoming")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="outgoing" className="gap-2">
              <ArrowRightLeft className="h-4 w-4" />
              Avflyttande
            </TabsTrigger>
            <TabsTrigger value="incoming" className="gap-2">
              <User className="h-4 w-4" />
              Inflyttande
            </TabsTrigger>
          </TabsList>

          <TabsContent value="outgoing" className="space-y-4 mt-4">
            {/* Mottagarinfo */}
            <Card>
              <CardContent className="pt-4">
                {outgoingTenant ? (
                  <div className="space-y-1">
                    <p className="font-medium">{outgoingTenant.name}</p>
                    {outgoingTenant.email && (
                      <p className="text-sm text-muted-foreground">
                        {outgoingTenant.email}
                      </p>
                    )}
                    {outgoingTenant.phone && (
                      <p className="text-sm text-muted-foreground">
                        {outgoingTenant.phone}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    Ingen avflyttande hyresgäst registrerad
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Kostnadsväljare */}
            <CostItemSelector
              costItems={tenantCostItems}
              selectedItems={selectedCostItems}
              onSelectionChange={setSelectedCostItems}
            />

            {/* Knappar */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => handleDownload("outgoing")}
              >
                <Download className="h-4 w-4" />
                Ladda ner PDF
              </Button>
              <Button
                className="flex-1 gap-2"
                onClick={() => handleSendEmail("outgoing")}
                disabled={!outgoingTenant?.email}
              >
                <Mail className="h-4 w-4" />
                Skicka via e-post
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="incoming" className="space-y-4 mt-4">
            {/* Mottagarinfo */}
            <Card>
              <CardContent className="pt-4">
                {incomingTenant ? (
                  <div className="space-y-1">
                    <p className="font-medium">{incomingTenant.name}</p>
                    {incomingTenant.email && (
                      <p className="text-sm text-muted-foreground">
                        {incomingTenant.email}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    Ingen inflyttande hyresgäst registrerad
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Info om vad som visas */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                PDF för inflyttande hyresgäst innehåller besiktningsinformation
                utan kostnadsposter eller debiteringsansvar.
              </p>
            </div>

            {/* Knappar */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => handleDownload("incoming")}
              >
                <Download className="h-4 w-4" />
                Ladda ner PDF
              </Button>
              <Button
                className="flex-1 gap-2"
                onClick={() => handleSendEmail("incoming")}
                disabled={!incomingTenant?.email}
              >
                <Mail className="h-4 w-4" />
                Skicka via e-post
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
