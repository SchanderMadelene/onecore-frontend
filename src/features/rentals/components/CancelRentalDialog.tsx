import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { getMockApplicantsForParking } from "../data/mockParkingApplicants";

export type CancelRentalKind = "parking" | "housing";

interface CancelRentalSubject {
  id: string;
  address: string;
  seekers: number;
}

interface CancelRentalDialogProps {
  subject: CancelRentalSubject;
  kind?: CancelRentalKind;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancelled?: () => void;
}

type Channel = "sms" | "email" | "both";

const DEFAULT_SMS =
  "Hej {namn}! Vi har tyvärr behövt avbryta uthyrningen av bilplats {adress} (annons {annonsid}). Tack för din intresseanmälan. /Mimer";

const DEFAULT_EMAIL_SUBJECT = "Uthyrningen av bilplats {adress} har avbrutits";

const DEFAULT_EMAIL_BODY =
  "Hej {namn},\n\nVi vill informera dig om att uthyrningen av bilplats {adress} (annons {annonsid}) har avbrutits och annonsen är inte längre aktuell.\n\nTack för din intresseanmälan – du står kvar i kön för andra bilplatser.\n\nVänliga hälsningar,\nMimer";

function fillVariables(
  template: string,
  vars: { namn: string; adress: string; annonsid: string },
) {
  return template
    .replace(/\{namn\}/g, vars.namn)
    .replace(/\{adress\}/g, vars.adress)
    .replace(/\{annonsid\}/g, vars.annonsid);
}

export function CancelRentalDialog({
  subject,
  kind = "parking",
  open,
  onOpenChange,
  onCancelled,
}: CancelRentalDialogProps) {
  const noun = kind === "housing" ? "bostad" : "bilplats";

  const applicants = useMemo(
    () => getMockApplicantsForParking(subject.id, subject.seekers),
    [subject.id, subject.seekers],
  );

  const phoneCount = applicants.filter((a) => a.phone).length;
  const emailCount = applicants.filter((a) => a.email).length;

  const defaultSms = DEFAULT_SMS.replace("bilplats", noun);
  const defaultEmailSubject = DEFAULT_EMAIL_SUBJECT.replace("bilplats", noun);
  const defaultEmailBody = DEFAULT_EMAIL_BODY.replace("bilplats", noun);

  const [channel, setChannel] = useState<Channel>("sms");
  const [smsText, setSmsText] = useState(defaultSms);
  const [emailSubject, setEmailSubject] = useState(defaultEmailSubject);
  const [emailBody, setEmailBody] = useState(defaultEmailBody);
  const [pending, setPending] = useState(false);

  const previewVars = {
    namn: applicants[0]?.name ?? "Kund",
    adress: subject.address,
    annonsid: subject.id,
  };

  const recipientCount =
    channel === "sms" ? phoneCount : channel === "email" ? emailCount : applicants.length;

  const visibleNames = applicants.slice(0, 5).map((a) => a.name);
  const remaining = Math.max(0, applicants.length - visibleNames.length);

  const handleClose = () => {
    if (pending) return;
    onOpenChange(false);
  };

  const handleCancelOnly = async () => {
    setPending(true);
    await new Promise((r) => setTimeout(r, 500));
    toast({
      title: "Uthyrning avbruten",
      description: `${subject.address} – inga meddelanden skickades.`,
    });
    setPending(false);
    onOpenChange(false);
    onCancelled?.();
  };

  const handleCancelAndSend = async () => {
    setPending(true);
    await new Promise((r) => setTimeout(r, 700));
    toast({
      title: "Uthyrning avbruten",
      description: subject.address,
    });
    toast({
      title: `Meddelanden köade till ${recipientCount} sökande`,
      description:
        channel === "sms"
          ? "SMS skickas inom kort."
          : channel === "email"
          ? "E-post skickas inom kort."
          : "SMS och e-post skickas inom kort.",
    });
    setPending(false);
    onOpenChange(false);
    onCancelled?.();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col gap-0 p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle>Avbryt uthyrning</DialogTitle>
          <DialogDescription>
            Annonsen för {subject.address} har {applicants.length}{" "}
            {applicants.length === 1 ? "intresseanmälan" : "intresseanmälningar"}.
            Vi rekommenderar att du meddelar de sökande att uthyrningen avbryts.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-5">
          {/* Channel */}
          <div className="space-y-2">
            <Label>Skicka via</Label>
            <RadioGroup
              value={channel}
              onValueChange={(v) => setChannel(v as Channel)}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2"
            >
              {[
                { value: "sms", label: `SMS (${phoneCount})` },
                { value: "email", label: `E-post (${emailCount})` },
                { value: "both", label: "Båda" },
              ].map((opt) => {
                const selected = channel === opt.value;
                return (
                  <label
                    key={opt.value}
                    onClick={(e) => e.stopPropagation()}
                    className={`group flex items-center gap-2 rounded-md border p-3 cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground ${
                      selected ? "border-primary bg-primary/5" : ""
                    }`}
                  >
                    <RadioGroupItem
                      value={opt.value}
                      id={`ch-${opt.value}`}
                      className="group-hover:border-accent-foreground group-hover:text-accent-foreground"
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                );
              })}
            </RadioGroup>
          </div>

          {/* Message */}
          {(channel === "sms" || channel === "both") && (
            <div className="space-y-2">
              <Label htmlFor="sms-text">SMS-meddelande</Label>
              <Textarea
                id="sms-text"
                value={smsText}
                onChange={(e) => setSmsText(e.target.value)}
                rows={3}
              />
            </div>
          )}

          {(channel === "email" || channel === "both") && (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="email-subject">E-post – ämne</Label>
                <Input
                  id="email-subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-body">E-post – meddelande</Label>
                <Textarea
                  id="email-body"
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  rows={6}
                />
                <p className="text-xs text-muted-foreground whitespace-pre-line">
                  Förhandsgranskning ({fillVariables(emailSubject, previewVars)}):{"\n"}
                  {fillVariables(emailBody, previewVars)}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 p-4 border-t bg-background flex-wrap">
          <Button
            variant="ghost"
            onClick={handleCancelOnly}
            disabled={pending}
            className="text-muted-foreground"
          >
            Avbryt utan att meddela sökande
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleClose} disabled={pending}>
              Stäng
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancelAndSend}
              disabled={pending || recipientCount === 0}
            >
              {pending
                ? `Skickar till ${recipientCount} sökande...`
                : "Avbryt uthyrning och skicka"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
