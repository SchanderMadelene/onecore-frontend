import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Download, Mail, FileText, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import type { Inspection } from "../types";
import { downloadInspectionPdf } from "./generateInspectionPdf";
import { SendProtocolDialog, type RecipientType } from "./SendProtocolDialog";

interface PdfDropdownMenuProps {
  inspection: Inspection;
  roomNames?: Record<string, string>;
}

export function PdfDropdownMenu({ inspection, roomNames }: PdfDropdownMenuProps) {
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [sendRecipientType, setSendRecipientType] = useState<RecipientType>("outgoing");

  const handleDownload = () => {
    try {
      downloadInspectionPdf({
        inspection,
        recipient: "outgoing",
        roomNames,
      });
      toast.success("PDF har laddats ner");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Kunde inte generera PDF");
    }
  };

  const handleSendToOutgoing = () => {
    setSendRecipientType("outgoing");
    setSendDialogOpen(true);
  };

  const handleSendToIncoming = () => {
    setSendRecipientType("incoming");
    setSendDialogOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <FileText className="h-4 w-4" />
            Protokoll
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={handleDownload} className="cursor-pointer">
            <Download className="h-4 w-4 mr-2" />
            Ladda ner PDF
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleSendToOutgoing} className="cursor-pointer">
            <Mail className="h-4 w-4 mr-2" />
            <div className="flex flex-col">
              <span>Skicka till avflyttande</span>
              <span className="text-xs opacity-70">Inkl. kostnadsansvar</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleSendToIncoming} className="cursor-pointer">
            <Mail className="h-4 w-4 mr-2" />
            <div className="flex flex-col">
              <span>Skicka till inflyttande</span>
              <span className="text-xs opacity-70">Utan kostnadsinformation</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SendProtocolDialog
        open={sendDialogOpen}
        onOpenChange={setSendDialogOpen}
        inspection={inspection}
        recipientType={sendRecipientType}
        roomNames={roomNames}
      />
    </>
  );
}
