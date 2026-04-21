import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CompactProfileForm } from "@/features/rentals/components/residence-profile/CompactProfileForm";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { HousingApplicant } from "@/features/rentals/hooks/useHousingListing";


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
  /** Förvälj de 10 översta sökandena (används endast i "Klara för erbjudande"-läge) */
  autoSelectTopApplicants?: boolean;
  /** Historik-läge: read-only, ingen selection, markera vinnaren */
  historyMode?: boolean;
  /** Namnet på den sökande som tilldelades kontraktet (historik) */
  contractWinnerName?: string;
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
  historyMode = false,
  contractWinnerName,
}: HousingApplicantsTableProps) {
  const [selectedApplicants, setSelectedApplicants] = useState<Set<string>>(new Set());
  const [expandedApplicant, setExpandedApplicant] = useState<string | null>(null);
  const hasInitializedSelection = useRef(false);

  // Förvalja endast i läget "Klara för erbjudande" (autoSelectTopApplicants).
  // På publicerade annonser börjar checkboxarna tomma.
  useEffect(() => {
    if (hasInitializedSelection.current) return;
    if (!showSelectionColumn || !autoSelectTopApplicants) {
      hasInitializedSelection.current = true;
      return;
    }
    if (applicants.length === 0) return;

    const eligible = applicants
      .filter(a => !offeredApplicantIds.includes(a.id))
      .slice(0, 10)
      .map(a => String(a.id));

    if (eligible.length === 0) return;

    const initial = new Set(eligible);
    setSelectedApplicants(initial);
    onSelectionChange?.(Array.from(initial));
    hasInitializedSelection.current = true;
  }, [applicants, offeredApplicantIds, showSelectionColumn, autoSelectTopApplicants, onSelectionChange]);

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
        return <Badge variant="success">Inga anmärkningar</Badge>;
      case "Behöver kontrolleras":
        return <Badge variant="warning">Behöver kontrolleras</Badge>;
      case "-":
        return null;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };


  const getViewingBookedBadge = (status: "Ja" | "Nej" | "Väntar på svar") => {
    switch (status) {
      case "Ja":
        return <Badge variant="success">Ja</Badge>;
      case "Nej":
        return <Badge variant="destructive">Nej</Badge>;
      case "Väntar på svar":
        return <Badge variant="warning">Väntar på svar</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getOfferStatusBadge = (applicantId: number) => {
    if (offeredApplicantIds.includes(applicantId)) {
      return <Badge variant="info">Erbjudande skickat</Badge>;
    }
    return <Badge variant="muted">Inget erbjudande</Badge>;
  };

  const getOfferResponseBadge = (status: "Accepterat" | "Nekat" | "Väntar på svar") => {
    switch (status) {
      case "Accepterat":
        return <Badge variant="success">Ja</Badge>;
      case "Nekat":
        return <Badge variant="destructive">Nej</Badge>;
      case "Väntar på svar":
        return <Badge variant="warning">Väntar på svar</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };


  return (
    <>
      <div className="border rounded-lg overflow-hidden bg-card">
        <Table>
        <TableHeader>
          <TableRow>
            {!historyMode && <TableHead className="w-12">Val</TableHead>}
            <TableHead className="whitespace-nowrap">Namn</TableHead>
            <TableHead className="whitespace-nowrap">Kundnummer</TableHead>
            <TableHead className="whitespace-nowrap">Köpoäng</TableHead>
            <TableHead className="whitespace-nowrap">Anmälan</TableHead>
            <TableHead className="whitespace-nowrap">Boendereferens</TableHead>
            <TableHead className="whitespace-nowrap">Kreditupplysning</TableHead>
            <TableHead className="whitespace-nowrap">Betalningshistorik</TableHead>
            {!contractMode && !showSelectionColumn && !historyMode && <TableHead className="whitespace-nowrap">Erbjudande</TableHead>}
            {!showSelectionColumn && !contractMode && !historyMode && <TableHead className="whitespace-nowrap">Visning bokad</TableHead>}
            {!showSelectionColumn && !historyMode && <TableHead className="whitespace-nowrap">Svar på erbjudande</TableHead>}
            {historyMode && <TableHead className="whitespace-nowrap">Svar på erbjudande</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.length > 0 ? applicants
            .slice()
            .sort((a, b) => {
              if (historyMode && contractWinnerName) {
                if (a.name === contractWinnerName) return -1;
                if (b.name === contractWinnerName) return 1;
              }
              return b.queuePoints - a.queuePoints;
            })
            .map((applicant) => {
              const isWinner = historyMode && contractWinnerName && applicant.name === contractWinnerName;
              return (
              <>
                <TableRow key={applicant.id} className={isWinner ? "bg-success/5" : undefined}>
                  {!historyMode && (
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
                        <div className="font-medium">{applicant.name}</div>
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
                          {applicant.creditReport.status === "Godkänd/låg risk" ? "Inga anmärkningar" : "Anmärkningar"}
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
                      <div className="space-y-1">
                        <div>{getViewingBookedBadge(applicant.viewingBooked.status)}</div>
                        {applicant.viewingBooked.date && (
                          <div className="text-xs text-muted-foreground">
                            {applicant.viewingBooked.date}
                          </div>
                        )}
                      </div>
                    </TableCell>
                  )}
                  {!showSelectionColumn && !historyMode && applicant.offerResponse && (
                    <TableCell>
                      <div className="space-y-1">
                        <div>{getOfferResponseBadge(applicant.offerResponse.status)}</div>
                        {applicant.offerResponse.date && (
                          <div className="text-xs text-muted-foreground">
                            {applicant.offerResponse.date}
                          </div>
                        )}
                      </div>
                    </TableCell>
                  )}
                  {historyMode && (
                    <TableCell>
                      {isWinner ? (
                        <Badge variant="success">Tilldelad kontrakt</Badge>
                      ) : (
                        <span className="text-sm text-muted-foreground">Ej tilldelad</span>
                      )}
                    </TableCell>
                  )}
                </TableRow>
                {expandedApplicant === String(applicant.id) && (
                  <TableRow>
                    <TableCell colSpan={11} className="p-0">
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
                <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">
                  Inga intresseanmälningar än
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
    </div>
  </>
  );
}