import { formatDistanceToNow, format, isPast } from "date-fns";
import { sv } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock, Ban, AlertCircle, CalendarDays } from "lucide-react";
import type { HousingOfferRound } from "@/shared/contexts/HousingOffersContext";

interface RoundSummaryBarProps {
  round: HousingOfferRound;
  /** Namn på sökande som tackat ja (för Accepted-omgång) */
  acceptedApplicantName?: string;
  /** Höger-slot för actions (t.ex. "Avbryt denna omgång") */
  actions?: React.ReactNode;
}

export function RoundSummaryBar({ round, acceptedApplicantName, actions }: RoundSummaryBarProps) {
  const total = round.selectedApplicants.length;
  const accepted = round.responses.filter(r => r.response === "accepted").length;
  const declined = round.responses.filter(r => r.response === "declined").length;
  const waiting = Math.max(0, total - accepted - declined);

  const sentAt = new Date(round.sentAt);
  const expiresAt = new Date(round.expiresAt);
  const expired = isPast(expiresAt);

  const statusBlock = (() => {
    switch (round.status) {
      case "Accepted":
        return (
          <Badge variant="success" className="gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Accepterad{acceptedApplicantName ? ` av ${acceptedApplicantName}` : ""}
          </Badge>
        );
      case "Cancelled":
        return (
          <Badge variant="muted" className="gap-1">
            <Ban className="h-3 w-3" />
            Avbruten
          </Badge>
        );
      case "Expired":
        return (
          <Badge variant="muted" className="gap-1">
            <AlertCircle className="h-3 w-3" />
            Utgången
          </Badge>
        );
      case "AllDeclined":
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            Alla nekade
          </Badge>
        );
      case "Active":
      default:
        return (
          <Badge variant={expired ? "warning" : "info"} className="gap-1">
            <Clock className="h-3 w-3" />
            {expired ? "Svarstid har gått ut" : "Pågår"}
          </Badge>
        );
    }
  })();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-muted/30 px-4 py-3 mb-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        {statusBlock}

        <div className="flex items-center gap-1.5 text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>
            Skickat {format(sentAt, "d MMM", { locale: sv })}
          </span>
          {round.status === "Active" && (
            <>
              <span className="text-muted-foreground/60">·</span>
              <span>
                {expired
                  ? `Gick ut ${formatDistanceToNow(expiresAt, { locale: sv, addSuffix: true })}`
                  : `Går ut ${format(expiresAt, "d MMM", { locale: sv })} (${formatDistanceToNow(expiresAt, { locale: sv, addSuffix: true })})`}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">{total} sökande</span>
          <span className="text-muted-foreground/60">·</span>
          <span className="inline-flex items-center gap-1 text-success">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {accepted} ja
          </span>
          <span className="inline-flex items-center gap-1 text-destructive">
            <XCircle className="h-3.5 w-3.5" />
            {declined} nej
          </span>
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {waiting} väntar
          </span>
        </div>
      </div>

      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
