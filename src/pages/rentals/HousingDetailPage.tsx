import { useParams, useNavigate, useLocation } from "react-router-dom";
import { PageLayout } from "@/layouts";
import { Button } from "@/components/ui/button";
import { useHousingListing, useHousingStatus } from "@/features/rentals";
import { toast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";
import { useHousingOffers } from "@/contexts/HousingOffersContext";
import { useState, useMemo } from "react";
import { Notes } from "@/components/common";
import { HousingHeader } from "./components/HousingHeader";
import { HousingApplicantsTable } from "./components/HousingApplicantsTable";
import { HousingInfo } from "./components/HousingInfo";
import { SendHousingOfferDialog, type HousingOfferDispatch } from "@/features/rentals/components/SendHousingOfferDialog";
import { BulkActionBar } from "@/shared/ui/bulk-action-bar";
import { BulkSmsModal, BulkEmailModal } from "@/features/communication";

const HousingDetailPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
  const [smsOpen, setSmsOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const { housingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { createOffer, isListingOffered, getOfferForListing } = useHousingOffers();
  const { getHousingStatus } = useHousingStatus();
  
  const { data: listing, isLoading } = useHousingListing(housingId || "");

  // Bygg recipient-listan för bulk-SMS/mejl baserat på markerade sökande.
  // Telefon och e-post mockas tills riktig kunddata är kopplad.
  const bulkRecipients = useMemo(() => {
    if (!listing) return [];
    return listing.applicants
      .filter(a => selectedApplicants.includes(String(a.id)))
      .map(a => ({
        id: String(a.id),
        name: a.name,
        phone: `+4670${String(1000000 + a.id).slice(-7)}`,
        email: `${a.name.toLowerCase().replace(/\s+/g, ".").replace(/[åä]/g, "a").replace(/ö/g, "o")}@example.com`,
      }));
  }, [listing, selectedApplicants]);

  const handleBack = () => {
    // Navigate back to rentals page with bostad tab and the specific housing sub-tab
    const activeHousingTab = location.state?.activeHousingTab || "publicerade";
    navigate('/rentals?tab=bostad', { 
      state: { activeHousingTab }
    });
  };

  const handleOpenOfferDialog = () => {
    if (!housingId || selectedApplicants.length === 0) return;
    setIsOfferDialogOpen(true);
  };

  const handleConfirmOffer = (_dispatch: HousingOfferDispatch) => {
    if (!housingId || selectedApplicants.length === 0) return;

    const applicantIds = selectedApplicants.map(id => parseInt(id));
    createOffer(housingId, applicantIds);

    setIsOfferDialogOpen(false);

    toast({
      title: "Erbjudande skickat",
      description: `Erbjudanden har skickats till ${selectedApplicants.length} valda sökande`
    });

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

  // Kontrakt-läge: visa endast sökande som tackat ja
  const isContractMode = location.state?.activeHousingTab === 'kontrakt';

  // Show all applicants with offer information
  const displayedApplicants = isContractMode
    ? listing.applicants.filter(a => a.offerResponse?.status === 'Accepterat')
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
          onCreateOffer={handleOpenOfferDialog}
          isCreatingOffer={false}
        />

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">
              {isContractMode ? 'Sökande som tackat ja' : 'Intresseanmälningar'}
            </h2>
            <HousingApplicantsTable 
              applicants={displayedApplicants}
              housingAddress={listing.address}
              listingId={listing.id}
              showOfferColumns={false}
              showSelectionColumn={!activeOffer && !isContractMode}
              onSelectionChange={setSelectedApplicants}
              offeredApplicantIds={activeOffer?.selectedApplicants || []}
              contractMode={isContractMode}
              autoSelectTopApplicants={status === 'ready_for_offer'}
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

      <SendHousingOfferDialog
        open={isOfferDialogOpen}
        onOpenChange={setIsOfferDialogOpen}
        recipientCount={selectedApplicants.length}
        housingAddress={listing.address}
        onConfirm={handleConfirmOffer}
      />

      {/* Bulk-actions för markerade sökande (SMS/mejl). Visas i alla tre lägen
          (urval för erbjudande, granska erbjudna, kontrakt). I urvalsläget
          används samma selection som "Skicka erbjudande". */}
      <BulkActionBar
        selectedCount={selectedApplicants.length}
        onSendSms={() => setSmsOpen(true)}
        onSendEmail={() => setEmailOpen(true)}
        onClear={() => setSelectedApplicants([])}
      />

      <BulkSmsModal
        open={smsOpen}
        onOpenChange={setSmsOpen}
        recipients={bulkRecipients}
        onSend={async (_message, sentTo) => {
          await new Promise((r) => setTimeout(r, 300));
          sonnerToast.success(`SMS skickat till ${sentTo.length} sökande`);
        }}
      />

      <BulkEmailModal
        open={emailOpen}
        onOpenChange={setEmailOpen}
        recipients={bulkRecipients}
        onSend={async (_subject, _body, sentTo) => {
          await new Promise((r) => setTimeout(r, 300));
          sonnerToast.success(`Mejl skickat till ${sentTo.length} sökande`);
        }}
      />
    </PageLayout>
  );
};

export default HousingDetailPage;