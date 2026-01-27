import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ApplicantActions } from "./ApplicantActions";
import { OfferActions } from "./OfferActions";

interface Applicant {
  id: number;
  name: string;
  nationalRegistrationNumber: string;
  contactCode: string;
  queuePoints: number;
  address: string;
  housingLeaseStatus: "Current" | "Upcoming" | "AboutToEnd" | "Ended";
  applicationDate: string;
  hasParkingSpace: boolean;
  status: "Active" | "Offered" | "OfferAccepted" | "OfferDeclined" | "Assigned";
  applicationType: "Replace" | "Additional";
  priority: number | null;
  listingId: number;
  offerId?: number;
}

interface Offer {
  id: number;
  status: "Active" | "Accepted" | "Declined" | "Expired";
  expiresAt: string;
}

interface ApplicantsTableProps {
  applicants: Applicant[];
  offer?: Offer;
  spaceAddress: string;
  listingId: number;
  showOfferColumns?: boolean;
}

export function ApplicantsTable({ 
  applicants, 
  offer, 
  spaceAddress, 
  listingId, 
  showOfferColumns = false 
}: ApplicantsTableProps) {
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
      "Offered": "Erbjuden plats",
      "OfferAccepted": "Erbjudande accepterat",
      "OfferDeclined": "Erbjudande nekat",
      "Assigned": "Tilldelad"
    };
    return statusMap[status] || status;
  };

  const formatApplicantStatusResponse = (status: string) => {
    const responseMap: Record<string, string> = {
      "Active": "",
      "Offered": "Inväntar svar",
      "OfferAccepted": "Ja",
      "OfferDeclined": "Nej",
      "Assigned": ""
    };
    return responseMap[status] || "";
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

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent bg-secondary">
            <TableHead className="whitespace-nowrap font-semibold">Namn</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Kundnummer</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Köpoäng</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Boendeadress</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Status boendekontrakt</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Anmälan</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Har bilplats</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Status sökande</TableHead>
            {showOfferColumns && (
              <>
                <TableHead className="whitespace-nowrap font-semibold">Svar erbjudande</TableHead>
                <TableHead className="whitespace-nowrap font-semibold">Svara senast</TableHead>
              </>
            )}
            <TableHead className="whitespace-nowrap font-semibold">Ärende</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Priogrupp</TableHead>
            <TableHead className="whitespace-nowrap font-semibold"></TableHead>
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
              <TableCell>{getStatusBadge(applicant.housingLeaseStatus)}</TableCell>
              <TableCell>{new Date(applicant.applicationDate).toLocaleDateString('sv-SE')}</TableCell>
              <TableCell>{applicant.hasParkingSpace ? "Ja" : "Nej"}</TableCell>
              <TableCell>
                <Badge variant="outline">{formatApplicantStatus(applicant.status)}</Badge>
              </TableCell>
              {showOfferColumns && (
                <>
                  <TableCell>{formatApplicantStatusResponse(applicant.status)}</TableCell>
                  <TableCell>
                    {applicant.status === "Offered" && offer ? new Date(offer.expiresAt).toLocaleDateString('sv-SE') : ""}
                  </TableCell>
                </>
              )}
              <TableCell>
                {applicant.applicationType === "Additional" 
                  ? (applicant.hasParkingSpace ? "Hyra flera" : "Hyra en")
                  : "Byte"
                }
              </TableCell>
              <TableCell>{applicant.priority || <i>N/A</i>}</TableCell>
              <TableCell>
                {applicant.status === "Offered" && applicant.offerId ? (
                  <OfferActions
                    offerId={applicant.offerId}
                    listingId={listingId}
                    applicantName={applicant.name}
                  />
                ) : applicant.status === "Active" ? (
                  <ApplicantActions
                    applicantId={applicant.id}
                    applicantName={applicant.name}
                    listingAddress={spaceAddress}
                    listingId={listingId}
                  />
                ) : null}
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={showOfferColumns ? 13 : 11} className="text-center py-8 text-muted-foreground">
                Inga intresseanmälningar än
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}