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
import { XCircle } from "lucide-react";
import { getHousingOfferStatus, getRoundTabLabel } from "./utils/housingOfferUtils";

const NEW_ROUND_TAB = "__new_round__";

const HousingDetailPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [cancelTargetRoundId, setCancelTargetRoundId] = useState<number | null>(null);
  const [smsOpen, setSmsOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | undefined>(undefined);
  const [isSelectingForNewRound, setIsSelectingForNewRound] = useState(false);

  const { housingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    startNewRound,
    cancelRound,
    getRoundsForListing,
    getActiveRounds,
    canStartNewRound,
    
    linkContract,
    unlinkContract,
    getLinkedContract,
  } = useHousingOffers();
  const { getHousingStatus } = useHousingStatus();

  const { data: listing, isLoading } = useHousingListing(housingId || "");

  const rounds = housingId ? getRoundsForListing(housingId) : [];
  const activeRounds = housingId ? getActiveRounds(housingId) : [];
  const offerStatusInfo = getHousingOfferStatus(rounds);
  const canStartNew = housingId ? canStartNewRound(housingId) : false;

  // Sätt default-tab när rounds finns: senaste omgången, eller "ny omgång"-tab om vi just klickade
  useEffect(() => {
    if (isSelectingForNewRound) {
      setActiveTab(NEW_ROUND_TAB);
      return;
    }
    if (rounds.length > 0 && !activeTab) {
      setActiveTab(`round-${rounds[rounds.length - 1].id}`);
    }
  }, [rounds, isSelectingForNewRound, activeTab]);

  // Bygg recipient-listan för bulk-SMS/mejl baserat på markerade sökande
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
    navigate('/rentals?tab=housing', { state: { activeHousingTab } });
  };

  const handleOpenOfferDialog = () => {
    if (!housingId || selectedApplicants.length === 0) return;
    setIsOfferDialogOpen(true);
  };

  const handleConfirmOffer = (_dispatch: HousingOfferDispatch) => {
    if (!housingId || selectedApplicants.length === 0) return;

    const applicantIds = selectedApplicants.map(id => parseInt(id));
    startNewRound(housingId, applicantIds);

    setIsOfferDialogOpen(false);
    setIsSelectingForNewRound(false);
    setSelectedApplicants([]);
    setActiveTab(undefined); // låt useEffect välja senaste round-tab

    toast({
      title: "Erbjudande skickat",
      description: `Erbjudanden har skickats till ${applicantIds.length} valda sökande`,
    });
  };

  const handleStartNewRound = () => {
    setIsSelectingForNewRound(true);
    setSelectedApplicants([]);
    setActiveTab(NEW_ROUND_TAB);
  };

  const handleCancelNewRoundSelection = () => {
    setIsSelectingForNewRound(false);
    setSelectedApplicants([]);
    setActiveTab(undefined);
  };

  const handleConfirmCancelRound = () => {
    if (!housingId || cancelTargetRoundId === null) return;
    cancelRound(housingId, cancelTargetRoundId);
    const cancelledRound = rounds.find(r => r.id === cancelTargetRoundId);
    setCancelTargetRoundId(null);
    setIsCancelDialogOpen(false);
    sonnerToast.success(
      cancelledRound
        ? `Omgång ${cancelledRound.roundNumber} har avbrutits`
        : "Omgången har avbrutits"
    );
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
            <Button onClick={handleBack} className="mt-4">Tillbaka till bostäder</Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  const isHistoryMode = location.state?.activeHousingTab === 'historik' || !!listing.history;
  const isContractMode = location.state?.activeHousingTab === 'kontrakt';
  const status = getHousingStatus(listing);

  // Statuslabel för header. För omgångsstatusar inkluderar vi roundNumber via separat prop.
  const offerStatus =
    isHistoryMode ? "Historik" :
    isContractMode ? "Kontrakt" :
    rounds.length > 0 ? offerStatusInfo.status :
    status === 'published' ? "Publicerad" :
    status === 'ready_for_offer' ? "Klara för erbjudande" :
    "Klara för erbjudande";

  // Sökande-urval för kontraktsläge (oförändrad logik)
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

  // Kartor: senaste omgång en sökande fick erbjudande i, samt om den omgången är aktiv.
  // Visas alltid när rounds finns så att användaren ser vilka som redan fått/har aktivt erbjudande.
  const previousRoundByApplicant: Record<number, number> = {};
  const activeRoundByApplicant: Record<number, number> = {};
  if (rounds.length > 0) {
    for (const a of listing.applicants) {
      for (let i = rounds.length - 1; i >= 0; i--) {
        const r = rounds[i];
        if (r.selectedApplicants.includes(a.id)) {
          previousRoundByApplicant[a.id] = r.roundNumber;
          if (r.status === 'Active') activeRoundByApplicant[a.id] = r.roundNumber;
          break;
        }
      }
    }
  }

  // ───── Render: vy beroende på läge ─────
  const renderInitialSelectionView = () => (
    <section>
      <h2 className="text-xl font-semibold mb-4">Intresseanmälningar</h2>
      <HousingApplicantsTable
        applicants={displayedApplicants}
        housingAddress={listing.address}
        listingId={listing.id}
        showOfferColumns={false}
        showSelectionColumn={true}
        onSelectionChange={setSelectedApplicants}
        autoSelectTopApplicants={status === 'ready_for_offer'}
      />
    </section>
  );

  const renderNewRoundSelectionView = () => (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Välj sökande till omgång {rounds.length + 1}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Sökande som fått erbjudande i tidigare omgångar är markerade men kan väljas igen.
          </p>
        </div>
        <Button variant="ghost" onClick={handleCancelNewRoundSelection}>Avbryt urval</Button>
      </div>
      <HousingApplicantsTable
        applicants={displayedApplicants}
        housingAddress={listing.address}
        listingId={listing.id}
        showOfferColumns={false}
        showSelectionColumn={true}
        onSelectionChange={setSelectedApplicants}
        previousRoundByApplicant={previousRoundByApplicant}
        activeRoundByApplicant={activeRoundByApplicant}
      />
    </section>
  );

  const renderRoundsTabsView = () => (
    <section>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Erbjudandeomgångar</h2>
        </div>
        <TabsList className="mb-4 flex-wrap h-auto">
          {rounds.map(r => (
            <TabsTrigger key={r.id} value={`round-${r.id}`}>
              {getRoundTabLabel(r)}
            </TabsTrigger>
          ))}
          {isSelectingForNewRound && (
            <TabsTrigger value={NEW_ROUND_TAB}>Ny omgång (urval)</TabsTrigger>
          )}
        </TabsList>
        {rounds.map(r => (
          <TabsContent key={r.id} value={`round-${r.id}`}>
            {r.status === 'Active' && !isHistoryMode && !isContractMode && (
              <div className="flex items-center justify-end mb-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCancelTargetRoundId(r.id);
                    setIsCancelDialogOpen(true);
                  }}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Avbryt denna omgång
                </Button>
              </div>
            )}
            <HousingApplicantsTable
              applicants={displayedApplicants.filter(a => r.selectedApplicants.includes(a.id))}
              housingAddress={listing.address}
              listingId={listing.id}
              showOfferColumns={false}
              showSelectionColumn={false}
              offeredApplicantIds={r.selectedApplicants}
            />
          </TabsContent>
        ))}
        {isSelectingForNewRound && (
          <TabsContent value={NEW_ROUND_TAB}>
            {renderNewRoundSelectionView()}
          </TabsContent>
        )}
      </Tabs>
    </section>
  );

  const renderApplicantsSection = () => {
    if (isHistoryMode || isContractMode) {
      return (
        <section>
          <h2 className="text-xl font-semibold mb-4">
            {isHistoryMode ? 'Sökande i denna uthyrning' : 'Sökande som tackat ja'}
          </h2>
          <HousingApplicantsTable
            applicants={displayedApplicants}
            housingAddress={listing.address}
            listingId={listing.id}
            showOfferColumns={false}
            showSelectionColumn={false}
            contractMode={isContractMode}
            historyMode={isHistoryMode}
            contractWinnerName={listing.history?.contractedTo}
            linkedContractApplicantId={linkedContractApplicantId}
            recommendedApplicantId={recommendedApplicantId}
            onLinkContract={handleLinkContract}
            onUnlinkContract={handleUnlinkContract}
          />
        </section>
      );
    }
    if (rounds.length === 0) {
      return renderInitialSelectionView();
    }
    return renderRoundsTabsView();
  };

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="p-6">
        <HousingHeader
          housingAddress={listing.address}
          offerStatus={offerStatus}
          currentRoundNumber={
            rounds.length > 0 && !isHistoryMode && !isContractMode
              ? offerStatusInfo.roundNumber
              : undefined
          }
          activeRoundsCount={
            rounds.length > 0 && !isHistoryMode && !isContractMode
              ? offerStatusInfo.activeCount
              : undefined
          }
          housing={listing}
          hasOffers={rounds.length > 0}
          hasSelectedApplicants={selectedApplicants.length > 0}
          canStartNewRound={canStartNew && rounds.length > 0 && !isHistoryMode && !isContractMode}
          isSelectingForNewRound={isSelectingForNewRound}
          onBack={handleBack}
          onCreateOffer={handleOpenOfferDialog}
          onStartNewRound={handleStartNewRound}
          isCreatingOffer={false}
          readOnly={isHistoryMode}
        />

        <div className="space-y-8">
          {renderApplicantsSection()}

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

      {(() => {
        const target = rounds.find(r => r.id === cancelTargetRoundId);
        const roundLabel = target ? `omgång ${target.roundNumber}` : "omgången";
        return (
          <ConfirmDialog
            open={isCancelDialogOpen}
            onOpenChange={(open) => {
              setIsCancelDialogOpen(open);
              if (!open) setCancelTargetRoundId(null);
            }}
            title={`Avbryt ${roundLabel}?`}
            description="Sökande i denna omgång kommer inte längre att kunna svara. Övriga aktiva omgångar påverkas inte."
            confirmLabel="Avbryt omgång"
            cancelLabel="Behåll"
            onConfirm={handleConfirmCancelRound}
            variant="destructive"
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
