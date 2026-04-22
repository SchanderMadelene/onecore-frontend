import { useNavigate } from "react-router-dom";
import { Home, Car, Archive, ArrowRight, Users, Megaphone, FileSignature, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";
import { useParkingSpaceListingsByType } from "@/features/rentals/hooks/useParkingSpaceListingsByType";
import { useStorageSpaceListingsByType } from "@/features/rentals/hooks/useStorageSpaceListingsByType";
import { publishedHousingSpaces } from "@/features/rentals/data/published-housing";
import { unpublishedHousingSpaces } from "@/features/rentals/data/unpublished-housing";
import { historyHousingSpaces } from "@/features/rentals/data/history-housing";

interface SectionStat {
  label: string;
  value: number;
  subtab: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SectionCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  basePath: string;
  stats: SectionStat[];
  enabled: boolean;
}

const SectionCard = ({ title, description, icon: Icon, basePath, stats, enabled }: SectionCardProps) => {
  const navigate = useNavigate();

  if (!enabled) return null;

  const total = stats.reduce((sum, s) => sum + s.value, 0);

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4 p-5 border-b">
        <div className="flex items-start gap-3 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
            <Icon className="h-5 w-5 text-foreground" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold truncate">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-2xl font-semibold tabular-nums">{total}</div>
          <div className="text-xs text-muted-foreground">objekt totalt</div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 border-b">
        {stats.map((stat) => {
          const StatIcon = stat.icon;
          return (
            <button
              key={stat.subtab}
              onClick={() => navigate(`${basePath}?subtab=${stat.subtab}`)}
              className="flex flex-col items-start gap-1 p-4 text-left transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <StatIcon className="h-3.5 w-3.5" />
                <span className="text-xs">{stat.label}</span>
              </div>
              <span className="text-xl font-semibold tabular-nums">{stat.value}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-end p-3 bg-muted/30 mt-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(basePath)}
          className="gap-1.5"
        >
          Öppna {title.toLowerCase()}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export const RentalsOverview = () => {
  const { features } = useFeatureToggles();

  // Bilplats
  const parkingPublished = useParkingSpaceListingsByType("published");
  const parkingReady = useParkingSpaceListingsByType("ready-for-offer");
  const parkingOffered = useParkingSpaceListingsByType("offered");
  const parkingNeeds = useParkingSpaceListingsByType("needs-republish");

  // Förråd
  const storagePublished = useStorageSpaceListingsByType("published");
  const storageReady = useStorageSpaceListingsByType("ready-for-offer");
  const storageOffered = useStorageSpaceListingsByType("offered");
  const storageNeeds = useStorageSpaceListingsByType("needs-republish");

  // Bostad – från lokala datamoduler
  const housingPublishedCount = publishedHousingSpaces.length;
  const housingReadyCount = publishedHousingSpaces.filter(
    (h) => (h.seekers ?? 0) > 0 && new Date(h.publishedTo) <= new Date()
  ).length;
  const housingNeedsCount = unpublishedHousingSpaces.length;
  const housingHistoryCount = historyHousingSpaces.length;

  const housingStats: SectionStat[] = [
    { label: "Publicerade", value: housingPublishedCount, subtab: "publicerade", icon: Megaphone },
    { label: "Klara för erbjudande", value: housingReadyCount, subtab: "klaraForErbjudande", icon: Users },
    { label: "Behov av publicering", value: housingNeedsCount, subtab: "behovAvPublicering", icon: RotateCcw },
    { label: "Historik", value: housingHistoryCount, subtab: "historik", icon: FileSignature },
  ];

  const parkingStats: SectionStat[] = [
    { label: "Publicerade", value: parkingPublished.data?.length ?? 0, subtab: "publicerade", icon: Megaphone },
    { label: "Klara för erbjudande", value: parkingReady.data?.length ?? 0, subtab: "klaraForErbjudande", icon: Users },
    { label: "Erbjudna", value: parkingOffered.data?.length ?? 0, subtab: "erbjudna", icon: FileSignature },
    { label: "Behov av publicering", value: parkingNeeds.data?.length ?? 0, subtab: "behovAvPublicering", icon: RotateCcw },
  ];

  const storageStats: SectionStat[] = [
    { label: "Publicerade", value: storagePublished.data?.length ?? 0, subtab: "publicerade", icon: Megaphone },
    { label: "Klara för erbjudande", value: storageReady.data?.length ?? 0, subtab: "klaraForErbjudande", icon: Users },
    { label: "Erbjudna", value: storageOffered.data?.length ?? 0, subtab: "erbjudna", icon: FileSignature },
    { label: "Behov av publicering", value: storageNeeds.data?.length ?? 0, subtab: "behovAvPublicering", icon: RotateCcw },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <SectionCard
        title="Bostad"
        description="Bostadsannonser, intresseanmälningar och tilldelning"
        icon={Home}
        basePath="/rentals/housing"
        stats={housingStats}
        enabled={features.showRentalsHousing}
      />
      <SectionCard
        title="Bilplats"
        description="Bilplatsannonser, kö och erbjudanden"
        icon={Car}
        basePath="/rentals/parking"
        stats={parkingStats}
        enabled={features.showRentalsParking}
      />
      <SectionCard
        title="Förråd"
        description="Förrådsannonser, kö och erbjudanden"
        icon={Archive}
        basePath="/rentals/storage"
        stats={storageStats}
        enabled={features.showRentalsStorage}
      />
    </div>
  );
};
