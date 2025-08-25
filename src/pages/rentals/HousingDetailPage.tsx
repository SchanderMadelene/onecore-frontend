import { useParams, useNavigate, useLocation } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { useHousingListing } from "@/hooks/useHousingListing";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { NotesSimple } from "@/components/shared/Notes/NotesSimple";
import { HousingHeader } from "./components/HousingHeader";
import { HousingApplicantsTable } from "./components/HousingApplicantsTable";
import { HousingInfo } from "./components/HousingInfo";

const HousingDetailPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { housingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const { data: listing, isLoading } = useHousingListing(housingId || "");

  const handleBack = () => {
    // Försök att gå tillbaka till rätt flik baserat på state eller default till publicerade
    const searchParams = new URLSearchParams(location.state?.from || "");
    const tab = searchParams.get("tab") || "publicerade";
    navigate(`/rentals?tab=${tab}`);
  };

  const handleCreateOffer = () => {
    if (!listing) return;
    
    toast({
      title: "Erbjudandeomgång startad",
      description: "En ny erbjudandeomgång har skapats",
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

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="p-6">
        <HousingHeader 
          housingAddress={listing.address}
          offerStatus={offerStatus}
          housing={listing}
          hasOffers={listing.offers.length > 0}
          onBack={handleBack}
          onCreateOffer={handleCreateOffer}
          isCreatingOffer={false}
        />

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Intresseanmälningar</h2>
            <HousingApplicantsTable 
              applicants={listing.applicants}
              housingAddress={listing.address}
              listingId={listing.id}
              showOfferColumns={false}
            />
          </section>

          <HousingInfo 
            housing={listing}
            applicantCount={listing.applicants.length}
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