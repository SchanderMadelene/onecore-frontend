import { useMemo, useState } from "react";
import { addDays } from "date-fns";
import { sv } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { DatePicker } from "@/shared/common";
import { TemplateSelector } from "@/features/communication/components/TemplateSelector";
import { messageTemplates } from "@/features/communication/data/messageTemplates";
import type { MessageTemplate } from "@/features/communication/types/messageTemplate";

export type ShowingHostType = "mimer" | "tenant" | "custom";

export interface HousingOfferDispatch {
  responseDeadline: Date;
  showingHost: ShowingHostType;
  customHostName?: string;
  customHostPhone?: string;
  showingDateTime: Date;
  templateId: string;
  emailSubject: string;
  emailContent: string;
}

interface SendHousingOfferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipientCount: number;
  housingAddress: string;
  onConfirm: (dispatch: HousingOfferDispatch) => void;
}

const offerTemplates = messageTemplates.filter((t) => t.category === "Uthyrning");

export function SendHousingOfferDialog({
  open,
  onOpenChange,
  recipientCount,
  housingAddress,
  onConfirm,
}: SendHousingOfferDialogProps) {
  const defaultDeadline = useMemo(() => addDays(new Date(), 5), []);
  const defaultShowing = useMemo(() => {
    const d = addDays(new Date(), 5);
    d.setHours(17, 0, 0, 0);
    return d;
  }, []);
  const defaultTemplate = offerTemplates[0];

  const [responseDeadline, setResponseDeadline] = useState<Date | undefined>(defaultDeadline);
  const [showingDateTime, setShowingDateTime] = useState<Date | undefined>(defaultShowing);
  const [showingHost, setShowingHost] = useState<ShowingHostType>("mimer");
  const [customHostName, setCustomHostName] = useState("");
  const [customHostPhone, setCustomHostPhone] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | undefined>(defaultTemplate);
  const [emailSubject, setEmailSubject] = useState(defaultTemplate?.emailSubject ?? "");
  const [emailContent, setEmailContent] = useState(defaultTemplate?.emailContent ?? "");

  const handleTemplateSelect = (template: MessageTemplate) => {
    setSelectedTemplate(template);
    setEmailSubject(template.emailSubject);
    setEmailContent(template.emailContent);
  };

  const isCustomHostValid = showingHost !== "custom" || customHostName.trim().length > 0;
  const canSubmit =
    responseDeadline &&
    showingDateTime &&
    selectedTemplate &&
    emailSubject.trim().length > 0 &&
    emailContent.trim().length > 0 &&
    isCustomHostValid;

  const handleSubmit = () => {
    if (!canSubmit || !responseDeadline || !showingDateTime || !selectedTemplate) return;
    onConfirm({
      responseDeadline,
      showingHost,
      customHostName: showingHost === "custom" ? customHostName.trim() : undefined,
      customHostPhone: showingHost === "custom" ? customHostPhone.trim() : undefined,
      showingDateTime,
      templateId: selectedTemplate.id,
      emailSubject,
      emailContent,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl flex flex-col max-h-[90vh] p-0 gap-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle>Skicka erbjudande</DialogTitle>
          <DialogDescription>
            Erbjudande till {recipientCount} {recipientCount === 1 ? "sökande" : "sökande"} för {housingAddress}.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Sista svarsdatum</Label>
              <DatePicker
                value={responseDeadline}
                onChange={setResponseDeadline}
                placeholder="Välj svarsdatum"
                locale={sv}
                dateFormat="yyyy-MM-dd"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Visningsvärd</Label>
              <Select value={showingHost} onValueChange={(v) => setShowingHost(v as ShowingHostType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mimer">Mimer</SelectItem>
                  <SelectItem value="tenant">Befintlig hyresgäst</SelectItem>
                  <SelectItem value="custom">Egen kontakt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Datum och tid för visning</Label>
            <div className="flex gap-2">
              <div className="flex-1 min-w-0">
                <DatePicker
                  value={showingDateTime}
                  onChange={(date) => {
                    if (!date) {
                      setShowingDateTime(undefined);
                      return;
                    }
                    const next = new Date(date);
                    const base = showingDateTime ?? defaultShowing;
                    next.setHours(base.getHours(), base.getMinutes(), 0, 0);
                    setShowingDateTime(next);
                  }}
                  placeholder="Välj datum"
                  locale={sv}
                  dateFormat="yyyy-MM-dd"
                />
              </div>
              <Select
                value={showingDateTime ? String(showingDateTime.getHours()).padStart(2, "0") : undefined}
                onValueChange={(v) => {
                  const next = new Date(showingDateTime ?? defaultShowing);
                  next.setHours(parseInt(v, 10));
                  setShowingDateTime(next);
                }}
              >
                <SelectTrigger className="w-[88px]">
                  <SelectValue placeholder="tt" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0")).map((h) => (
                    <SelectItem key={h} value={h}>{h}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={showingDateTime ? String(showingDateTime.getMinutes()).padStart(2, "0") : undefined}
                onValueChange={(v) => {
                  const next = new Date(showingDateTime ?? defaultShowing);
                  next.setMinutes(parseInt(v, 10));
                  setShowingDateTime(next);
                }}
              >
                <SelectTrigger className="w-[88px]">
                  <SelectValue placeholder="mm" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0")).map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {showingHost === "custom" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="custom-host-name" className="text-sm font-normal">
                  Namn på visningsvärd
                </Label>
                <Input
                  id="custom-host-name"
                  value={customHostName}
                  onChange={(e) => setCustomHostName(e.target.value)}
                  placeholder="För- och efternamn"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="custom-host-phone" className="text-sm font-normal">
                  Telefon
                </Label>
                <Input
                  id="custom-host-phone"
                  value={customHostPhone}
                  onChange={(e) => setCustomHostPhone(e.target.value)}
                  placeholder="070-123 45 67"
                />
              </div>
            </div>
          )}

          <Separator />

          <div className="space-y-3">
            <Label>E-postmall</Label>
            <TemplateSelector
              templates={offerTemplates}
              onSelect={handleTemplateSelect}
              type="email"
            />

            <div className="flex flex-col gap-2 pt-2">
              <Label htmlFor="email-subject" className="text-sm font-normal">
                Ämne
              </Label>
              <Input
                id="email-subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email-content" className="text-sm font-normal">
                Meddelande
              </Label>
              <Textarea
                id="email-content"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="min-h-[180px] resize-y"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 pt-4 border-t bg-background">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Avbryt
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            Skicka erbjudande
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
