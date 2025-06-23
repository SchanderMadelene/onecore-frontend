import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { ChevronRight, ArrowLeft, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParkingSpaceListing } from "@/hooks/useParkingSpaceListing";
import { useCreateOffer } from "@/hooks/useOfferActions";
import { ApplicantActions } from "./ApplicantActions";
import { OfferActions } from "./OfferActions";
import { ParkingApplicationDialog } from "./ParkingApplicationDialog";
import { ParkingSpaceComments } from "./ParkingSpaceComments";
import { useToast } from "@/hooks/use-toast";
import type { ParkingSpace } from "./types/parking";

interface ParkingSpaceDetailProps {
  space: ParkingSpace;
}

export function ParkingSpaceDetail({ space }: ParkingSpaceDetailProps) {
  const { data: listing, isLoading } = useParkingSpaceListing(parseInt(space.id));
  const createOffer = useCreateOffer();
  const { toast } = useToast();

  const handleCreateOffer = () => {
    if (!listing) return;
    
    createOffer.mutate(
      { listingId: listing.id },
      {
        onSuccess: () => {
          toast({
            title: "Erbjudandeomgång startad",
            description: "En ny erbjudandeomgång har skapats",
          });
        },
        onError: () => {
          toast({
            title: "Fel",
            description: "Kunde inte starta erbjudandeomgång",
            variant: "destructive",
          });
        }
      }
    );
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

  const getOfferStatus = () => {
    if (!listing?.offers.length) return "Intresseanmälningar";
    const latestOffer = listing.offers[listing.offers.length - 1];
    const statusMap: Record<string, string> = {
      "Active": "Erbjudande",
      "Accepted": "Tilldelad / kontrakterad", 
      "Declined": "Nekad",
      "Expired": "Utgången"
    };
    return statusMap[latestOffer.status] || "Intresseanmälningar";
  };

  if (isLoading) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-[90vw] p-0">
          <div className="p-6">Laddar...</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-[90vw] p-0">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b bg-secondary">
            <div className="flex items-center gap-2 mb-4">
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </SheetClose>
              <h2 className="text-lg font-semibold text-muted-foreground">Bilplatser</h2>
            </div>
            <SheetHeader>
              <div className="flex items-center justify-between">
                <SheetTitle className="text-2xl tracking-tight flex items-center gap-2">
                  {space.address}
                  <Badge variant="outline" className="bg-primary/10 text-primary font-normal">
                    {getOfferStatus()}
                  </Badge>
                </SheetTitle>
                <div className="flex items-center gap-2">
                  <ParkingApplicationDialog parkingSpace={space} />
                  {listing && !listing.offers.length && (
                    <Button 
                      size="sm" 
                      onClick={handleCreateOffer}
                      disabled={createOffer.isPending}
                      className="flex items-center gap-1"
                    >
                      <PlusCircle className="h-4 w-4" />
                      <span>{createOffer.isPending ? "Startar..." : "Starta erbjudandeomgång"}</span>
                    </Button>
                  )}
                </div>
              </div>
            </SheetHeader>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-6 space-y-8">
                {listing && listing.offers.length > 0 ? (
                  <Tabs defaultValue={`offer-${listing.offers[listing.offers.length - 1].id}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Intresseanmälningar {space.address}</h3>
                    </div>
                    <TabsList className="mb-4">
                      {listing.offers.map((offer, index) => (
                        <TabsTrigger key={offer.id} value={`offer-${offer.id}`}>
                          Omgång {index + 1}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {listing.offers.map((offer, index) => (
                      <TabsContent key={offer.id} value={`offer-${offer.id}`}>
                        <section>
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
                                  <TableHead className="whitespace-nowrap font-semibold">Svar erbjudande</TableHead>
                                  <TableHead className="whitespace-nowrap font-semibold">Svara senast</TableHead>
                                  <TableHead className="whitespace-nowrap font-semibold">Ärende</TableHead>
                                  <TableHead className="whitespace-nowrap font-semibold">Priogrupp</TableHead>
                                  <TableHead className="whitespace-nowrap font-semibold"></TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {listing.applicants.map((applicant) => (
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
                                    <TableCell>{formatApplicantStatusResponse(applicant.status)}</TableCell>
                                    <TableCell>
                                      {applicant.status === "Offered" ? new Date(offer.expiresAt).toLocaleDateString('sv-SE') : ""}
                                    </TableCell>
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
                                          listingId={listing.id}
                                          applicantName={applicant.name}
                                        />
                                      ) : applicant.status === "Active" ? (
                                        <ApplicantActions
                                          applicantId={applicant.id}
                                          applicantName={applicant.name}
                                          listingAddress={space.address}
                                          listingId={listing.id}
                                        />
                                      ) : null}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </section>
                      </TabsContent>
                    ))}
                  </Tabs>
                ) : (
                  <section>
                    <h3 className="text-lg font-semibold mb-4">Intresseanmälningar</h3>
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
                            <TableHead className="whitespace-nowrap font-semibold">Ärende</TableHead>
                            <TableHead className="whitespace-nowrap font-semibold">Priogrupp</TableHead>
                            <TableHead className="whitespace-nowrap font-semibold"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {listing?.applicants.map((applicant) => (
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
                              <TableCell>
                                {applicant.applicationType === "Additional" 
                                  ? (applicant.hasParkingSpace ? "Hyra flera" : "Hyra en")
                                  : "Byte"
                                }
                              </TableCell>
                              <TableCell>{applicant.priority || <i>N/A</i>}</TableCell>
                              <TableCell>
                                <ApplicantActions
                                  applicantId={applicant.id}
                                  applicantName={applicant.name}
                                  listingAddress={space.address}
                                  listingId={listing.id}
                                />
                              </TableCell>
                            </TableRow>
                          )) || (
                            <TableRow>
                              <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">
                                Inga intresseanmälningar än
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </section>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <section>
                    <h3 className="text-lg font-semibold mb-4">Objektsinformation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Bilplats</p>
                        <p className="font-medium">{space.address}</p>
                        <p className="text-sm">{space.id}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Område</p>
                        <p className="font-medium">{space.area}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Bilplatstyp</p>
                        <p className="font-medium">{space.type}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Hyra</p>
                        <p className="font-medium">{space.rent}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Sökande</p>
                        <p className="font-medium">{listing?.applicants.length || 0}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Publicerad t.o.m</p>
                        <p className="font-medium">{space.publishedTo}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Ledig från och med</p>
                        <p className="font-medium">{space.publishedFrom}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Kötyp</p>
                        <p className="font-medium">{space.queueType}</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-4">
                      Översiktskarta
                    </h3>
                    <div className="border rounded-lg overflow-hidden">
                      <AspectRatio ratio={16/9}>
                        <img
                          src="/lovable-uploads/f737d3ef-60f9-4e0f-a979-12d80d6f4efe.png"
                          alt="Översiktskarta för bilplats"
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                    </div>
                  </section>
                </div>

                <ParkingSpaceComments parkingSpaceId={space.id} />
              </div>
            </ScrollArea>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
