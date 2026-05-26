import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Phone, MessageSquare, Mail, Users, FileText } from "lucide-react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import {
  CommunicationType,
  PoangfriInterest,
  POANGFRI_INTEREST_STATUS_LABELS,
  POANGFRI_INTEREST_STATUS_VARIANTS,
  COMMUNICATION_TYPE_LABELS,
} from "@/features/rentals/types/poangfri";

interface PoangfriInterestSheetProps {
  interest: PoangfriInterest | null;
  rank: number | null;
  onOpenChange: (open: boolean) => void;
  onLogContact: () => void;
  onCreateContract: () => void;
  onMarkAccepted: () => void;
  onMarkDeclined: () => void;
}

const TYPE_ICONS: Record<CommunicationType, React.ComponentType<{ className?: string }>> = {
  phone: Phone,
  sms: MessageSquare,
  email: Mail,
  meeting: Users,
  note: FileText,
};

const formatDateTime = (iso: string) => {
  try {
    return format(new Date(iso), "d MMM yyyy 'kl.' HH:mm", { locale: sv });
  } catch {
    return iso;
  }
};

export function PoangfriInterestSheet({
  interest,
  rank,
  onOpenChange,
  onLogContact,
  onCreateContract,
  onMarkAccepted,
  onMarkDeclined,
}: PoangfriInterestSheetProps) {
  if (!interest) return null;

  const sorted = [...interest.communications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Sheet open={!!interest} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center gap-2 mb-1">
            {rank !== null && (
              <span className="text-xs font-medium text-muted-foreground">
                Plats {rank}
              </span>
            )}
            <Badge variant={POANGFRI_INTEREST_STATUS_VARIANTS[interest.status]}>
              {POANGFRI_INTEREST_STATUS_LABELS[interest.status]}
            </Badge>
          </div>
          <SheetTitle className="text-left">{interest.name}</SheetTitle>
          <div className="text-sm text-muted-foreground space-y-0.5 text-left">
            <div>{interest.customerNumber}</div>
            <div>{interest.phone}</div>
            <div>{interest.email}</div>
            <div className="pt-1">
              Anmäld {formatDateTime(interest.registeredAt)}
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="flex flex-col gap-2 mb-6">
            <Button onClick={onLogContact} variant="outline">
              Logga kontakt
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={onMarkAccepted}
                variant="outline"
                disabled={interest.status === "accepted"}
              >
                Tackat ja
              </Button>
              <Button
                onClick={onMarkDeclined}
                variant="outline"
                disabled={interest.status === "declined"}
              >
                Tackat nej
              </Button>
            </div>
            <Button onClick={onCreateContract}>Skapa kontrakt</Button>
          </div>

          <Separator className="mb-4" />

          <h4 className="text-sm font-semibold mb-3">Kommunikationshistorik</h4>
          {sorted.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Ingen kommunikation loggad ännu.
            </p>
          ) : (
            <ol className="relative border-l border-border pl-4 space-y-4">
              {sorted.map((c) => {
                const Icon = TYPE_ICONS[c.type];
                return (
                  <li key={c.id} className="relative">
                    <span className="absolute -left-[22px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-background border border-border">
                      <Icon className="h-2.5 w-2.5 text-muted-foreground" />
                    </span>
                    <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {COMMUNICATION_TYPE_LABELS[c.type]}
                      </span>
                      <span>{formatDateTime(c.date)}</span>
                    </div>
                    <p className="text-sm mt-1">{c.summary}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {c.author}
                    </p>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
