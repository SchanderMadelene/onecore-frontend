import { useParams, useNavigate, useLocation } from "react-router-dom";
import { PageLayout } from "@/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { useHousingListing } from "@/hooks/useHousingListing";
import { toast } from "@/hooks/use-toast";
import { useHousingOffers } from "@/contexts/HousingOffersContext";
import { useHousingStatus } from "@/hooks/useHousingStatus";
import { useState } from "react";
import { Notes } from "@/components/shared/Notes";
import { HousingHeader, HousingApplicantsTable, HousingInfo } from "@/features/rentals";

const HousingDetailPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const { housingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { createOffer, isListingOffered, getOfferForListing } = useHousingOffers();
  const { getHousingStatus } = useHousingStatus();
  
  const { data: listing, isLoading } = useHousingListing(housingId || "");

  const handleBack = () => {
    // Navigate back to rentals page with bostad tab and the specific housing sub-tab
    const activeHousingTab = location.state?.activeHousingTab || "publicerade";
    navigate('/rentals?tab=bostad', { 
      state: { activeHousingTab }
    });
  };

  const handleCreateOffer = () => {
    if (!housingId || selectedApplicants.length === 0) return;
    
    const applicantIds = selectedApplicants.map(id => parseInt(id));
    createOffer(housingId, applicantIds);
    
    toast({
      title: "Erbjudande skickat",
      description: `Erbjudanden har skickats till ${selectedApplicants.length} valda sökande`
    });

    // Navigate back to rentals page with "erbjudna" tab
    navigate('/rentals?tab=bostad', { 
      state: { activeHousingTab: 'erbjudna' }
    });
  };

  if (!housingId) {
    return (
      <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
        <div className="p-6">
          <div className="text-center">
            <p className="text-muted-foreground">Ogiltigt bostads-ID</p>
            <Button onClick={handleBack} className="mt-4">
              Tillbaka till bostäder
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
          <HousingHeader 
            housingAddress=""
            offerStatus=""
            housing={undefined}
            hasOffers={false}
            onBack={handleBack}
            onCreateOffer={() => {}}
            isCreatingOffer={false}
          />
          <div className="text-center py-8">Laddar bostadsdetaljer...</div>
        </div>
      </PageLayout>
    );
  }

  if (!listing) {
    return (
      <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
        <div className="p-6">
          <HousingHeader 
            housingAddress=""
            offerStatus=""
            housing={undefined}
            hasOffers={false}
            onBack={handleBack}
            onCreateOffer={() => {}}
            isCreatingOffer={false}
          />
          <div className="text-center py-8">
            <p className="text-muted-foreground">Bostaden kunde inte hittas</p>
            <Button onClick={handleBack} className="mt-4">
              Tillbaka till bostäder
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  const status = getHousingStatus(listing);
  const offerStatus = status === 'published' ? "Publicerad" : 
                    status === 'ready_for_offer' ? "Klara för erbjudande" : 
                    status === 'offered' ? "Erbjudna" : "Publicerad";
  
  // Get active offer for this listing
  const activeOffer = getOfferForListing(housingId);
  
  // Show all applicants with offer information
  const displayedApplicants = listing.applicants;

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="p-6">
        <HousingHeader 
          housingAddress={listing.address}
          offerStatus={offerStatus}
          housing={listing}
          hasOffers={listing.offers.length > 0 || isListingOffered(housingId)}
          hasSelectedApplicants={selectedApplicants.length > 0}
          onBack={handleBack}
          onCreateOffer={handleCreateOffer}
          isCreatingOffer={false}
        />

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Intresseanmälningar
            </h2>
            <HousingApplicantsTable 
              applicants={displayedApplicants}
              housingAddress={listing.address}
              listingId={listing.id}
              showOfferColumns={false}
              showSelectionColumn={!activeOffer}
              onSelectionChange={setSelectedApplicants}
              offeredApplicantIds={activeOffer?.selectedApplicants || []}
            />
          </section>

          <HousingInfo 
            housing={listing}
            applicantCount={displayedApplicants.length}
          />

          <section>
            <Notes
              entityType="housing"
              entityId={housingId}
              title="Noteringar för bostad"
              placeholder="Skriv en notering om denna bostad..."
              emptyMessage="Inga noteringar har lagts till för denna bostad ännu."
              categories={["Underhåll", "Klagomål", "Allmänt", "Uthyrning"]}
              showCategory={true}
            />
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default HousingDetailPage;