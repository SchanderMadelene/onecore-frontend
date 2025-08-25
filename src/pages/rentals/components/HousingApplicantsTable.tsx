import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { HousingApplicant } from "@/hooks/useHousingListing";

interface HousingApplicantsTableProps {
  applicants: HousingApplicant[];
  housingAddress: string;
  listingId: string;
  showOfferColumns?: boolean;
}

export function HousingApplicantsTable({ 
  applicants, 
  housingAddress, 
  listingId, 
  showOfferColumns = false 
}: HousingApplicantsTableProps) {
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

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent bg-secondary">
            <TableHead className="whitespace-nowrap font-semibold">Namn</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Kundnummer</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Köpoäng</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Boendeadress</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Anmälan</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Status sökande</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Sökandeprofil</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Ärende</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Priogrupp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.length > 0 ? applicants.map((applicant) => (
            <TableRow key={applicant.id} className="hover:bg-secondary/50">
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
                <Badge variant="outline">{formatApplicantStatus(applicant.status)}</Badge>
              </TableCell>
              <TableCell>
                {getProfileStatusBadge(applicant.profileStatus)}
              </TableCell>
              <TableCell>
                {applicant.applicationType === "Additional" 
                  ? (applicant.hasApartment ? "Hyra flera" : "Hyra en")
                  : "Flytta"
                }
              </TableCell>
              <TableCell>{applicant.priority || <i>N/A</i>}</TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                Inga intresseanmälningar än
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}