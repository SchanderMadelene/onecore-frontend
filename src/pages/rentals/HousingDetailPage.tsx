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
import { RoundSummaryBar } from "./components/RoundSummaryBar";
import { HousingRowActions, type HousingActionTab } from "@/features/rentals/components/HousingRowActions";
import { PlusCircle } from "lucide-react";
import { SendHousingOfferDialog, type HousingOfferDispatch } from "@/features/rentals/components/SendHousingOfferDialog";
import { BulkActionBar } from "@/shared/ui/bulk-action-bar";
import { BulkSmsModal, BulkEmailModal } from "@/features/communication";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const NEW_ROUND_TAB = "__new_round__";

const HousingDetailPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
  const [isEditOfferDialogOpen, setIsEditOfferDialogOpen] = useState(false);
  const [smsOpen, setSmsOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [isSelectingForNewRound, setIsSelectingForNewRound] = useState(false);
  const [activeRoundTab, setActiveRoundTab] = useState<string | undefined>(undefined);
  const { housingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    startNewRound,
    cancelRound,
    getRoundsForListing,
    canStartNewRound,
    isListingOffered,
    getOfferForListing,
    linkContract,
    unlinkContract,
    getLinkedContract,
  } = useHousingOffers();
  const { getHousingStatus } = useHousingStatus();

  const { data: listing, isLoading } = useHousingListing(housingId || "");

  const roundsForHooks = housingId ? getRoundsForListing(housingId) : [];
  const activeRoundsForHooks = roundsForHooks.filter(r => r.status === 'Active');

  const declinedInPreviousRoundIds = useMemo(() => {
    const set = new Set<number>();
    roundsForHooks.forEach(r => r.responses.forEach(resp => { if (resp.response === 'declined') set.add(resp.applicantId); }));
    return Array.from(set);
  }, [roundsForHooks]);

  const activeRoundApplicantIds = useMemo(() => {
    const set = new Set<number>();
    activeRoundsForHooks.forEach(r => r.selectedApplicants.forEach(id => set.add(id)));
    return Array.from(set);
  }, [activeRoundsForHooks]);

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
    navigate('/rentals/housing', { state: { activeHousingTab } });
  };

  const handleTabChange = (value: string) => {
    navigate('/rentals/housing', { state: { activeHousingTab: value } });
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

  const handleStartNewRound = () => {
    setIsSelectingForNewRound(true);
    setSelectedApplicants([]);
    setActiveRoundTab(NEW_ROUND_TAB);
  };

  const handleCancelSelection = () => {
    setIsSelectingForNewRound(false);
    setSelectedApplicants([]);
    setActiveRoundTab(undefined);
  };

  const handleConfirmOffer = (_dispatch: HousingOfferDispatch) => {
    if (!housingId || selectedApplicants.length === 0) return;

    const applicantIds = selectedApplicants.map(id => parseInt(id));
    startNewRound(housingId, applicantIds, _dispatch.responseDeadline?.toISOString());

    setIsOfferDialogOpen(false);
    setIsSelectingForNewRound(false);
    setSelectedApplicants([]);
    setActiveRoundTab(undefined);

    if (isSelectingForNewRound) {
      toast({
        title: `Omgång startad`,
        description: `Erbjudande skickat till ${applicantIds.length} sökande.`,
      });
    } else {
      toast({
        title: "Erbjudande skickat",
        description: `Erbjudanden har skickats till ${applicantIds.length} valda sökande`,
      });
      navigate('/rentals/housing', { state: { activeHousingTab: 'erbjudna' } });
    }
  };

  if (!housingId) {
    return (
      <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
        <div className="p-6">
          <div className="text-center">
            <p className="text-muted-foreground">Ogiltigt bostads-ID</p>
            <Button onClick={handleBack} className="mt-4">Tillbaka till bostäder</Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (isLoading) {
    return (
      <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
        <div className="p-6">
          <HousingHeader housingAddress="" offerStatus="" housing={undefined} hasOffers={false} onBack={handleBack} onCreateOffer={() => {}} isCreatingOffer={false} />
          <div className="text-center py-8">Laddar bostadsdetaljer...</div>
        </div>
      </PageLayout>
    );
  }

  if (!listing) {
    return (
      <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
        <div className="p-6">
          <HousingHeader housingAddress="" offerStatus="" housing={undefined} hasOffers={false} onBack={handleBack} onCreateOffer={() => {}} isCreatingOffer={false} />
          <div className="text-center py-8">
            <p className="text-muted-foreground">Bostaden kunde inte hittas</p>
            <Button onClick={handleBack} className="mt-4">Tillbaka till bostäder</Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  const isHistoryMode = location.state?.activeHousingTab === 'historik' || !!listing.history;
  const status = getHousingStatus(listing);
  const tabLabelFromState = housingTabs.find(t => t.value === activeHousingTab)?.label;
  const offerStatus = isHistoryMode ? "Historik" :
                    tabLabelFromState ??
                    (status === 'published' ? "Publicerat nu" :
                    status === 'ready_for_offer' ? "Erbjud visning" :
                    status === 'offered' ? "Visning" : "Publicerat nu");

  const rounds = getRoundsForListing(housingId);
  const activeRounds = rounds.filter(r => r.status === 'Active');
  const activeOffer = getOfferForListing(housingId);
  const isOfferedMode = activeHousingTab === 'erbjudna' || isListingOffered(housingId);
  const isContractMode = location.state?.activeHousingTab === 'kontrakt';

  const top10Ids = new Set(
    listing.applicants.slice().sort((a, b) => b.queuePoints - a.queuePoints).slice(0, 10).map(a => a.id)
  );
  const displayedApplicants = isContractMode
    ? listing.applicants.filter(a => top10Ids.has(a.id))
    : listing.applicants;

  const acceptedApplicantIds = new Set(
    isContractMode
      ? displayedApplicants.filter(a => a.id % 5 === 0 || a.id % 5 === 1).map(a => a.id)
      : []
  );
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

  const showRoundsView = isOfferedMode && rounds.length > 0 && !isContractMode && !isHistoryMode;
  const currentTabValue = activeRoundTab ?? (isSelectingForNewRound ? NEW_ROUND_TAB : (rounds[rounds.length - 1]?.id ?? ""));




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
          hasOffers={rounds.length > 0}
          hasSelectedApplicants={selectedApplicants.length > 0}
          onBack={handleBack}
          onCreateOffer={handleOpenOfferDialog}
          isCreatingOffer={false}
          readOnly={isHistoryMode}
          activeRoundsCount={activeRounds.length}
          isSelectingForNewRound={isSelectingForNewRound}
          onCancelSelection={handleCancelSelection}
          onSendNewRound={handleOpenOfferDialog}
        />


        <div className="space-y-8">
          <HousingInfo
            housing={listing}
            applicantCount={displayedApplicants.length}
            notesSlot={!isHistoryMode ? (
              <Notes
                entityType="housing"
                entityId={housingId}
                title="Noteringar för bostad"
                placeholder="Skriv en notering om denna bostad..."
                emptyMessage="Inga noteringar har lagts till för denna bostad ännu."
                categories={["Underhåll", "Klagomål", "Allmänt", "Uthyrning"]}
                showCategory={true}
              />
            ) : undefined}
          />

          <section>
            <div className="flex items-center justify-between mb-4 gap-2">
              <h2 className="text-xl font-semibold">
                {isHistoryMode ? 'Sökande i denna uthyrning' :
                 isContractMode ? 'Sökande som tackat ja' : 'Intresseanmälningar'}
              </h2>
              {!isHistoryMode && !showRoundsView && !isSelectingForNewRound && (
                <div className="flex items-center gap-2">
                  {status === 'ready_for_offer' && rounds.length === 0 && (
                    <Button
                      onClick={handleOpenOfferDialog}
                      disabled={selectedApplicants.length === 0}
                      className="flex items-center gap-1"
                    >
                      <PlusCircle className="h-4 w-4" />
                      <span>Skicka erbjudande</span>
                    </Button>
                  )}
                  <HousingRowActions
                    housing={listing}
                    tab={(offerStatus === 'Publicerat nu' ? 'publicerade' :
                          offerStatus === 'Erbjud visning' ? 'klaraForErbjudande' :
                          offerStatus === 'Visning' ? 'erbjudna' : 'publicerade') as HousingActionTab}
                    variant="detail"
                    hidePrimary={offerStatus === 'Erbjud visning'}
                  />
                </div>
              )}
              {!isHistoryMode && showRoundsView && !isSelectingForNewRound && canStartNewRound(housingId) && (
                <Button variant="outline" onClick={handleStartNewRound}>
                  Starta ny erbjudandeomgång
                </Button>
              )}
            </div>

            {showRoundsView ? (
              <Tabs value={currentTabValue} onValueChange={setActiveRoundTab} className="w-full">
                <TabsList className="flex flex-wrap h-auto justify-start">
                  {rounds.map(r => (
                    <TabsTrigger key={r.id} value={r.id}>
                      Omgång {r.roundNumber}
                    </TabsTrigger>
                  ))}
                  {isSelectingForNewRound && (
                    <TabsTrigger value={NEW_ROUND_TAB}>
                      Ny omgång (urval)
                    </TabsTrigger>
                  )}
                </TabsList>

                {rounds.map(r => {
                  const previousRoundIds = rounds
                    .filter(x => x.roundNumber < r.roundNumber)
                    .flatMap(x => x.selectedApplicants);
                  const acceptedResp = r.responses.find(x => x.response === 'accepted');
                  const acceptedName = acceptedResp
                    ? listing.applicants.find(a => a.id === acceptedResp.applicantId)?.name
                    : undefined;
                  return (
                    <TabsContent key={r.id} value={r.id} className="mt-4">
                      <RoundSummaryBar
                        round={r}
                        onCancel={() => cancelRound(housingId, r.id)}
                        onEditOffer={() => {
                          setActiveRoundTab(r.id);
                          setIsEditOfferDialogOpen(true);
                        }}
                        acceptedApplicantName={acceptedName}
                      />
                      <HousingApplicantsTable
                        applicants={displayedApplicants}
                        housingAddress={listing.address}
                        listingId={listing.id}
                        showSelectionColumn={false}
                        offeredApplicantIds={r.selectedApplicants}
                        previousRoundApplicantIds={previousRoundIds}
                      />
                    </TabsContent>
                  );
                })}

                {isSelectingForNewRound && (
                  <TabsContent value={NEW_ROUND_TAB} className="mt-4">
                    <div className="rounded-lg border bg-muted/30 px-4 py-3 mb-3 text-sm">
                      <strong>Välj sökande till omgång {rounds.length + 1}.</strong>{" "}
                      Förvalda: top {Math.min(5, displayedApplicants.length)} efter köpoäng som inte har aktivt erbjudande och inte tackat nej tidigare.
                    </div>
                    <HousingApplicantsTable
                      applicants={displayedApplicants}
                      housingAddress={listing.address}
                      listingId={listing.id}
                      showSelectionColumn={true}
                      onSelectionChange={setSelectedApplicants}
                      autoSelectTopApplicants={true}
                      autoSelectCount={5}
                      declinedInPreviousRoundIds={declinedInPreviousRoundIds}
                      activeRoundApplicantIds={activeRoundApplicantIds}
                    />
                  </TabsContent>
                )}
              </Tabs>
            ) : (
              <HousingApplicantsTable
                applicants={displayedApplicants}
                housingAddress={listing.address}
                listingId={listing.id}
                showOfferColumns={false}
                showSelectionColumn={!activeOffer && !isContractMode && !isHistoryMode}
                onSelectionChange={setSelectedApplicants}
                offeredApplicantIds={activeOffer?.selectedApplicants || []}
                contractMode={isContractMode}
                autoSelectTopApplicants={(status === 'ready_for_offer' || activeHousingTab === 'klaraForErbjudande') && !isHistoryMode && !isContractMode}
                historyMode={isHistoryMode}
                contractWinnerName={listing.history?.contractedTo}
                linkedContractApplicantId={linkedContractApplicantId}
                recommendedApplicantId={recommendedApplicantId}
                onLinkContract={handleLinkContract}
                onUnlinkContract={handleUnlinkContract}
              />
            )}
          </section>
        </div>
      </div>

      {!isHistoryMode && (
        <SendHousingOfferDialog
          open={isOfferDialogOpen}
          onOpenChange={setIsOfferDialogOpen}
          recipientCount={selectedApplicants.length}
          housingAddress={listing.address}
          onConfirm={handleConfirmOffer}
          roundNumber={isSelectingForNewRound ? rounds.length + 1 : (rounds.length === 0 ? 1 : undefined)}
          parallelActiveRounds={isSelectingForNewRound ? activeRounds.length : 0}
        />
      )}

      {!isHistoryMode && (() => {
        const editingRound = rounds.find(r => r.id === activeRoundTab);
        if (!editingRound) return null;
        return (
          <SendHousingOfferDialog
            open={isEditOfferDialogOpen}
            onOpenChange={setIsEditOfferDialogOpen}
            recipientCount={editingRound.selectedApplicants.length}
            housingAddress={listing.address}
            mode="edit"
            roundNumber={editingRound.roundNumber}
            onConfirm={() => {
              setIsEditOfferDialogOpen(false);
              sonnerToast.success(`Erbjudandet för omgång ${editingRound.roundNumber} har uppdaterats`);
            }}
          />
        );
      })()}

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
