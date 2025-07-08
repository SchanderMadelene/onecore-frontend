
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParkingSpaceListing } from "@/hooks/useParkingSpaceListing";
import { useCreateOffer } from "@/hooks/useOfferActions";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { NotesSimple } from "@/components/shared/Notes/NotesSimple";
import { ParkingSpaceHeader } from "./components/ParkingSpaceHeader";
import { ApplicantsTable } from "./components/ApplicantsTable";
import { ParkingSpaceInfo } from "./components/ParkingSpaceInfo";
import { getOfferStatus, createMockSpace } from "./utils/parkingSpaceUtils";

const ParkingSpaceDetailPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { parkingSpaceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const { data: listing, isLoading } = useParkingSpaceListing(parseInt(parkingSpaceId || "0"));
  const createOffer = useCreateOffer();

  const handleBack = () => {
    // Försök att gå tillbaka till rätt flik baserat på state eller default till publicerade
    const searchParams = new URLSearchParams(location.state?.from || "");
    const tab = searchParams.get("tab") || "publicerade";
    navigate(`/rentals?tab=${tab}`);
  };

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

  if (!parkingSpaceId) {
    return (
      <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
        <div className="p-6">
          <div className="text-center">
            <p className="text-muted-foreground">Ogiltigt bilplats-ID</p>
            <Button onClick={handleBack} className="mt-4">
              Tillbaka till bilplatser
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (isLoading) {
    return (
      <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
        <div className="p-6">
          <ParkingSpaceHeader 
            spaceAddress=""
            offerStatus=""
            space={{}}
            hasOffers={false}
            onBack={handleBack}
            onCreateOffer={() => {}}
            isCreatingOffer={false}
          />
          <div className="text-center py-8">Laddar bilplatsdetaljer...</div>
        </div>
      </PageLayout>
    );
  }

  if (!listing) {
    return (
      <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
        <div className="p-6">
          <ParkingSpaceHeader 
            spaceAddress=""
            offerStatus=""
            space={{}}
            hasOffers={false}
            onBack={handleBack}
            onCreateOffer={() => {}}
            isCreatingOffer={false}
          />
          <div className="text-center py-8">
            <p className="text-muted-foreground">Bilplatsen kunde inte hittas</p>
            <Button onClick={handleBack} className="mt-4">
              Tillbaka till bilplatser
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  const space = createMockSpace(parkingSpaceId, listing);
  const offerStatus = getOfferStatus(listing.offers);

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="p-6">
        <ParkingSpaceHeader 
          spaceAddress={space.address}
          offerStatus={offerStatus}
          space={space}
          hasOffers={listing.offers.length > 0}
          onBack={handleBack}
          onCreateOffer={handleCreateOffer}
          isCreatingOffer={createOffer.isPending}
        />

        <div className="space-y-8">
          {listing.offers.length > 0 ? (
            <Tabs defaultValue={`offer-${listing.offers[listing.offers.length - 1].id}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Intresseanmälningar {space.address}</h2>
              </div>
              <TabsList className="mb-4">
                {listing.offers.map((offer, index) => (
                  <TabsTrigger key={offer.id} value={`offer-${offer.id}`}>
                    Omgång {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
              {listing.offers.map((offer) => (
                <TabsContent key={offer.id} value={`offer-${offer.id}`}>
                  <ApplicantsTable 
                    applicants={listing.applicants}
                    offer={offer}
                    spaceAddress={space.address}
                    listingId={listing.id}
                    showOfferColumns={true}
                  />
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <section>
              <h2 className="text-xl font-semibold mb-4">Intresseanmälningar</h2>
              <ApplicantsTable 
                applicants={listing.applicants}
                spaceAddress={space.address}
                listingId={listing.id}
                showOfferColumns={false}
              />
            </section>
          )}

          <ParkingSpaceInfo 
            space={space}
            applicantCount={listing.applicants.length}
          />

          <section>
            <NotesSimple
              entityType="parkingSpace"
              entityId={parkingSpaceId}
              title="Noteringar för bilplats"
              placeholder="Skriv en notering om denna bilplats..."
              emptyMessage="Inga noteringar har lagts till för denna bilplats ännu."
              categories={["Underhåll", "Klagomål", "Allmänt", "Uthyrning"]}
              showCategory={true}
            />
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default ParkingSpaceDetailPage;
