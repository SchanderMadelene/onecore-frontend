import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/shared/common";
import { sv } from "date-fns/locale";
import { format, formatDistanceToNowStrict } from "date-fns";
import type { HousingOfferRound } from "@/contexts/HousingOffersContext";

interface RoundSummaryBarProps {
  round: HousingOfferRound;
  onCancel?: () => void;
  acceptedApplicantName?: string;
}

function statusBadge(round: HousingOfferRound, hasAccepted: boolean, allDeclined: boolean) {
  if (round.status === 'Accepted' || hasAccepted) return <Badge variant="success">Accepterad</Badge>;
  if (round.status === 'Cancelled') return <Badge variant="muted">Avbruten</Badge>;
  if (allDeclined) return <Badge variant="warning">Alla nekade</Badge>;
  return <Badge variant="info">Pågår</Badge>;
}

export function RoundSummaryBar({ round, onCancel, onEditOffer, acceptedApplicantName }: RoundSummaryBarProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const accepted = round.responses.filter(r => r.response === 'accepted').length;
  const declined = round.responses.filter(r => r.response === 'declined').length;
  const total = round.selectedApplicants.length;
  const waiting = Math.max(0, total - accepted - declined);

  const hasAccepted = accepted > 0;
  const allDeclined = total > 0 && declined >= total;
  const isActive = round.status === 'Active' && !hasAccepted;

  return (
    <>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border bg-muted/30 px-4 py-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Omgång {round.roundNumber}</span>
          {statusBadge(round, hasAccepted, allDeclined)}
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>
            Skickat {format(new Date(round.sentAt), "d MMM", { locale: sv })}
            {" · "}
            {formatDistanceToNowStrict(new Date(round.sentAt), { locale: sv, addSuffix: true })}
          </span>
          {round.expiresAt && (
            <span>
              Sista svar {format(new Date(round.expiresAt), "d MMM", { locale: sv })}
            </span>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          <span className="text-success font-medium">{accepted} ja</span>
          {" · "}
          <span className="text-destructive font-medium">{declined} nej</span>
          {" · "}
          <span>{waiting} väntar</span>
        </div>

        {hasAccepted && acceptedApplicantName && (
          <div className="text-xs text-success">
            Tilldelas: <strong>{acceptedApplicantName}</strong>
          </div>
        )}

        {isActive && (onCancel || onEditOffer) && (
          <div className="ml-auto flex items-center gap-2">
            {onEditOffer && (
              <Button variant="outline" size="sm" onClick={onEditOffer}>
                Ändra/uppdatera erbjudande
              </Button>
            )}
            {onCancel && (
              <Button variant="outline" size="sm" onClick={() => setConfirmOpen(true)}>
                Avbryt denna omgång
              </Button>
            )}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={`Avbryt omgång ${round.roundNumber}?`}
        description="Omgången markeras som avbruten. Andra parallella omgångar påverkas inte."
        confirmLabel="Avbryt omgången"
        variant="destructive"
        onConfirm={() => {
          onCancel?.();
          setConfirmOpen(false);
        }}
      />
    </>
  );
}
