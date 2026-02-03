import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import type { Inspection } from "../types";
import { getPendingContractForResidence } from "@/features/tenants/data/contracts";

export type RecipientType = "outgoing" | "incoming";

interface SendProtocolDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inspection: Inspection;
  recipientType: RecipientType;
  roomNames?: Record<string, string>;
}

export function SendProtocolDialog({
  open,
  onOpenChange,
  inspection,
  recipientType,
  roomNames,
}: SendProtocolDialogProps) {
  const [email, setEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Hämta förpopulerad mejladress baserat på mottagartyp
  useEffect(() => {
    if (open) {
      const { email: defaultEmail, name } = getRecipientInfo(recipientType, inspection);
      setEmail(defaultEmail);
      setRecipientName(name);
    }
  }, [open, recipientType, inspection]);

  const getRecipientInfo = (type: RecipientType, insp: Inspection): { email: string; name: string } => {
    if (type === "outgoing") {
      // Avflyttande hyresgäst - ta mejl från tenant snapshot
      return {
        email: insp.tenant?.email || "",
        name: insp.tenant?.name || ""
      };
    } else {
      // Inflyttande hyresgäst - hämta från kommande kontrakt
      const residenceId = insp.residence?.id;
      if (residenceId) {
        const pendingContract = getPendingContractForResidence(residenceId);
        if (pendingContract?.tenant) {
          return {
            email: pendingContract.tenant.email || "",
            name: `${pendingContract.tenant.firstName} ${pendingContract.tenant.lastName}`
          };
        }
      }
      return { email: "", name: "" };
    }
  };

  const isValidEmail = (emailStr: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleSend = async () => {
    if (!email.trim() || !isValidEmail(email)) {
      toast.error("Ange en giltig e-postadress");
      return;
    }

    setIsSending(true);
    
    try {
      // Simulera sändning - i framtiden anropar detta ett API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const recipientLabel = recipientType === "outgoing" 
        ? "avflyttande hyresgäst" 
        : "inflyttande hyresgäst";
      
      toast.success(`Protokoll skickat till ${recipientLabel}`, {
        description: `Mejl skickat till ${email}`,
      });
      
      onOpenChange(false);
    } catch (error) {
      toast.error("Kunde inte skicka protokoll", {
        description: "Försök igen senare",
      });
    } finally {
      setIsSending(false);
    }
  };

  const recipientLabel = recipientType === "outgoing" 
    ? "avflyttande hyresgäst" 
    : "inflyttande hyresgäst";

  const includesCostInfo = recipientType === "outgoing";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Skicka protokoll
          </DialogTitle>
          <DialogDescription>
            Skicka besiktningsprotokoll till {recipientLabel}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Info om vad som skickas */}
          <div className="rounded-lg border bg-muted/50 p-3 text-sm space-y-1">
            <p className="font-medium">
              Besiktning: {inspection.inspectionNumber || "Okänt nummer"}
            </p>
            <p className="text-muted-foreground">
              {inspection.residence?.address || "Okänd adress"}
            </p>
            {includesCostInfo ? (
              <p className="text-muted-foreground">
                Inkluderar kostnadsansvar och åtgärder
              </p>
            ) : (
              <p className="text-muted-foreground">
                Utan kostnadsinformation
              </p>
            )}
          </div>

          {/* Mottagare */}
          <div className="space-y-2">
            <Label>Mottagare</Label>
            {email ? (
              <div className="rounded-md border bg-muted/50 px-3 py-2 text-sm space-y-1">
                {recipientName && (
                  <p className="font-medium">{recipientName}</p>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{email}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2 rounded-md border border-warning bg-warning/10 px-3 py-2 text-sm">
                <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-warning" />
                <span>
                  {recipientType === "incoming" 
                    ? "Ingen mejladress hittades för inflyttande hyresgäst"
                    : "Ingen mejladress hittades för hyresgästen"}
                </span>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Avbryt
          </Button>
          <Button 
            onClick={handleSend} 
            disabled={!email.trim() || !isValidEmail(email) || isSending}
          >
            {isSending ? "Skickar..." : "Skicka protokoll"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
