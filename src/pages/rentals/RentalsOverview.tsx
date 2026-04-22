import { PageLayout } from "@/layouts";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  Home,
  Car,
  Archive,
  TrendingDown,
  ArrowRight,
  Megaphone,
  Users,
  RotateCcw,
  History,
  FileText,
} from "lucide-react";
import { publishedHousingSpaces } from "@/features/rentals/data/published-housing";
import { unpublishedHousingSpaces } from "@/features/rentals/data/unpublished-housing";
import { useHousingStatus } from "@/features/rentals/hooks/useHousingStatus";
import { useParkingSpaceListingsByType } from "@/features/rentals/hooks/useParkingSpaceListingsByType";

const parseRent = (rent?: string): number => {
  if (!rent) return 0;
  const match = rent.replace(/\s/g, "").match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

const formatSEK = (n: number) =>
  new Intl.NumberFormat("sv-SE", {
    maximumFractionDigits: 0,
  }).format(n) + " kr";

interface Kpi {
  label: string;
  value: number | string;
  icon: React.ReactNode;
}

interface SectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  totalCount: number;
  monthlyLoss: number;
  vacantCount: number;
  kpis: Kpi[];
  ctaLabel: string;
  onClick: () => void;
}

const SectionCard = ({
  title,
  description,
  icon,
  totalCount,
  monthlyLoss,
  vacantCount,
  kpis,
  ctaLabel,
  onClick,
}: SectionCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer overflow-hidden p-0 transition-all hover:shadow-md hover:border-foreground/20"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground shrink-0">
            {icon}
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground whitespace-nowrap pt-1">
          {totalCount} objekt totalt
        </div>
      </div>

      {/* Hyresbortfall row */}
      <div className="flex items-center justify-between gap-4 border-t border-b border-border bg-destructive/5 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive shrink-0">
            <TrendingDown className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Hyresbortfall / månad
            </div>
            <div className="text-sm text-muted-foreground">
              {vacantCount} lediga objekt utan kontrakt
            </div>
          </div>
        </div>
        <div className="text-3xl font-bold text-destructive tabular-nums">
          {formatSEK(monthlyLoss)}
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="px-5 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span className="text-muted-foreground">{kpi.icon}</span>
              <span>{kpi.label}</span>
            </div>
            <div className="text-2xl font-semibold tabular-nums">{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* CTA footer */}
      <div className="flex justify-end border-t border-border px-5 py-3">
        <div className="flex items-center gap-1.5 text-sm font-medium text-foreground transition-transform group-hover:translate-x-0.5">
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
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
    const vacant = [
      ...publishedHousing,
      ...readyForOfferHousing,
      ...unpublishedHousingSpaces,
    ];
    const total =
      publishedHousingSpaces.length + unpublishedHousingSpaces.length + 6; // +historik
    return {
      total,
      loss: vacant.reduce((s, h) => s + parseRent(h.rent), 0),
      vacantCount: vacant.length,
      kpis: [
        { label: "Publicerade", value: publishedHousing.length, icon: <Megaphone className="h-4 w-4" /> },
        { label: "Klara för erbjudande", value: readyForOfferHousing.length, icon: <Users className="h-4 w-4" /> },
        { label: "Behov av publicering", value: unpublishedHousingSpaces.length, icon: <RotateCcw className="h-4 w-4" /> },
        { label: "Historik", value: 6, icon: <History className="h-4 w-4" /> },
      ] as Kpi[],
    };
  }, [publishedHousing, readyForOfferHousing, offeredHousing]);

  const parkingMetrics = useMemo(() => {
    const vacant = [...publishedParking, ...readyForOfferParking, ...needsRepublishParking];
    const total =
      publishedParking.length +
      readyForOfferParking.length +
      offeredParking.length +
      needsRepublishParking.length;
    return {
      total,
      loss: vacant.reduce((s, p) => s + parseRent(p.rent), 0),
      vacantCount: vacant.length,
      kpis: [
        { label: "Publicerade", value: publishedParking.length, icon: <Megaphone className="h-4 w-4" /> },
        { label: "Klara för erbjudande", value: readyForOfferParking.length, icon: <Users className="h-4 w-4" /> },
        { label: "Erbjudna", value: offeredParking.length, icon: <FileText className="h-4 w-4" /> },
        { label: "Behov av publicering", value: needsRepublishParking.length, icon: <RotateCcw className="h-4 w-4" /> },
      ] as Kpi[],
    };
  }, [publishedParking, readyForOfferParking, offeredParking, needsRepublishParking]);

  const storageMetrics = {
    total: 9,
    loss: 730,
    vacantCount: 7,
    kpis: [
      { label: "Publicerade", value: 3, icon: <Megaphone className="h-4 w-4" /> },
      { label: "Klara för erbjudande", value: 2, icon: <Users className="h-4 w-4" /> },
      { label: "Erbjudna", value: 2, icon: <FileText className="h-4 w-4" /> },
      { label: "Behov av publicering", value: 2, icon: <RotateCcw className="h-4 w-4" /> },
    ] as Kpi[],
  };

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full space-y-4">
        <SectionCard
          title="Bostad"
          description="Bostadsannonser, intresseanmälningar och tilldelning"
          icon={<Home className="h-5 w-5" />}
          totalCount={housingMetrics.total}
          monthlyLoss={housingMetrics.loss}
          vacantCount={housingMetrics.vacantCount}
          kpis={housingMetrics.kpis}
          ctaLabel="Öppna bostad"
          onClick={() => navigate("/rentals/bostad")}
        />
        <SectionCard
          title="Bilplats"
          description="Bilplatsannonser, kö och erbjudanden"
          icon={<Car className="h-5 w-5" />}
          totalCount={parkingMetrics.total}
          monthlyLoss={parkingMetrics.loss}
          vacantCount={parkingMetrics.vacantCount}
          kpis={parkingMetrics.kpis}
          ctaLabel="Öppna bilplats"
          onClick={() => navigate("/rentals/bilplats")}
        />
        <SectionCard
          title="Förråd"
          description="Förrådsannonser, kö och erbjudanden"
          icon={<Archive className="h-5 w-5" />}
          totalCount={storageMetrics.total}
          monthlyLoss={storageMetrics.loss}
          vacantCount={storageMetrics.vacantCount}
          kpis={storageMetrics.kpis}
          ctaLabel="Öppna förråd"
          onClick={() => navigate("/rentals/forrad")}
        />
      </div>
    </PageLayout>
  );
};

export default RentalsOverview;
