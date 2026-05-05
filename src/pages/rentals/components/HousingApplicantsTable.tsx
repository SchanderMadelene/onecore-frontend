import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CompactProfileForm } from "@/features/rentals/components/residence-profile/CompactProfileForm";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight, MoreHorizontal, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import type { HousingApplicant } from "@/features/rentals/hooks/useHousingListing";

type OfferResponseStatus = "Accepterat" | "Nekat" | "Väntar på svar";


interface HousingApplicantsTableProps {
  applicants: HousingApplicant[];
  housingAddress: string;
  listingId: string;
  showOfferColumns?: boolean;
  showSelectionColumn?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  offeredApplicantIds?: number[];
  /** Kontrakt-läge: dölj kolumnerna "Erbjudande" och "Visning bokad" */
  contractMode?: boolean;
  /** Förvälj sökande automatiskt enligt smart logik */
  autoSelectTopApplicants?: boolean;
  /** Antal som ska förväljas (default 10 för omgång 1, 5 för senare) */
  autoSelectCount?: number;
  /** Sökande som redan tackat nej i tidigare omgångar – exkluderas från smart förval */
  declinedInPreviousRoundIds?: number[];
  /** Sökande som har aktivt erbjudande i annan parallell omgång – exkluderas från smart förval */
  activeRoundApplicantIds?: number[];
  /** Sökande som var med i tidigare omgångar (men inte denna) – dimmas */
  previousRoundApplicantIds?: number[];
  /** Historik-läge: read-only, ingen selection, markera vinnaren */
  historyMode?: boolean;
  /** Namnet på den sökande som tilldelades kontraktet (historik) */
  contractWinnerName?: string;
  /** Kontrakt-läge: id på sökande där kontrakt redan kopplats */
  linkedContractApplicantId?: number;
  /** Kontrakt-läge: id på rekommenderad sökande (högst köpoäng + godkänd) */
  recommendedApplicantId?: number;
  /** Kontrakt-läge: callback för att koppla kontrakt till sökande */
  onLinkContract?: (applicantId: number) => void;
  /** Kontrakt-läge: callback för att ta bort kopplat kontrakt */
  onUnlinkContract?: () => void;
}

export function HousingApplicantsTable({ 
  applicants, 
  housingAddress, 
  listingId, 
  showOfferColumns = false,
  showSelectionColumn = true,
  onSelectionChange,
  offeredApplicantIds = [],
  contractMode = false,
  autoSelectTopApplicants = false,
  autoSelectCount = 10,
  declinedInPreviousRoundIds = [],
  activeRoundApplicantIds = [],
  previousRoundApplicantIds = [],
  historyMode = false,
  contractWinnerName,
  linkedContractApplicantId,
  recommendedApplicantId,
  onLinkContract,
  onUnlinkContract,
}: HousingApplicantsTableProps) {
  const [selectedApplicants, setSelectedApplicants] = useState<Set<string>>(new Set());
  const [expandedApplicant, setExpandedApplicant] = useState<string | null>(null);
  const [responseOverrides, setResponseOverrides] = useState<Record<number, OfferResponseStatus>>({});
  const hasInitializedSelection = useRef(false);

  const handleManualResponse = (applicant: HousingApplicant, status: OfferResponseStatus) => {
    setResponseOverrides(prev => ({ ...prev, [applicant.id]: status }));
    toast.success(
      status === "Accepterat"
        ? `${applicant.name} har tackat ja`
        : `${applicant.name} har tackat nej`
    );
  };

  // Smart förval: filtrera bort icke-valbara, sortera efter köpoäng, ta top N.
  useEffect(() => {
    if (hasInitializedSelection.current) return;
    if (!showSelectionColumn || !autoSelectTopApplicants) {
      hasInitializedSelection.current = true;
      return;
    }
    if (applicants.length === 0) return;

    const eligible = applicants
      .filter(a => !offeredApplicantIds.includes(a.id))
      .filter(a => !declinedInPreviousRoundIds.includes(a.id))
      .filter(a => !activeRoundApplicantIds.includes(a.id))
      .slice()
      .sort((a, b) => b.queuePoints - a.queuePoints)
      .slice(0, autoSelectCount)
      .map(a => String(a.id));

    if (eligible.length === 0) {
      hasInitializedSelection.current = true;
      return;
    }

    const initial = new Set(eligible);
    setSelectedApplicants(initial);
    onSelectionChange?.(Array.from(initial));
    hasInitializedSelection.current = true;
  }, [applicants, offeredApplicantIds, showSelectionColumn, autoSelectTopApplicants, autoSelectCount, declinedInPreviousRoundIds, activeRoundApplicantIds, onSelectionChange]);


  const handleApplicantSelection = (applicantId: string, checked: boolean) => {
    const newSelected = new Set(selectedApplicants);
    if (checked) {
      newSelected.add(applicantId);
    } else {
      newSelected.delete(applicantId);
    }
    setSelectedApplicants(newSelected);
    onSelectionChange?.(Array.from(newSelected));
  };


  const handleToggleExpand = (applicant: HousingApplicant) => {
    const applicantId = String(applicant.id);
    if (expandedApplicant === applicantId) {
      setExpandedApplicant(null);
    } else {
      setExpandedApplicant(applicantId);
    }
  };

  const formatLeaseStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      "Current": "Gällande",
      "Upcoming": "Kommande", 
      "AboutToEnd": "Uppsagt",
      "Ended": "Upphört"
    };
    return statusMap[status] || status;
  };

  const formatApplicantStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      "Active": "Aktiv",
      "Offered": "Erbjuden bostad",
      "OfferAccepted": "Erbjudande accepterat",
      "OfferDeclined": "Erbjudande nekat",
      "Assigned": "Tilldelad"
    };
    return statusMap[status] || status;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Current":
      case "Gällande":
        return <Badge variant="success">Gällande</Badge>;
      case "Upcoming":
      case "Kommande":
        return <Badge variant="info">Kommande</Badge>;
      case "AboutToEnd":
      case "Uppsagt":
        return <Badge variant="destructive">Uppsagt</Badge>;
      default:
        return <Badge variant="outline">{formatLeaseStatus(status)}</Badge>;
    }
  };

  const getProfileStatusBadge = (status: "Approved" | "PartiallyApproved" | "NotApproved") => {
    switch (status) {
      case "Approved":
        return <Badge variant="success">Godkänd</Badge>;
      case "PartiallyApproved":
        return <Badge variant="warning">Delvis godkänd</Badge>;
      case "NotApproved":
        return <Badge variant="destructive">Ej godkänd</Badge>;
      default:
        return <Badge variant="outline">Okänd</Badge>;
    }
  };

  const getHousingReferenceBadge = (status: "Godkänd" | "Ej godkänd" | "Kontaktad - ej svar" | "Referens krävs ej" | "Ej behandlad") => {
    switch (status) {
      case "Godkänd":
        return <Badge variant="success">Godkänd</Badge>;
      case "Ej godkänd":
        return <Badge variant="destructive">Ej godkänd</Badge>;
      case "Kontaktad - ej svar":
        return <Badge variant="warning">Kontaktad - ej svar</Badge>;
      case "Referens krävs ej":
        return <Badge variant="success">Referens krävs ej</Badge>;
      case "Ej behandlad":
        return <Badge variant="muted">Ej behandlad</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };


  const getCreditReportBadge = (status: "Godkänd/låg risk" | "Förhöjd risk" | "Hög risk" | "Ingen uppgift tillgänglig" | "-") => {
    switch (status) {
      case "Godkänd/låg risk":
        return <Badge variant="success">Godkänd/låg risk</Badge>;
      case "Förhöjd risk":
        return <Badge variant="warning">Förhöjd risk</Badge>;
      case "Hög risk":
        return <Badge variant="warning">Hög risk</Badge>;
      case "Ingen uppgift tillgänglig":
        return <Badge variant="muted">Ingen uppgift tillgänglig</Badge>;
      case "-":
        return null;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentHistoryBadge = (status: "Inga anmärkningar" | "Behöver kontrolleras" | "-") => {
    switch (status) {
      case "Inga anmärkningar":
        return <Badge variant="success">Inga anm.</Badge>;
      case "Behöver kontrolleras":
        return <Badge variant="warning">Behöver kontroll</Badge>;
      case "-":
        return null;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };


  const getViewingBookedBadge = (status: "Ja" | "Nej" | "Väntar på svar") => {
    switch (status) {
      case "Ja":
        return <Badge variant="success">Bokad</Badge>;
      case "Nej":
      case "Väntar på svar":
        return <Badge variant="muted">Inget svar</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getOfferStatusBadge = (applicantId: number) => {
    if (offeredApplicantIds.includes(applicantId)) {
      return <Badge variant="info">Skickat</Badge>;
    }
    return <Badge variant="muted">Ej skickat</Badge>;
  };

  const getOfferResponseBadge = (status: "Accepterat" | "Nekat" | "Väntar på svar") => {
    switch (status) {
      case "Accepterat":
        return <Badge variant="success">Ja</Badge>;
      case "Nekat":
        return <Badge variant="destructive">Nej</Badge>;
      case "Väntar på svar":
        return <Badge variant="warning">Väntar</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };


  return (
    <>
      <div className="border rounded-lg overflow-hidden bg-card">
        <Table className={contractMode ? "table-fixed" : undefined}>
        <TableHeader>
          <TableRow className={contractMode ? "bg-secondary/50" : undefined}>
            {!historyMode && !contractMode && <TableHead className="w-12">Val</TableHead>}
            <TableHead className="w-12 whitespace-nowrap">Plats</TableHead>
            <TableHead className="whitespace-nowrap">Namn</TableHead>
            <TableHead className="whitespace-nowrap">Kundnummer</TableHead>
            <TableHead className="whitespace-nowrap">Köpoäng</TableHead>
            <TableHead className="whitespace-nowrap">Anmälan</TableHead>
            <TableHead className="whitespace-nowrap">Boendereferens</TableHead>
            <TableHead className="whitespace-nowrap">Kreditupplysning</TableHead>
            <TableHead className="whitespace-nowrap">Betalningshistorik</TableHead>
            {!contractMode && !showSelectionColumn && !historyMode && <TableHead className="whitespace-nowrap">Erbjudande</TableHead>}
            {!showSelectionColumn && !contractMode && !historyMode && <TableHead className="whitespace-nowrap">Visning bokad</TableHead>}
            {!showSelectionColumn && !historyMode && !contractMode && <TableHead className="whitespace-nowrap">Svar på erbjudande</TableHead>}
            {historyMode && <TableHead className="whitespace-nowrap">Svar på erbjudande</TableHead>}
            {contractMode && <TableHead className="whitespace-nowrap">Svar på erbjudande</TableHead>}
            {contractMode && <TableHead className="w-[180px] whitespace-nowrap text-right">Kontrakt</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {(() => {
            const historyOfferedIds = new Set(
              historyMode
                ? applicants.slice().sort((a, b) => b.queuePoints - a.queuePoints).slice(0, 10).map(a => a.id)
                : []
            );
            return applicants.length > 0 ? applicants
            .slice()
            .sort((a, b) => {
              if (historyMode && contractWinnerName) {
                if (a.name === contractWinnerName) return -1;
                if (b.name === contractWinnerName) return 1;
              }
              return b.queuePoints - a.queuePoints;
            })
            .map((applicant, index) => {
              const isWinner = historyMode && contractWinnerName && applicant.name === contractWinnerName;
              const wasOffered = historyOfferedIds.has(applicant.id);
              const isLinked = contractMode && linkedContractApplicantId === applicant.id;
              const isRecommended = contractMode && !linkedContractApplicantId && recommendedApplicantId === applicant.id;
              const isOfferedThisRound = offeredApplicantIds.includes(applicant.id);
              const isPreviousOnly = !isOfferedThisRound && previousRoundApplicantIds.includes(applicant.id);
              const rowClass = [isWinner || isLinked ? "bg-success/5" : "", isPreviousOnly ? "opacity-50" : ""].filter(Boolean).join(" ") || undefined;
              return (
              <>
                <TableRow key={applicant.id} className={rowClass}>
                  {!historyMode && !contractMode && (
                    <TableCell className="py-3">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedApplicants.has(String(applicant.id))}
                          onCheckedChange={(checked) =>
                            handleApplicantSelection(String(applicant.id), checked as boolean)
                          }
                          className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                      </div>
                    </TableCell>
                  )}
                  <TableCell className="font-medium tabular-nums text-muted-foreground">{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleExpand(applicant)}
                        className="p-1 h-auto"
                      >
                        {expandedApplicant === String(applicant.id) ?
                          <ChevronDown className="h-4 w-4" /> :
                          <ChevronRight className="h-4 w-4" />
                        }
                      </Button>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium">{applicant.name}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(`/tenants/detail/${applicant.nationalRegistrationNumber}`, "_blank");
                            }}
                            title="Öppna kundkort"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">{applicant.nationalRegistrationNumber}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{applicant.contactCode}</TableCell>
                  <TableCell>{applicant.queuePoints}</TableCell>
                  <TableCell>{new Date(applicant.applicationDate).toLocaleDateString('sv-SE')}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div>{getHousingReferenceBadge(applicant.housingReference.status)}</div>
                      {applicant.housingReference.date && (
                        <div className="text-xs text-muted-foreground">
                          {applicant.housingReference.date}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div>
                        <Badge variant={applicant.creditReport.status === "Godkänd/låg risk" ? "success" : "warning"}>
                          {applicant.creditReport.status === "Godkänd/låg risk" ? "Inga anm." : "Anmärkningar"}
                        </Badge>
                      </div>
                      {applicant.creditReport.date && (
                        <div className="text-xs text-muted-foreground">
                          {applicant.creditReport.date}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div>{getPaymentHistoryBadge(applicant.paymentHistory.status)}</div>
                      {applicant.paymentHistory.date && (
                        <div className="text-xs text-muted-foreground">
                          {applicant.paymentHistory.date}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  {!contractMode && !showSelectionColumn && !historyMode && (
                    <TableCell>
                      {getOfferStatusBadge(applicant.id)}
                    </TableCell>
                  )}
                  {!showSelectionColumn && !contractMode && !historyMode && applicant.viewingBooked && (
                    <TableCell>
                      {offeredApplicantIds.includes(applicant.id)
                        ? getViewingBookedBadge(applicant.viewingBooked.status)
                        : <span className="text-sm text-muted-foreground">—</span>}
                    </TableCell>
                  )}
                  {!showSelectionColumn && !historyMode && !contractMode && applicant.offerResponse && (() => {
                    const hasOffer = offeredApplicantIds.includes(applicant.id);
                    if (!hasOffer) {
                      return (
                        <TableCell>
                          <span className="text-sm text-muted-foreground">—</span>
                        </TableCell>
                      );
                    }
                    const currentStatus = responseOverrides[applicant.id] ?? applicant.offerResponse.status;
                    const isOverridden = responseOverrides[applicant.id] !== undefined;
                    const dateLabel = isOverridden
                      ? new Date().toLocaleDateString('sv-SE')
                      : applicant.offerResponse.date;
                    return (
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="space-y-1">
                            <div>{getOfferResponseBadge(currentStatus)}</div>
                            {dateLabel && (
                              <div className="text-xs text-muted-foreground">
                                {dateLabel}
                                {isOverridden && " · manuellt"}
                              </div>
                            )}
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="icon" className="h-8 w-8 ml-auto">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleManualResponse(applicant, "Accepterat")}
                                disabled={currentStatus === "Accepterat"}
                              >
                                Tacka ja
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleManualResponse(applicant, "Nekat")}
                                disabled={currentStatus === "Nekat"}
                              >
                                Tacka nej
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    );
                  })()}
                  {historyMode && (
                    <TableCell>
                      {isWinner ? (
                        <Badge variant="success">Tackat ja — tilldelad</Badge>
                      ) : wasOffered ? (
                        // Deterministisk fördelning: ~40% tackar ja (men ej tilldelade),
                        // ~40% tackar nej, ~20% inget svar.
                        (() => {
                          const bucket = applicant.id % 5;
                          if (bucket === 0 || bucket === 1) return <Badge variant="success">Tackat ja</Badge>;
                          if (bucket === 2 || bucket === 3) return <Badge variant="destructive">Tackat nej</Badge>;
                          return <Badge variant="muted">Inget svar</Badge>;
                        })()
                      ) : (
                        <span className="text-sm text-muted-foreground">Inget erbjudande</span>
                      )}
                    </TableCell>
                  )}
                  {contractMode && (() => {
                    const bucket = applicant.id % 5;
                    const hasAccepted = bucket === 0 || bucket === 1;
                    const responseBadge = hasAccepted
                      ? <Badge variant="success">Ja</Badge>
                      : (bucket === 2 || bucket === 3)
                        ? <Badge variant="destructive">Nej</Badge>
                        : <Badge variant="muted">Inget svar</Badge>;
                    return (
                      <>
                        <TableCell>{responseBadge}</TableCell>
                        <TableCell className="text-right">
                          {isLinked ? (
                            <div className="flex items-center justify-end gap-2">
                              <Badge variant="success">Kontrakt kopplat</Badge>
                              {onUnlinkContract && (
                                <Button variant="ghost" size="sm" onClick={onUnlinkContract}>
                                  Ta bort
                                </Button>
                              )}
                            </div>
                          ) : linkedContractApplicantId ? (
                            <span className="text-sm text-muted-foreground">—</span>
                          ) : hasAccepted ? (
                            <Button
                              variant={isRecommended ? "default" : "outline"}
                              size="sm"
                              onClick={() => onLinkContract?.(applicant.id)}
                            >
                              Koppla kontrakt
                            </Button>
                          ) : (
                            <span className="text-sm text-muted-foreground">—</span>
                          )}
                        </TableCell>
                      </>
                    );
                  })()}
                </TableRow>
                {expandedApplicant === String(applicant.id) && (
                  <TableRow>
                    <TableCell colSpan={12} className="p-0">
                      <div className="border-t">
                        <CompactProfileForm applicantId={String(applicant.id)} />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
              );
            }) : (
              <TableRow>
                <TableCell colSpan={12} className="text-center py-8 text-muted-foreground">
                  Inga intresseanmälningar än
                </TableCell>
              </TableRow>
            );
          })()}
        </TableBody>
      </Table>
    </div>
  </>
  );
}