import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, MessageSquare, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TemplateSelector } from "./TemplateSelector";
import { messageTemplates } from "@/features/communication";
import { MessageTemplate } from "@/types/messageTemplates";

interface Recipient {
  id: string;
  name: string;
  phone?: string;
}

interface BulkSmsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipients: Recipient[];
  onSend: (message: string, recipients: Recipient[]) => void;
}

const MAX_SMS_LENGTH = 160;

export function BulkSmsModal({
  open,
  onOpenChange,
  recipients,
  onSend
}: BulkSmsModalProps) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const recipientsWithPhone = recipients.filter(r => r.phone);
  const recipientsWithoutPhone = recipients.filter(r => !r.phone);
  const charactersLeft = MAX_SMS_LENGTH - message.length;

  const handleTemplateSelect = (template: MessageTemplate) => {
    setMessage(template.smsContent.slice(0, MAX_SMS_LENGTH));
  };

  const handleSend = async () => {
    if (!message.trim() || recipientsWithPhone.length === 0) return;
    
    setIsSending(true);
    try {
      await onSend(message, recipientsWithPhone);
      setMessage("");
      onOpenChange(false);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Skicka SMS
          </DialogTitle>
          <DialogDescription>
            Skicka SMS till {recipientsWithPhone.length} av {recipients.length} valda kunder
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {recipientsWithoutPhone.length > 0 && (
            <div className="flex items-start gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-warning mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-warning">
                  {recipientsWithoutPhone.length} kunder saknar telefonnummer
                </p>
                <p className="text-muted-foreground mt-1">
                  {recipientsWithoutPhone.slice(0, 3).map(r => r.name).join(", ")}
                  {recipientsWithoutPhone.length > 3 && ` och ${recipientsWithoutPhone.length - 3} till`}
                </p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Mottagare ({recipientsWithPhone.length})</Label>
            <ScrollArea className="h-24 rounded-md border p-2">
              <div className="flex flex-wrap gap-1">
                {recipientsWithPhone.map(r => (
                  <Badge key={r.id} variant="secondary" className="text-xs">
                    <User className="h-3 w-3 mr-1" />
                    {r.name}
                  </Badge>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="space-y-2">
            <Label>Mall</Label>
            <TemplateSelector
              templates={messageTemplates}
              onSelect={handleTemplateSelect}
              type="sms"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-message">Meddelande</Label>
              <span className={`text-xs ${charactersLeft < 20 ? "text-destructive" : "text-muted-foreground"}`}>
                {charactersLeft} tecken kvar
              </span>
            </div>
            <Textarea
              id="sms-message"
              placeholder="Skriv ditt SMS-meddelande här..."
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, MAX_SMS_LENGTH))}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Avbryt
          </Button>
          <Button 
            onClick={handleSend} 
            disabled={!message.trim() || recipientsWithPhone.length === 0 || isSending}
          >
            {isSending ? "Skickar..." : `Skicka till ${recipientsWithPhone.length} mottagare`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
