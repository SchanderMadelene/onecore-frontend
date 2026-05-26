import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageLayout } from "@/layouts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/components/ui/tag";
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { ArrowLeft } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { sv } from "date-fns/locale";
import { toast } from "sonner";

import { poangfriListings as initialListings } from "@/features/rentals/data/poangfri-housing";
import {
  CommunicationEntry,
  CommunicationType,
  PoangfriInterest,
  PoangfriInterestStatus,
  PoangfriListing,
  POANGFRI_INTEREST_STATUS_LABELS,
  POANGFRI_INTEREST_STATUS_VARIANTS,
  POANGFRI_LISTING_STATUS_LABELS,
  POANGFRI_LISTING_STATUS_VARIANTS,
} from "@/features/rentals/types/poangfri";
import { PoangfriLogContactDialog } from "./components/PoangfriLogContactDialog";
import { PoangfriInterestSheet } from "./components/PoangfriInterestSheet";

const HANDLAGGARE = "Karin Lundqvist";

const formatDate = (iso: string) =>
  format(new Date(iso), "yyyy-MM-dd", { locale: sv });

const formatRelative = (iso: string) =>
  formatDistanceToNow(new Date(iso), { addSuffix: true, locale: sv });

export default function PoangfriHousingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [listing, setListing] = useState<PoangfriListing | undefined>(
    () => initialListings.find((l) => l.id === id)
  );

  const [selectedInterestId, setSelectedInterestId] = useState<string | null>(null);
  const [logOpen, setLogOpen] = useState(false);
  const [logTargetId, setLogTargetId] = useState<string | null>(null);
  const [contractTargetId, setContractTargetId] = useState<string | null>(null);
  const [unpublishOpen, setUnpublishOpen] = useState(false);

  const sortedInterests = useMemo(() => {
    if (!listing) return [];
    return [...listing.interests].sort(
      (a, b) => new Date(a.registeredAt).getTime() - new Date(b.registeredAt).getTime()
    );
  }, [listing]);

  if (!listing) {
    return (
      <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
        <div className="space-y-4">
          <Button variant="outline" size="sm" onClick={() => navigate("/rentals/housing/poangfritt")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tillbaka
          </Button>
          <p className="text-muted-foreground">Annonsen kunde inte hittas.</p>
        </div>
      </PageLayout>
    );
  }

  const isClosed =
    listing.status === "contract_created" || listing.status === "unpublished";

  const selectedInterest =
    sortedInterests.find((i) => i.id === selectedInterestId) ?? null;
  const selectedRank = selectedInterest
    ? sortedInterests.findIndex((i) => i.id === selectedInterestId) + 1
    : null;

  const logTarget = sortedInterests.find((i) => i.id === logTargetId) ?? null;
  const contractTarget = sortedInterests.find((i) => i.id === contractTargetId) ?? null;

  const updateInterest = (
    interestId: string,
    updater: (i: PoangfriInterest) => PoangfriInterest
  ) => {
    setListing((prev) =>
      prev
        ? {
            ...prev,
            status: prev.status === "published" ? "in_progress" : prev.status,
            interests: prev.interests.map((i) =>
              i.id === interestId ? updater(i) : i
            ),
          }
        : prev
    );
  };

  const handleLogSubmit = (data: {
    type: CommunicationType;
    summary: string;
    newStatus: PoangfriInterestStatus;
  }) => {
    if (!logTargetId) return;
    const entry: CommunicationEntry = {
      id: `c-${Date.now()}`,
      type: data.type,
      date: new Date().toISOString(),
      author: HANDLAGGARE,
      summary: data.summary,
    };
    updateInterest(logTargetId, (i) => ({
      ...i,
      status: data.newStatus,
      communications: [...i.communications, entry],
    }));
    toast.success("Kontakt loggad");
  };

  const markStatus = (interestId: string, status: PoangfriInterestStatus) => {
    updateInterest(interestId, (i) => ({ ...i, status }));
    toast.success(`Markerad som ${POANGFRI_INTEREST_STATUS_LABELS[status].toLowerCase()}`);
  };

  const handleCreateContract = () => {
    if (!contractTargetId) return;
    setListing((prev) =>
      prev
        ? {
            ...prev,
            status: "contract_created",
            interests: prev.interests.map((i) =>
              i.id === contractTargetId
                ? { ...i, status: "accepted" as PoangfriInterestStatus }
                : { ...i, status: "not_assigned" as PoangfriInterestStatus }
            ),
          }
        : prev
    );
    toast.success("Kontrakt skapat – annons avpublicerad och övriga markerade som ej tilldelad");
    setContractTargetId(null);
    setSelectedInterestId(null);
  };

  const handleUnpublish = () => {
    setListing((prev) => (prev ? { ...prev, status: "unpublished" } : prev));
    toast.success("Annons avpublicerad");
    setUnpublishOpen(false);
  };

  const lastComm = (i: PoangfriInterest) =>
    i.communications.length > 0
      ? [...i.communications].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )[0]
      : null;

  const columns = [
    {
      key: "rank",
      label: "#",
      render: (_: PoangfriInterest, idx: number) => (
        <span className="text-sm text-muted-foreground tabular-nums">{idx + 1}</span>
      ),
    },
    {
      key: "name",
      label: "Sökande",
      render: (i: PoangfriInterest) => (
        <div className="space-y-0.5">
          <div className="font-medium">{i.name}</div>
          <div className="text-xs text-muted-foreground">{i.customerNumber}</div>
        </div>
      ),
    },
    {
      key: "contact",
      label: "Kontakt",
      hideOnMobile: true,
      render: (i: PoangfriInterest) => (
        <div className="text-sm space-y-0.5">
          <div>{i.phone}</div>
          <div className="text-xs text-muted-foreground">{i.email}</div>
        </div>
      ),
    },
    {
      key: "registeredAt",
      label: "Anmäld",
      hideOnMobile: true,
      render: (i: PoangfriInterest) => (
        <span className="text-sm text-muted-foreground">
          {formatDate(i.registeredAt)}
        </span>
      ),
    },
    {
      key: "lastComm",
      label: "Senaste kontakt",
      hideOnMobile: true,
      render: (i: PoangfriInterest) => {
        const c = lastComm(i);
        if (!c) return <span className="text-xs text-muted-foreground">—</span>;
        return (
          <div className="text-sm">
            <div className="line-clamp-1">{c.summary}</div>
            <div className="text-xs text-muted-foreground">
              {formatRelative(c.date)}
            </div>
          </div>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      render: (i: PoangfriInterest) => (
        <Badge variant={POANGFRI_INTEREST_STATUS_VARIANTS[i.status]}>
          {POANGFRI_INTEREST_STATUS_LABELS[i.status]}
        </Badge>
      ),
    },
  ];

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/rentals/housing/poangfritt")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Tillbaka
          </Button>
        </div>

        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-3xl font-bold tracking-tight">
                {listing.address}
              </h1>
              <Badge variant={POANGFRI_LISTING_STATUS_VARIANTS[listing.status]}>
                {POANGFRI_LISTING_STATUS_LABELS[listing.status]}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <Tag>{listing.area}</Tag>
              <span>{listing.rentalObjectId}</span>
              <span>·</span>
              <span>{listing.type} · {listing.rooms} rok · {listing.size}</span>
              <span>·</span>
              <span>{listing.rent}</span>
            </div>
          </div>

          {!isClosed && (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setUnpublishOpen(true)}>
                Avpublicera
              </Button>
            </div>
          )}
        </div>

        <Card>
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Publicerad
                </p>
                <p className="text-sm">{formatDate(listing.publishedAt)}</p>
              </div>
              {listing.convertedFromAdId && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Konverterad från
                  </p>
                  <p className="text-sm">{listing.convertedFromAdId}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Antal intresseanmälningar
                </p>
                <p className="text-sm font-medium">{listing.interests.length}</p>
              </div>
            </div>
            <div className="space-y-3">
              {listing.description && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Beskrivning
                  </p>
                  <p className="text-sm leading-relaxed">{listing.description}</p>
                </div>
              )}
              {listing.infoText && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Info till sökande
                  </p>
                  <p className="text-sm leading-relaxed">{listing.infoText}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Intresselista</h2>
            <p className="text-sm text-muted-foreground">
              Sorterad efter anmälningsdatum – äldst först
            </p>
          </div>
          <Card>
            <CardContent className="p-0">
              <ResponsiveTable
                data={sortedInterests}
                columns={columns}
                keyExtractor={(i: PoangfriInterest) => i.id}
                emptyMessage="Inga intresseanmälningar än"
                onRowClick={(i: PoangfriInterest) => setSelectedInterestId(i.id)}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <PoangfriInterestSheet
        interest={selectedInterest}
        rank={selectedRank}
        onOpenChange={(open) => !open && setSelectedInterestId(null)}
        onLogContact={() => {
          if (selectedInterest) {
            setLogTargetId(selectedInterest.id);
            setLogOpen(true);
          }
        }}
        onCreateContract={() => {
          if (selectedInterest) setContractTargetId(selectedInterest.id);
        }}
        onMarkAccepted={() => {
          if (selectedInterest) markStatus(selectedInterest.id, "accepted");
        }}
        onMarkDeclined={() => {
          if (selectedInterest) markStatus(selectedInterest.id, "declined");
        }}
      />

      <PoangfriLogContactDialog
        open={logOpen}
        onOpenChange={setLogOpen}
        interestName={logTarget?.name ?? ""}
        currentStatus={logTarget?.status ?? "new"}
        onSubmit={handleLogSubmit}
      />

      <ConfirmDialog
        open={!!contractTarget}
        onOpenChange={(open) => !open && setContractTargetId(null)}
        title="Skapa kontrakt"
        description={
          <div className="space-y-2">
            <p>
              Skapa kontrakt med <strong>{contractTarget?.name}</strong> för{" "}
              <strong>{listing.address}</strong>.
            </p>
            <p className="text-sm text-muted-foreground">
              När du bekräftar händer följande automatiskt:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Annonsen avpubliceras från Mimer.nu</li>
              <li>Välkomstmejl skickas till den tilldelade sökande</li>
              <li>Övriga sökande markeras som "Ej tilldelad"</li>
              <li>Ärendet arkiveras</li>
            </ul>
          </div>
        }
        confirmLabel="Skapa kontrakt"
        onConfirm={handleCreateContract}
      />

      <ConfirmDialog
        open={unpublishOpen}
        onOpenChange={setUnpublishOpen}
        title="Avpublicera annons"
        description="Annonsen tas bort från Mimer.nu. Intresseanmälningarna sparas men inga nya kan komma in."
        confirmLabel="Avpublicera"
        variant="destructive"
        onConfirm={handleUnpublish}
      />
    </PageLayout>
  );
}
