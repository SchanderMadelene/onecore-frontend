import { useParams, useNavigate, useLocation } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { useHousingListing } from "@/hooks/useHousingListing";
import { toast } from "@/hooks/use-toast";
import { useHousingOffers } from "@/contexts/HousingOffersContext";
import { useState } from "react";
import { NotesSimple } from "@/components/shared/Notes/NotesSimple";
import { HousingHeader } from "./components/HousingHeader";
import { HousingApplicantsTable } from "./components/HousingApplicantsTable";
import { HousingInfo } from "./components/HousingInfo";

const HousingDetailPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const { housingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { createOffer, isListingOffered, getOfferForListing } = useHousingOffers();
  
  const { data: listing, isLoading } = useHousingListing(housingId || "");

  const handleBack = () => {
    // Försök att gå tillbaka till rätt flik baserat på state eller default till publicerade
    const searchParams = new URLSearchParams(location.state?.from || "");
    const tab = searchParams.get("tab") || "publicerade";
    navigate(`/rentals?tab=${tab}`);
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
            housing={{}}
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
            housing={{}}
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

  const offerStatus = listing.offers.length > 0 ? "Erbjudandeomgång pågår" : "Publicerad";
  
  // Get active offer for this listing
  const activeOffer = getOfferForListing(housingId);
  
  // Filter applicants based on whether there's an active offer
  const displayedApplicants = activeOffer 
    ? listing.applicants.filter(applicant => 
        activeOffer.selectedApplicants.includes(applicant.id)
      )
    : listing.applicants;

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
              {activeOffer ? "Erbjudna sökande" : "Intresseanmälningar"}
            </h2>
            {activeOffer && (
              <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Erbjudande skickat:</strong> {new Date(activeOffer.sentAt).toLocaleDateString('sv-SE')} till {activeOffer.selectedApplicants.length} sökande
                </p>
              </div>
            )}
            {!activeOffer && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Tips:</strong> När du skickar erbjudanden till utvalda sökande kommer kolumnerna "Visning bokad" och "Svar på erbjudande" att visas här.
                </p>
              </div>
            )}
            <HousingApplicantsTable 
              applicants={displayedApplicants}
              housingAddress={listing.address}
              listingId={listing.id}
              showOfferColumns={false}
              showSelectionColumn={!activeOffer}
              onSelectionChange={setSelectedApplicants}
            />
          </section>

          <HousingInfo 
            housing={listing}
            applicantCount={displayedApplicants.length}
          />

          <section>
            <NotesSimple
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