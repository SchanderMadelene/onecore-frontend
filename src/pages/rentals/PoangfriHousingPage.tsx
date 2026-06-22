import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { PageLayout } from "@/layouts";
import { Search } from "lucide-react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { TabCount } from "@/shared/ui/tab-count";

import { poangfriListings } from "@/features/rentals/data/poangfri-housing";
import { getDistrictByArea } from "@/features/rentals/utils/area-district";
import {
  PoangfriListing,
  PoangfriListingStatus,
  POANGFRI_LISTING_STATUS_LABELS,
  POANGFRI_LISTING_STATUS_VARIANTS,
} from "@/features/rentals/types/poangfri";

const formatDate = (iso: string) => {
  try {
    return format(new Date(iso), "yyyy-MM-dd", { locale: sv });
  } catch {
    return "-";
  }
};

const STATUS_FILTERS: { value: PoangfriListingStatus | "all"; label: string }[] = [
  { value: "all", label: "Alla statusar" },
  { value: "ready_to_publish", label: "Att publicera" },
  { value: "published", label: "Publicerad" },
  { value: "in_progress", label: "Pågående kontakt" },
  { value: "contract_created", label: "Kontrakt skapat" },
  { value: "unpublished", label: "Avpublicerad" },
];

export default function PoangfriHousingPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"ready_to_publish" | "published_now">("ready_to_publish");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<PoangfriListingStatus | "all">("all");
  const [area, setArea] = useState<string>("all");
  const navigate = useNavigate();

  const areas = useMemo(
    () => Array.from(new Set(poangfriListings.map((l) => l.area))).sort(),
    []
  );

  const readyToPublishCount = useMemo(
    () => poangfriListings.filter((l) => l.status === "ready_to_publish").length,
    []
  );

  const publishedNowCount = useMemo(
    () => poangfriListings.filter((l) => l.status !== "ready_to_publish").length,
    []
  );

  const filtered = useMemo(() => {
    return poangfriListings.filter((l) => {
      if (activeTab === "ready_to_publish" && l.status !== "ready_to_publish") return false;
      if (activeTab === "published_now" && l.status === "ready_to_publish") return false;
      if (status !== "all" && l.status !== status) return false;
      if (area !== "all" && l.area !== area) return false;
      if (search) {
        const q = search.toLowerCase();
        const hay = `${l.address} ${l.area} ${l.rentalObjectId}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [search, status, area, activeTab]);

  const clearFilters = () => {
    setSearch("");
    setStatus("all");
    setArea("all");
  };

  const hasActiveFilters = search !== "" || status !== "all" || area !== "all";

  const columns = [
    {
      key: "address",
      label: "Objekt",
      render: (l: PoangfriListing) => (
        <div className="space-y-0.5">
          <div className="font-medium">{l.address}</div>
          <div className="text-xs text-muted-foreground">{l.rentalObjectId}</div>
        </div>
      ),
    },
    {
      key: "area",
      label: "Område",
      render: (l: PoangfriListing) => <Tag>{l.area}</Tag>,
    },
    {
      key: "district",
      label: "Distrikt",
      hideOnMobile: true,
      render: (l: PoangfriListing) => (
        <span className="text-sm">{getDistrictByArea(l.area)}</span>
      ),
    },
    {
      key: "type",
      label: "Typ",
      hideOnMobile: true,
      render: (l: PoangfriListing) => <span className="text-sm">{l.type}</span>,
    },
    {
      key: "rooms",
      label: "Rum",
      hideOnMobile: true,
      render: (l: PoangfriListing) => (
        <span className="text-sm tabular-nums">{l.rooms}</span>
      ),
    },
    {
      key: "size",
      label: "Yta",
      hideOnMobile: true,
      render: (l: PoangfriListing) => <span className="text-sm">{l.size}</span>,
    },
    {
      key: "rent",
      label: "Hyra",
      hideOnMobile: true,
      render: (l: PoangfriListing) => <span className="text-sm">{l.rent}</span>,
    },
    {
      key: "availableFrom",
      label: "Ledig från",
      hideOnMobile: true,
      render: (l: PoangfriListing) => (
        <span className="text-sm text-muted-foreground">
          {l.availableFrom ? formatDate(l.availableFrom) : "–"}
        </span>
      ),
    },
    {
      key: "publishedAt",
      label: "Publicerad",
      hideOnMobile: true,
      render: (l: PoangfriListing) => (
        <span className="text-sm text-muted-foreground">{formatDate(l.publishedAt)}</span>
      ),
    },
    {
      key: "interests",
      label: "Intresseanmälningar",
      render: (l: PoangfriListing) => {
        const unhandled = l.interests.filter((i) => i.status === "unhandled").length;
        return (
          <div className="text-sm flex items-center gap-2">
            <span className="font-medium">{l.interests.length}</span>
            {unhandled > 0 && (
              <Badge variant="warning">{unhandled} obehandlade</Badge>
            )}
          </div>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      render: (l: PoangfriListing) => (
        <Badge variant={POANGFRI_LISTING_STATUS_VARIANTS[l.status]}>
          {POANGFRI_LISTING_STATUS_LABELS[l.status]}
        </Badge>
      ),
    },
  ];

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Poängfri bostad</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Bostäder som hyrs ut utan kötid. Intresseanmälningar hanteras manuellt –
            handläggaren kontaktar uppifrån listan och skapar kontrakt direkt när någon
            tackar ja.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "ready_to_publish" | "published_now")}>
          <TabsList className="inline-flex h-11">
            <TabsTrigger value="ready_to_publish" className="group h-full gap-2 px-2 text-xs sm:text-sm sm:px-3">
              Att publicera
              <TabCount count={readyToPublishCount} hideWhenZero={false} variant="neutral" />
            </TabsTrigger>
            <TabsTrigger value="published_now" className="group h-full gap-2 px-2 text-xs sm:text-sm sm:px-3">
              Publicerade nu
              <TabCount count={publishedNowCount} hideWhenZero={false} variant="neutral" />
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
              <div className="relative w-full sm:w-[280px]">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Sök adress, område, objekts-id..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <Select value={status} onValueChange={(v) => setStatus(v as PoangfriListingStatus | "all")}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_FILTERS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={area} onValueChange={setArea}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Område" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla områden</SelectItem>
                  {areas.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Rensa filter
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <ResponsiveTable
              data={filtered}
              columns={columns}
              keyExtractor={(l: PoangfriListing) => l.id}
              emptyMessage={
                activeTab === "ready_to_publish"
                  ? "Inga annonser väntar på publicering"
                  : "Inga publicerade annonser matchar dina filter"
              }
              onRowClick={(l: PoangfriListing) =>
                navigate(`/rentals/housing/poangfritt/${l.id}`)
              }
            />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
