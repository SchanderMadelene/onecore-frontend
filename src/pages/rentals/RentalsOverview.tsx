import { PageLayout } from "@/layouts";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  Archive,
  Car,
  ChevronRight,
  FileClock,
  FileText,
  Home,
  Megaphone,
  RotateCcw,
  TrendingDown,
  Users,
} from "lucide-react";
import { publishedHousingSpaces } from "@/features/rentals/data/published-housing";
import { unpublishedHousingSpaces } from "@/features/rentals/data/unpublished-housing";
import { useHousingStatus } from "@/features/rentals/hooks/useHousingStatus";
import { useParkingSpaceListingsByType } from "@/features/rentals/hooks/useParkingSpaceListingsByType";
import { useStorageSpaceListingsByType } from "@/features/rentals/hooks/useStorageSpaceListingsByType";

const parseRent = (rent?: string): number => {
  if (!rent) return 0;
  const match = rent.replace(/\s/g, "").match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

const formatSEK = (n: number) =>
  new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  }).format(n);

interface KPIItem {
  label: string;
  value: number | string;
  icon: React.ReactNode;
}

interface SectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  monthlyLoss: number;
  vacantCount: number;
  totalCount: number;
  ctaLabel: string;
  kpis: KPIItem[];
  onClick: () => void;
}

const SectionCard = ({
  title,
  description,
  icon,
  monthlyLoss,
  vacantCount,
  totalCount,
  ctaLabel,
  kpis,
  onClick,
}: SectionCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer overflow-hidden border-border bg-background transition-all hover:border-foreground/10 hover:shadow-md"
    >
      <div className="border-b px-6 py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted text-foreground">
              {icon}
            </div>
            <div className="min-w-0">
              <div className="text-2xl font-semibold tracking-tight">{title}</div>
              <p className="mt-1 text-lg text-muted-foreground">{description}</p>
            </div>
          </div>
          <div className="shrink-0 text-base text-muted-foreground">{totalCount} objekt totalt</div>
        </div>
      </div>

      <div className="border-b bg-destructive/5 px-6 py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-background/80 text-destructive">
              <TrendingDown className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Hyresbortfall / månad
              </div>
              <p className="text-lg text-muted-foreground">
                {vacantCount} lediga objekt utan kontrakt
              </p>
            </div>
          </div>
          <div className="text-right text-4xl font-semibold tracking-tight text-destructive tabular-nums sm:text-5xl">
            {formatSEK(monthlyLoss)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 divide-y sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="px-6 py-5">
            <div className="mb-3 flex items-center gap-2 text-muted-foreground">
              <span className="shrink-0">{kpi.icon}</span>
              <span className="text-lg">{kpi.label}</span>
            </div>
            <div className="text-3xl font-semibold leading-none tabular-nums">{kpi.value}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-end px-6 py-5">
        <div className="inline-flex items-center gap-2 text-2xl font-medium tracking-tight text-foreground">
          <span>{ctaLabel}</span>
          <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Card>
  );
};

const RentalsOverview = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { filterHousingByStatus } = useHousingStatus();

  const publishedHousing = filterHousingByStatus(publishedHousingSpaces, "published");
  const readyForOfferHousing = filterHousingByStatus(publishedHousingSpaces, "ready_for_offer");
  const offeredHousing = filterHousingByStatus(publishedHousingSpaces, "offered");

  const { data: publishedParking = [] } = useParkingSpaceListingsByType("published");
  const { data: readyForOfferParking = [] } = useParkingSpaceListingsByType("ready-for-offer");
  const { data: offeredParking = [] } = useParkingSpaceListingsByType("offered");
  const { data: needsRepublishParking = [] } = useParkingSpaceListingsByType("needs-republish");

  const housingMetrics = useMemo(() => {
    const vacant = [...publishedHousing, ...readyForOfferHousing, ...unpublishedHousingSpaces];
    return {
      loss: vacant.reduce((s, h) => s + parseRent(h.rent), 0),
      vacantCount: vacant.length,
      totalCount:
        publishedHousing.length +
        readyForOfferHousing.length +
        offeredHousing.length +
        unpublishedHousingSpaces.length,
      kpis: [
        { label: "Publicerade", value: publishedHousing.length, icon: <Megaphone className="h-4 w-4" /> },
        { label: "Klara för erbjudande", value: readyForOfferHousing.length, icon: <Users className="h-4 w-4" /> },
        { label: "Behov av publicering", value: unpublishedHousingSpaces.length, icon: <RotateCcw className="h-4 w-4" /> },
        { label: "Historik", value: offeredHousing.length, icon: <FileClock className="h-4 w-4" /> },
      ],
    };
  }, [publishedHousing, readyForOfferHousing, offeredHousing]);

  const parkingMetrics = useMemo(() => {
    const vacant = [...publishedParking, ...readyForOfferParking, ...needsRepublishParking];
    return {
      loss: vacant.reduce((s, p) => s + parseRent(p.rent), 0),
      vacantCount: vacant.length,
      totalCount:
        publishedParking.length +
        readyForOfferParking.length +
        offeredParking.length +
        needsRepublishParking.length,
      kpis: [
        { label: "Publicerade", value: publishedParking.length, icon: <Megaphone className="h-4 w-4" /> },
        { label: "Klara för erbjudande", value: readyForOfferParking.length, icon: <Users className="h-4 w-4" /> },
        { label: "Erbjudna", value: offeredParking.length, icon: <FileText className="h-4 w-4" /> },
        { label: "Behov av publicering", value: needsRepublishParking.length, icon: <RotateCcw className="h-4 w-4" /> },
      ],
    };
  }, [publishedParking, readyForOfferParking, offeredParking, needsRepublishParking]);

  const { data: publishedStorage = [] } = useStorageSpaceListingsByType("published");
  const { data: readyForOfferStorage = [] } = useStorageSpaceListingsByType("ready-for-offer");
  const { data: offeredStorage = [] } = useStorageSpaceListingsByType("offered");
  const { data: needsRepublishStorage = [] } = useStorageSpaceListingsByType("needs-republish");

  const storageMetrics = useMemo(() => {
    const vacant = [...publishedStorage, ...readyForOfferStorage, ...needsRepublishStorage];
    return {
      loss: vacant.reduce((s, p) => s + parseRent(p.rent), 0),
      vacantCount: vacant.length,
      totalCount:
        publishedStorage.length +
        readyForOfferStorage.length +
        offeredStorage.length +
        needsRepublishStorage.length,
      kpis: [
        { label: "Publicerade", value: publishedStorage.length, icon: <Megaphone className="h-4 w-4" /> },
        { label: "Klara för erbjudande", value: readyForOfferStorage.length, icon: <Users className="h-4 w-4" /> },
        { label: "Erbjudna", value: offeredStorage.length, icon: <FileText className="h-4 w-4" /> },
        { label: "Behov av publicering", value: needsRepublishStorage.length, icon: <RotateCcw className="h-4 w-4" /> },
      ],
    };
  }, [publishedStorage, readyForOfferStorage, offeredStorage, needsRepublishStorage]);

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Uthyrning</h1>
          <p className="mt-1 text-muted-foreground">
            Översikt av aktuellt hyresbortfall och uthyrningsstatus per objekttyp.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <SectionCard
            title="Bostad"
            description="Bostadsannonser, intresseanmälningar och tilldelning"
            icon={<Home className="h-6 w-6" />}
            monthlyLoss={housingMetrics.loss}
            vacantCount={housingMetrics.vacantCount}
            totalCount={housingMetrics.totalCount}
            kpis={housingMetrics.kpis}
            ctaLabel="Öppna bostad"
            onClick={() => navigate("/rentals/bostad")}
          />
          <SectionCard
            title="Bilplats"
            description="Bilplatsannonser, kö och erbjudanden"
            icon={<Car className="h-6 w-6" />}
            monthlyLoss={parkingMetrics.loss}
            vacantCount={parkingMetrics.vacantCount}
            totalCount={parkingMetrics.totalCount}
            kpis={parkingMetrics.kpis}
            ctaLabel="Öppna bilplats"
            onClick={() => navigate("/rentals/bilplats")}
          />
          <SectionCard
            title="Förråd"
            description="Förrådsannonser, kö och erbjudanden"
            icon={<Archive className="h-6 w-6" />}
            monthlyLoss={storageMetrics.loss}
            vacantCount={storageMetrics.vacantCount}
            totalCount={storageMetrics.totalCount}
            kpis={storageMetrics.kpis}
            ctaLabel="Öppna förråd"
            onClick={() => navigate("/rentals/forrad")}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default RentalsOverview;
