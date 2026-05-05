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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HousingDetailPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
  const [smsOpen, setSmsOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const { housingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { createOffer, isListingOffered, getOfferForListing, linkContract, unlinkContract, getLinkedContract } = useHousingOffers();
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

  const activeHousingTab = location.state?.activeHousingTab || "publicerade";

  const handleBack = () => {
    navigate('/rentals/bostad', {
      state: { activeHousingTab }
    });
  };

  const handleTabChange = (value: string) => {
    navigate('/rentals/bostad', {
      state: { activeHousingTab: value }
    });
  };

  const housingTabs = [
    { value: "behovAvPublicering", label: "Publicera" },
    { value: "publicerade", label: "Publicerat nu" },
    { value: "klaraForErbjudande", label: "Erbjud visning" },
    { value: "erbjudna", label: "Visning" },
    { value: "kontrakt", label: "Erbjud kontrakt" },
    { value: "historik", label: "Historik" },
  ];

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

    navigate('/rentals/bostad', {
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

  const isHistoryMode = location.state?.activeHousingTab === 'historik' || !!listing.history;
  const status = getHousingStatus(listing);
  const offerStatus = isHistoryMode ? "Historik" :
                    status === 'published' ? "Publicerad" :
                    status === 'ready_for_offer' ? "Klara för erbjudande" :
                    status === 'offered' ? "Erbjudna" : "Publicerad";
  
  // Get active offer for this listing
  const activeOffer = getOfferForListing(housingId);

  // Kontrakt-läge: visa endast sökande som tackat ja på erbjudandet.
  // Spegla logiken från historik-/erbjudande-vyn: topp 10 efter köpoäng fick
  // erbjudandet, och deterministiska "buckets" avgör svaret (samma id % 5-regel
  // som i HousingApplicantsTable). Bucket 0 och 1 = "Tackat ja".
  const isContractMode = location.state?.activeHousingTab === 'kontrakt';

  const top10Ids = new Set(
    listing.applicants
      .slice()
      .sort((a, b) => b.queuePoints - a.queuePoints)
      .slice(0, 10)
      .map(a => a.id)
  );

  const displayedApplicants = isContractMode
    ? listing.applicants.filter(a => top10Ids.has(a.id))
    : listing.applicants;

  // Endast sökande som tackat ja kan kopplas till kontrakt (samma bucket-regel
  // som i tabellen).
  const acceptedApplicantIds = new Set(
    isContractMode
      ? displayedApplicants.filter(a => a.id % 5 === 0 || a.id % 5 === 1).map(a => a.id)
      : []
  );

  // Rekommenderad sökande för kontrakt: högst köpoäng bland de som tackat ja
  // OCH har godkända kontroller (profilstatus "Approved").
  const recommendedApplicantId = isContractMode
    ? displayedApplicants
        .filter(a => acceptedApplicantIds.has(a.id) && a.profileStatus === "Approved")
        .sort((a, b) => b.queuePoints - a.queuePoints)[0]?.id
    : undefined;

  const linkedContractApplicantId = isContractMode ? getLinkedContract(housingId) : undefined;

  const handleLinkContract = (applicantId: number) => {
    linkContract(housingId, applicantId);
    const applicant = displayedApplicants.find(a => a.id === applicantId);
    sonnerToast.success(`Kontrakt kopplat till ${applicant?.name ?? "sökande"}`);
  };

  const handleUnlinkContract = () => {
    unlinkContract(housingId);
    sonnerToast.success("Kontraktskoppling borttagen");
  };

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="p-6">
        <Tabs value={activeHousingTab} onValueChange={handleTabChange} className="w-full mb-6">
          <TabsList className="grid h-11" style={{ gridTemplateColumns: `repeat(${housingTabs.length}, 1fr)` }}>
            {housingTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="h-full px-2 text-xs sm:text-sm sm:px-3">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <HousingHeader 
          housingAddress={listing.address}
          offerStatus={offerStatus}
          housing={listing}
          hasOffers={listing.offers.length > 0 || isListingOffered(housingId)}
          hasSelectedApplicants={selectedApplicants.length > 0}
          onBack={handleBack}
          onCreateOffer={handleOpenOfferDialog}
          isCreatingOffer={false}
          readOnly={isHistoryMode}
        />


        <div className="space-y-8">
          <HousingInfo 
            housing={listing}
            applicantCount={displayedApplicants.length}
          />

          <section>
            <h2 className="text-xl font-semibold mb-4">
              {isHistoryMode ? 'Sökande i denna uthyrning' :
               isContractMode ? 'Sökande som tackat ja' : 'Intresseanmälningar'}
            </h2>
            <HousingApplicantsTable 
              applicants={displayedApplicants}
              housingAddress={listing.address}
              listingId={listing.id}
              showOfferColumns={false}
              showSelectionColumn={!activeOffer && !isContractMode && !isHistoryMode}
              onSelectionChange={setSelectedApplicants}
              offeredApplicantIds={activeOffer?.selectedApplicants || []}
              contractMode={isContractMode}
              autoSelectTopApplicants={status === 'ready_for_offer' && !isHistoryMode}
              historyMode={isHistoryMode}
              contractWinnerName={listing.history?.contractedTo}
              linkedContractApplicantId={linkedContractApplicantId}
              recommendedApplicantId={recommendedApplicantId}
              onLinkContract={handleLinkContract}
              onUnlinkContract={handleUnlinkContract}
            />
          </section>

          {!isHistoryMode && (
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
          )}
        </div>
      </div>

      {!isHistoryMode && (
        <SendHousingOfferDialog
          open={isOfferDialogOpen}
          onOpenChange={setIsOfferDialogOpen}
          recipientCount={selectedApplicants.length}
          housingAddress={listing.address}
          onConfirm={handleConfirmOffer}
        />
      )}

      {!isHistoryMode && (
        <BulkActionBar
          selectedCount={selectedApplicants.length}
          onSendSms={() => setSmsOpen(true)}
          onSendEmail={() => setEmailOpen(true)}
          onClear={() => setSelectedApplicants([])}
        />
      )}
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