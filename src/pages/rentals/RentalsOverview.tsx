import { PageLayout } from "@/layouts";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Home, Car, Archive, TrendingDown, ChevronRight } from "lucide-react";
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
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  }).format(n);

interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  monthlyLoss: number;
  vacantCount: number;
  kpis: { label: string; value: number | string }[];
  onClick: () => void;
}

const SectionCard = ({ title, icon, monthlyLoss, vacantCount, kpis, onClick }: SectionCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer overflow-hidden transition-all hover:shadow-md hover:border-foreground/20"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Loss block — primary metric */}
        <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r bg-destructive/5">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            {icon}
            <span className="text-sm font-medium">{title}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <TrendingDown className="h-5 w-5 text-destructive shrink-0" />
            <span className="text-3xl font-bold text-destructive tabular-nums">
              {formatSEK(monthlyLoss)}
            </span>
            <span className="text-sm text-muted-foreground">/mån</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Hyresbortfall från {vacantCount} lediga objekt
          </p>
        </div>

        {/* KPIs */}
        <div className="flex-[2] p-6 flex items-center justify-between gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 flex-1">
            {kpis.map((kpi) => (
              <div key={kpi.label}>
                <div className="text-xs text-muted-foreground mb-1">{kpi.label}</div>
                <div className="text-xl font-semibold tabular-nums">{kpi.value}</div>
              </div>
            ))}
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 shrink-0" />
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
    return {
      loss: vacant.reduce((s, h) => s + parseRent(h.rent), 0),
      vacantCount: vacant.length,
      kpis: [
        { label: "Publicerade", value: publishedHousing.length },
        { label: "Klara för erbjudande", value: readyForOfferHousing.length },
        { label: "Erbjudna", value: offeredHousing.length },
        { label: "Behov av publicering", value: unpublishedHousingSpaces.length },
      ],
    };
  }, [publishedHousing, readyForOfferHousing, offeredHousing]);

  const parkingMetrics = useMemo(() => {
    const vacant = [...publishedParking, ...readyForOfferParking, ...needsRepublishParking];
    return {
      loss: vacant.reduce((s, p) => s + parseRent(p.rent), 0),
      vacantCount: vacant.length,
      kpis: [
        { label: "Publicerade", value: publishedParking.length },
        { label: "Klara för erbjudande", value: readyForOfferParking.length },
        { label: "Erbjudna", value: offeredParking.length },
        { label: "Behov av publicering", value: needsRepublishParking.length },
      ],
    };
  }, [publishedParking, readyForOfferParking, offeredParking, needsRepublishParking]);

  const storageMetrics = {
    loss: 0,
    vacantCount: 0,
    kpis: [
      { label: "Publicerade", value: "—" },
      { label: "Klara för erbjudande", value: "—" },
      { label: "Erbjudna", value: "—" },
      { label: "Behov av publicering", value: "—" },
    ],
  };

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Uthyrning</h1>
          <p className="text-muted-foreground mt-1">
            Översikt av aktuellt hyresbortfall och uthyrningsstatus per objekttyp.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <SectionCard
            title="Bostad"
            icon={<Home className="h-4 w-4" />}
            monthlyLoss={housingMetrics.loss}
            vacantCount={housingMetrics.vacantCount}
            kpis={housingMetrics.kpis}
            onClick={() => navigate("/rentals/bostad")}
          />
          <SectionCard
            title="Bilplats"
            icon={<Car className="h-4 w-4" />}
            monthlyLoss={parkingMetrics.loss}
            vacantCount={parkingMetrics.vacantCount}
            kpis={parkingMetrics.kpis}
            onClick={() => navigate("/rentals/bilplats")}
          />
          <SectionCard
            title="Förråd"
            icon={<Archive className="h-4 w-4" />}
            monthlyLoss={storageMetrics.loss}
            vacantCount={storageMetrics.vacantCount}
            kpis={storageMetrics.kpis}
            onClick={() => navigate("/rentals/forrad")}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default RentalsOverview;
