import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import type { HousingApplicant } from "@/hooks/useHousingListing";

interface HousingApplicantsTableProps {
  applicants: HousingApplicant[];
  housingAddress: string;
  listingId: string;
  showOfferColumns?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
}

export function HousingApplicantsTable({ 
  applicants, 
  housingAddress, 
  listingId, 
  showOfferColumns = false,
  onSelectionChange 
}: HousingApplicantsTableProps) {
  const [selectedApplicants, setSelectedApplicants] = useState<Set<string>>(new Set());

  // Automatically select approved applicants on mount or when applicants change
  useEffect(() => {
    const autoSelected = new Set<string>();
    applicants.forEach(applicant => {
      if (applicant.profileStatus === "Approved") {
        autoSelected.add(String(applicant.id));
      }
    });
    setSelectedApplicants(autoSelected);
    onSelectionChange?.(Array.from(autoSelected));
  }, [applicants, onSelectionChange]);

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

  const isApplicantSelectable = (applicant: HousingApplicant) => {
    return applicant.profileStatus !== "NotApproved";
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
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Gällande</Badge>;
      case "Upcoming":
      case "Kommande":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">Kommande</Badge>;
      case "AboutToEnd":
      case "Uppsagt":
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">Uppsagt</Badge>;
      default:
        return <Badge variant="outline">{formatLeaseStatus(status)}</Badge>;
    }
  };

  const getProfileStatusBadge = (status: "Approved" | "PartiallyApproved" | "NotApproved") => {
    switch (status) {
      case "Approved":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Godkänd</Badge>;
      case "PartiallyApproved":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">Delvis godkänd</Badge>;
      case "NotApproved":
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">Ej godkänd</Badge>;
      default:
        return <Badge variant="outline">Okänd</Badge>;
    }
  };

  const getHousingReferenceBadge = (status: "Godkänd" | "Ej godkänd" | "Kontaktad - ej svar" | "Referens krävs ej" | "Ej behandlad") => {
    switch (status) {
      case "Godkänd":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Godkänd</Badge>;
      case "Ej godkänd":
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">Ej godkänd</Badge>;
      case "Kontaktad - ej svar":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">Kontaktad - ej svar</Badge>;
      case "Referens krävs ej":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">Referens krävs ej</Badge>;
      case "Ej behandlad":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50 border-gray-200">Ej behandlad</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCreditReportBadge = (status: "Godkända inbetalningar" | "Godkänd") => {
    switch (status) {
      case "Godkänd":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Godkänd</Badge>;
      case "Godkända inbetalningar":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">Godkända inbetalningar</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent bg-secondary">
            <TableHead className="w-12 font-semibold">Val</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Namn</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Kundnummer</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Köpoäng</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Boendeadress</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Anmälan</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Boendereferens</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Kreditupplysning</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.length > 0 ? applicants.map((applicant) => (
            <TableRow key={applicant.id} className="hover:bg-secondary/50">
              <TableCell className="py-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedApplicants.has(String(applicant.id))}
                    onCheckedChange={(checked) => 
                      handleApplicantSelection(String(applicant.id), checked as boolean)
                    }
                    disabled={!isApplicantSelectable(applicant)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">
                <div>
                  <div>{applicant.name}</div>
                  <div className="text-sm text-muted-foreground">{applicant.nationalRegistrationNumber}</div>
                </div>
              </TableCell>
              <TableCell>{applicant.contactCode}</TableCell>
              <TableCell>{applicant.queuePoints}</TableCell>
              <TableCell>{applicant.address}</TableCell>
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
                  <div>{getCreditReportBadge(applicant.creditReport.status)}</div>
                  <div className="text-xs text-muted-foreground">
                    {applicant.creditReport.date}
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                Inga intresseanmälningar än
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}