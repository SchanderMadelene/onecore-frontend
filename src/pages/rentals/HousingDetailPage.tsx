import { useParams, useNavigate, useLocation } from "react-router-dom";
import { PageLayout } from "@/layouts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHousingListing, useHousingStatus } from "@/features/rentals";
import { toast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";
import { useHousingOffers } from "@/contexts/HousingOffersContext";
import { useState, useMemo, useEffect } from "react";
import { Notes } from "@/components/common";
import { HousingHeader } from "./components/HousingHeader";
import { HousingApplicantsTable } from "./components/HousingApplicantsTable";
import { HousingInfo } from "./components/HousingInfo";
import { SendHousingOfferDialog, type HousingOfferDispatch } from "@/features/rentals/components/SendHousingOfferDialog";
import { BulkActionBar } from "@/shared/ui/bulk-action-bar";
import { BulkSmsModal, BulkEmailModal } from "@/features/communication";
import { ConfirmDialog } from "@/shared/common";
import { getRoundTabLabel } from "./utils/housingOfferUtils";

const NEW_ROUND_TAB = "__new_round__";

const HousingDetailPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
  const [isSelectingForNewRound, setIsSelectingForNewRound] = useState(false);
  const [activeTab, setActiveTab] = useState<string | undefined>(undefined);
  const [cancelRoundId, setCancelRoundId] = useState<number | null>(null);
  const [smsOpen, setSmsOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const { housingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    startNewRound,
    cancelRound,
    getRoundsForListing,
    getActiveRounds,
    canStartNewRound,
    isListingOffered,
    getOfferForListing,
    linkContract,
    unlinkContract,
    getLinkedContract,
    getPreviousRoundsByApplicant,
  } = useHousingOffers();
  const { getHousingStatus } = useHousingStatus();

  const { data: listing, isLoading } = useHousingListing(housingId || "");

  const rounds = housingId ? getRoundsForListing(housingId) : [];
  const activeRounds = housingId ? getActiveRounds(housingId) : [];
  const canStartNew = housingId ? canStartNewRound(housingId) : false;
  const latestRound = rounds.length > 0 ? rounds[rounds.length - 1] : undefined;

  // När en ny rond skapas → auto-välj senaste rondens tab
  useEffect(() => {
    if (rounds.length === 0) {
      setActiveTab(undefined);
      return;
    }
    if (isSelectingForNewRound) {
      setActiveTab(NEW_ROUND_TAB);
      return;
    }
    if (!activeTab || (activeTab !== NEW_ROUND_TAB && !rounds.some(r => `round-${r.id}` === activeTab))) {
      setActiveTab(`round-${rounds[rounds.length - 1].id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rounds.length, isSelectingForNewRound]);

  // Bygg recipient-listan för bulk-SMS/mejl baserat på markerade sökande.
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
    const activeHousingTab = location.state?.activeHousingTab || "publicerade";
    navigate('/rentals/housing', {
      state: { activeHousingTab }
    });
  };

  const handleOpenOfferDialog = () => {
    if (!housingId || selectedApplicants.length === 0) return;
    setIsOfferDialogOpen(true);
  };

  const handleStartNewRound = () => {
    setIsSelectingForNewRound(true);
    setSelectedApplicants([]);
    setActiveTab(NEW_ROUND_TAB);
  };

  const handleCancelSelection = () => {
    setIsSelectingForNewRound(false);
    setSelectedApplicants([]);
    setActiveTab(undefined);
  };

  const handleConfirmOffer = (_dispatch: HousingOfferDispatch) => {
    if (!housingId || selectedApplicants.length === 0) return;
    const applicantIds = selectedApplicants.map(id => parseInt(id));
    const wasFirstRound = rounds.length === 0;

    startNewRound(housingId, applicantIds);

    setIsOfferDialogOpen(false);
    setIsSelectingForNewRound(false);
    setSelectedApplicants([]);
    setActiveTab(undefined);

    toast({
      title: wasFirstRound ? "Erbjudande skickat" : "Ny erbjudandeomgång startad",
      description: `Erbjudanden har skickats till ${applicantIds.length} valda sökande`,
    });

    if (wasFirstRound) {
      navigate('/rentals/housing', {
        state: { activeHousingTab: 'erbjudna' }
      });
    }
  };

  const handleConfirmCancelRound = () => {
    if (!housingId || cancelRoundId === null) return;
    cancelRound(housingId, cancelRoundId);
    setCancelRoundId(null);
    sonnerToast.success("Omgången avbruten");
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
  const offerStatus =
    isHistoryMode ? "Historik" :
    status === 'history' ? "Historik" :
    status === 'contract' ? "Kontrakt" :
    status === 'published' ? "Publicerad" :
    status === 'ready_for_offer' ? "Klara för erbjudande" :
    status === 'offered' ? "Erbjudna" : "Publicerad";

  // Kontrakt-läge: top 10 efter köpoäng spegling (oförändrat)
  const isContractMode = location.state?.activeHousingTab === 'kontrakt';

  const TAB_LABELS: Record<string, string> = {
    behovAvPublicering: "Publicera",
    publicerade: "Publicerat nu",
    klaraForErbjudande: "Erbjud visning",
    erbjudna: "Visning",
    kontrakt: "Erbjud kontrakt",
    historik: "Historik",
  };
  const activeHousingTab = location.state?.activeHousingTab as string | undefined;
  const sourceTabLabel = activeHousingTab ? TAB_LABELS[activeHousingTab] : undefined;

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

  const activeOffer = getOfferForListing(housingId);
  const hasRounds = rounds.length > 0;

  // Header-konfiguration
  const showSendOfferAction =
    !isHistoryMode && !isContractMode && (
      // Omgång 1 i "Klara för erbjudande" — som tidigare
      (!hasRounds && status === 'ready_for_offer') ||
      // Eller i urvalsläge för ny omgång
      isSelectingForNewRound
    );

  // Vad ska visas i huvudsektionen
  const showRoundsTabs = !isHistoryMode && !isContractMode && hasRounds;
  const showInitialSelection =
    !isHistoryMode && !isContractMode && !hasRounds;

  const sectionHeading =
    isHistoryMode ? 'Sökande i denna uthyrning' :
    isContractMode ? 'Sökande som tackat ja' :
    'Intresseanmälningar';

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="p-6">
        <HousingHeader
          housingAddress={listing.address}
          offerStatus={offerStatus}
          housing={listing}
          hasOffers={hasRounds || isListingOffered(housingId)}
          hasSelectedApplicants={selectedApplicants.length > 0}
          onBack={handleBack}
          onCreateOffer={handleOpenOfferDialog}
          isCreatingOffer={false}
          readOnly={isHistoryMode}
          showSendOfferAction={showSendOfferAction}
          canStartNewRound={canStartNew && !isContractMode}
          isSelectingForNewRound={isSelectingForNewRound}
          onStartNewRound={handleStartNewRound}
          onCancelSelection={handleCancelSelection}
          activeRoundsCount={activeRounds.length}
          latestRoundNumber={latestRound?.roundNumber}
          sourceTabLabel={sourceTabLabel}
        />

        <div className="space-y-8">
          {(isHistoryMode || isContractMode) && (
            <section>
              <h2 className="text-xl font-semibold mb-4">{sectionHeading}</h2>
              <HousingApplicantsTable
                applicants={displayedApplicants}
                housingAddress={listing.address}
                listingId={listing.id}
                showOfferColumns={false}
                showSelectionColumn={false}
                offeredApplicantIds={activeOffer?.selectedApplicants || []}
                contractMode={isContractMode}
                historyMode={isHistoryMode}
                contractWinnerName={listing.history?.contractedTo}
                linkedContractApplicantId={linkedContractApplicantId}
                recommendedApplicantId={recommendedApplicantId}
                onLinkContract={handleLinkContract}
                onUnlinkContract={handleUnlinkContract}
              />
            </section>
          )}

          {showInitialSelection && (
            <section>
              <h2 className="text-xl font-semibold mb-4">{sectionHeading}</h2>
              <HousingApplicantsTable
                applicants={displayedApplicants}
                housingAddress={listing.address}
                listingId={listing.id}
                showOfferColumns={false}
                showSelectionColumn={status === 'ready_for_offer'}
                onSelectionChange={setSelectedApplicants}
                autoSelectTopApplicants={status === 'ready_for_offer'}
              />
            </section>
          )}

          {showRoundsTabs && (
            <section>
              <h2 className="text-xl font-semibold mb-4">{sectionHeading}</h2>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4 flex-wrap h-auto">
                  {rounds.map(r => (
                    <TabsTrigger key={r.id} value={`round-${r.id}`}>
                      {getRoundTabLabel(r)}
                    </TabsTrigger>
                  ))}
                  {isSelectingForNewRound && (
                    <TabsTrigger value={NEW_ROUND_TAB}>
                      Ny omgång (urval)
                    </TabsTrigger>
                  )}
                </TabsList>

                {rounds.map(r => {
                  const prevForThisRound = getPreviousRoundsByApplicant(housingId, r.roundNumber);
                  return (
                    <TabsContent key={r.id} value={`round-${r.id}`}>
                      {r.status === 'Active' && (
                        <div className="flex justify-end mb-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCancelRoundId(r.id)}
                          >
                            Avbryt denna omgång
                          </Button>
                        </div>
                      )}
                      <HousingApplicantsTable
                        applicants={listing.applicants}
                        housingAddress={listing.address}
                        listingId={listing.id}
                        showOfferColumns={false}
                        showSelectionColumn={false}
                        offeredApplicantIds={r.selectedApplicants}
                        previousRoundByApplicant={prevForThisRound}
                      />
                    </TabsContent>
                  );
                })}

                {isSelectingForNewRound && (
                  <TabsContent value={NEW_ROUND_TAB}>
                    <p className="text-sm text-muted-foreground mb-3">
                      Välj sökande till omgång {(latestRound?.roundNumber ?? 0) + 1}.
                      Sökande som fått erbjudande i tidigare omgångar är markerade men kan väljas igen.
                    </p>
                    <HousingApplicantsTable
                      applicants={listing.applicants}
                      housingAddress={listing.address}
                      listingId={listing.id}
                      showOfferColumns={false}
                      showSelectionColumn={true}
                      onSelectionChange={setSelectedApplicants}
                      previousRoundByApplicant={getPreviousRoundsByApplicant(
                        housingId,
                        (latestRound?.roundNumber ?? 0) + 1
                      )}
                    />
                  </TabsContent>
                )}
              </Tabs>
            </section>
          )}

          <HousingInfo
            housing={listing}
            applicantCount={displayedApplicants.length}
          />

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

      <ConfirmDialog
        open={cancelRoundId !== null}
        onOpenChange={(open) => { if (!open) setCancelRoundId(null); }}
        title="Avbryt denna omgång?"
        description="Sökande i denna omgång kommer inte längre kunna svara. Andra parallella omgångar påverkas inte."
        confirmLabel="Avbryt omgång"
        cancelLabel="Behåll"
        variant="destructive"
        onConfirm={handleConfirmCancelRound}
      />

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
