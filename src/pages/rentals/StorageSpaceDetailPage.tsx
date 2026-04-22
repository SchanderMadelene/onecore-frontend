import { useParams, useNavigate, useLocation } from "react-router-dom";
import { PageLayout } from "@/layouts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStorageSpaceListing } from "@/features/rentals/hooks/useStorageSpaceListing";
import { useCreateOffer } from "@/features/rentals/hooks/useOfferActions";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Notes } from "@/components/common";
import { StorageSpaceHeader } from "./components/StorageSpaceHeader";
import { ApplicantsTable } from "./components/ApplicantsTable";
import type { StorageSpace } from "@/features/rentals/components/types/storage";

const getOfferStatus = (offers: any[]) => {
  if (!offers.length) return "Intresseanmälningar";
  const latest = offers[offers.length - 1];
  const map: Record<string, string> = {
    Active: "Erbjudande",
    Accepted: "Tilldelad / kontrakterad",
    Declined: "Nekad",
    Expired: "Utgången",
  };
  return map[latest.status] || "Intresseanmälningar";
};

const StorageSpaceDetailPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { storageSpaceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const { data: listing, isLoading } = useStorageSpaceListing(parseInt(storageSpaceId || "0"));
  const createOffer = useCreateOffer();

  const handleBack = () => {
    const searchParams = new URLSearchParams(location.state?.from || "");
    const tab = searchParams.get("tab") || "forrad";
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
        },
      },
    );
  };

  if (!storageSpaceId) {
    return (
      <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
        <div className="p-6">
          <div className="text-center">
            <p className="text-muted-foreground">Ogiltigt förråds-ID</p>
            <Button onClick={() => navigate("/rentals?tab=forrad")} className="mt-4">
              Tillbaka till förråd
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
          <StorageSpaceHeader
            spaceAddress=""
            offerStatus=""
            space={{} as StorageSpace}
            hasOffers={false}
            onBack={handleBack}
            onCreateOffer={() => {}}
            isCreatingOffer={false}
          />
          <div className="text-center py-8">Laddar förrådsdetaljer...</div>
        </div>
      </PageLayout>
    );
  }

  if (!listing) {
    return (
      <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
        <div className="p-6">
          <StorageSpaceHeader
            spaceAddress=""
            offerStatus=""
            space={{} as StorageSpace}
            hasOffers={false}
            onBack={handleBack}
            onCreateOffer={() => {}}
            isCreatingOffer={false}
          />
          <div className="text-center py-8">
            <p className="text-muted-foreground">Förrådet kunde inte hittas</p>
            <Button onClick={handleBack} className="mt-4">
              Tillbaka till förråd
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  const space: StorageSpace = {
    id: storageSpaceId,
    address: listing.address,
    area: listing.area,
    type: listing.type,
    size: listing.size,
    queueType: listing.queueType,
    rent: listing.rent,
    seekers: listing.applicants?.length || 0,
    publishedFrom: listing.publishedFrom,
    publishedTo: listing.publishedTo,
  };

  const offerStatus = getOfferStatus(listing.offers);

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="p-6">
        <StorageSpaceHeader
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

          <section>
            <h3 className="text-lg font-semibold mb-4">Objektsinformation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Förråd</p>
                <p className="font-medium">{space.address}</p>
                <p className="text-sm">{space.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Område</p>
                <p className="font-medium">{space.area}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Förrådstyp</p>
                <p className="font-medium">{space.type}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Storlek</p>
                <p className="font-medium">{space.size}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Hyra</p>
                <p className="font-medium">{space.rent}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Kötyp</p>
                <p className="font-medium">{space.queueType}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Sökande</p>
                <p className="font-medium">{listing.applicants.length}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Publicerad t.o.m</p>
                <p className="font-medium">{space.publishedTo}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Ledig från och med</p>
                <p className="font-medium">{space.publishedFrom}</p>
              </div>
            </div>
          </section>

          <section>
            <Notes
              entityType="storageSpace"
              entityId={storageSpaceId}
              title="Noteringar för förråd"
              placeholder="Skriv en notering om detta förråd..."
              emptyMessage="Inga noteringar har lagts till för detta förråd ännu."
              categories={["Underhåll", "Klagomål", "Allmänt", "Uthyrning"]}
              showCategory={true}
            />
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default StorageSpaceDetailPage;
