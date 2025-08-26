import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { ContactSearch } from "@/components/rentals/residence-profile/ContactSearch";
import { ProfileForm } from "@/components/rentals/residence-profile/ProfileForm";
import { useState, useEffect } from "react";
import type { HousingApplicant } from "@/hooks/useHousingListing";
import type { ContactSearchData } from "@/components/rentals/residence-profile/types";

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactSearchData | null>(null);

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

  const handleOpenProfile = (applicant: HousingApplicant) => {
    const contact: ContactSearchData = {
      contactCode: applicant.contactCode,
      fullName: applicant.name,
      nationalRegistrationNumber: applicant.nationalRegistrationNumber
    };
    setSelectedContact(contact);
    setDrawerOpen(true);
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

  const getCreditReportBadge = (status: "Godkänd/låg risk" | "Förhöjd risk" | "Hög risk" | "Ingen uppgift tillgänglig") => {
    switch (status) {
      case "Godkänd/låg risk":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Godkänd/låg risk</Badge>;
      case "Förhöjd risk":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">Förhöjd risk</Badge>;
      case "Hög risk":
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">Hög risk</Badge>;
      case "Ingen uppgift tillgänglig":
        return <Badge variant="outline" className="bg-white text-gray-700 hover:bg-white border-gray-200">Ingen uppgift tillgänglig</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentHistoryBadge = (status: "Godkänd" | "Ej godkänd" | "Ej behandlad") => {
    switch (status) {
      case "Godkänd":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Godkänd</Badge>;
      case "Ej godkänd":
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">Ej godkänd</Badge>;
      case "Ej behandlad":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50 border-gray-200">Ej behandlad</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent bg-secondary">
            <TableHead className="w-12 font-semibold">Val</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Namn</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Kundnummer</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Köpoäng</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Anmälan</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Boendereferens</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Kreditupplysning</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Betalningshistorik</TableHead>
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
                  <Button 
                    variant="link" 
                    className="p-0 h-auto font-medium text-left justify-start hover:text-primary"
                    onClick={() => handleOpenProfile(applicant)}
                  >
                    {applicant.name}
                  </Button>
                  <div className="text-sm text-muted-foreground">{applicant.nationalRegistrationNumber}</div>
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
                  <div>{getCreditReportBadge(applicant.creditReport.status)}</div>
                  <div className="text-xs text-muted-foreground">
                    {applicant.creditReport.date}
                  </div>
                </div>
              </TableCell>
              <TableCell>
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

    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>Sökandeprofil</DrawerTitle>
          <DrawerDescription>
            Granska och hantera sökandens information
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4 overflow-y-auto">
          {selectedContact && (
            <div className="space-y-6">
              <ContactSearch 
                selectedContact={selectedContact}
                onSelectContact={setSelectedContact}
              />
              <ProfileForm contact={selectedContact} />
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  </>
  );
}