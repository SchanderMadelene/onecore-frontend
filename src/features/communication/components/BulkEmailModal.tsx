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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Mail, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TemplateSelector } from "./TemplateSelector";
import { messageTemplates } from "@/features/communication";
import { MessageTemplate } from "@/types/messageTemplates";

interface Recipient {
  id: string;
  name: string;
  email?: string;
}

interface BulkEmailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipients: Recipient[];
  onSend: (subject: string, message: string, recipients: Recipient[]) => void;
}

export function BulkEmailModal({
  open,
  onOpenChange,
  recipients,
  onSend
}: BulkEmailModalProps) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const recipientsWithEmail = recipients.filter(r => r.email);
  const recipientsWithoutEmail = recipients.filter(r => !r.email);

  const handleTemplateSelect = (template: MessageTemplate) => {
    setSubject(template.emailSubject);
    setMessage(template.emailContent);
  };

  const handleSend = async () => {
    if (!subject.trim() || !message.trim() || recipientsWithEmail.length === 0) return;
    
    setIsSending(true);
    try {
      await onSend(subject, message, recipientsWithEmail);
      setSubject("");
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
            <Mail className="h-5 w-5" />
            Skicka mejl
          </DialogTitle>
          <DialogDescription>
            Skicka mejl till {recipientsWithEmail.length} av {recipients.length} valda kunder
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {recipientsWithoutEmail.length > 0 && (
            <div className="flex items-start gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-warning mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-warning">
                  {recipientsWithoutEmail.length} kunder saknar e-postadress
                </p>
                <p className="text-muted-foreground mt-1">
                  {recipientsWithoutEmail.slice(0, 3).map(r => r.name).join(", ")}
                  {recipientsWithoutEmail.length > 3 && ` och ${recipientsWithoutEmail.length - 3} till`}
                </p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Mottagare ({recipientsWithEmail.length})</Label>
            <ScrollArea className="h-24 rounded-md border p-2">
              <div className="flex flex-wrap gap-1">
                {recipientsWithEmail.map(r => (
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
              type="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email-subject">Ämne</Label>
            <Input
              id="email-subject"
              placeholder="Skriv ämnesrad..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email-message">Meddelande</Label>
            <Textarea
              id="email-message"
              placeholder="Skriv ditt mejlmeddelande här..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Avbryt
          </Button>
          <Button 
            onClick={handleSend} 
            disabled={!subject.trim() || !message.trim() || recipientsWithEmail.length === 0 || isSending}
          >
            {isSending ? "Skickar..." : `Skicka till ${recipientsWithEmail.length} mottagare`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
